/**
 * COLOR TOKENS - Multi-brand color theming system
 * 
 * Architecture:
 * 1. Color Presets - Brand color themes (neutral, blue, violet, etc.)
 * 2. Neutral Scales - Gray family options (slate, zinc, gray, etc.)
 * 3. Semantic Colors - Feedback colors (success, warning, info)
 * 
 * All colors use OKLCH color space for perceptual uniformity.
 */

// ============================================
// COLOR PRESET TYPES
// ============================================

export type ColorPreset = 
  | "neutral"   // shadcn default (grayscale)
  | "zinc"      // Cool dark gray
  | "slate"     // Blue-tinted gray
  | "blue"      // Classic blue
  | "violet"    // Purple/violet
  | "green"     // Emerald green
  | "orange"    // Warm orange
  | "rose";     // Pink/rose

export type NeutralScale = 
  | "gray"      // True neutral
  | "slate"     // Cool blue undertone
  | "zinc"      // Subtle warm gray
  | "neutral"   // Warm neutral
  | "stone";    // Warm brown undertone

// ============================================
// COLOR TOKEN INTERFACES
// ============================================

export interface ColorModeTokens {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  ring: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
}

export interface ColorPresetTokens {
  light: ColorModeTokens;
  dark: ColorModeTokens;
}

export interface NeutralScaleTokens {
  light: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
  };
  dark: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
  };
}

// ============================================
// COLOR PRESETS (BRAND COLORS)
// ============================================

