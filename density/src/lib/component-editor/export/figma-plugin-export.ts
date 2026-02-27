/**
 * FIGMA PLUGIN EXPORT
 *
 * Builds the JSON export that DS-Bridge Figma Plugin consumes.
 * Converts Rivers DS tokens and component specs into Figma-ready format.
 */

import type {
  FigmaPluginExport,
  FigmaPluginVariableCollection,
  FigmaPluginVariable,
  FigmaPluginComponent,
  FigmaPluginComponentVariant,
  FigmaPluginSlot,
  FigmaPluginTextStyle,
  FigmaPluginEffectStyle,
  FigmaPluginCodeConnect,
  FigmaVariableScope,
  FigmaVariableType,
} from "./figma-plugin-schema";

import { densityTokens, type Density } from "../../tokens/density";
import { colorPresets, neutralScales, semanticColors } from "../../tokens/colors";
import { getAllSpecs } from "../specs";
import type { ComponentSpec, ComponentSlotSpec, FigmaPropertyMapping } from "../types";

// ============================================
// DENSITY VARIABLE COLLECTION
// ============================================

function buildDensityCollection(): FigmaPluginVariableCollection {
  const modes: Density[] = ["compact", "default", "spacious"];
  const modeLabels = ["Compact", "Default", "Spacious"];

  const variables: FigmaPluginVariable[] = [];

  // Map density token keys to Figma scopes
  const tokenScopeMap: Record<string, FigmaVariableScope[]> = {
    controlHeight: ["WIDTH_HEIGHT"],
    controlHeightSm: ["WIDTH_HEIGHT"],
    controlHeightLg: ["WIDTH_HEIGHT"],
    tableRowHeight: ["WIDTH_HEIGHT"],
    stackGap: ["GAP"],
    sectionGap: ["GAP"],
    inlineGap: ["GAP"],
    insetXs: ["GAP"],
    insetSm: ["GAP"],
    insetMd: ["GAP"],
    insetLg: ["GAP"],
    insetXl: ["GAP"],
    lineHeightBody: ["LINE_HEIGHT"],
    lineHeightHeading: ["LINE_HEIGHT"],
    textMarginAfterH1: ["GAP"],
    textMarginAfterH2: ["GAP"],
    textMarginAfterH3: ["GAP"],
    textMarginAfterP: ["GAP"],
    radiusSm: ["CORNER_RADIUS"],
    radiusMd: ["CORNER_RADIUS"],
    radiusLg: ["CORNER_RADIUS"],
    radiusXl: ["CORNER_RADIUS"],
    iconSizeSm: ["WIDTH_HEIGHT"],
    iconSize: ["WIDTH_HEIGHT"],
    iconSizeLg: ["WIDTH_HEIGHT"],
  };

  // Build variables from density tokens
  const sampleTokenSet = densityTokens.default;
  for (const key of Object.keys(sampleTokenSet) as (keyof typeof sampleTokenSet)[]) {
    const valuesByMode: Record<string, string | number> = {};

    for (let i = 0; i < modes.length; i++) {
      const mode = modes[i];
      const modeLabel = modeLabels[i];
      const value = densityTokens[mode][key];

      // Parse value to number if it's a pixel value
      if (typeof value === "string" && value.endsWith("px")) {
        valuesByMode[modeLabel] = parseFloat(value);
      } else if (typeof value === "string" && !isNaN(parseFloat(value))) {
        valuesByMode[modeLabel] = parseFloat(value);
      } else {
        valuesByMode[modeLabel] = value;
      }
    }

    // Convert camelCase to kebab-case for Figma naming
    const figmaName = key.replace(/([A-Z])/g, "-$1").toLowerCase();

    variables.push({
      name: `density/${figmaName}`,
      type: "FLOAT",
      description: `Density token: ${key}`,
      valuesByMode,
      scopes: tokenScopeMap[key] || ["ALL_SCOPES"],
      codePath: `--${figmaName}`,
    });
  }

  return {
    name: "Density",
    modes: modeLabels,
    variables,
  };
}

// ============================================
// COLOR VARIABLE COLLECTIONS
// ============================================

