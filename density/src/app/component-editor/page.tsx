"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LivePreview,
  TokenPropertyEditor,
} from "@/components/component-editor";
import {
  useEditorStore,
  getComponentsGroupedByCategory,
  getComponent,
  type ComponentSpec,
} from "@/lib/component-editor";
import { cn } from "@/lib/utils";

export default function ComponentEditorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["primitive", "composite", "overlay"]);
  
  const selectedComponent = useEditorStore((state) => state.selectedComponent);
  const selectComponent = useEditorStore((state) => state.selectComponent);

  const selectedSpec = selectedComponent 
    ? getComponent(selectedComponent) || null
    : null;

  const componentsByCategory = useMemo(() => getComponentsGroupedByCategory(), []);
  
  const filteredComponents = useMemo(() => {
    if (!searchQuery.trim()) return componentsByCategory;
    
    const query = searchQuery.toLowerCase();
    const filtered: Record<string, ComponentSpec[]> = {};
    
    for (const [category, components] of Object.entries(componentsByCategory)) {
      const matches = components.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.description?.toLowerCase().includes(query)
      );
      if (matches.length > 0) {
        filtered[category] = matches;
      }
    }
    
    return filtered;
  }, [componentsByCategory, searchQuery]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const categoryLabels: Record<string, string> = {
    primitive: "Primitives",
    composite: "Composite",
    overlay: "Overlays",
    layout: "Layout",
    feedback: "Feedback",
    navigation: "Navigation",
    "data-display": "Data Display",
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Main Content - Three Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Component List */}
        <aside className="w-[240px] flex flex-col">
          {/* Search */}
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
            </div>
          </div>
          
          {/* Component List */}
          <ScrollArea className="flex-1">
            <div className="py-2">
              {Object.entries(filteredComponents).map(([category, components]) => (
                <Collapsible
                  key={category}
                  open={expandedCategories.includes(category)}
                  onOpenChange={() => toggleCategory(category)}
                >
                  <CollapsibleTrigger className="flex items-center gap-1 w-full px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    {expandedCategories.includes(category) ? (
                      <ChevronDown className="size-4" />
                    ) : (
                      <ChevronRight className="size-4" />
                    )}
                    {categoryLabels[category] || category}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-2">
                      {components.map((spec) => (
                        <button
                          key={spec.name}
                          onClick={() => selectComponent(spec.name)}
                          className={cn(
                            "w-full text-left px-4 py-1.5 text-sm transition-colors",
                            selectedComponent === spec.name
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                          )}
                        >
                          {spec.name}
                        </button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Center - Live Preview */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {selectedComponent && selectedSpec ? (
            <div className="flex-1 p-8 overflow-auto">
              <div className="border rounded-lg p-6 min-h-[200px]">
                <LivePreview componentName={selectedComponent} />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p>Select a component to preview</p>
            </div>
          )}
        </main>

        {/* Right Sidebar - Token Properties */}
        <aside className="w-[280px] flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-4">
              {selectedComponent ? (
                <TokenPropertyEditor componentName={selectedComponent} />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select a component to edit tokens
                </p>
              )}
            </div>
          </ScrollArea>
        </aside>
      </div>
    </div>
  );
}
