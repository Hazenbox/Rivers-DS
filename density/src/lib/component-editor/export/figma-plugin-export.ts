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
import { primitives } from "../../tokens/primitives";
import {
  fontWeights,
  letterSpacings,
  uiFontStacks,
  codeFontStacks,
  displayFontStacks,
  defaultUIFont,
  defaultCodeFont,
  defaultDisplayFont,
} from "../../tokens/typography";
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
      id: `rivers-ds-density/${figmaName}`,
      name: `density/${figmaName}`,
      type: "FLOAT",
      description: `Density token: ${key}`,
      valuesByMode,
      scopes: tokenScopeMap[key] || ["ALL_SCOPES"],
      codePath: `--${figmaName}`,
    });
  }

  return {
    id: "rivers-ds-density",
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
      id: `rivers-ds-colors/${figmaName}`,
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
      id: `rivers-ds-colors/${figmaName}`,
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
      id: `rivers-ds-colors/${figmaName}`,
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

  variables.push({
    id: "rivers-ds-colors/destructive",
    name: "colors/destructive",
    type: "COLOR",
    description: "Destructive/danger action color",
    valuesByMode: {
      Light: "oklch(0.577 0.245 27.325)",
      Dark: "oklch(0.704 0.191 22.216)",
    },
    scopes: ["ALL_FILLS"],
    codePath: "--destructive",
  });

  variables.push({
    id: "rivers-ds-colors/destructive-foreground",
    name: "colors/destructive-foreground",
    type: "COLOR",
    description: "Destructive foreground color",
    valuesByMode: {
      Light: "oklch(0.985 0 0)",
      Dark: "oklch(0.985 0 0)",
    },
    scopes: ["TEXT_FILL"],
    codePath: "--destructive-foreground",
  });

  return {
    id: "rivers-ds-colors",
    name: "Colors",
    modes,
    variables,
  };
}

// ============================================
// SPACING VARIABLE COLLECTION
// ============================================

function buildSpacingCollection(): FigmaPluginVariableCollection {
  const variables: FigmaPluginVariable[] = [];

  // Build from primitives.spacing
  const spacingEntries = Object.entries(primitives.spacing) as [string, string][];

  for (const [key, value] of spacingEntries) {
    // Convert key to Figma-friendly name (0.5 -> 0-5)
    const figmaKey = key.replace(".", "-");
    const numericValue = parseFloat(value);

    variables.push({
      id: `rivers-ds-spacing/${figmaKey}`,
      name: `spacing/${figmaKey}`,
      type: "FLOAT",
      description: `Spacing: ${value}`,
      valuesByMode: {
        Default: numericValue,
      },
      scopes: ["ALL_SCOPES"],
      codePath: `--spacing-${figmaKey}`,
    });
  }

  return {
    id: "rivers-ds-spacing",
    name: "Spacing",
    modes: ["Default"],
    variables,
  };
}

// ============================================
// TYPOGRAPHY VARIABLE COLLECTION
// ============================================

function buildTypographyCollection(): FigmaPluginVariableCollection {
  const variables: FigmaPluginVariable[] = [];

  // Font sizes from primitives
  const fontSizeMap: Record<string, number> = {
    xs: 11,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 24,
    "2xl": 32,
    "3xl": 40,
  };

  for (const [key, value] of Object.entries(fontSizeMap)) {
    variables.push({
      id: `rivers-ds-typography/fontSize-${key}`,
      name: `typography/fontSize-${key}`,
      type: "FLOAT",
      description: `Font size: ${value}px`,
      valuesByMode: {
        Default: value,
      },
      scopes: ["FONT_SIZE"],
      codePath: `--font-size-${key}`,
    });
  }

  for (const [key, value] of Object.entries(fontWeights)) {
    variables.push({
      id: `rivers-ds-typography/fontWeight-${key}`,
      name: `typography/fontWeight-${key}`,
      type: "FLOAT",
      description: `Font weight: ${value}`,
      valuesByMode: {
        Default: value,
      },
      scopes: ["FONT_WEIGHT"],
      codePath: `--font-weight-${key}`,
    });
  }

  const lineHeights: Record<string, number> = {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  };

  for (const [key, value] of Object.entries(lineHeights)) {
    variables.push({
      id: `rivers-ds-typography/lineHeight-${key}`,
      name: `typography/lineHeight-${key}`,
      type: "FLOAT",
      description: `Line height: ${value}`,
      valuesByMode: {
        Default: value,
      },
      scopes: ["LINE_HEIGHT"],
      codePath: `--line-height-${key}`,
    });
  }

  const letterSpacingMap: Record<string, number> = {
    tighter: -5,
    tight: -2.5,
    normal: 0,
    wide: 2.5,
    wider: 5,
  };

  for (const [key, value] of Object.entries(letterSpacingMap)) {
    variables.push({
      id: `rivers-ds-typography/letterSpacing-${key}`,
      name: `typography/letterSpacing-${key}`,
      type: "FLOAT",
      description: `Letter spacing: ${letterSpacings[key as keyof typeof letterSpacings]}`,
      valuesByMode: {
        Default: value,
      },
      scopes: ["LETTER_SPACING"],
      codePath: `--letter-spacing-${key}`,
    });
  }

  return {
    id: "rivers-ds-typography",
    name: "Typography",
    modes: ["Default"],
    variables,
  };
}

