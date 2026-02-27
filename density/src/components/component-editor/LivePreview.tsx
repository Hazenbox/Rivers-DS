"use client";

/**
 * LIVE PREVIEW
 * 
 * Real-time component preview with CSS custom property injection.
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

// ============================================
// MAIN COMPONENT
// ============================================

export function LivePreview({ componentName, className }: LivePreviewProps) {
  const [simulatedState] = React.useState<InteractionState>("default");
  const [darkMode] = React.useState(false);

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

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Preview Area - centered */}
      <div className="flex-1 flex items-center justify-center overflow-auto">
        <div
          className={cn(darkMode && "dark")}
          style={cssVariables}
        >
          <PreviewContent
            componentName={componentName}
            variant={selectedVariant || spec.variants[0]?.value}
            size={selectedSize || spec.sizes[0]?.value}
            state={simulatedState}
          />
        </div>
      </div>
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
  // Render Button preview
  if (componentName === "Button") {
    return (
      <Button
        variant={variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | undefined}
        size={size as "default" | "sm" | "lg" | "icon" | undefined}
        disabled={state === "disabled"}
      >
        Button
      </Button>
    );
  }

  // Render Badge preview
  if (componentName === "Badge") {
    return (
      <Badge variant={variant as "default" | "secondary" | "destructive" | "outline" | undefined}>
        Badge
      </Badge>
    );
  }

  // Generic placeholder for other components
  return (
    <div className="text-sm text-muted-foreground">
      {componentName}
    </div>
  );
}
