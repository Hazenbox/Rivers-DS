"use client";

/**
 * COMPONENT PICKER
 * 
 * Component selection panel with category grouping and search.
 */

import * as React from "react";
import { Search, Box, Layers, PanelTop, Layout, Bell, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  useEditorStore,
  getComponentsGroupedByCategory,
  searchComponents,
  type ComponentCategory,
  type ComponentSpec,
} from "@/lib/component-editor";

// ============================================
// TYPES
// ============================================

interface ComponentPickerProps {
  className?: string;
}

// ============================================
// CATEGORY CONFIG
// ============================================

const categoryConfig: Record<ComponentCategory, { icon: React.ReactNode; label: string }> = {
  primitive: { icon: <Box className="size-4" />, label: "Primitives" },
  composite: { icon: <Layers className="size-4" />, label: "Composite" },
  overlay: { icon: <PanelTop className="size-4" />, label: "Overlays" },
  layout: { icon: <Layout className="size-4" />, label: "Layout" },
  feedback: { icon: <Bell className="size-4" />, label: "Feedback" },
  navigation: { icon: <Navigation className="size-4" />, label: "Navigation" },
  "data-display": { icon: <Layers className="size-4" />, label: "Data Display" },
};

const categoryOrder: ComponentCategory[] = [
  "primitive",
  "composite",
  "overlay",
  "layout",
  "feedback",
  "navigation",
  "data-display",
];

// ============================================
// MAIN COMPONENT
// ============================================

export function ComponentPicker({ className }: ComponentPickerProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { selectedComponent, selectComponent } = useEditorStore();

  const groupedComponents = getComponentsGroupedByCategory();
  
  // Filter by search
  const filteredGroups = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return groupedComponents;
    }
    
    const results = searchComponents(searchQuery);
    const resultNames = new Set(results.map((c) => c.name));
    
    const filtered: Record<ComponentCategory, ComponentSpec[]> = {} as Record<ComponentCategory, ComponentSpec[]>;
    for (const category of categoryOrder) {
      const components = groupedComponents[category]?.filter((c) =>
        resultNames.has(c.name)
      ) || [];
      if (components.length > 0) {
        filtered[category] = components;
      }
    }
    return filtered;
  }, [searchQuery, groupedComponents]);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Search */}
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9"
          />
        </div>
      </div>

      {/* Component List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-4">
          {categoryOrder.map((category) => {
            const components = filteredGroups[category];
            if (!components || components.length === 0) return null;

            const config = categoryConfig[category];

            return (
              <div key={category}>
                <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {config.icon}
                  <span>{config.label}</span>
                  <Badge variant="secondary" className="text-xs ml-auto">
                    {components.length}
                  </Badge>
                </div>
                <div className="space-y-0.5">
                  {components.map((component) => (
                    <ComponentItem
                      key={component.name}
                      component={component}
                      isSelected={selectedComponent === component.name}
                      onSelect={() => selectComponent(component.name)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

// ============================================
// COMPONENT ITEM
// ============================================

interface ComponentItemProps {
  component: ComponentSpec;
  isSelected: boolean;
  onSelect: () => void;
}

function ComponentItem({ component, isSelected, onSelect }: ComponentItemProps) {
  return (
    <Button
      variant={isSelected ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start h-9 px-2",
        isSelected && "bg-secondary"
      )}
      onClick={onSelect}
    >
      <span className="truncate">{component.name}</span>
      {component.variants.length > 1 && (
        <Badge variant="outline" className="ml-auto text-xs">
          {component.variants.length}v
        </Badge>
      )}
    </Button>
  );
}
