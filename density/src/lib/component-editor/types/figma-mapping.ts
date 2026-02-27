/**
 * FIGMA MAPPING TYPES
 * 
 * Defines the mapping between code components and Figma components
 * for bidirectional synchronization and Code Connect generation.
 */

import type { ComponentSpec, FigmaPropertyMapping, FigmaPropertyType } from "./component-spec";

// ============================================
// FIGMA VARIABLE TYPES
// ============================================

export type FigmaVariableType = 
  | "COLOR"
  | "FLOAT"
  | "STRING"
  | "BOOLEAN";

export type FigmaVariableScope =
  | "ALL_SCOPES"
  | "TEXT_CONTENT"
  | "CORNER_RADIUS"
  | "WIDTH_HEIGHT"
  | "GAP"
  | "STROKE_FLOAT"
  | "OPACITY"
  | "EFFECT_FLOAT"
  | "FONT_FAMILY"
  | "FONT_STYLE"
  | "FONT_WEIGHT"
  | "FONT_SIZE"
  | "LINE_HEIGHT"
  | "LETTER_SPACING"
  | "PARAGRAPH_SPACING"
  | "PARAGRAPH_INDENT"
  | "ALL_FILLS"
  | "FRAME_FILL"
  | "SHAPE_FILL"
  | "TEXT_FILL"
  | "STROKE_COLOR"
  | "EFFECT_COLOR";

// ============================================
// FIGMA VARIABLE DEFINITIONS
// ============================================

export interface FigmaVariableDefinition {
  /**
   * Variable name in Figma
   */
  name: string;
  
  /**
   * Variable type
   */
  type: FigmaVariableType;
  
  /**
   * Scopes where this variable can be used
   */
  scopes: FigmaVariableScope[];
  
  /**
   * Description for documentation
   */
  description?: string;
  
  /**
   * Values per mode (light/dark)
   */
  valuesByMode: Record<string, string | number | boolean>;
  
  /**
   * Code token path this maps to
   */
  codeTokenPath: string;
}

// ============================================
// FIGMA COLLECTION STRUCTURE
// ============================================

export interface FigmaVariableCollection {
  /**
   * Collection name
   */
  name: string;
  
  /**
   * Available modes in this collection
   */
  modes: string[];
  
  /**
   * Variable groups
   */
  groups: FigmaVariableGroup[];
}

export interface FigmaVariableGroup {
  /**
   * Group name (e.g., "button", "card")
   */
  name: string;
  
  /**
   * Variables in this group
   */
  variables: FigmaVariableDefinition[];
  
  /**
   * Nested groups
   */
  children?: FigmaVariableGroup[];
}

// ============================================
// AUTO-LAYOUT MAPPING
// ============================================

export interface FigmaAutoLayoutMapping {
  /**
   * CSS property name
   */
  cssProperty: string;
  
  /**
   * Figma auto-layout property
   */
  figmaProperty: FigmaAutoLayoutProperty;
  
  /**
   * Token path for the value
   */
  tokenPath: string;
}

export type FigmaAutoLayoutProperty =
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingBottom"
  | "itemSpacing"       // gap between items
  | "counterAxisSpacing" // gap for wrapped layouts
  | "primaryAxisAlignItems"
  | "counterAxisAlignItems"
  | "layoutMode"        // "HORIZONTAL" | "VERTICAL"
  | "layoutWrap"        // "NO_WRAP" | "WRAP"
  | "primaryAxisSizingMode"
  | "counterAxisSizingMode";

export const cssToFigmaAutoLayout: Record<string, FigmaAutoLayoutProperty> = {
  "padding-left": "paddingLeft",
  "padding-right": "paddingRight",
  "padding-top": "paddingTop",
  "padding-bottom": "paddingBottom",
  "padding-inline-start": "paddingLeft",
  "padding-inline-end": "paddingRight",
  "padding-block-start": "paddingTop",
  "padding-block-end": "paddingBottom",
  "gap": "itemSpacing",
  "row-gap": "counterAxisSpacing",
  "column-gap": "itemSpacing",
};

// ============================================
// CODE CONNECT GENERATION
// ============================================

export interface CodeConnectConfig {
  /**
   * Component import path
   */
  importPath: string;
  
  /**
   * Component name
   */
  componentName: string;
  
  /**
   * Figma node URL or key
   */
  figmaNode: string;
  
  /**
   * Property mappings
   */
  props: FigmaPropertyMapping[];
  
  /**
   * Example code template
   */
  example: string;
  
  /**
   * Variant-specific examples
   */
  variantExamples?: Record<string, string>;
}

// ============================================
// FIGMA SYNC STATE
// ============================================

