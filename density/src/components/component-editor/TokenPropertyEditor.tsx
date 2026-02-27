"use client";

/**
 * TOKEN PROPERTY EDITOR
 * 
 * Editor panel for component token properties.
 * Features: slot grouping, state selection, dependency highlighting.
 */

import * as React from "react";
import { ChevronDown, ChevronRight, Paintbrush, Type, Square, Layers, Maximize2, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    expandedSlots,
    componentOverrides,
    selectState,
    toggleSlotExpanded,
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
    <div className={cn("flex flex-col gap-4", className)}>
      {/* State Selector */}
      <div className="flex items-center gap-2">
        <Label className="text-xs text-muted-foreground">State</Label>
        <div className="flex gap-1">
          {availableStates.map((state) => (
            <Button
              key={state}
              variant={selectedState === state ? "default" : "outline"}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => selectState(state)}
            >
              {state}
            </Button>
          ))}
        </div>
      </div>

      {/* Slot Groups */}
      <div className="space-y-2">
        {filteredGroups.map((group) => (
          <SlotGroupPanel
            key={group.slotId}
            group={group}
            componentName={componentName}
            selectedState={selectedState}
            overrides={overrides}
            isExpanded={expandedSlots.includes(group.slotId)}
            onToggle={() => toggleSlotExpanded(group.slotId)}
            onSetOverride={setTokenOverride}
            onRemoveOverride={removeTokenOverride}
          />
        ))}
      </div>
    </div>
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
  isExpanded: boolean;
  onToggle: () => void;
  onSetOverride: (component: string, key: string, token: TokenReference) => void;
  onRemoveOverride: (component: string, key: string) => void;
}

function SlotGroupPanel({
  group,
  componentName,
  selectedState,
  overrides,
  isExpanded,
  onToggle,
  onSetOverride,
  onRemoveOverride,
}: SlotGroupPanelProps) {
  // Group properties by category
  const categorizedProperties = groupByCategory(group.properties);

  // Count overrides in this slot
  const overrideCount = group.properties.filter((prop) => {
    const key = createPropertyKey(prop.name, group.slotId, selectedState);
    return key in overrides;
  }).length;

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between px-2 h-9"
        >
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
            <span className="font-medium text-sm">{group.slotName}</span>
            <span className="text-xs text-muted-foreground">
              ({group.properties.length})
            </span>
          </div>
          {overrideCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {overrideCount} overrides
            </Badge>
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pl-6 pr-2 py-2 space-y-4">
          {Object.entries(categorizedProperties).map(([category, props]) => (
            <div key={category} className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {categoryIcons[category as TokenCategory]}
                <span>{category}</span>
              </div>
              <div className="space-y-2">
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
      </CollapsibleContent>
    </Collapsible>
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
    <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
      <div className="flex items-center gap-2">
        <Label className="text-xs w-24 truncate" title={property.name}>
          {formatPropertyName(property.name)}
        </Label>
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
      </div>
      <div className="flex items-center gap-1">
        {hasOverride && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => onRemoveOverride(componentName, propertyKey)}
          >
            Reset
          </Button>
        )}
        {property.description && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="size-3.5 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="text-xs max-w-48">{property.description}</p>
            </TooltipContent>
          </Tooltip>
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
