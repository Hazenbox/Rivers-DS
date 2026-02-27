"use client";

/**
 * LIVE PREVIEW
 * 
 * Real-time component preview with CSS custom property injection.
 */

import * as React from "react";
import { Monitor, Smartphone, Tablet, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";

import {
  useEditorStore,
  getComponent,
  resolveComponentTokens,
  createResolverConfig,
  type InteractionState,
} from "@/lib/component-editor";

// ============================================
// TYPES
// ============================================

interface LivePreviewProps {
  componentName: string;
  className?: string;
}

type ViewportSize = "mobile" | "tablet" | "desktop";

// ============================================
// VIEWPORT SIZES
// ============================================

const viewportSizes: Record<ViewportSize, { width: number; icon: React.ReactNode; label: string }> = {
  mobile: { width: 375, icon: <Smartphone className="size-4" />, label: "Mobile" },
  tablet: { width: 768, icon: <Tablet className="size-4" />, label: "Tablet" },
  desktop: { width: 1024, icon: <Monitor className="size-4" />, label: "Desktop" },
};

// ============================================
// MAIN COMPONENT
// ============================================

export function LivePreview({ componentName, className }: LivePreviewProps) {
  const [viewport, setViewport] = React.useState<ViewportSize>("desktop");
  const [simulatedState, setSimulatedState] = React.useState<InteractionState>("default");
  const [darkMode, setDarkMode] = React.useState(false);

  const {
    selectedVariant,
    selectedSize,
    context,
    customTokens,
    componentOverrides,
  } = useEditorStore();

  const spec = getComponent(componentName);

  // Resolve tokens for current configuration
  const resolvedTokens = React.useMemo(() => {
    if (!spec) return {};

    const config = createResolverConfig({
      context: { ...context, theme: darkMode ? "dark" : "light" },
      customTokens: new Map(Object.entries(customTokens).map(([id, t]) => [id, t.$value as string])),
      componentOverrides: new Map(
        Object.entries(componentOverrides).map(([comp, overrides]) => [
          comp,
          new Map(Object.entries(overrides)),
        ])
      ),
    });

    return resolveComponentTokens(componentName, config, {
      variant: selectedVariant || undefined,
      size: selectedSize || undefined,
      states: [simulatedState],
    });
  }, [spec, componentName, selectedVariant, selectedSize, simulatedState, context, darkMode, customTokens, componentOverrides]);

  // Generate CSS custom properties
  const cssVariables = React.useMemo(() => {
    const vars: Record<string, string> = {};
    for (const [key, value] of Object.entries(resolvedTokens)) {
      const varName = `--preview-${key.replace(/@/g, "-")}`;
      vars[varName] = value;
    }
    return vars;
  }, [resolvedTokens]);

  if (!spec) {
    return (
      <div className="p-4 text-muted-foreground text-sm">
        Select a component to preview
      </div>
    );
  }

  const viewportConfig = viewportSizes[viewport];

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-1">
          {(Object.entries(viewportSizes) as [ViewportSize, typeof viewportConfig][]).map(
            ([key, config]) => (
              <Toggle
                key={key}
                pressed={viewport === key}
                onPressedChange={() => setViewport(key)}
                size="sm"
                aria-label={config.label}
              >
                {config.icon}
              </Toggle>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* State Simulator */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">Simulate:</span>
            <StateSimulator
              currentState={simulatedState}
              onChange={setSimulatedState}
              componentName={componentName}
            />
          </div>

          {/* Theme Toggle */}
          <Toggle
            pressed={darkMode}
            onPressedChange={setDarkMode}
            size="sm"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </Toggle>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-muted/30 overflow-auto p-4">
        <div
          className={cn(
            "mx-auto bg-background border rounded-lg shadow-sm transition-all duration-300",
            darkMode && "dark"
          )}
          style={{
            width: viewportConfig.width,
            maxWidth: "100%",
            minHeight: 200,
            ...cssVariables,
          }}
        >
          <div className="p-6">
            <PreviewContent
              componentName={componentName}
              variant={selectedVariant || spec.variants[0]?.value}
              size={selectedSize || spec.sizes[0]?.value}
              state={simulatedState}
            />
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className="flex items-center justify-between p-2 border-t text-xs text-muted-foreground">
        <span>
          {componentName} / {selectedVariant || "default"} / {selectedSize || "default"}
        </span>
        <span>{Object.keys(resolvedTokens).length} tokens resolved</span>
      </div>
    </div>
  );
}

// ============================================
// STATE SIMULATOR
// ============================================

interface StateSimulatorProps {
  currentState: InteractionState;
  onChange: (state: InteractionState) => void;
  componentName: string;
}

function StateSimulator({ currentState, onChange, componentName }: StateSimulatorProps) {
  const states: InteractionState[] = [
    "default",
    "hover",
    "focus-visible",
    "active",
    "disabled",
  ];

  return (
    <div className="flex gap-0.5">
      {states.map((state) => (
        <Button
          key={state}
          variant={currentState === state ? "default" : "ghost"}
          size="sm"
          className="h-6 px-1.5 text-xs"
          onClick={() => onChange(state)}
        >
          {state.replace("-visible", "")}
        </Button>
      ))}
    </div>
  );
}

// ============================================
// PREVIEW CONTENT
// ============================================

interface PreviewContentProps {
  componentName: string;
  variant?: string;
  size?: string;
  state: InteractionState;
}

function PreviewContent({ componentName, variant, size, state }: PreviewContentProps) {
  // This would render the actual component with the resolved styles
  // For now, render a placeholder that shows the configuration

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">{componentName} Preview</div>
      
      {/* Example: Render Button preview */}
      {componentName === "Button" && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | undefined}
            size={size as "default" | "sm" | "lg" | "icon" | undefined}
            disabled={state === "disabled"}
            className={cn(
              state === "hover" && "bg-primary/90",
              state === "focus-visible" && "ring-2 ring-ring ring-offset-2",
              state === "active" && "scale-95"
            )}
          >
            Button
          </Button>
        </div>
      )}

      {/* Example: Render Badge preview */}
      {componentName === "Badge" && (
        <div className="flex flex-wrap gap-2">
          <Badge variant={variant as "default" | "secondary" | "destructive" | "outline" | undefined}>
            Badge
          </Badge>
        </div>
      )}

      {/* Generic preview info */}
      <div className="mt-4 p-3 bg-muted rounded text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-muted-foreground">Variant:</span>{" "}
            <span className="font-medium">{variant || "default"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Size:</span>{" "}
            <span className="font-medium">{size || "default"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">State:</span>{" "}
            <span className="font-medium">{state}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
