/**
 * FIGMA EXPORT
 * 
 * Export tokens for Figma Variables API and Code Connect.
 */

import type {
  CustomToken,
  ComponentSpec,
  FigmaVariableCollection,
  FigmaVariableGroup,
  FigmaVariableDefinition,
  FigmaVariableType,
  FigmaVariableScope,
  CodeConnectConfig,
} from "../types";
import { getAllComponents } from "../registry";

// ============================================
// TYPES
// ============================================

export interface FigmaExportOptions {
  collectionName?: string;
  modes?: string[];
  includeComponentTokens?: boolean;
}

export interface FigmaExportResult {
  variables: FigmaVariableCollection;
  codeConnect: CodeConnectConfig[];
  json: string;
}

// ============================================
// VARIABLE EXPORT
// ============================================

/**
 * Export custom tokens as Figma Variable collection structure
 */
export function exportForFigma(
  customTokens: CustomToken[],
  options: FigmaExportOptions = {}
): FigmaExportResult {
  const {
    collectionName = "Custom Tokens",
    modes = ["Light", "Dark"],
    includeComponentTokens = true,
  } = options;

  // Build variable collection
  const collection: FigmaVariableCollection = {
    name: collectionName,
    modes,
    groups: [],
  };

  // Group tokens by category
  const grouped = groupByCategory(customTokens);

  for (const [category, tokens] of Object.entries(grouped)) {
    const group: FigmaVariableGroup = {
      name: category,
      variables: tokens.map((token) => tokenToVariable(token, modes)),
    };
    collection.groups.push(group);
  }

  // Add component tokens if requested
  if (includeComponentTokens) {
    const components = getAllComponents();
    for (const spec of components) {
      const componentGroup = buildComponentVariableGroup(spec, modes);
      if (componentGroup.variables.length > 0) {
        collection.groups.push(componentGroup);
      }
    }
  }

  // Generate Code Connect configs
  const codeConnect = generateCodeConnectConfigs();

  return {
    variables: collection,
    codeConnect,
    json: JSON.stringify(collection, null, 2),
  };
}

/**
 * Convert a CustomToken to FigmaVariableDefinition
 */
function tokenToVariable(
  token: CustomToken,
  modes: string[]
): FigmaVariableDefinition {
  const figmaType = categoryToFigmaType(token.category);
  const scopes = categoryToScopes(token.category);

  // Build values per mode
  const valuesByMode: Record<string, string | number | boolean> = {};
  for (const mode of modes) {
    valuesByMode[mode] = formatValueForFigma(token.$value, mode);
  }

  return {
    name: token.name,
    type: figmaType,
    scopes,
    description: token.description,
    valuesByMode,
    codeTokenPath: `custom.${token.id}`,
  };
}

/**
 * Build variable group for a component
 */
function buildComponentVariableGroup(
  spec: ComponentSpec,
  modes: string[]
): FigmaVariableGroup {
  const group: FigmaVariableGroup = {
    name: spec.name.toLowerCase(),
    variables: [],
    children: [],
  };

  // Add variant-specific groups
  for (const variant of spec.variants) {
    const variantGroup: FigmaVariableGroup = {
      name: variant.value,
      variables: [],
    };

    // Add tokenable properties for this variant
    const variantProps = spec.tokenableProperties.filter(
      (p) => !p.variants || p.variants.includes(variant.value)
    );

    for (const prop of variantProps) {
      if (prop.category === "color") {
        variantGroup.variables.push({
          name: prop.name,
          type: "COLOR",
          scopes: ["ALL_FILLS", "STROKE_COLOR"],
          codeTokenPath: `${spec.name.toLowerCase()}.${variant.value}.${prop.name}`,
          valuesByMode: Object.fromEntries(
            modes.map((mode) => [mode, getDefaultColorForMode(mode)])
          ),
        });
      }
    }

    if (variantGroup.variables.length > 0) {
      group.children!.push(variantGroup);
    }
  }

  return group;
}

// ============================================
// CODE CONNECT GENERATION
// ============================================

/**
 * Generate Code Connect configurations for all registered components
 */
export function generateCodeConnectConfigs(): CodeConnectConfig[] {
  const configs: CodeConnectConfig[] = [];
  const components = getAllComponents();

  for (const spec of components) {
    configs.push(generateComponentCodeConnect(spec));
  }

  return configs;
}

/**
 * Generate Code Connect config for a single component
 */
