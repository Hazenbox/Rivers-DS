/**
 * COMPONENT SPECIFICATION
 * 
 * Defines the complete specification for a component including:
 * - Category and dependencies
 * - Slots and their token assignments
 * - Variants and sizes
 * - Tokenable properties with state support
 * - Nested component configurations
 * - Figma property mappings
 */

import type { TokenReference, TokenCategory } from "./token-reference";
import type { InteractionState, InteractionStateSpec } from "./interaction-states";
import type { ComponentMotionTokens } from "./motion";
import type { SlotTokens } from "./slot";

// ============================================
// COMPONENT CATEGORIES
// ============================================

export type ComponentCategory =
  | "primitive"     // Button, Badge, Input, Checkbox, Switch, Label
  | "composite"     // Card, Alert, Form, Table
  | "overlay"       // Dialog, Sheet, Drawer, Popover, Tooltip, DropdownMenu
  | "layout"        // Separator, Accordion, Tabs, Collapsible
  | "feedback"      // Progress, Spinner, Skeleton, Toast
  | "navigation"    // Breadcrumb, Pagination, NavigationMenu, Menubar
  | "data-display"; // Avatar, Badge, Calendar, Chart

// ============================================
// TOKENABLE PROPERTY SPECIFICATION
// ============================================

export interface TokenablePropertySpec {
  /**
   * Property name (e.g., "backgroundColor", "paddingX")
   */
  name: string;
  
  /**
   * Which slot this property belongs to
   */
  slot: string;
  
  /**
   * Token category for validation and UI
   */
  category: TokenCategory;
  
  /**
   * Default token reference
   */
  defaultToken: TokenReference;
  
  /**
   * Which interaction states this property varies with
   */
  states?: InteractionState[];
  
  /**
   * Which variants this property applies to (undefined = all variants)
   */
  variants?: string[];
  
  /**
   * Which sizes this property applies to (undefined = all sizes)
   */
  sizes?: string[];
  
  /**
   * CSS property name for output
   */
  cssProperty?: string;
  
  /**
   * Whether this property can be customized by users
   */
  customizable?: boolean;
  
  /**
   * Description for the editor UI
   */
  description?: string;
}

// ============================================
// VARIANT AND SIZE SPECIFICATIONS
// ============================================

export interface VariantSpec {
  value: string;           // e.g., "default", "destructive"
  label: string;           // UI display name
  description?: string;
  slotPreset?: string;     // Slot to use for this variant
  tokenOverrides?: Record<string, TokenReference>;
}

export interface SizeSpec {
  value: string;           // e.g., "sm", "default", "lg"
  label: string;
  description?: string;
  tokenOverrides?: Record<string, TokenReference>;
}

// ============================================
// NESTED COMPONENT SPECIFICATION
// ============================================

export interface NestedComponentSpec {
  /**
   * Component type being nested (e.g., "Button", "Icon")
   */
  component: string;
  
  /**
   * Slot within parent where this is nested
   */
  parentSlot: string;
  
  /**
   * Default variant for the nested component
   */
  defaultVariant?: string;
  
  /**
   * Default size for the nested component
   */
  defaultSize?: string;
  
  /**
   * Token overrides specific to this nesting context
   */
  tokenOverrides?: Record<string, TokenReference>;
  
  /**
   * Whether this nested component is optional
   */
  optional?: boolean;
}

// ============================================
// SLOT SPECIFICATION WITHIN COMPONENT
// ============================================

export interface ComponentSlotSpec {
  /**
   * Slot identifier (e.g., "root", "icon", "label")
   */
  id: string;
  
  /**
   * Display name for UI
   */
  name: string;
  
  /**
   * Description of what this slot represents
   */
  description?: string;
  
  /**
   * Default slot preset to use
   */
  defaultPreset?: string;
  
  /**
   * HTML element or component type
   */
  element?: string;
  
  /**
   * Whether this slot is the main/root slot
   */
  isRoot?: boolean;
  
  /**
   * Parent slot (for nested structures)
   */
  parent?: string;
}

// ============================================
// FIGMA PROPERTY MAPPING
// ============================================

export type FigmaPropertyType = 
  | "BOOLEAN"
  | "INSTANCE_SWAP"
  | "TEXT"
  | "VARIANT";

export interface FigmaPropertyMapping {
  /**
   * Code property name
   */
  codeProperty: string;
  
  /**
   * Figma property type
   */
  figmaPropertyType: FigmaPropertyType;
  
  /**
   * Figma property name in the component
   */
  figmaPropertyName: string;
  
  /**
   * Value mapping from code to Figma (for enums/variants)
   */
  valueMapping?: Record<string, string>;
  
  /**
   * Default value in Figma
   */
  defaultValue?: string | boolean;
}

// ============================================
// RESPONSIVE CONFIGURATION
// ============================================

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ResponsiveTokenOverride {
  breakpoint: Breakpoint;
  property: string;
  token: TokenReference;
}

// ============================================
// COMPOSITION RULES
// ============================================

