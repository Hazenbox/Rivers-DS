/**
 * DTCG EXPORT
 * 
 * Export tokens in W3C Design Token Community Group format.
 */

import type { CustomToken, DTCGType, TokenCategory } from "../types";

// ============================================
// TYPES
// ============================================

export interface DTCGToken {
  $value: unknown;
  $type: DTCGType;
  $description?: string;
  $extensions?: Record<string, unknown>;
}

export interface DTCGGroup {
  [key: string]: DTCGToken | DTCGGroup | string | Record<string, unknown>;
}

export interface DTCGExportOptions {
  version?: string;
  includeMetadata?: boolean;
  groupByCategory?: boolean;
  extensions?: Record<string, unknown>;
}

export interface DTCGExportResult {
  json: string;
  tokens: DTCGGroup;
  tokenCount: number;
}

// ============================================
// EXPORT FUNCTION
// ============================================

/**
 * Export custom tokens as DTCG-compliant JSON
 */
export function exportAsDTCG(
  tokens: CustomToken[],
  options: DTCGExportOptions = {}
): DTCGExportResult {
  const {
    version = "1.0.0",
    includeMetadata = true,
    groupByCategory = true,
    extensions = {},
  } = options;

  const output: DTCGGroup = {};

  // Add metadata
  if (includeMetadata) {
    output.$name = "Custom Design Tokens";
    output.$version = version;
    output.$timestamp = new Date().toISOString();
    
    if (Object.keys(extensions).length > 0) {
      output.$extensions = extensions;
    }
  }

  // Convert and group tokens
  if (groupByCategory) {
    const grouped = groupTokensByCategory(tokens);
    
    for (const [category, categoryTokens] of Object.entries(grouped)) {
      output[category] = {};
      
      for (const token of categoryTokens) {
        const dtcgToken = convertToDTCG(token);
        (output[category] as DTCGGroup)[token.id] = dtcgToken;
      }
    }
  } else {
    for (const token of tokens) {
      output[token.id] = convertToDTCG(token);
    }
  }

  const json = JSON.stringify(output, null, 2);

  return {
    json,
    tokens: output,
    tokenCount: tokens.length,
  };
}

// ============================================
// CONVERSION
// ============================================

/**
 * Convert a CustomToken to DTCG format
 */
function convertToDTCG(token: CustomToken): DTCGToken {
  const dtcgToken: DTCGToken = {
    $value: convertValue(token.$value, token.category),
    $type: token.$type,
  };

  if (token.$description) {
    dtcgToken.$description = token.$description;
  }

  // Add custom extensions
  const extensions: Record<string, unknown> = {};

  if (token.usedBy.length > 0) {
    extensions["component-editor.usedBy"] = token.usedBy;
  }

  if (token.createdBy) {
    extensions["component-editor.createdBy"] = token.createdBy;
  }

  if (token.createdAt) {
    extensions["component-editor.createdAt"] = token.createdAt;
  }

  if (Object.keys(extensions).length > 0) {
    dtcgToken.$extensions = extensions;
  }

  return dtcgToken;
}

/**
 * Convert value to DTCG-compliant format
 */
function convertValue(value: unknown, category: TokenCategory): unknown {
  if (typeof value === "string") {
    // Color: ensure proper format
    if (category === "color") {
      return value; // DTCG accepts hex, rgb, hsl, oklch
    }
    
    // Dimension: ensure proper format
    if (category === "spacing" || category === "radius" || category === "border") {
      // DTCG dimensions should be strings with units
      return value;
    }
    
    // Duration
    if (category === "motion") {
      return value;
    }

    return value;
  }

  if (typeof value === "number") {
    return value;
  }

  // Complex values (shadow, typography)
  return value;
}

/**
 * Group tokens by category
 */
function groupTokensByCategory(
  tokens: CustomToken[]
): Record<string, CustomToken[]> {
  const grouped: Record<string, CustomToken[]> = {};

  for (const token of tokens) {
    if (!grouped[token.category]) {
      grouped[token.category] = [];
    }
    grouped[token.category].push(token);
  }

  return grouped;
}

// ============================================
// IMPORT (for bidirectional sync)
// ============================================

/**
 * Import DTCG tokens into CustomToken format
 */
export function importFromDTCG(
  dtcgJson: string
): CustomToken[] {
  const data = JSON.parse(dtcgJson) as DTCGGroup;
  const tokens: CustomToken[] = [];

  function processGroup(
    group: DTCGGroup,
    path: string[] = []
  ) {
    for (const [key, value] of Object.entries(group)) {
      // Skip metadata fields
      if (key.startsWith("$")) continue;

      if (isDTCGToken(value)) {
        const category = dtcgTypeToCategory(value.$type);
        
        tokens.push({
          id: [...path, key].join("-"),
          name: key,
          category,
          $type: value.$type,
          $value: value.$value as string | number | object,
          $description: value.$description,
          description: value.$description,
          createdBy: "system",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          usedBy: [],
        });
      } else if (typeof value === "object") {
        // Nested group
        processGroup(value as DTCGGroup, [...path, key]);
      }
    }
  }

  processGroup(data);
  return tokens;
}

/**
 * Check if object is a DTCG token
 */
function isDTCGToken(obj: unknown): obj is DTCGToken {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "$value" in obj &&
    "$type" in obj
  );
}

/**
 * Map DTCG type to token category
 */
function dtcgTypeToCategory(type: DTCGType): TokenCategory {
  switch (type) {
    case "color":
      return "color";
    case "dimension":
      return "spacing"; // Default, could be radius/border too
    case "duration":
      return "motion";
    case "number":
      return "opacity"; // Or zIndex
    case "shadow":
      return "shadow";
    case "typography":
    case "fontFamily":
    case "fontWeight":
    case "fontStyle":
      return "typography";
    default:
      return "color";
  }
}
