"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
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
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

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
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="none" className="border-r">
        <SidebarHeader>
          <SidebarInput
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SidebarHeader>
        <SidebarContent>
          {Object.entries(filteredComponents).map(([category, components]) => (
            <SidebarGroup key={category}>
              <SidebarGroupLabel>
                {categoryLabels[category] || category}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {components.map((spec) => (
                    <SidebarMenuItem key={spec.name}>
                      <SidebarMenuButton
                        isActive={selectedComponent === spec.name}
                        onClick={() => selectComponent(spec.name)}
                      >
                        <span>{spec.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="flex flex-col h-[calc(100vh-var(--control-height-lg))]">
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* Center - Live Preview */}
          <main className="flex-1 flex flex-col min-h-0 p-6 overflow-hidden">
            {selectedComponent && selectedSpec ? (
              <div className="flex-1 min-h-0 border rounded-lg overflow-hidden">
                <LivePreview componentName={selectedComponent} />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <p>Select a component to preview</p>
              </div>
            )}
          </main>

          {/* Right Sidebar - Token Properties */}
          <aside className="w-[360px] flex flex-col min-h-0 border-l">
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
      </SidebarInset>
    </SidebarProvider>
  );
}