export const colorPresets: Record<ColorPreset, ColorPresetTokens> = {
  neutral: {
    light: {
      primary: "oklch(0.205 0 0)",
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.97 0 0)",
      secondaryForeground: "oklch(0.205 0 0)",
      accent: "oklch(0.97 0 0)",
      accentForeground: "oklch(0.205 0 0)",
      ring: "oklch(0.708 0 0)",
      sidebarPrimary: "oklch(0.205 0 0)",
      sidebarPrimaryForeground: "oklch(0.985 0 0)",
      sidebarAccent: "oklch(0.97 0 0)",
      sidebarAccentForeground: "oklch(0.205 0 0)",
    },
    dark: {
      primary: "oklch(0.922 0 0)",
      primaryForeground: "oklch(0.205 0 0)",
      secondary: "oklch(0.269 0 0)",
      secondaryForeground: "oklch(0.985 0 0)",
      accent: "oklch(0.269 0 0)",
      accentForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.556 0 0)",
      sidebarPrimary: "oklch(0.488 0.243 264.376)",
      sidebarPrimaryForeground: "oklch(0.985 0 0)",
      sidebarAccent: "oklch(0.269 0 0)",
      sidebarAccentForeground: "oklch(0.985 0 0)",
    },
  },
  
  zinc: {
    light: {
      primary: "oklch(0.27 0.006 286)",
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.96 0.003 286)",
      secondaryForeground: "oklch(0.27 0.006 286)",
      accent: "oklch(0.96 0.003 286)",
      accentForeground: "oklch(0.27 0.006 286)",
      ring: "oklch(0.52 0.006 286)",
      sidebarPrimary: "oklch(0.27 0.006 286)",
      sidebarPrimaryForeground: "oklch(0.985 0 0)",
      sidebarAccent: "oklch(0.96 0.003 286)",
      sidebarAccentForeground: "oklch(0.27 0.006 286)",
    },
    dark: {
      primary: "oklch(0.92 0.004 286)",
      primaryForeground: "oklch(0.21 0.006 286)",
      secondary: "oklch(0.27 0.005 286)",
      secondaryForeground: "oklch(0.985 0 0)",
      accent: "oklch(0.27 0.005 286)",
      accentForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.52 0.006 286)",
      sidebarPrimary: "oklch(0.92 0.004 286)",
      sidebarPrimaryForeground: "oklch(0.21 0.006 286)",
      sidebarAccent: "oklch(0.27 0.005 286)",
      sidebarAccentForeground: "oklch(0.985 0 0)",
    },
  },

  slate: {
    light: {
      primary: "oklch(0.27 0.015 265)",
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.96 0.005 265)",
      secondaryForeground: "oklch(0.27 0.015 265)",
      accent: "oklch(0.96 0.005 265)",
      accentForeground: "oklch(0.27 0.015 265)",
      ring: "oklch(0.55 0.015 265)",
      sidebarPrimary: "oklch(0.27 0.015 265)",
      sidebarPrimaryForeground: "oklch(0.985 0 0)",
      sidebarAccent: "oklch(0.96 0.005 265)",
      sidebarAccentForeground: "oklch(0.27 0.015 265)",
    },
    dark: {
      primary: "oklch(0.92 0.008 265)",
      primaryForeground: "oklch(0.21 0.015 265)",
      secondary: "oklch(0.27 0.01 265)",
      secondaryForeground: "oklch(0.985 0 0)",
      accent: "oklch(0.27 0.01 265)",
      accentForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.55 0.015 265)",
      sidebarPrimary: "oklch(0.92 0.008 265)",
      sidebarPrimaryForeground: "oklch(0.21 0.015 265)",
      sidebarAccent: "oklch(0.27 0.01 265)",
      sidebarAccentForeground: "oklch(0.985 0 0)",
    },
  },

  blue: {
    light: {
      primary: "oklch(0.55 0.22 262)",
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.95 0.03 262)",
      secondaryForeground: "oklch(0.35 0.15 262)",
      accent: "oklch(0.92 0.04 262)",
      accentForeground: "oklch(0.35 0.15 262)",
      ring: "oklch(0.55 0.22 262)",
      sidebarPrimary: "oklch(0.55 0.22 262)",
      sidebarPrimaryForeground: "oklch(0.985 0 0)",
      sidebarAccent: "oklch(0.92 0.04 262)",
      sidebarAccentForeground: "oklch(0.35 0.15 262)",
    },
    dark: {
      primary: "oklch(0.65 0.20 262)",
      primaryForeground: "oklch(0.145 0 0)",
      secondary: "oklch(0.25 0.08 262)",
      secondaryForeground: "oklch(0.985 0 0)",
      accent: "oklch(0.30 0.10 262)",
      accentForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.55 0.20 262)",
      sidebarPrimary: "oklch(0.65 0.20 262)",
      sidebarPrimaryForeground: "oklch(0.145 0 0)",
      sidebarAccent: "oklch(0.30 0.10 262)",
      sidebarAccentForeground: "oklch(0.985 0 0)",
    },
  },

  violet: {
    light: {
      primary: "oklch(0.55 0.24 293)",
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.95 0.04 293)",
      secondaryForeground: "oklch(0.35 0.16 293)",
      accent: "oklch(0.92 0.05 293)",
      accentForeground: "oklch(0.35 0.16 293)",
      ring: "oklch(0.55 0.24 293)",
      sidebarPrimary: "oklch(0.55 0.24 293)",
      sidebarPrimaryForeground: "oklch(0.985 0 0)",
      sidebarAccent: "oklch(0.92 0.05 293)",
      sidebarAccentForeground: "oklch(0.35 0.16 293)",
    },
    dark: {
      primary: "oklch(0.65 0.22 293)",
      primaryForeground: "oklch(0.145 0 0)",
      secondary: "oklch(0.25 0.10 293)",
      secondaryForeground: "oklch(0.985 0 0)",
      accent: "oklch(0.30 0.12 293)",
      accentForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.55 0.22 293)",
      sidebarPrimary: "oklch(0.65 0.22 293)",
      sidebarPrimaryForeground: "oklch(0.145 0 0)",
      sidebarAccent: "oklch(0.30 0.12 293)",
      sidebarAccentForeground: "oklch(0.985 0 0)",
    },
  },

  green: {
    light: {
      primary: "oklch(0.55 0.17 162)",
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.95 0.03 162)",
      secondaryForeground: "oklch(0.35 0.12 162)",
      accent: "oklch(0.92 0.04 162)",
      accentForeground: "oklch(0.35 0.12 162)",
      ring: "oklch(0.55 0.17 162)",
      sidebarPrimary: "oklch(0.55 0.17 162)",
      sidebarPrimaryForeground: "oklch(0.985 0 0)",
      sidebarAccent: "oklch(0.92 0.04 162)",
      sidebarAccentForeground: "oklch(0.35 0.12 162)",
    },
    dark: {
      primary: "oklch(0.65 0.17 162)",
      primaryForeground: "oklch(0.145 0 0)",
      secondary: "oklch(0.25 0.07 162)",
      secondaryForeground: "oklch(0.985 0 0)",
      accent: "oklch(0.30 0.09 162)",
      accentForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.55 0.17 162)",
      sidebarPrimary: "oklch(0.65 0.17 162)",
      sidebarPrimaryForeground: "oklch(0.145 0 0)",
      sidebarAccent: "oklch(0.30 0.09 162)",
      sidebarAccentForeground: "oklch(0.985 0 0)",
    },
  },

  orange: {
    light: {
      primary: "oklch(0.65 0.20 50)",
      primaryForeground: "oklch(0.145 0 0)",
      secondary: "oklch(0.96 0.04 50)",
      secondaryForeground: "oklch(0.45 0.15 50)",
      accent: "oklch(0.94 0.05 50)",
      accentForeground: "oklch(0.45 0.15 50)",
      ring: "oklch(0.65 0.20 50)",
      sidebarPrimary: "oklch(0.65 0.20 50)",
      sidebarPrimaryForeground: "oklch(0.145 0 0)",
      sidebarAccent: "oklch(0.94 0.05 50)",
      sidebarAccentForeground: "oklch(0.45 0.15 50)",
    },
    dark: {
      primary: "oklch(0.70 0.18 50)",
      primaryForeground: "oklch(0.145 0 0)",
      secondary: "oklch(0.28 0.08 50)",
      secondaryForeground: "oklch(0.985 0 0)",
      accent: "oklch(0.32 0.10 50)",
      accentForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.60 0.18 50)",
      sidebarPrimary: "oklch(0.70 0.18 50)",
      sidebarPrimaryForeground: "oklch(0.145 0 0)",
      sidebarAccent: "oklch(0.32 0.10 50)",
      sidebarAccentForeground: "oklch(0.985 0 0)",
    },
  },

  rose: {
    light: {
      primary: "oklch(0.55 0.20 12)",
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.96 0.03 12)",
      secondaryForeground: "oklch(0.40 0.14 12)",
      accent: "oklch(0.94 0.04 12)",
      accentForeground: "oklch(0.40 0.14 12)",
      ring: "oklch(0.55 0.20 12)",
      sidebarPrimary: "oklch(0.55 0.20 12)",
      sidebarPrimaryForeground: "oklch(0.985 0 0)",
      sidebarAccent: "oklch(0.94 0.04 12)",
      sidebarAccentForeground: "oklch(0.40 0.14 12)",
    },
    dark: {
      primary: "oklch(0.65 0.18 12)",
      primaryForeground: "oklch(0.145 0 0)",
      secondary: "oklch(0.26 0.08 12)",
      secondaryForeground: "oklch(0.985 0 0)",
      accent: "oklch(0.30 0.10 12)",
      accentForeground: "oklch(0.985 0 0)",
      ring: "oklch(0.55 0.18 12)",
      sidebarPrimary: "oklch(0.65 0.18 12)",
      sidebarPrimaryForeground: "oklch(0.145 0 0)",
      sidebarAccent: "oklch(0.30 0.10 12)",
      sidebarAccentForeground: "oklch(0.985 0 0)",
    },
  },
};

