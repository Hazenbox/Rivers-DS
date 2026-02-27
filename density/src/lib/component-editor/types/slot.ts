/**
 * SLOT DEFINITIONS
 * 
 * Slots are reusable token bundles that can be applied across multiple components.
 * They follow an inheritance chain for maximum reusability.
 */

import type { TokenReference, TokenCategory } from "./token-reference";
import type { InteractionState } from "./interaction-states";

// ============================================
// SLOT TOKEN STRUCTURE
// ============================================

/**
 * Color tokens for a slot
 */
export interface SlotColorTokens {
  background?: TokenReference;
  foreground?: TokenReference;
  border?: TokenReference;
  placeholder?: TokenReference;
  ring?: TokenReference;
  shadow?: TokenReference;
}

/**
 * Spacing tokens for a slot
 */
export interface SlotSpacingTokens {
  paddingX?: TokenReference;
  paddingY?: TokenReference;
  paddingTop?: TokenReference;
  paddingRight?: TokenReference;
  paddingBottom?: TokenReference;
  paddingLeft?: TokenReference;
  gap?: TokenReference;
  margin?: TokenReference;
}

/**
 * Typography tokens for a slot
 */
export interface SlotTypographyTokens {
  fontFamily?: TokenReference;
  fontSize?: TokenReference;
  fontWeight?: TokenReference;
  lineHeight?: TokenReference;
  letterSpacing?: TokenReference;
  textTransform?: TokenReference;
}

/**
 * Border tokens for a slot
 */
export interface SlotBorderTokens {
  borderWidth?: TokenReference;
  borderStyle?: TokenReference;
  borderRadius?: TokenReference;
}

/**
 * Sizing tokens for a slot
 */
export interface SlotSizingTokens {
  width?: TokenReference;
  minWidth?: TokenReference;
  maxWidth?: TokenReference;
  height?: TokenReference;
  minHeight?: TokenReference;
  maxHeight?: TokenReference;
}

/**
 * Complete token set for a slot
 */
export interface SlotTokens {
  colors?: SlotColorTokens;
  spacing?: SlotSpacingTokens;
  typography?: SlotTypographyTokens;
  border?: SlotBorderTokens;
  sizing?: SlotSizingTokens;
}

/**
 * State-specific token overrides
 */
export type SlotStateTokens = Partial<SlotTokens>;

// ============================================
// SLOT DEFINITION
// ============================================

export type SlotCategory =
  | "action"      // Buttons, links, interactive elements
  | "surface"     // Cards, dialogs, containers
  | "input"       // Form inputs
  | "feedback"    // Alerts, toasts, notifications
  | "overlay"     // Backdrops, scrims
  | "navigation"  // Nav items, breadcrumbs
  | "content";    // Text, headings, labels

export interface SlotDefinition {
  id: string;
  name: string;
  description?: string;
  category: SlotCategory;
  
  /**
   * Parent slot to inherit from
   */
  extends?: string;
  
  /**
   * Base tokens (default state)
   */
  tokens: SlotTokens;
  
  /**
   * State-specific token overrides
   */
  states?: Partial<Record<InteractionState, SlotStateTokens>>;
  
  /**
   * Components that can use this slot
   */
  applicableTo?: string[];
  
  /**
   * Whether this slot is a system slot (non-editable) or user-created
   */
  isSystem: boolean;
  
  /**
   * Tags for categorization and search
   */
  tags?: string[];
}

// ============================================
// SLOT ASSIGNMENT
// ============================================

export interface SlotAssignment {
  slotId: string;
  componentName: string;
  componentSlot: string; // e.g., "root", "icon", "label"
  variant?: string;
  size?: string;
  overrides?: SlotTokens; // Component-specific overrides
}

// ============================================
// SLOT INHERITANCE RESOLUTION
// ============================================

export interface ResolvedSlot {
  definition: SlotDefinition;
  inheritanceChain: string[]; // e.g., ["surface-base", "surface-card", "surface-dialog"]
  resolvedTokens: SlotTokens;
  resolvedStates: Partial<Record<InteractionState, SlotStateTokens>>;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Merge slot tokens with inheritance
 */
export function mergeSlotTokens(
  base: SlotTokens | undefined,
  override: SlotTokens | undefined
): SlotTokens {
  if (!base) return override || {};
  if (!override) return base;

  return {
    colors: { ...base.colors, ...override.colors },
    spacing: { ...base.spacing, ...override.spacing },
    typography: { ...base.typography, ...override.typography },
    border: { ...base.border, ...override.border },
    sizing: { ...base.sizing, ...override.sizing },
  };
}

/**
 * Get all token references from a slot
 */
export function getAllTokenReferences(slot: SlotTokens): TokenReference[] {
  const refs: TokenReference[] = [];

  const collectFromObject = (obj: Record<string, unknown> | undefined) => {
    if (!obj) return;
    for (const value of Object.values(obj)) {
      if (value && typeof value === "object" && "type" in value) {
        refs.push(value as TokenReference);
      }
    }
  };

  collectFromObject(slot.colors as Record<string, unknown>);
  collectFromObject(slot.spacing as Record<string, unknown>);
  collectFromObject(slot.typography as Record<string, unknown>);
  collectFromObject(slot.border as Record<string, unknown>);
  collectFromObject(slot.sizing as Record<string, unknown>);

  return refs;
}

/**
 * Check if a slot uses a specific token
 */
export function slotUsesToken(
  slot: SlotTokens,
  tokenPath: string
): boolean {
  const refs = getAllTokenReferences(slot);
  return refs.some(ref => {
    if (ref.type === "system") return ref.path === tokenPath;
    if (ref.type === "custom") return ref.id === tokenPath;
    return false;
  });
}

/**
 * Get the category of a token property
 */
export function getPropertyCategory(property: string): TokenCategory {
  const colorProps = ["background", "foreground", "border", "placeholder", "ring", "shadow"];
  const spacingProps = ["paddingX", "paddingY", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "gap", "margin", "width", "height", "minWidth", "maxWidth", "minHeight", "maxHeight"];
  const typographyProps = ["fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", "textTransform"];
  const radiusProps = ["borderRadius"];
  const borderProps = ["borderWidth", "borderStyle"];

  if (colorProps.includes(property)) return "color";
  if (spacingProps.includes(property)) return "spacing";
  if (typographyProps.includes(property)) return "typography";
  if (radiusProps.includes(property)) return "radius";
  if (borderProps.includes(property)) return "border";
  
  return "color"; // Default
}

// ============================================
// SLOT VALIDATION
// ============================================

export interface SlotValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateSlotDefinition(slot: SlotDefinition): SlotValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!slot.id) errors.push("Slot ID is required");
  if (!slot.name) errors.push("Slot name is required");
  if (!slot.category) errors.push("Slot category is required");
  
  if (slot.extends && slot.extends === slot.id) {
    errors.push("Slot cannot extend itself");
  }

  if (!slot.tokens || Object.keys(slot.tokens).length === 0) {
    warnings.push("Slot has no tokens defined");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
