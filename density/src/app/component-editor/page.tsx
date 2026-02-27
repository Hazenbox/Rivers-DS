"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronRight, RotateCcw, Shuffle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  getAllComponents,
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
        <aside className="w-[240px] border-r flex flex-col bg-muted/30">
          {/* Search */}
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-sm bg-background"
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
        <main className="flex-1 flex flex-col overflow-hidden bg-background">
          {selectedComponent && selectedSpec ? (
            <div className="flex-1 p-8 overflow-auto">
              <LivePreview componentName={selectedComponent} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p>Select a component to preview</p>
            </div>
          )}
        </main>

        {/* Right Sidebar - Token Properties */}
        <aside className="w-[280px] border-l flex flex-col bg-muted/30">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Settings Section */}
              <div className="space-y-4">
                <SettingRow label="Preset" value="Custom" />
                <SettingRow label="Component Library" value="Radix UI" />
                <SettingRow label="Style" value="Nova" />
                <SettingRow label="Base Color" value="Neutral" />
                <SettingRow label="Theme" value="Neutral" />
                <SettingRow label="Icon Library" value="Lucide" />
                <SettingRow label="Font" value="Inter" />
                <SettingRow label="Radius" value="Default" />
                <SettingRow label="Menu Color" value="Default" />
                <SettingRow label="Menu Accent" value="Subtle" />
              </div>

              <Separator />

              {/* Token Editor */}
              {selectedComponent ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Token Overrides</h3>
                  <TokenPropertyEditor componentName={selectedComponent} />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select a component to edit tokens
                </p>
              )}
            </div>
          </ScrollArea>

          {/* Bottom Actions */}
          <div className="border-t p-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Shuffle</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">Try Random</span>
                <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">R</kbd>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Reset</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">Start Over</span>
                <RotateCcw className="size-4" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