// ============================================
// NEUTRAL SCALES (GRAY FAMILIES)
// ============================================

export const neutralScales: Record<NeutralScale, NeutralScaleTokens> = {
  gray: {
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.145 0 0)",
      popover: "oklch(1 0 0)",
      popoverForeground: "oklch(0.145 0 0)",
      muted: "oklch(0.97 0 0)",
      mutedForeground: "oklch(0.556 0 0)",
      border: "oklch(0.922 0 0)",
      input: "oklch(0.922 0 0)",
    },
    dark: {
      background: "oklch(0.145 0 0)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.205 0 0)",
      cardForeground: "oklch(0.985 0 0)",
      popover: "oklch(0.205 0 0)",
      popoverForeground: "oklch(0.985 0 0)",
      muted: "oklch(0.269 0 0)",
      mutedForeground: "oklch(0.708 0 0)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
    },
  },

  slate: {
    light: {
      background: "oklch(1 0.002 265)",
      foreground: "oklch(0.15 0.015 265)",
      card: "oklch(1 0.002 265)",
      cardForeground: "oklch(0.15 0.015 265)",
      popover: "oklch(1 0.002 265)",
      popoverForeground: "oklch(0.15 0.015 265)",
      muted: "oklch(0.97 0.005 265)",
      mutedForeground: "oklch(0.55 0.01 265)",
      border: "oklch(0.92 0.005 265)",
      input: "oklch(0.92 0.005 265)",
    },
    dark: {
      background: "oklch(0.15 0.015 265)",
      foreground: "oklch(0.985 0.002 265)",
      card: "oklch(0.21 0.012 265)",
      cardForeground: "oklch(0.985 0.002 265)",
      popover: "oklch(0.21 0.012 265)",
      popoverForeground: "oklch(0.985 0.002 265)",
      muted: "oklch(0.27 0.01 265)",
      mutedForeground: "oklch(0.71 0.005 265)",
      border: "oklch(1 0.005 265 / 10%)",
      input: "oklch(1 0.005 265 / 15%)",
    },
  },

  zinc: {
    light: {
      background: "oklch(1 0.001 286)",
      foreground: "oklch(0.15 0.006 286)",
      card: "oklch(1 0.001 286)",
      cardForeground: "oklch(0.15 0.006 286)",
      popover: "oklch(1 0.001 286)",
      popoverForeground: "oklch(0.15 0.006 286)",
      muted: "oklch(0.97 0.003 286)",
      mutedForeground: "oklch(0.55 0.005 286)",
      border: "oklch(0.92 0.003 286)",
      input: "oklch(0.92 0.003 286)",
    },
    dark: {
      background: "oklch(0.15 0.006 286)",
      foreground: "oklch(0.985 0.001 286)",
      card: "oklch(0.21 0.005 286)",
      cardForeground: "oklch(0.985 0.001 286)",
      popover: "oklch(0.21 0.005 286)",
      popoverForeground: "oklch(0.985 0.001 286)",
      muted: "oklch(0.27 0.004 286)",
      mutedForeground: "oklch(0.71 0.003 286)",
      border: "oklch(1 0.003 286 / 10%)",
      input: "oklch(1 0.003 286 / 15%)",
    },
  },

  neutral: {
    light: {
      background: "oklch(1 0.002 90)",
      foreground: "oklch(0.15 0.004 90)",
      card: "oklch(1 0.002 90)",
      cardForeground: "oklch(0.15 0.004 90)",
      popover: "oklch(1 0.002 90)",
      popoverForeground: "oklch(0.15 0.004 90)",
      muted: "oklch(0.97 0.004 90)",
      mutedForeground: "oklch(0.55 0.004 90)",
      border: "oklch(0.92 0.004 90)",
      input: "oklch(0.92 0.004 90)",
    },
    dark: {
      background: "oklch(0.15 0.004 90)",
      foreground: "oklch(0.985 0.002 90)",
      card: "oklch(0.21 0.003 90)",
      cardForeground: "oklch(0.985 0.002 90)",
      popover: "oklch(0.21 0.003 90)",
      popoverForeground: "oklch(0.985 0.002 90)",
      muted: "oklch(0.27 0.003 90)",
      mutedForeground: "oklch(0.71 0.003 90)",
      border: "oklch(1 0.003 90 / 10%)",
      input: "oklch(1 0.003 90 / 15%)",
    },
  },

  stone: {
    light: {
      background: "oklch(1 0.004 70)",
      foreground: "oklch(0.15 0.008 70)",
      card: "oklch(1 0.004 70)",
      cardForeground: "oklch(0.15 0.008 70)",
      popover: "oklch(1 0.004 70)",
      popoverForeground: "oklch(0.15 0.008 70)",
      muted: "oklch(0.97 0.006 70)",
      mutedForeground: "oklch(0.55 0.006 70)",
      border: "oklch(0.92 0.006 70)",
      input: "oklch(0.92 0.006 70)",
    },
    dark: {
      background: "oklch(0.15 0.008 70)",
      foreground: "oklch(0.985 0.004 70)",
      card: "oklch(0.21 0.006 70)",
      cardForeground: "oklch(0.985 0.004 70)",
      popover: "oklch(0.21 0.006 70)",
      popoverForeground: "oklch(0.985 0.004 70)",
      muted: "oklch(0.27 0.005 70)",
      mutedForeground: "oklch(0.71 0.004 70)",
      border: "oklch(1 0.005 70 / 10%)",
      input: "oklch(1 0.005 70 / 15%)",
    },
  },
};