function generateComponentCodeConnect(spec: ComponentSpec): CodeConnectConfig {
  // Use existing figma mapping if available, otherwise generate
  const props = spec.figmaMapping || [];

  // Ensure variant and size mappings exist
  const hasVariantMapping = props.some((p) => p.codeProperty === "variant");
  const hasSizeMapping = props.some((p) => p.codeProperty === "size");

  if (!hasVariantMapping && spec.variants.length > 0) {
    props.push({
      codeProperty: "variant",
      figmaPropertyType: "VARIANT",
      figmaPropertyName: "Variant",
      valueMapping: Object.fromEntries(
        spec.variants.map((v) => [v.value, v.label])
      ),
    });
  }

  if (!hasSizeMapping && spec.sizes.length > 0) {
    props.push({
      codeProperty: "size",
      figmaPropertyType: "VARIANT",
      figmaPropertyName: "Size",
      valueMapping: Object.fromEntries(
        spec.sizes.map((s) => [s.value, s.label])
      ),
    });
  }

  // Generate example code
  const example = generateComponentExample(spec);

  return {
    importPath: `@/components/ui/${spec.name.toLowerCase()}`,
    componentName: spec.name,
    figmaNode: `FIGMA_NODE_URL_HERE`, // To be replaced with actual Figma URL
    props,
    example,
  };
}

/**
 * Generate example code for Code Connect
 */
function generateComponentExample(spec: ComponentSpec): string {
  const defaultVariant = spec.variants[0]?.value || "default";
  const defaultSize = spec.sizes[0]?.value || "default";

  const propsStr = [];
  if (spec.variants.length > 1) {
    propsStr.push(`variant="${defaultVariant}"`);
  }
  if (spec.sizes.length > 1) {
    propsStr.push(`size="${defaultSize}"`);
  }

  const propsJoined = propsStr.length > 0 ? ` ${propsStr.join(" ")}` : "";

  // Handle self-closing vs children components
  const selfClosing = ["Input", "Checkbox", "Switch", "Separator"].includes(spec.name);
  
  if (selfClosing) {
    return `<${spec.name}${propsJoined} />`;
  }

  return `<${spec.name}${propsJoined}>Label</${spec.name}>`;
}

// ============================================
// FIGMA TOKENS PLUGIN FORMAT
// ============================================

/**
 * Export in Figma Tokens plugin format
 */
export function exportForFigmaTokensPlugin(
  customTokens: CustomToken[]
): string {
  const output: Record<string, Record<string, unknown>> = {};

  for (const token of customTokens) {
    const category = token.category;
    
    if (!output[category]) {
      output[category] = {};
    }

    output[category][token.id] = {
      value: token.$value,
      type: mapCategoryToFigmaTokensType(token.category),
      description: token.description,
    };
  }

  return JSON.stringify(output, null, 2);
}

/**
 * Map category to Figma Tokens plugin type
 */
function mapCategoryToFigmaTokensType(category: string): string {
  const mapping: Record<string, string> = {
    color: "color",
    spacing: "spacing",
    radius: "borderRadius",
    border: "borderWidth",
    typography: "typography",
    shadow: "boxShadow",
    opacity: "opacity",
    motion: "other",
    zIndex: "other",
  };
  return mapping[category] || "other";
}

// ============================================
// HELPERS
// ============================================

function groupByCategory(
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

function categoryToFigmaType(category: string): FigmaVariableType {
  switch (category) {
    case "color":
      return "COLOR";
    case "spacing":
    case "radius":
    case "border":
    case "opacity":
      return "FLOAT";
    default:
      return "STRING";
  }
}

function categoryToScopes(category: string): FigmaVariableScope[] {
  switch (category) {
    case "color":
      return ["ALL_FILLS", "STROKE_COLOR", "EFFECT_COLOR"];
    case "spacing":
      return ["WIDTH_HEIGHT", "GAP"];
    case "radius":
      return ["CORNER_RADIUS"];
    case "border":
      return ["STROKE_FLOAT"];
    case "opacity":
      return ["OPACITY"];
    default:
      return ["ALL_SCOPES"];
  }
}

function formatValueForFigma(
  value: unknown,
  mode: string
): string | number | boolean {
  if (typeof value === "string") return value;
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value;
  return JSON.stringify(value);
}

function getDefaultColorForMode(mode: string): string {
  return mode === "Dark" ? "#ffffff" : "#000000";
}