function buildColorCollection(): FigmaPluginVariableCollection {
  const modes = ["Light", "Dark"];
  const variables: FigmaPluginVariable[] = [];

  // Primary colors from default preset (neutral)
  const preset = colorPresets.neutral;
  const colorKeys: (keyof typeof preset.light)[] = [
    "primary",
    "primaryForeground",
    "secondary",
    "secondaryForeground",
    "accent",
    "accentForeground",
    "ring",
  ];

  for (const key of colorKeys) {
    const figmaName = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    variables.push({
      name: `colors/${figmaName}`,
      type: "COLOR",
      description: `Color token: ${key}`,
      valuesByMode: {
        Light: preset.light[key],
        Dark: preset.dark[key],
      },
      scopes: ["ALL_FILLS"],
      codePath: `--${figmaName}`,
    });
  }

  // Neutral scale colors from default (gray)
  const neutralScale = neutralScales.gray;
  const neutralKeys: (keyof typeof neutralScale.light)[] = [
    "background",
    "foreground",
    "card",
    "cardForeground",
    "popover",
    "popoverForeground",
    "muted",
    "mutedForeground",
    "border",
    "input",
  ];

  for (const key of neutralKeys) {
    const figmaName = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    variables.push({
      name: `colors/${figmaName}`,
      type: "COLOR",
      description: `Neutral color: ${key}`,
      valuesByMode: {
        Light: neutralScale.light[key],
        Dark: neutralScale.dark[key],
      },
      scopes: key.includes("foreground") ? ["TEXT_FILL"] : ["ALL_FILLS"],
      codePath: `--${figmaName}`,
    });
  }

  // Semantic colors
  const semanticKeys: (keyof typeof semanticColors.light)[] = [
    "success",
    "successForeground",
    "warning",
    "warningForeground",
    "info",
    "infoForeground",
  ];

  for (const key of semanticKeys) {
    const figmaName = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    variables.push({
      name: `colors/${figmaName}`,
      type: "COLOR",
      description: `Semantic color: ${key}`,
      valuesByMode: {
        Light: semanticColors.light[key],
        Dark: semanticColors.dark[key],
      },
      scopes: key.includes("foreground") ? ["TEXT_FILL"] : ["ALL_FILLS"],
      codePath: `--${figmaName}`,
    });
  }

  return {
    name: "Colors",
    modes,
    variables,
  };
}

// ============================================
// COMPONENT BUILDING
// ============================================

function buildComponentSlots(spec: ComponentSpec): FigmaPluginSlot[] {
  return spec.slots.map((slot: ComponentSlotSpec) => {
    const figmaSlot: FigmaPluginSlot = {
      id: slot.id,
      type: slot.element === "span" || slot.element === "p" ? "TEXT" : "FRAME",
      name: slot.name,
      isRoot: slot.isRoot,
      parent: slot.parent,
      layoutMode: slot.isRoot ? "HORIZONTAL" : undefined,
      primaryAxisSizing: "AUTO",
      counterAxisSizing: "AUTO",
      primaryAxisAlignItems: "CENTER",
      counterAxisAlignItems: "CENTER",
      variableBindings: {},
      defaults: {},
    };

    // Add variable bindings from tokenable properties
    const slotProperties = spec.tokenableProperties.filter((p) => p.slot === slot.id);
    for (const prop of slotProperties) {
      if (prop.cssProperty) {
        // Map CSS property to Figma bindable field
        const figmaField = mapCssToFigmaField(prop.cssProperty);
        if (figmaField && prop.defaultToken) {
          figmaSlot.variableBindings[prop.defaultToken.path] = figmaField;
        }
      }
    }

    // Set defaults for text slots
    if (figmaSlot.type === "TEXT") {
      figmaSlot.defaults = { text: slot.name };
    }

    return figmaSlot;
  });
}

function mapCssToFigmaField(cssProperty: string): string | null {
  const mapping: Record<string, string> = {
    "padding-inline": "paddingLeft", // Will need to bind both sides
    "padding-block": "paddingTop",
    height: "height",
    width: "width",
    "min-width": "minWidth",
    "border-radius": "topLeftRadius", // Will need all corners
    gap: "itemSpacing",
    "background-color": "fill",
    color: "textFill",
    "border-color": "stroke",
    opacity: "opacity",
  };
  return mapping[cssProperty] || null;
}

function generateVariantCombinations(
  variantProperties: Record<string, string[]>
): Array<Record<string, string>> {
  const keys = Object.keys(variantProperties);
  if (keys.length === 0) return [{}];

  const combinations: Array<Record<string, string>> = [];

  function recurse(index: number, current: Record<string, string>) {
    if (index === keys.length) {
      combinations.push({ ...current });
      return;
    }

    const key = keys[index];
    for (const value of variantProperties[key]) {
      current[key] = value;
      recurse(index + 1, current);
    }
  }

  recurse(0, {});
  return combinations;
}

