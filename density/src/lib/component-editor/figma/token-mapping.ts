/**
 * TOKEN MAPPING MODULE
 * 
 * Maps between Figma variables and the component editor token system.
 */

import type { CustomToken, TokenCategory, DTCGType } from "../types";
import type { FigmaVariableDef } from "./figma-sync";

// ============================================
// TYPES
// ============================================

export interface DesignTokenMapping {
  figmaName: string;
  tokenName: string;
  tokenCategory: TokenCategory;
  dtcgType: DTCGType;
  figmaType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
  value: string | number | object;
  collection?: string;
  mode?: string;
}

export interface PropertyTypeMapping {
  figmaProperty: string;
  cssProperty: string;
  tokenCategory: TokenCategory;
  transform?: (value: unknown) => string;
}

// ============================================
// FIGMA VARIABLE TYPE MAPPING
// ============================================

/**
 * Infer token category from Figma variable type and name
 */
export function inferTokenCategoryFromFigmaType(
  figmaType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN",
  name: string
): TokenCategory {
  // Check name patterns first
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes("color") || nameLower.includes("fill") || nameLower.includes("stroke")) {
    return "color";
  }
  
  if (nameLower.includes("spacing") || nameLower.includes("gap") || nameLower.includes("padding") || nameLower.includes("margin")) {
    return "spacing";
  }
  
  if (nameLower.includes("radius") || nameLower.includes("corner")) {
    return "radius";
  }
  
  if (nameLower.includes("shadow") || nameLower.includes("elevation")) {
    return "shadow";
  }
  
  if (nameLower.includes("font") || nameLower.includes("text") || nameLower.includes("type")) {
    return "typography";
  }
  
  if (nameLower.includes("border") || nameLower.includes("stroke-width")) {
    return "border";
  }
  
  if (nameLower.includes("duration") || nameLower.includes("ease") || nameLower.includes("animation")) {
    return "motion";
  }
  
  if (nameLower.includes("opacity") || nameLower.includes("alpha")) {
    return "opacity";
  }
  
  if (nameLower.includes("z-index") || nameLower.includes("layer")) {
    return "zIndex";
  }
  
  // Fall back to type-based inference
  switch (figmaType) {
    case "COLOR":
      return "color";
    case "FLOAT":
      return "spacing"; // Most common for numbers
    case "STRING":
      return "typography";
    case "BOOLEAN":
      return "opacity"; // Booleans often map to visibility
    default:
      return "color";
  }
}

/**
 * Infer DTCG type from Figma variable type
 */
export function inferDTCGTypeFromFigmaType(
  figmaType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN",
  category: TokenCategory
): DTCGType {
  if (figmaType === "COLOR") {
    return "color";
  }
  
  switch (category) {
    case "spacing":
    case "radius":
      return "dimension";
    case "typography":
      return "fontFamily";
    case "shadow":
      return "shadow";
    case "border":
      return "border";
    case "motion":
      return "duration";
    case "opacity":
      return "number";
    default:
      return "number";
  }
}

// ============================================
// MAPPING FUNCTIONS
// ============================================

/**
 * Map Figma variables to component editor tokens
 */
