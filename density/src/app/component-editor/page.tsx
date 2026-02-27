"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <div className="h-screen max-h-screen flex flex-col bg-background overflow-hidden">
      {/* Main Content - Three Column Layout */}
      <div className="flex-1 flex min-h-0">
        {/* Left Sidebar - Component List */}
        <aside className="w-[240px] flex flex-col min-h-0">
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
          
          {/* Component List - Flat with category headers */}
          <ScrollArea className="flex-1">
            <div className="py-2">
              {Object.entries(filteredComponents).map(([category, components]) => (
                <div key={category}>
                  <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {categoryLabels[category] || category}
                  </div>
                  {components.map((spec) => (
                    <button
                      key={spec.name}
                      onClick={() => selectComponent(spec.name)}
                      className={cn(
                        "w-full text-left px-3 py-1.5 text-sm transition-colors",
                        selectedComponent === spec.name
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      {spec.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Center - Live Preview */}
        <main className="flex-1 flex flex-col min-h-0 p-6">
          {selectedComponent && selectedSpec ? (
            <div className="flex-1 border rounded-lg">
              <LivePreview componentName={selectedComponent} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p>Select a component to preview</p>
            </div>
          )}
        </main>

        {/* Right Sidebar - Token Properties */}
        <aside className="w-[360px] flex flex-col min-h-0">
          <ScrollArea className="flex-1 min-h-0">
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