// ============================================
// BORDER WIDTH VARIABLE COLLECTION
// ============================================

function buildBorderWidthCollection(): FigmaPluginVariableCollection {
  const variables: FigmaPluginVariable[] = [];

  variables.push({
    id: "rivers-ds-border-width/default",
    name: "borderWidth/default",
    type: "FLOAT",
    description: "Default border width: 1px",
    valuesByMode: {
      Default: 1,
    },
    scopes: ["STROKE_FLOAT"],
    codePath: "--border-width",
  });

  variables.push({
    id: "rivers-ds-border-width/2",
    name: "borderWidth/2",
    type: "FLOAT",
    description: "Border width 2: 2px",
    valuesByMode: {
      Default: 2,
    },
    scopes: ["STROKE_FLOAT"],
    codePath: "--border-width-2",
  });

  return {
    id: "rivers-ds-border-width",
    name: "Border Width",
    modes: ["Default"],
    variables,
  };
}

// ============================================
// OPACITY VARIABLE COLLECTION
// ============================================

function buildOpacityCollection(): FigmaPluginVariableCollection {
  const variables: FigmaPluginVariable[] = [];

  // State-based opacity values
  const opacityValues: Record<string, { value: number; description: string }> = {
    disabled: { value: 0.5, description: "Disabled state opacity" },
    hover: { value: 0.8, description: "Hover state opacity" },
    subtle: { value: 0.6, description: "Subtle/muted opacity" },
  };

  for (const [key, { value, description }] of Object.entries(opacityValues)) {
    variables.push({
      id: `rivers-ds-opacity/${key}`,
      name: `opacity/${key}`,
      type: "FLOAT",
      description,
      valuesByMode: {
        Default: value,
      },
      scopes: ["OPACITY"],
      codePath: `--opacity-${key}`,
    });
  }

  return {
    id: "rivers-ds-opacity",
    name: "Opacity",
    modes: ["Default"],
    variables,
  };
}

// ============================================
// FONT FAMILY VARIABLE COLLECTION
// ============================================

