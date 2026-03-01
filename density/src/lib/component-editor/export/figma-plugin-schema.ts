/**
 * FIGMA PLUGIN EXPORT SCHEMA
 *
 * Defines the JSON schema that DS-Bridge Figma Plugin will consume.
 * This schema enables creating:
 * - Variable Collections with modes (Density, Colors, etc.)
 * - Components with variants (Button, Input, etc.)
 * - Text Styles (typography)
 * - Effect Styles (shadows, blurs)
 */

// ============================================
// MAIN EXPORT INTERFACE
// ============================================

export interface FigmaPluginExport {
  /** Schema version for compatibility checking */
  version: "1.0.0";

  /** ISO timestamp of export */
  exportedAt: string;

  /** Source identifier */
  source: "rivers-ds";

  /** Variable Collections (become Figma Variables) */
  variableCollections: FigmaPluginVariableCollection[];

  /** Component Definitions (become Figma ComponentSets) */
  components: FigmaPluginComponent[];

  /** Text Styles (become Figma Text Styles) */
  textStyles?: FigmaPluginTextStyle[];

  /** Effect Styles (shadows, blurs - become Figma Effect Styles) */
  effectStyles?: FigmaPluginEffectStyle[];

  /** Code Connect mappings for Dev Mode */
  codeConnect?: FigmaPluginCodeConnect[];
}

// ============================================
// VARIABLE COLLECTIONS
// ============================================

export interface FigmaPluginVariableCollection {
  /** Stable identifier for deduplication (e.g., "rivers-ds-density"). Plugin must update in place when id matches. */
  id: string;

  /** Collection name (e.g., "Density", "Colors", "Spacing") */
  name: string;

  /** Mode names (e.g., ["Compact", "Default", "Spacious"] or ["Light", "Dark"]) */
  modes: string[];

  /** Variables within this collection */
  variables: FigmaPluginVariable[];
}

/**
 * Complete list of Figma variable scopes
 * FLOAT: CORNER_RADIUS, WIDTH_HEIGHT, GAP, OPACITY, STROKE_FLOAT, EFFECT_FLOAT,
 *        FONT_SIZE, LINE_HEIGHT, LETTER_SPACING, PARAGRAPH_SPACING, FONT_WEIGHT
 * COLOR: ALL_FILLS, FRAME_FILL, SHAPE_FILL, TEXT_FILL, STROKE_COLOR, EFFECT_COLOR
 * STRING: TEXT_CONTENT, FONT_FAMILY, FONT_STYLE
 * BOOLEAN: (no specific scopes)
 */
export type FigmaVariableScope =
  | "ALL_SCOPES"
  | "TEXT_CONTENT"
  | "CORNER_RADIUS"
  | "WIDTH_HEIGHT"
  | "GAP"
  | "ALL_FILLS"
  | "FRAME_FILL"
  | "SHAPE_FILL"
  | "TEXT_FILL"
  | "STROKE_COLOR"
  | "EFFECT_COLOR"
  | "STROKE_FLOAT"
  | "EFFECT_FLOAT"
  | "OPACITY"
  | "FONT_FAMILY"
  | "FONT_STYLE"
  | "FONT_WEIGHT"
  | "FONT_SIZE"
  | "LINE_HEIGHT"
  | "LETTER_SPACING"
  | "PARAGRAPH_SPACING"
  | "PARAGRAPH_INDENT";

export type FigmaVariableType = "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";

export interface FigmaPluginVariable {
  /** Stable identifier for deduplication (e.g., "rivers-ds-density/control-height"). Plugin must update in place when id matches. */
  id: string;

  /** Variable name (e.g., "control-height" or "colors/primary") */
  name: string;

  /** Variable type */
  type: FigmaVariableType;

  /** Human-readable description */
  description?: string;

  /** Values for each mode (mode name -> value) */
  valuesByMode: Record<string, string | number | boolean>;

  /** Scopes that restrict where this variable appears in Figma UI */
  scopes: FigmaVariableScope[];

  /** Reference path in code (CSS variable name) */
  codePath: string;
}

// ============================================
// COMPONENTS
// ============================================

export interface FigmaPluginComponent {
  /** Component name (e.g., "Button") */
  name: string;

  /** Human-readable description */
  description?: string;

  /** Variant property definitions (e.g., { Variant: ["Primary", "Secondary"], Size: ["SM", "MD", "LG"] }) */
  variantProperties: Record<string, string[]>;

