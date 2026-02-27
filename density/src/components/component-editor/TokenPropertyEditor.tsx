"use client";

/**
 * TOKEN PROPERTY EDITOR
 * 
 * Editor panel for component token properties.
 * Features: slot grouping, state selection, dependency highlighting.
 */

import * as React from "react";
import { Paintbrush, Type, Square, Layers, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  useEditorStore,
  getComponent,
  getAvailableStates,
  type ComponentSpec,
  type TokenablePropertySpec,
  type InteractionState,
  type TokenReference,
  type TokenCategory,
} from "@/lib/component-editor";

// ============================================
// TYPES
// ============================================

interface TokenPropertyEditorProps {
  componentName: string;
  className?: string;
}

interface SlotGroup {
  slotId: string;
  slotName: string;
  properties: TokenablePropertySpec[];
}

// ============================================
// CATEGORY ICONS
// ============================================

const categoryIcons: Record<TokenCategory, React.ReactNode> = {
  color: <Paintbrush className="size-3.5" />,
  spacing: <Maximize2 className="size-3.5" />,
  typography: <Type className="size-3.5" />,
  radius: <Square className="size-3.5" />,
  border: <Square className="size-3.5" />,
  shadow: <Layers className="size-3.5" />,
  motion: <Layers className="size-3.5" />,
  opacity: <Layers className="size-3.5" />,
  zIndex: <Layers className="size-3.5" />,
};

// ============================================
// MAIN COMPONENT
// ============================================