export interface CompositionRule {
  /**
   * Rule type
   */
  type: "required" | "forbidden" | "recommended";
  
  /**
   * Description of the rule
   */
  description: string;
  
  /**
   * Components or slots involved
   */
  targets: string[];
  
  /**
   * Condition for the rule
   */
  condition?: string;
}

// ============================================
// MAIN COMPONENT SPECIFICATION
// ============================================

export interface ComponentSpec {
  /**
   * Component name (e.g., "Button", "Card", "Dialog")
   */
  name: string;
  
  /**
   * Component category for organization
   */
  category: ComponentCategory;
  
  /**
   * Description for documentation
   */
  description?: string;
  
  /**
   * Components this component depends on
   */
  dependencies: string[];
  
  /**
   * Slots within this component
   */
  slots: ComponentSlotSpec[];
  
  /**
   * Available variants
   */
  variants: VariantSpec[];
  
  /**
   * Available sizes
   */
  sizes: SizeSpec[];
  
  /**
   * All tokenable properties
   */
  tokenableProperties: TokenablePropertySpec[];
  
  /**
   * Nested component configurations
   */
  nestedComponents?: Record<string, NestedComponentSpec>;
  
  /**
   * Interaction state specification
   */
  stateSpec?: InteractionStateSpec;
  
  /**
   * Motion tokens for animations
   */
  motionTokens?: ComponentMotionTokens;
  
  /**
   * Figma property mappings
   */
  figmaMapping?: FigmaPropertyMapping[];
  
  /**
   * Responsive token overrides
   */
  responsiveOverrides?: ResponsiveTokenOverride[];
  
  /**
   * Composition rules and constraints
   */
  compositionRules?: CompositionRule[];
  
  /**
   * Default slot tokens (component-level defaults)
   */
  defaultTokens?: Record<string, SlotTokens>;
  
  /**
   * Whether this is a system component (non-editable structure)
   */
  isSystem?: boolean;
  
  /**
   * Tags for search and categorization
   */
  tags?: string[];
  
  /**
   * Version for tracking changes
   */
  version?: string;
}

// ============================================
// COMPONENT REGISTRY TYPES
// ============================================

export interface ComponentDependency {
  component: string;
  usedIn: string[];  // List of components that use this component
  usedBy: string[];  // List of components this component uses
}

export interface ComponentRegistry {
  components: Record<string, ComponentSpec>;
  dependencies: Record<string, ComponentDependency>;
  categories: Record<ComponentCategory, string[]>;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getComponentsByCategory(
  registry: ComponentRegistry,
  category: ComponentCategory
): ComponentSpec[] {
  const names = registry.categories[category] || [];
  return names.map(name => registry.components[name]).filter(Boolean);
}

export function getComponentDependents(
  registry: ComponentRegistry,
  componentName: string
): string[] {
  return registry.dependencies[componentName]?.usedIn || [];
}

export function getComponentDependencies(
  registry: ComponentRegistry,
  componentName: string
): string[] {
  return registry.dependencies[componentName]?.usedBy || [];
}

export function getSlotById(
  spec: ComponentSpec,
  slotId: string
): ComponentSlotSpec | undefined {
  return spec.slots.find(s => s.id === slotId);
}

export function getPropertiesForSlot(
  spec: ComponentSpec,
  slotId: string
): TokenablePropertySpec[] {
  return spec.tokenableProperties.filter(p => p.slot === slotId);
}

export function getPropertiesForState(
  spec: ComponentSpec,
  state: InteractionState
): TokenablePropertySpec[] {
  return spec.tokenableProperties.filter(
    p => !p.states || p.states.includes(state)
  );
}

export function getVariantByValue(
  spec: ComponentSpec,
  value: string
): VariantSpec | undefined {
  return spec.variants.find(v => v.value === value);
}

export function getSizeByValue(
  spec: ComponentSpec,
  value: string
): SizeSpec | undefined {
  return spec.sizes.find(s => s.value === value);
}

// ============================================
// VALIDATION
// ============================================

export interface ComponentSpecValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateComponentSpec(
  spec: ComponentSpec
): ComponentSpecValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!spec.name) errors.push("Component name is required");
  if (!spec.category) errors.push("Component category is required");
  if (!spec.slots || spec.slots.length === 0) errors.push("At least one slot is required");
  
  // Check for root slot
  const hasRoot = spec.slots.some(s => s.isRoot);
  if (!hasRoot) warnings.push("No root slot defined");
  
  // Check for orphan properties
  for (const prop of spec.tokenableProperties) {
    const slotExists = spec.slots.some(s => s.id === prop.slot);
    if (!slotExists) {
      errors.push(`Property "${prop.name}" references non-existent slot "${prop.slot}"`);
    }
  }
  
  // Check nested component references
  if (spec.nestedComponents) {
    for (const [key, nested] of Object.entries(spec.nestedComponents)) {
      const slotExists = spec.slots.some(s => s.id === nested.parentSlot);
      if (!slotExists) {
        errors.push(`Nested component "${key}" references non-existent slot "${nested.parentSlot}"`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