  /** Exposed component properties (boolean toggles, text overrides, instance swaps) */
  componentProperties?: FigmaPluginComponentProperty[];

  /** All variant combinations to create */
  variants: FigmaPluginComponentVariant[];

  /** Slots define the visual structure */
  slots: FigmaPluginSlot[];
}

export type FigmaComponentPropertyType = "BOOLEAN" | "TEXT" | "INSTANCE_SWAP";

export interface FigmaPluginComponentProperty {
  /** Property name (e.g., "Show Icon", "Label", "Icon") */
  name: string;

  /** Property type */
  type: FigmaComponentPropertyType;

  /** Default value */
  defaultValue: boolean | string;

  /** For INSTANCE_SWAP: preferred component names to swap to */
  preferredValues?: string[];
}

export interface FigmaPluginComponentVariant {
  /** Variant name (e.g., "Variant=Primary, Size=MD") */
  name: string;

  /** Property values for this variant */
  properties: Record<string, string>;

  /** Token bindings (CSS property -> variable path) */
  tokenBindings: Record<string, string>;
}

// ============================================
// SLOTS (Component Structure)
// ============================================

export type FigmaSlotType = "FRAME" | "TEXT" | "RECTANGLE" | "ELLIPSE" | "VECTOR";

export type FigmaLayoutMode = "HORIZONTAL" | "VERTICAL" | "NONE";

export type FigmaSizingMode = "FIXED" | "AUTO" | "FILL";

export type FigmaAxisAlign = "MIN" | "MAX" | "CENTER" | "SPACE_BETWEEN" | "BASELINE";

export interface FigmaPluginSlot {
  /** Unique slot identifier */
  id: string;

  /** Node type in Figma */
  type: FigmaSlotType;

  /** Display name */
  name: string;

  /** Whether this is the root slot */
  isRoot?: boolean;

  /** Parent slot ID for hierarchy */
  parent?: string;

  /** Ordered list of child slot IDs */
  children?: string[];

  /** Auto-layout direction */
  layoutMode?: FigmaLayoutMode;

  /** Primary axis sizing */
  primaryAxisSizing?: FigmaSizingMode;

  /** Counter axis sizing */
  counterAxisSizing?: FigmaSizingMode;

  /** Primary axis alignment */
  primaryAxisAlignItems?: FigmaAxisAlign;

  /** Counter axis alignment */
  counterAxisAlignItems?: FigmaAxisAlign;

  /**
   * Variable bindings (variable codePath -> Figma property)
   *
   * Bindable FLOAT fields:
   * - height, width, minWidth, maxWidth, minHeight, maxHeight
   * - itemSpacing, counterAxisSpacing
   * - paddingLeft, paddingRight, paddingTop, paddingBottom
   * - topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius
   * - strokeWeight, strokeTopWeight, strokeRightWeight, strokeBottomWeight, strokeLeftWeight
   * - opacity
   *
   * Bindable via setBoundVariableForPaint:
   * - fill (color variable for fills)
   * - stroke (color variable for strokes)
   * - textFill (color variable for text)
   */
  variableBindings: Record<string, string>;

  /** Default values when no variable is bound */
  defaults: Record<string, unknown>;
}

// ============================================
// TEXT STYLES
// ============================================

export type FigmaTextCase = "ORIGINAL" | "UPPER" | "LOWER" | "TITLE";

export type FigmaTextDecoration = "NONE" | "UNDERLINE" | "STRIKETHROUGH";

export interface FigmaPluginTextStyle {
  /** Style name with hierarchy (e.g., "Heading/H1", "Body/Default") */
  name: string;

  /** Font family name */
  fontFamily: string;

  /** Font style (e.g., "Regular", "Medium", "Bold") */
  fontStyle: string;

  /** Font size in pixels */
  fontSize: number;

  /** Line height in pixels or "AUTO" */
  lineHeight: number | "AUTO";

  /** Letter spacing in pixels */
  letterSpacing: number;

  /** Text transformation */
  textCase?: FigmaTextCase;

  /** Text decoration */
  textDecoration?: FigmaTextDecoration;

  /** Paragraph spacing in pixels */
  paragraphSpacing?: number;

  /** Paragraph indent in pixels */
  paragraphIndent?: number;
}

// ============================================
// EFFECT STYLES
// ============================================