export function TokenPropertyEditor({
  componentName,
  className,
}: TokenPropertyEditorProps) {
  const spec = getComponent(componentName);
  const {
    selectedVariant,
    selectedSize,
    selectedState,
    componentOverrides,
    selectState,
    setTokenOverride,
    removeTokenOverride,
  } = useEditorStore();

  if (!spec) {
    return (
      <div className="p-4 text-muted-foreground text-sm">
        Component not found: {componentName}
      </div>
    );
  }

  const availableStates = getAvailableStates(componentName);
  const overrides = componentOverrides[componentName] || {};

  // Group properties by slot
  const slotGroups = groupPropertiesBySlot(spec);

  // Filter properties based on current variant/size
  const filteredGroups = slotGroups.map((group) => ({
    ...group,
    properties: group.properties.filter((prop) => {
      if (prop.variants && selectedVariant && !prop.variants.includes(selectedVariant)) {
        return false;
      }
      if (prop.sizes && selectedSize && !prop.sizes.includes(selectedSize)) {
        return false;
      }
      return true;
    }),
  })).filter((group) => group.properties.length > 0);

  return (
    <TooltipProvider>
      <div className={cn("flex flex-col gap-6", className)}>
        {/* State Selector */}
        <div className="flex flex-wrap gap-1">
          {availableStates.map((state) => (
            <Button
              key={state}
              variant={selectedState === state ? "default" : "ghost"}
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={() => selectState(state)}
            >
              {state}
            </Button>
          ))}
        </div>

        {/* Slot Groups - Flat list */}
        <div className="space-y-6">
          {filteredGroups.map((group) => (
            <SlotGroupPanel
              key={group.slotId}
              group={group}
              componentName={componentName}
              selectedState={selectedState}
              overrides={overrides}
              onSetOverride={setTokenOverride}
              onRemoveOverride={removeTokenOverride}
            />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}

// ============================================
// SLOT GROUP PANEL
// ============================================

interface SlotGroupPanelProps {
  group: SlotGroup;
  componentName: string;
  selectedState: InteractionState;
  overrides: Record<string, TokenReference>;
  onSetOverride: (component: string, key: string, token: TokenReference) => void;
  onRemoveOverride: (component: string, key: string) => void;
}

function SlotGroupPanel({
  group,
  componentName,
  selectedState,
  overrides,
  onSetOverride,
  onRemoveOverride,
}: SlotGroupPanelProps) {
  // Group properties by category
  const categorizedProperties = groupByCategory(group.properties);

  return (
    <div className="space-y-4">
      {/* Slot Header */}
      <div className="text-sm font-medium">{group.slotName}</div>
      
      {/* Properties by Category */}
      {Object.entries(categorizedProperties).map(([category, props]) => (
        <div key={category} className="space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground uppercase tracking-wide">
            {categoryIcons[category as TokenCategory]}
            <span>{category}</span>
          </div>
          <div className="space-y-1.5">
            {props.map((prop) => (
              <PropertyEditor
                key={prop.name}
                property={prop}
                componentName={componentName}
                slotId={group.slotId}
                selectedState={selectedState}
                override={overrides[createPropertyKey(prop.name, group.slotId, selectedState)]}
                onSetOverride={onSetOverride}
                onRemoveOverride={onRemoveOverride}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// PROPERTY EDITOR
// ============================================

interface PropertyEditorProps {
  property: TokenablePropertySpec;
  componentName: string;
  slotId: string;
  selectedState: InteractionState;
  override?: TokenReference;
  onSetOverride: (component: string, key: string, token: TokenReference) => void;
  onRemoveOverride: (component: string, key: string) => void;
}

function PropertyEditor({
  property,
  componentName,
  slotId,
  selectedState,
  override,
  onSetOverride,
  onRemoveOverride,
}: PropertyEditorProps) {
  const propertyKey = createPropertyKey(property.name, slotId, selectedState);
  const hasOverride = Boolean(override);

  const handleChange = (value: string) => {
    if (!value.trim()) {
      onRemoveOverride(componentName, propertyKey);
      return;
    }

    // Determine token type based on input
    let token: TokenReference;
    if (value.startsWith("var(") || value.includes("--")) {
      // Extract CSS variable path
      const match = value.match(/var\(--([^)]+)\)/);
      token = {
        type: "system",
        path: match ? match[1].replace(/-/g, ".") : value,
      };
    } else {
      token = { type: "literal", value };
    }

    onSetOverride(componentName, propertyKey, token);
  };

  const currentValue = override
    ? tokenRefToString(override)
    : tokenRefToString(property.defaultToken);

  return (
    <div className="flex items-center gap-2">
      {property.description ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Label className="text-xs text-muted-foreground font-normal w-28 shrink-0 truncate cursor-help" title={property.name}>
              {formatPropertyName(property.name)}
            </Label>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs max-w-48">{property.description}</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <Label className="text-xs text-muted-foreground font-normal w-28 shrink-0 truncate" title={property.name}>
          {formatPropertyName(property.name)}
        </Label>
      )}
      <div className="flex-1 flex items-center gap-1">
        {property.category === "color" ? (
          <ColorInput
            value={currentValue}
            onChange={handleChange}
            hasOverride={hasOverride}
          />
        ) : (
          <Input
            value={currentValue}
            onChange={(e) => handleChange(e.target.value)}
            className={cn(
              "h-7 text-xs",
              hasOverride && "border-primary"
            )}
          />
        )}
        {hasOverride && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-1.5 text-xs shrink-0"
            onClick={() => onRemoveOverride(componentName, propertyKey)}
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}

// ============================================
// COLOR INPUT
// ============================================

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
  hasOverride: boolean;
}

function ColorInput({ value, onChange, hasOverride }: ColorInputProps) {
  // Extract color for preview (handles var() and literal values)
  const previewColor = value.startsWith("var(")
    ? "var(--primary)" // Fallback preview
    : value;

  return (
    <div className="flex items-center gap-1.5 flex-1">
      <div
        className="size-6 rounded border shrink-0"
        style={{ backgroundColor: previewColor }}
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-7 text-xs flex-1",
          hasOverride && "border-primary"
        )}
      />
    </div>
  );
}

// ============================================
// HELPERS
// ============================================

function groupPropertiesBySlot(spec: ComponentSpec): SlotGroup[] {
  const groups: Map<string, SlotGroup> = new Map();

  for (const slot of spec.slots) {
    groups.set(slot.id, {
      slotId: slot.id,
      slotName: slot.name,
      properties: [],
    });
  }

  for (const prop of spec.tokenableProperties) {
    const group = groups.get(prop.slot);
    if (group) {
      group.properties.push(prop);
    }
  }

  return Array.from(groups.values());
}

function groupByCategory(
  properties: TokenablePropertySpec[]
): Record<string, TokenablePropertySpec[]> {
  const groups: Record<string, TokenablePropertySpec[]> = {};

  for (const prop of properties) {
    if (!groups[prop.category]) {
      groups[prop.category] = [];
    }
    groups[prop.category].push(prop);
  }

  return groups;
}

function createPropertyKey(
  property: string,
  slot: string,
  state: InteractionState
): string {
  return `${property}@${slot}@${state}`;
}

function tokenRefToString(ref: TokenReference): string {
  switch (ref.type) {
    case "literal":
      return ref.value;
    case "system":
      return `var(--${ref.path.replace(/\./g, "-")})`;
    case "custom":
      return `var(--custom-${ref.id})`;
    case "alias":
      return `var(--${ref.ref.replace(/\./g, "-")})`;
    default:
      return "";
  }
}

function formatPropertyName(name: string): string {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}