function buildComponentVariants(spec: ComponentSpec): FigmaPluginComponentVariant[] {
  // Build variant properties from spec
  const variantProperties: Record<string, string[]> = {};

  if (spec.variants.length > 0) {
    variantProperties["Variant"] = spec.variants.map((v) => {
      // Use Figma mapping if available
      const mapping = spec.figmaMapping?.find(
        (m) => m.codeProperty === "variant" && m.valueMapping
      );
      return mapping?.valueMapping?.[v.value] || v.label;
    });
  }

  if (spec.sizes.length > 0) {
    variantProperties["Size"] = spec.sizes.map((s) => {
      const mapping = spec.figmaMapping?.find(
        (m) => m.codeProperty === "size" && m.valueMapping
      );
      return mapping?.valueMapping?.[s.value] || s.label;
    });
  }

  // Generate all combinations
  const combinations = generateVariantCombinations(variantProperties);

  return combinations.map((props) => {
    const name = Object.entries(props)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ");

    return {
      name,
      properties: props,
      tokenBindings: {},
    };
  });
}

function buildComponent(spec: ComponentSpec): FigmaPluginComponent {
  const variantProperties: Record<string, string[]> = {};

  if (spec.variants.length > 0) {
    variantProperties["Variant"] = spec.variants.map((v) => {
      const mapping = spec.figmaMapping?.find(
        (m) => m.codeProperty === "variant" && m.valueMapping
      );
      return mapping?.valueMapping?.[v.value] || v.label;
    });
  }

  if (spec.sizes.length > 0) {
    variantProperties["Size"] = spec.sizes.map((s) => {
      const mapping = spec.figmaMapping?.find(
        (m) => m.codeProperty === "size" && m.valueMapping
      );
      return mapping?.valueMapping?.[s.value] || s.label;
    });
  }

  // Build component properties from Figma mapping
  const componentProperties = spec.figmaMapping
    ?.filter((m) => m.figmaPropertyType !== "VARIANT")
    .map((m: FigmaPropertyMapping) => ({
      name: m.figmaPropertyName,
      type: m.figmaPropertyType as "BOOLEAN" | "TEXT" | "INSTANCE_SWAP",
      defaultValue: m.defaultValue ?? (m.figmaPropertyType === "BOOLEAN" ? false : ""),
    }));

  return {
    name: spec.name,
    description: spec.description,
    variantProperties,
    componentProperties,
    variants: buildComponentVariants(spec),
    slots: buildComponentSlots(spec),
  };
}

// ============================================
// CODE CONNECT
// ============================================

function buildCodeConnect(spec: ComponentSpec): FigmaPluginCodeConnect {
  return {
    componentName: spec.name,
    importPath: `@/components/ui/${spec.name.toLowerCase()}`,
    exportName: spec.name,
    props:
      spec.figmaMapping?.map((m: FigmaPropertyMapping) => ({
        figmaProperty: m.figmaPropertyName,
        codeProp: m.codeProperty,
        valueMapping: m.valueMapping,
      })) || [],
  };
}

// ============================================
// TEXT STYLES
// ============================================