function extractPrimaryFontName(stack: string): string {
  const first = stack.split(",")[0].trim();
  if (first.startsWith("var(")) {
    const varName = first.replace(/^var\(--font-/, "").replace(/\)$/, "");
    return varName
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return first.replace(/['"]/g, "");
}

function buildFontFamilyCollection(): FigmaPluginVariableCollection {
  const variables: FigmaPluginVariable[] = [];

  const fontCategories: Array<{
    key: string;
    stacks: Record<string, string>;
    defaultPreset: string;
    description: string;
  }> = [
    {
      key: "ui",
      stacks: uiFontStacks,
      defaultPreset: defaultUIFont,
      description: "UI / body font family",
    },
    {
      key: "code",
      stacks: codeFontStacks,
      defaultPreset: defaultCodeFont,
      description: "Monospace / code font family",
    },
    {
      key: "display",
      stacks: displayFontStacks,
      defaultPreset: defaultDisplayFont,
      description: "Display / heading font family",
    },
  ];

  for (const cat of fontCategories) {
    const defaultValue = extractPrimaryFontName(cat.stacks[cat.defaultPreset]);

    variables.push({
      id: `rivers-ds-fonts/${cat.key}`,
      name: `fonts/${cat.key}`,
      type: "STRING",
      description: cat.description,
      valuesByMode: { Default: defaultValue },
      scopes: ["FONT_FAMILY"],
      codePath: `--font-${cat.key}`,
    });

    for (const [preset, stack] of Object.entries(cat.stacks)) {
      if (preset === "system" || preset === "same-as-ui") continue;
      const fontName = extractPrimaryFontName(stack);
      variables.push({
        id: `rivers-ds-fonts/${cat.key}-${preset}`,
        name: `fonts/${cat.key}-${preset}`,
        type: "STRING",
        description: `${cat.key} preset: ${fontName}`,
        valuesByMode: { Default: fontName },
        scopes: ["FONT_FAMILY"],
        codePath: `--font-${cat.key}-${preset}`,
      });
    }
  }

  return {
    id: "rivers-ds-fonts",
    name: "Fonts",
    modes: ["Default"],
    variables,
  };
}

// ============================================
// SLOT PRESET TO TOKEN BINDINGS MAPPING
// ============================================

/**
 * Maps slot presets to their token bindings for Figma
 * Returns the background, foreground, and border color variable names
 */
function mapSlotPresetToTokenBindings(
  slotPreset: string
): Record<string, string> {
  const presetMappings: Record<
    string,
    { background: string | null; foreground: string; border: string | null; fillExplicitNone?: boolean }
  > = {
    "action-primary": {
      background: "colors/primary",
      foreground: "colors/primary-foreground",
      border: null,
    },
    "action-secondary": {
      background: "colors/secondary",
      foreground: "colors/secondary-foreground",
      border: null,
    },
    "action-destructive": {
      background: "colors/destructive",
      foreground: "colors/destructive-foreground",
      border: null,
    },
    "action-outline": {
      background: "colors/background",
      foreground: "colors/foreground",
      border: "colors/border",
    },
    "action-ghost": {
      background: null,
      foreground: "colors/foreground",
      border: null,
      fillExplicitNone: true,
    },
    "action-link": {
      background: null,
      foreground: "colors/primary",
      border: null,
      fillExplicitNone: true,
    },
  };

  const mapping = presetMappings[slotPreset];
  if (!mapping) return {};

  const bindings: Record<string, string> = {};

  if (mapping.background) {
    bindings["fill"] = mapping.background;
  } else if (mapping.fillExplicitNone) {
    bindings["fill"] = "__none__";
  }
  if (mapping.foreground) {
    bindings["textFill"] = mapping.foreground;
  }
  if (mapping.border) {
    bindings["stroke"] = mapping.border;
  }

  return bindings;
}

// ============================================
// TOKEN PATH TO VARIABLE NAME MAPPING
// ============================================

/**
 * Maps code token paths to Figma variable names
 * e.g., "colors.primary" -> "colors/primary"
 *       "spacing.4" -> "spacing/4"
 *       "typography.fontSize.sm" -> "typography/fontSize-sm"
 *       "radius.md" -> "density/radius-md"
 */
function mapTokenPathToVariableName(tokenPath: string): string | null {
  if (!tokenPath) return null;

  // Handle special cases first
  const specialMappings: Record<string, string | null> = {
    "radius.sm": "density/radius-sm",
    "radius.md": "density/radius-md",
    "radius.lg": "density/radius-lg",
    "radius.xl": "density/radius-xl",
    "border.width": "borderWidth/default",
    "border.width.2": "borderWidth/2",
    "shadow.xs": null,
    "shadow.sm": null,
    "shadow.md": null,
    "shadow.lg": null,
    "shadow.xl": null,
  };

  if (tokenPath in specialMappings) {
    return specialMappings[tokenPath] as string | null;
  }

  // Split the path
  const parts = tokenPath.split(".");

  if (parts.length === 0) return null;

  // Handle different token categories
  const category = parts[0];

  switch (category) {
    case "colors":
      // colors.primary -> colors/primary
      // colors.primary-foreground -> colors/primary-foreground
      return `colors/${parts.slice(1).join("-")}`;

    case "spacing":
      // spacing.4 -> spacing/4
      // spacing.0.5 -> spacing/0-5
      const spacingKey = parts.slice(1).join("-");
      return `spacing/${spacingKey}`;

    case "typography":
      // typography.fontSize.sm -> typography/fontSize-sm
      // typography.fontWeight.medium -> typography/fontWeight-medium
      // typography.lineHeight.normal -> typography/lineHeight-normal
      if (parts.length >= 3) {
        const subCategory = parts[1]; // fontSize, fontWeight, etc.
        const value = parts.slice(2).join("-");
        return `typography/${subCategory}-${value}`;
      }
      return null;

    case "density":
      // density.controlHeight -> density/control-height
      const densityKey = parts
        .slice(1)
        .join("-")
        .replace(/([A-Z])/g, "-$1")
        .toLowerCase();
      return `density/${densityKey}`;

    case "opacity":
      // opacity.disabled -> opacity/disabled
      return `opacity/${parts.slice(1).join("-")}`;

    default:
      // Unknown category - try generic conversion
      return `${category}/${parts.slice(1).join("-")}`;
  }
}

// ============================================
// COMPONENT BUILDING
// ============================================

function buildComponentSlots(spec: ComponentSpec): FigmaPluginSlot[] {
  return spec.slots.map((slot: ComponentSlotSpec) => {
    const isIcon = slot.element === "svg" || slot.id === "icon";
    const isText = slot.element === "span" || slot.element === "p";

    const figmaSlot: FigmaPluginSlot = {
      id: slot.id,
      type: isText ? "TEXT" : "FRAME",
      name: slot.name,
      isRoot: slot.isRoot,
      parent: slot.parent,
      layoutMode: slot.isRoot ? "HORIZONTAL" : undefined,
      primaryAxisSizing: slot.isRoot ? "AUTO" : (isIcon ? "FIXED" : "AUTO"),
      counterAxisSizing: slot.isRoot ? "AUTO" : (isIcon ? "FIXED" : "AUTO"),
      primaryAxisAlignItems: "CENTER",
      counterAxisAlignItems: "CENTER",
      variableBindings: {},
      defaults: {},
    };

    const slotProperties = spec.tokenableProperties.filter((p) => p.slot === slot.id);
    for (const prop of slotProperties) {
      if (prop.cssProperty && prop.defaultToken && prop.defaultToken.type === "system") {
        const figmaFields = mapCssToFigmaField(prop.cssProperty);
        if (figmaFields) {
          const variableName = mapTokenPathToVariableName(prop.defaultToken.path);
          if (variableName) {
            if (Array.isArray(figmaFields)) {
              for (const field of figmaFields) {
                figmaSlot.variableBindings[field] = variableName;
              }
            } else {
              figmaSlot.variableBindings[figmaFields] = variableName;
            }
          }
        }
      }
    }

    if (isIcon) {
      figmaSlot.defaults = { width: 16, height: 16 };
      const iconSizeProp = slotProperties.find((p) => p.name === "iconSize");
      if (iconSizeProp?.defaultToken && iconSizeProp.defaultToken.type === "system") {
        const varName = mapTokenPathToVariableName(iconSizeProp.defaultToken.path);
        if (varName) {
          figmaSlot.variableBindings["width"] = varName;
          figmaSlot.variableBindings["height"] = varName;
        }
      }
    }

    if (isText) {
      figmaSlot.defaults = { text: slot.name };
    }

    return figmaSlot;
  });
}

function mapCssToFigmaField(cssProperty: string): string | string[] | null {
  const mapping: Record<string, string | string[]> = {
    // Symmetric properties - return arrays
    "padding-inline": ["paddingLeft", "paddingRight"],
    "padding-block": ["paddingTop", "paddingBottom"],
    "border-radius": ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"],
    // Single properties
    height: "height",
    width: "width",
    "min-width": "minWidth",
    "max-width": "maxWidth",
    "min-height": "minHeight",
    "max-height": "maxHeight",
    gap: "itemSpacing",
    "background-color": "fill",
    color: "textFill",
    "border-color": "stroke",
    "border-width": "strokeWeight",
    opacity: "opacity",
    // Typography properties (bindable on TextNode since April 2024)
    "font-size": "fontSize",
    "font-weight": "fontWeight",
    "line-height": "lineHeight",
    "letter-spacing": "letterSpacing",
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
  const variantProperties: Record<string, string[]> = {};

  const variantToPreset: Record<string, string> = {};
  const variantValueToLabel: Record<string, string> = {};
  const sizeValueToLabel: Record<string, string> = {};

  if (spec.variants.length > 0) {
    variantProperties["Variant"] = spec.variants.map((v) => {
      const mapping = spec.figmaMapping?.find(
        (m) => m.codeProperty === "variant" && m.valueMapping
      );
      const label = mapping?.valueMapping?.[v.value] || v.label;
      variantValueToLabel[v.value] = label;
      if (v.slotPreset) {
        variantToPreset[label] = v.slotPreset;
      }
      return label;
    });
  }

  if (spec.sizes.length > 0) {
    variantProperties["Size"] = spec.sizes.map((s) => {
      const mapping = spec.figmaMapping?.find(
        (m) => m.codeProperty === "size" && m.valueMapping
      );
      const label = mapping?.valueMapping?.[s.value] || s.label;
      sizeValueToLabel[s.value] = label;
      return label;
    });
  }

  if (spec.stateSpec) {
    variantProperties["State"] = ["Default", "Hover", "Focus", "Active", "Disabled"];
  }

  const sizeTokenOverrideMap = new Map<string, Record<string, string>>();
  for (const s of spec.sizes) {
    const label = sizeValueToLabel[s.value] || s.label;
    if (s.tokenOverrides) {
      const bindings: Record<string, string> = {};
      for (const [propName, tokenRef] of Object.entries(s.tokenOverrides)) {
        if (tokenRef.type !== "system") continue;
        const cssField = resolveSizeOverrideToFigmaField(propName);
        const varName = mapTokenPathToVariableName(tokenRef.path);
        if (cssField && varName) {
          if (Array.isArray(cssField)) {
            for (const f of cssField) {
              bindings[f] = varName;
            }
          } else {
            bindings[cssField] = varName;
          }
        }
      }
      sizeTokenOverrideMap.set(label, bindings);
    }
  }

  const combinations = generateVariantCombinations(variantProperties);

  return combinations.map((props) => {
    const name = Object.entries(props)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ");

    const variantLabel = props["Variant"];
    const slotPreset = variantToPreset[variantLabel];
    let tokenBindings: Record<string, string> = {};

    if (slotPreset) {
      tokenBindings = { ...mapSlotPresetToTokenBindings(slotPreset) };
    }

    const sizeLabel = props["Size"];
    const sizeOverrides = sizeTokenOverrideMap.get(sizeLabel);
    if (sizeOverrides) {
      tokenBindings = { ...tokenBindings, ...sizeOverrides };
    }

    const state = props["State"];
    if (state === "Disabled") {
      tokenBindings["opacity"] = "opacity/disabled";
    } else if (state === "Hover") {
      tokenBindings["_state"] = "hover";
    } else if (state === "Focus") {
      tokenBindings["_state"] = "focus";
    } else if (state === "Active") {
      tokenBindings["_state"] = "active";
    }

    return { name, properties: props, tokenBindings };
  });
}

function resolveSizeOverrideToFigmaField(propName: string): string | string[] | null {
  const mapping: Record<string, string | string[]> = {
    height: "height",
    width: "width",
    paddingX: "paddingLeft",
    paddingY: "paddingTop",
    fontSize: "fontSize",
    gap: "itemSpacing",
    borderRadius: "topLeftRadius",
  };
  if (propName === "paddingX") return ["paddingLeft", "paddingRight"];
  if (propName === "paddingY") return ["paddingTop", "paddingBottom"];
  if (propName === "borderRadius") return ["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"];
  return mapping[propName] || null;
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

  if (spec.stateSpec) {
    variantProperties["State"] = ["Default", "Hover", "Focus", "Active", "Disabled"];
  }

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
      fontFamily: "Inter",
      fontStyle: "Bold",
      fontSize: 36,
      lineHeight: 40,
      letterSpacing: -0.5,
    },
    {
      name: "Heading/H2",
      fontFamily: "Inter",
      fontStyle: "SemiBold",
      fontSize: 30,
      lineHeight: 36,
      letterSpacing: -0.25,
    },
    {
      name: "Heading/H3",
      fontFamily: "Inter",
      fontStyle: "SemiBold",
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
    },
    {
      name: "Heading/H4",
      fontFamily: "Inter",
      fontStyle: "Medium",
      fontSize: 20,
      lineHeight: 28,
      letterSpacing: 0,
    },
    {
      name: "Body/Large",
      fontFamily: "Inter",
      fontStyle: "Regular",
      fontSize: 18,
      lineHeight: 28,
      letterSpacing: 0,
    },
    {
      name: "Body/Default",
      fontFamily: "Inter",
      fontStyle: "Regular",
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },
    {
      name: "Body/Small",
      fontFamily: "Inter",
      fontStyle: "Regular",
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    {
      name: "Label/Default",
      fontFamily: "Inter",
      fontStyle: "Medium",
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    {
      name: "Label/Small",
      fontFamily: "Inter",
      fontStyle: "Medium",
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
    },
    {
      name: "Code/Default",
      fontFamily: "JetBrains Mono",
      fontStyle: "Regular",
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    {
      name: "Code/Small",
      fontFamily: "JetBrains Mono",
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

  const variableCollections: FigmaPluginVariableCollection[] = [
    buildDensityCollection(),
    buildColorCollection(),
    buildSpacingCollection(),
    buildTypographyCollection(),
    buildFontFamilyCollection(),
    buildBorderWidthCollection(),
    buildOpacityCollection(),
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
 * By default, exports only the Button component for focused testing
 */
export function downloadFigmaPluginExport(options: ExportOptions = {}): void {
  // Default to Button only for focused testing
  const exportOptions: ExportOptions = {
    componentNames: ["Button"],
    ...options,
  };

  const json = exportForFigmaPluginAsJSON(exportOptions);
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