export function mapFigmaVariablesToTokens(
  variables: FigmaVariableDef[]
): CustomToken[] {
  const tokens: CustomToken[] = [];
  const now = new Date().toISOString();
  
  for (const variable of variables) {
    const category = inferTokenCategoryFromFigmaType(variable.type, variable.name);
    const dtcgType = inferDTCGTypeFromFigmaType(variable.type, category);
    
    // Convert Figma name to token name
    // e.g., "icon/default/secondary" -> "icon-default-secondary"
    const tokenName = variable.name.replace(/\//g, "-").replace(/\s+/g, "-").toLowerCase();
    
    tokens.push({
      id: `figma-${tokenName}`,
      name: tokenName,
      category,
      $type: dtcgType,
      $value: variable.value,
      $description: variable.description || `Imported from Figma: ${variable.name}`,
      description: variable.description || `Imported from Figma: ${variable.name}`,
      createdBy: "system",
      createdAt: now,
      updatedAt: now,
      usedBy: [],
    });
  }
  
  return tokens;
}

/**
 * Map component editor tokens to Figma variable format
 */
export function mapTokensToFigmaVariables(
  tokens: CustomToken[]
): FigmaVariableDef[] {
  return tokens.map((token) => {
    let figmaType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN" = "STRING";
    
    if (token.category === "color") {
      figmaType = "COLOR";
    } else if (token.category === "spacing" || token.category === "radius" || token.category === "opacity") {
      figmaType = "FLOAT";
    }
    
    // Convert token name to Figma name format
    // e.g., "icon-default-secondary" -> "icon/default/secondary"
    const figmaName = token.name.replace(/-/g, "/");
    
    return {
      name: figmaName,
      value: token.$value,
      type: figmaType,
      description: token.description,
    };
  });
}

// ============================================
// PROPERTY TYPE MAPPINGS
// ============================================

const defaultPropertyTypeMappings: PropertyTypeMapping[] = [
  // Colors
  { figmaProperty: "fills", cssProperty: "background-color", tokenCategory: "color" },
  { figmaProperty: "strokes", cssProperty: "border-color", tokenCategory: "color" },
  { figmaProperty: "effects", cssProperty: "box-shadow", tokenCategory: "shadow" },
  
  // Dimensions
  { figmaProperty: "paddingLeft", cssProperty: "padding-left", tokenCategory: "spacing" },
  { figmaProperty: "paddingRight", cssProperty: "padding-right", tokenCategory: "spacing" },
  { figmaProperty: "paddingTop", cssProperty: "padding-top", tokenCategory: "spacing" },
  { figmaProperty: "paddingBottom", cssProperty: "padding-bottom", tokenCategory: "spacing" },
  { figmaProperty: "itemSpacing", cssProperty: "gap", tokenCategory: "spacing" },
  
  // Border
  { figmaProperty: "cornerRadius", cssProperty: "border-radius", tokenCategory: "radius" },
  { figmaProperty: "topLeftRadius", cssProperty: "border-top-left-radius", tokenCategory: "radius" },
  { figmaProperty: "topRightRadius", cssProperty: "border-top-right-radius", tokenCategory: "radius" },
  { figmaProperty: "bottomLeftRadius", cssProperty: "border-bottom-left-radius", tokenCategory: "radius" },
  { figmaProperty: "bottomRightRadius", cssProperty: "border-bottom-right-radius", tokenCategory: "radius" },
  { figmaProperty: "strokeWeight", cssProperty: "border-width", tokenCategory: "border" },
  
  // Typography
  { figmaProperty: "fontFamily", cssProperty: "font-family", tokenCategory: "typography" },
  { figmaProperty: "fontSize", cssProperty: "font-size", tokenCategory: "typography" },
  { figmaProperty: "fontWeight", cssProperty: "font-weight", tokenCategory: "typography" },
  { figmaProperty: "lineHeight", cssProperty: "line-height", tokenCategory: "typography" },
  { figmaProperty: "letterSpacing", cssProperty: "letter-spacing", tokenCategory: "typography" },
  
  // Other
  { figmaProperty: "opacity", cssProperty: "opacity", tokenCategory: "opacity" },
];

/**
 * Create a property type mapping lookup
 */
export function createPropertyTypeMapping(): Map<string, PropertyTypeMapping> {
  const map = new Map<string, PropertyTypeMapping>();
  
  for (const mapping of defaultPropertyTypeMappings) {
    map.set(mapping.figmaProperty, mapping);
  }
  
  return map;
}

/**
 * Get CSS property from Figma property
 */
export function getCSSPropertyFromFigma(figmaProperty: string): string | undefined {
  const mapping = defaultPropertyTypeMappings.find((m) => m.figmaProperty === figmaProperty);
  return mapping?.cssProperty;
}

/**
 * Get token category from Figma property
 */
export function getTokenCategoryFromFigmaProperty(figmaProperty: string): TokenCategory | undefined {
  const mapping = defaultPropertyTypeMappings.find((m) => m.figmaProperty === figmaProperty);
  return mapping?.tokenCategory;
}