export interface FigmaSyncState {
  /**
   * Last sync timestamp
   */
  lastSyncAt?: string;
  
  /**
   * Pending changes to push to Figma
   */
  pendingPush: FigmaVariableChange[];
  
  /**
   * Pending changes from Figma
   */
  pendingPull: FigmaVariableChange[];
  
  /**
   * Sync status
   */
  status: "idle" | "syncing" | "error";
  
  /**
   * Error message if any
   */
  error?: string;
}

export interface FigmaVariableChange {
  /**
   * Variable path
   */
  path: string;
  
  /**
   * Change type
   */
  type: "create" | "update" | "delete";
  
  /**
   * Old value (for updates)
   */
  oldValue?: string | number | boolean;
  
  /**
   * New value
   */
  newValue?: string | number | boolean;
  
  /**
   * Mode affected
   */
  mode?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Generate Code Connect config from component spec
 */
export function generateCodeConnectConfig(
  spec: ComponentSpec,
  importPath: string,
  figmaNode: string
): CodeConnectConfig {
  const props: FigmaPropertyMapping[] = [];
  
  // Add variant prop if component has variants
  if (spec.variants.length > 0) {
    props.push({
      codeProperty: "variant",
      figmaPropertyType: "VARIANT",
      figmaPropertyName: "Variant",
      valueMapping: Object.fromEntries(
        spec.variants.map(v => [v.value, v.label])
      ),
    });
  }
  
  // Add size prop if component has sizes
  if (spec.sizes.length > 0) {
    props.push({
      codeProperty: "size",
      figmaPropertyType: "VARIANT",
      figmaPropertyName: "Size",
      valueMapping: Object.fromEntries(
        spec.sizes.map(s => [s.value, s.label])
      ),
    });
  }
  
  // Add any existing figma mappings
  if (spec.figmaMapping) {
    props.push(...spec.figmaMapping);
  }
  
  // Generate example code
  const example = `<${spec.name} variant="default" size="default">Label</${spec.name}>`;
  
  return {
    importPath,
    componentName: spec.name,
    figmaNode,
    props,
    example,
  };
}

/**
 * Convert component tokens to Figma variable collection
 */
export function generateFigmaVariableCollection(
  spec: ComponentSpec,
  modes: string[] = ["Light", "Dark"]
): FigmaVariableCollection {
  const groups: FigmaVariableGroup[] = [];
  
  // Group by variant
  for (const variant of spec.variants) {
    const variantGroup: FigmaVariableGroup = {
      name: variant.value,
      variables: [],
    };
    
    // Add color properties
    const colorProps = spec.tokenableProperties.filter(
      p => p.category === "color" && (!p.variants || p.variants.includes(variant.value))
    );
    
    for (const prop of colorProps) {
      variantGroup.variables.push({
        name: prop.name,
        type: "COLOR",
        scopes: ["ALL_FILLS", "STROKE_COLOR"],
        codeTokenPath: `${spec.name.toLowerCase()}.${variant.value}.${prop.name}`,
        valuesByMode: Object.fromEntries(
          modes.map(mode => [mode, resolveTokenForMode(prop.defaultToken, mode)])
        ),
      });
    }
    
    groups.push(variantGroup);
  }
  
  return {
    name: spec.name,
    modes,
    groups,
  };
}

/**
 * Resolve token value for a specific mode
 */
function resolveTokenForMode(
  token: { type: string; path?: string; value?: string },
  mode: string
): string {
  // This would need to be expanded to actually resolve the token
  // For now, return a placeholder
  if (token.type === "literal" && token.value) {
    return token.value;
  }
  return `{${token.path || "unknown"}}`;
}

/**
 * Get Figma variable type from token category
 */
export function getFigmaVariableType(category: string): FigmaVariableType {
  switch (category) {
    case "color":
      return "COLOR";
    case "spacing":
    case "radius":
    case "border":
    case "typography":
      return "FLOAT";
    case "opacity":
      return "FLOAT";
    default:
      return "STRING";
  }
}

/**
 * Get Figma scopes for a token category
 */
export function getFigmaScopes(category: string): FigmaVariableScope[] {
  switch (category) {
    case "color":
      return ["ALL_FILLS", "STROKE_COLOR", "EFFECT_COLOR"];
    case "spacing":
      return ["WIDTH_HEIGHT", "GAP"];
    case "radius":
      return ["CORNER_RADIUS"];
    case "border":
      return ["STROKE_FLOAT"];
    case "typography":
      return ["FONT_SIZE", "LINE_HEIGHT", "LETTER_SPACING"];
    case "opacity":
      return ["OPACITY"];
    default:
      return ["ALL_SCOPES"];
  }
}