export type FigmaEffectType =
  | "DROP_SHADOW"
  | "INNER_SHADOW"
  | "LAYER_BLUR"
  | "BACKGROUND_BLUR";

export interface FigmaPluginEffect {
  /** Effect type */
  type: FigmaEffectType;

  /** Color (for shadows) - RGBA with values 0-1 */
  color?: { r: number; g: number; b: number; a: number };

  /** Offset (for shadows) */
  offset?: { x: number; y: number };

  /** Blur radius */
  radius: number;

  /** Spread (for shadows) */
  spread?: number;

  /** Whether the effect is visible */
  visible: boolean;
}

export interface FigmaPluginEffectStyle {
  /** Style name with hierarchy (e.g., "Shadow/SM", "Shadow/MD") */
  name: string;

  /** Array of effects (can have multiple per style) */
  effects: FigmaPluginEffect[];
}

// ============================================
// CODE CONNECT
// ============================================

export interface FigmaPluginCodeConnect {
  /** Component name in Figma */
  componentName: string;

  /** Import path in code */
  importPath: string;

  /** Component export name */
  exportName?: string;

  /** Property mappings between Figma and code */
  props: FigmaPluginCodeConnectProp[];
}

export interface FigmaPluginCodeConnectProp {
  /** Figma property name */
  figmaProperty: string;

  /** Code prop name */
  codeProp: string;

  /** Value mappings (Figma value -> code value) */
  valueMapping?: Record<string, string | boolean | number>;
}

// ============================================
// HELPER TYPES
// ============================================

/** Color value in various formats */
export type ColorValue =
  | string // hex "#RRGGBB" or "#RRGGBBAA"
  | { r: number; g: number; b: number; a?: number }; // RGB 0-1

/** Spacing value that can be a number or variable reference */
export type SpacingValue = number | string;

// ============================================
// VALIDATION HELPERS
// ============================================

export function isValidFigmaPluginExport(data: unknown): data is FigmaPluginExport {
  if (!data || typeof data !== "object") return false;
  const obj = data as Record<string, unknown>;

  return (
    obj.version === "1.0.0" &&
    typeof obj.exportedAt === "string" &&
    obj.source === "rivers-ds" &&
    Array.isArray(obj.variableCollections) &&
    Array.isArray(obj.components)
  );
}

export function validateFigmaPluginExport(
  data: FigmaPluginExport
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (data.version !== "1.0.0") {
    errors.push(`Unsupported version: ${data.version}`);
  }

  if (!data.variableCollections || data.variableCollections.length === 0) {
    errors.push("At least one variable collection is required");
  }

  const collectionIds = new Set<string>();
  for (const collection of data.variableCollections) {
    if (!collection.id) {
      errors.push("Variable collection id is required");
    } else if (collectionIds.has(collection.id)) {
      errors.push(`Duplicate collection id: "${collection.id}"`);
    } else {
      collectionIds.add(collection.id);
    }
    if (!collection.name) {
      errors.push("Variable collection name is required");
    }
    if (!collection.modes || collection.modes.length === 0) {
      errors.push(`Collection "${collection.name}" must have at least one mode`);
    }
    const variableIds = new Set<string>();
    for (const variable of collection.variables) {
      if (!variable.id) {
        errors.push("Variable id is required");
      } else if (variableIds.has(variable.id)) {
        errors.push(`Duplicate variable id in "${collection.name}": "${variable.id}"`);
      } else {
        variableIds.add(variable.id);
      }
      if (!variable.name) {
        errors.push("Variable name is required");
      }
      if (!variable.type) {
        errors.push(`Variable "${variable.name}" must have a type`);
      }
      const modeCount = Object.keys(variable.valuesByMode).length;
      if (modeCount !== collection.modes.length) {
        errors.push(
          `Variable "${variable.name}" has ${modeCount} mode values but collection has ${collection.modes.length} modes`
        );
      }
    }
  }

  for (const component of data.components) {
    if (!component.name) {
      errors.push("Component name is required");
    }
    if (!component.slots || component.slots.length === 0) {
      errors.push(`Component "${component.name}" must have at least one slot`);
    }
    const rootSlots = component.slots.filter((s) => s.isRoot);
    if (rootSlots.length === 0) {
      errors.push(`Component "${component.name}" must have a root slot`);
    }
    if (rootSlots.length > 1) {
      errors.push(`Component "${component.name}" has multiple root slots`);
    }
  }

  return { valid: errors.length === 0, errors };
}
