/**
 * TOKEN REFERENCE SYSTEM
 * 
 * Defines how tokens are referenced throughout the component editor.
 * Supports system tokens, custom user tokens, and literal escape hatches.
 */

// ============================================
// W3C DTCG TYPE DEFINITIONS
// ============================================

export type DTCGType =
  | "color"
  | "dimension"
  | "fontFamily"
  | "fontWeight"
  | "duration"
  | "cubicBezier"
  | "number"
  | "strokeStyle"
  | "border"
  | "transition"
  | "shadow"
  | "gradient"
  | "typography"
  | "fontStyle";

// ============================================
// TOKEN CATEGORIES
// ============================================

export type TokenCategory =
  | "color"
  | "spacing"
  | "typography"
  | "radius"
  | "border"
  | "shadow"
  | "motion"
  | "opacity"
  | "zIndex";

// ============================================
// TOKEN REFERENCE TYPES
// ============================================

/**
 * Reference to an existing system token
 */
export interface SystemTokenReference {
  type: "system";
  path: string; // e.g., "colors.primary", "spacing.inset-md"
}

/**
 * Reference to a user-defined custom token
 */
export interface CustomTokenReference {
  type: "custom";
  id: string; // Unique identifier for the custom token
}

/**
 * Literal value (escape hatch for edge cases)
 */
export interface LiteralTokenReference {
  type: "literal";
  value: string; // Raw CSS value
}

/**
 * Alias to another token (for token-to-token references)
 */
export interface AliasTokenReference {
  type: "alias";
  ref: string; // Reference path to another token
}

/**
 * Union type for all token reference types
 */
export type TokenReference =
  | SystemTokenReference
  | CustomTokenReference
  | LiteralTokenReference
  | AliasTokenReference;

// ============================================
// TOKEN VALUE TYPES
// ============================================

export interface ColorValue {
  $type: "color";
  $value: string; // OKLCH, HSL, or hex
}

export interface DimensionValue {
  $type: "dimension";
  $value: string; // e.g., "16px", "1rem"
}

export interface DurationValue {
  $type: "duration";
  $value: string; // e.g., "200ms"
}

export interface CubicBezierValue {
  $type: "cubicBezier";
  $value: [number, number, number, number];
}

export interface NumberValue {
  $type: "number";
  $value: number;
}

export interface FontFamilyValue {
  $type: "fontFamily";
  $value: string | string[];
}

export interface FontWeightValue {
  $type: "fontWeight";
  $value: number | string;
}

export interface ShadowValue {
  $type: "shadow";
  $value: {
    offsetX: string;
    offsetY: string;
    blur: string;
    spread: string;
    color: string;
    inset?: boolean;
  } | Array<{
    offsetX: string;
    offsetY: string;
    blur: string;
    spread: string;
    color: string;
    inset?: boolean;
  }>;
}

export interface BorderValue {
  $type: "border";
  $value: {
    width: string;
    style: string;
    color: string;
  };
}

export interface TypographyValue {
  $type: "typography";
  $value: {
    fontFamily: string | string[];
    fontSize: string;
    fontWeight: number | string;
    lineHeight: string | number;
    letterSpacing?: string;
  };
}

export type TokenValue =
  | ColorValue
  | DimensionValue
  | DurationValue
  | CubicBezierValue
  | NumberValue
  | FontFamilyValue
  | FontWeightValue
  | ShadowValue
  | BorderValue
  | TypographyValue;

// ============================================
// CUSTOM TOKEN DEFINITION
// ============================================

export interface ComponentUsage {
  componentName: string;
  slot: string;
  property: string;
  variant?: string;
  state?: string;
}

export interface CustomToken {
  id: string;
  name: string;
  description?: string;
  category: TokenCategory;
  $type: DTCGType;
  $value: string | number | object;
  $description?: string;
  createdBy: "user" | "system";
  createdAt: string; // ISO timestamp
  updatedAt: string;
  usedBy: ComponentUsage[];
  tags?: string[];
}

// ============================================
// TOKEN RESOLUTION CONTEXT
// ============================================

export interface TokenResolutionContext {
  theme: "light" | "dark";
  density: "compact" | "default" | "spacious";
  colorPreset: string;
  neutralScale: string;
  breakpoint?: "sm" | "md" | "lg" | "xl" | "2xl";
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function isSystemToken(ref: TokenReference): ref is SystemTokenReference {
  return ref.type === "system";
}

export function isCustomToken(ref: TokenReference): ref is CustomTokenReference {
  return ref.type === "custom";
}

export function isLiteralToken(ref: TokenReference): ref is LiteralTokenReference {
  return ref.type === "literal";
}

export function isAliasToken(ref: TokenReference): ref is AliasTokenReference {
  return ref.type === "alias";
}

export function createSystemRef(path: string): SystemTokenReference {
  return { type: "system", path };
}

export function createCustomRef(id: string): CustomTokenReference {
  return { type: "custom", id };
}

export function createLiteralRef(value: string): LiteralTokenReference {
  return { type: "literal", value };
}

export function createAliasRef(ref: string): AliasTokenReference {
  return { type: "alias", ref };
}