// ============================================
// UI OPTIONS FOR SELECTORS
// ============================================

export const colorPresetOptions = [
  { 
    value: "neutral" as const, 
    label: "Neutral (Default)", 
    description: "shadcn default grayscale",
    swatch: "#27272a",
  },
  { 
    value: "zinc" as const, 
    label: "Zinc", 
    description: "Cool dark gray",
    swatch: "#3f3f46",
  },
  { 
    value: "slate" as const, 
    label: "Slate", 
    description: "Blue-tinted gray",
    swatch: "#334155",
  },
  { 
    value: "blue" as const, 
    label: "Blue", 
    description: "Classic blue",
    swatch: "#2563eb",
  },
  { 
    value: "violet" as const, 
    label: "Violet", 
    description: "Purple/violet",
    swatch: "#7c3aed",
  },
  { 
    value: "green" as const, 
    label: "Green", 
    description: "Emerald green",
    swatch: "#059669",
  },
  { 
    value: "orange" as const, 
    label: "Orange", 
    description: "Warm orange",
    swatch: "#ea580c",
  },
  { 
    value: "rose" as const, 
    label: "Rose", 
    description: "Pink/rose",
    swatch: "#e11d48",
  },
];

export const neutralScaleOptions = [
  { 
    value: "gray" as const, 
    label: "Gray", 
    description: "True neutral",
  },
  { 
    value: "slate" as const, 
    label: "Slate", 
    description: "Cool blue undertone",
  },
  { 
    value: "zinc" as const, 
    label: "Zinc", 
    description: "Subtle warm gray",
  },
  { 
    value: "neutral" as const, 
    label: "Neutral", 
    description: "Warm neutral",
  },
  { 
    value: "stone" as const, 
    label: "Stone", 
    description: "Warm brown undertone",
  },
];

