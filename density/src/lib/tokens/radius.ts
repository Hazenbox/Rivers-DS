/**
 * RADIUS TOKENS - Systematic border radius customization
 * 
 * Two modes:
 * 1. "density" - Radius scales automatically with density mode (compact=sharp, spacious=rounded)
 * 2. "custom" - User selects a preset regardless of density
 */

export type RadiusPreset = "sharp" | "subtle" | "rounded" | "pill";
export type RadiusMode = "density" | "custom";

export interface RadiusScale {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

/**
 * Radius presets based on industry standards (Material 3, Fluent 2, Atlassian)
 * 
 * Mathematical relationships:
 * - sm: Base unit for small elements (badges, checkboxes)
 * - md: ~1.5-2x sm, for interactive elements (buttons, inputs)
 * - lg: ~2x md, for containers (cards, dropdowns)
 * - xl: ~1.5x lg, for large surfaces (modals, sheets)
 */
export const radiusPresets: Record<RadiusPreset, RadiusScale> = {
  sharp: {
    none: "0",
    sm: "0",
    md: "2px",
    lg: "4px",
    xl: "6px",
    full: "9999px",
  },
  subtle: {
    none: "0",
    sm: "2px",
    md: "4px",
    lg: "6px",
    xl: "8px",
    full: "9999px",
  },
  rounded: {
    none: "0",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },
  pill: {
    none: "0",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },
};

/**
 * Options for UI selectors
 */
export const radiusPresetOptions = [
  {
    value: "sharp" as const,
    label: "Sharp",
    description: "Professional, data-focused",
    icon: "square", // For UI representation
  },
  {
    value: "subtle" as const,
    label: "Subtle",
    description: "Balanced, enterprise",
    icon: "rounded-sm",
  },
  {
    value: "rounded" as const,
    label: "Rounded",
    description: "Friendly, modern",
    icon: "rounded-lg",
  },
  {
    value: "pill" as const,
    label: "Pill",
    description: "Playful, marketing",
    icon: "circle",
  },
];

export const radiusModeOptions = [
  {
    value: "density" as const,
    label: "Tie to density",
    description: "Auto-scales with compact/spacious",
  },
  {
    value: "custom" as const,
    label: "Custom preset",
    description: "Independent of density mode",
  },
];

/**
 * Get CSS variables for a radius preset
 * Used when applying preset via JavaScript
 */
export function getRadiusPresetStyles(preset: RadiusPreset): Record<string, string> {
  const scale = radiusPresets[preset];
  return {
    "--radius-none": scale.none,
    "--radius-sm": scale.sm,
    "--radius-md": scale.md,
    "--radius-lg": scale.lg,
    "--radius-xl": scale.xl,
    "--radius-full": scale.full,
  };
}

/**
 * Default values
 */
export const defaultRadiusMode: RadiusMode = "density";
export const defaultRadiusPreset: RadiusPreset = "rounded";
