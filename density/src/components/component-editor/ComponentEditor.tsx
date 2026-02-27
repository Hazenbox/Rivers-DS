"use client";

/**
 * COMPONENT EDITOR
 * 
 * Main editor shell combining component picker, property editor, and preview.
 */

import * as React from "react";
import { Undo2, Redo2, Save, Download, Upload, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ComponentPicker } from "./ComponentPicker";
import { TokenPropertyEditor } from "./TokenPropertyEditor";
import { LivePreview } from "./LivePreview";

import {
  useEditorStore,
  getComponent,
  selectCanUndo,
  selectCanRedo,
  selectHasUnsavedChanges,
} from "@/lib/component-editor";

// ============================================
// TYPES
// ============================================

interface ComponentEditorProps {
  className?: string;
}

// ============================================
// MAIN COMPONENT
// ============================================

export function ComponentEditor({ className }: ComponentEditorProps) {
  const {
    selectedComponent,
    selectedVariant,
    selectedSize,
    selectVariant,
    selectSize,
    undo,
    redo,
    markSaved,
    exportState,
  } = useEditorStore();

  const canUndo = useEditorStore(selectCanUndo);
  const canRedo = useEditorStore(selectCanRedo);
  const hasUnsavedChanges = useEditorStore(selectHasUnsavedChanges);

  const spec = selectedComponent ? getComponent(selectedComponent) : null;

  const handleExport = () => {
    const state = exportState();
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `component-tokens-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={cn("flex flex-col h-screen bg-background", className)}>
      {/* Header */}
      <header className="flex items-center justify-between h-14 px-4 border-b shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Component Token Editor</h1>
          {hasUnsavedChanges && (
            <Badge variant="secondary" className="text-xs">
              Unsaved changes
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Undo/Redo */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={undo}
                disabled={!canUndo}
              >
                <Undo2 className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={redo}
                disabled={!canRedo}
              >
                <Redo2 className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>

          <div className="w-px h-6 bg-border mx-1" />

          {/* Export */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleExport}>
                <Download className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export tokens</TooltipContent>
          </Tooltip>

          {/* Save */}
          <Button
            variant={hasUnsavedChanges ? "default" : "secondary"}
            size="sm"
            onClick={markSaved}
            disabled={!hasUnsavedChanges}
          >
            <Save className="size-4 mr-1.5" />
            Save
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <ResizablePanelGroup orientation="horizontal" className="flex-1">
        {/* Component Picker */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ComponentPicker />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Property Editor */}
        <ResizablePanel defaultSize={35} minSize={25}>
          <div className="flex flex-col h-full">
            {/* Component Info */}
            {spec && (
              <div className="p-4 border-b space-y-3">
                <div>
                  <h2 className="font-semibold">{spec.name}</h2>
                  {spec.description && (
                    <p className="text-sm text-muted-foreground">
                      {spec.description}
                    </p>
                  )}
                </div>

                {/* Variant Selector */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">
                      Variant
                    </label>
                    <Select
                      value={selectedVariant || spec.variants[0]?.value}
                      onValueChange={selectVariant}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {spec.variants.map((v) => (
                          <SelectItem key={v.value} value={v.value}>
                            {v.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">
                      Size
                    </label>
                    <Select
                      value={selectedSize || spec.sizes[0]?.value}
                      onValueChange={selectSize}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {spec.sizes.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Property Editor */}
            <ScrollArea className="flex-1">
              {selectedComponent ? (
                <div className="p-4">
                  <TokenPropertyEditor componentName={selectedComponent} />
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  <p>Select a component to edit its tokens</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Live Preview */}
        <ResizablePanel defaultSize={45} minSize={30}>
          {selectedComponent ? (
            <LivePreview componentName={selectedComponent} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a component to preview
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