// ============================================
// DEFAULT VALUES
// ============================================

export const defaultColorPreset: ColorPreset = "neutral";
export const defaultNeutralScale: NeutralScale = "gray";

// ============================================
// SEMANTIC FEEDBACK COLORS (CONSTANT)
// ============================================

export const semanticColors = {
  light: {
    success: "oklch(0.55 0.17 162)",
    successForeground: "oklch(0.985 0 0)",
    warning: "oklch(0.75 0.18 85)",
    warningForeground: "oklch(0.145 0 0)",
    info: "oklch(0.55 0.20 250)",
    infoForeground: "oklch(0.985 0 0)",
  },
  dark: {
    success: "oklch(0.65 0.17 162)",
    successForeground: "oklch(0.145 0 0)",
    warning: "oklch(0.80 0.15 85)",
    warningForeground: "oklch(0.145 0 0)",
    info: "oklch(0.65 0.18 250)",
    infoForeground: "oklch(0.145 0 0)",
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get CSS variables for a color preset in a specific mode
 */
export function getColorPresetStyles(
  preset: ColorPreset,
  mode: "light" | "dark"
): Record<string, string> {
  const tokens = colorPresets[preset][mode];
  return {
    "--primary": tokens.primary,
    "--primary-foreground": tokens.primaryForeground,
    "--secondary": tokens.secondary,
    "--secondary-foreground": tokens.secondaryForeground,
    "--accent": tokens.accent,
    "--accent-foreground": tokens.accentForeground,
    "--ring": tokens.ring,
    "--sidebar-primary": tokens.sidebarPrimary,
    "--sidebar-primary-foreground": tokens.sidebarPrimaryForeground,
    "--sidebar-accent": tokens.sidebarAccent,
    "--sidebar-accent-foreground": tokens.sidebarAccentForeground,
  };
}

/**
 * Get CSS variables for a neutral scale in a specific mode
 */
export function getNeutralScaleStyles(
  scale: NeutralScale,
  mode: "light" | "dark"
): Record<string, string> {
  const tokens = neutralScales[scale][mode];
  return {
    "--background": tokens.background,
    "--foreground": tokens.foreground,
    "--card": tokens.card,
    "--card-foreground": tokens.cardForeground,
    "--popover": tokens.popover,
    "--popover-foreground": tokens.popoverForeground,
    "--muted": tokens.muted,
    "--muted-foreground": tokens.mutedForeground,
    "--border": tokens.border,
    "--input": tokens.input,
  };
}