function buildTextStyles(): FigmaPluginTextStyle[] {
  return [
    {
      name: "Heading/H1",
      fontFamily: "Geist",
      fontStyle: "Bold",
      fontSize: 36,
      lineHeight: 40,
      letterSpacing: -0.5,
    },
    {
      name: "Heading/H2",
      fontFamily: "Geist",
      fontStyle: "Semibold",
      fontSize: 30,
      lineHeight: 36,
      letterSpacing: -0.25,
    },
    {
      name: "Heading/H3",
      fontFamily: "Geist",
      fontStyle: "Semibold",
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
    },
    {
      name: "Heading/H4",
      fontFamily: "Geist",
      fontStyle: "Medium",
      fontSize: 20,
      lineHeight: 28,
      letterSpacing: 0,
    },
    {
      name: "Body/Large",
      fontFamily: "Geist",
      fontStyle: "Regular",
      fontSize: 18,
      lineHeight: 28,
      letterSpacing: 0,
    },
    {
      name: "Body/Default",
      fontFamily: "Geist",
      fontStyle: "Regular",
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },
    {
      name: "Body/Small",
      fontFamily: "Geist",
      fontStyle: "Regular",
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    {
      name: "Label/Default",
      fontFamily: "Geist",
      fontStyle: "Medium",
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    {
      name: "Label/Small",
      fontFamily: "Geist",
      fontStyle: "Medium",
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
    },
    {
      name: "Code/Default",
      fontFamily: "Geist Mono",
      fontStyle: "Regular",
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    {
      name: "Code/Small",
      fontFamily: "Geist Mono",
      fontStyle: "Regular",
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
    },
  ];
}

// ============================================
// EFFECT STYLES
// ============================================

function buildEffectStyles(): FigmaPluginEffectStyle[] {
  return [
    {
      name: "Shadow/XS",
      effects: [
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 0.05 },
          offset: { x: 0, y: 1 },
          radius: 2,
          spread: 0,
          visible: true,
        },
      ],
    },
    {
      name: "Shadow/SM",
      effects: [
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 0.05 },
          offset: { x: 0, y: 1 },
          radius: 3,
          spread: 0,
          visible: true,
        },
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 0.1 },
          offset: { x: 0, y: 1 },
          radius: 2,
          spread: 0,
          visible: true,
        },
      ],
    },
    {
      name: "Shadow/MD",
      effects: [
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 0.1 },
          offset: { x: 0, y: 4 },
          radius: 6,
          spread: -1,
          visible: true,
        },
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 0.1 },
          offset: { x: 0, y: 2 },
          radius: 4,
          spread: -2,
          visible: true,
        },
      ],
    },
    {
      name: "Shadow/LG",
      effects: [
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 0.1 },
          offset: { x: 0, y: 10 },
          radius: 15,
          spread: -3,
          visible: true,
        },
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 0.1 },
          offset: { x: 0, y: 4 },
          radius: 6,
          spread: -4,
          visible: true,
        },
      ],
    },
    {
      name: "Shadow/XL",
      effects: [
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 0.1 },
          offset: { x: 0, y: 20 },
          radius: 25,
          spread: -5,
          visible: true,
        },
        {
          type: "DROP_SHADOW",
          color: { r: 0, g: 0, b: 0, a: 0.1 },
          offset: { x: 0, y: 8 },
          radius: 10,
          spread: -6,
          visible: true,
        },
      ],
    },
  ];
}

// ============================================
// MAIN EXPORT FUNCTION
// ============================================

export interface ExportOptions {
  includeComponents?: boolean;
  includeTextStyles?: boolean;
  includeEffectStyles?: boolean;
  includeCodeConnect?: boolean;
  componentNames?: string[];
}

export function exportForFigmaPlugin(options: ExportOptions = {}): FigmaPluginExport {
  const {
    includeComponents = true,
    includeTextStyles = true,
    includeEffectStyles = true,
    includeCodeConnect = true,
    componentNames,
  } = options;

  // Build variable collections
  const variableCollections: FigmaPluginVariableCollection[] = [
    buildDensityCollection(),
    buildColorCollection(),
  ];

  // Build components
  let components: FigmaPluginComponent[] = [];
  let codeConnect: FigmaPluginCodeConnect[] = [];

  if (includeComponents) {
    let specs = getAllSpecs();

    if (componentNames && componentNames.length > 0) {
      specs = specs.filter((s) => componentNames.includes(s.name));
    }

    components = specs.map(buildComponent);

    if (includeCodeConnect) {
      codeConnect = specs.map(buildCodeConnect);
    }
  }

  const exportData: FigmaPluginExport = {
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    source: "rivers-ds",
    variableCollections,
    components,
  };

  if (includeTextStyles) {
    exportData.textStyles = buildTextStyles();
  }

  if (includeEffectStyles) {
    exportData.effectStyles = buildEffectStyles();
  }

  if (includeCodeConnect && codeConnect.length > 0) {
    exportData.codeConnect = codeConnect;
  }

  return exportData;
}

/**
 * Export as downloadable JSON string
 */
export function exportForFigmaPluginAsJSON(options: ExportOptions = {}): string {
  const data = exportForFigmaPlugin(options);
  return JSON.stringify(data, null, 2);
}

/**
 * Trigger browser download of the export JSON
 */
export function downloadFigmaPluginExport(options: ExportOptions = {}): void {
  const json = exportForFigmaPluginAsJSON(options);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `rivers-ds-figma-export-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
