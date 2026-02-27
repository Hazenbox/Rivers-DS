/**
 * TYPOGRAPHY TOKENS - Comprehensive font customization system
 * 
 * Three independent font categories:
 * 1. UI/Body Font - Interface text, body content
 * 2. Code Font - Monospace, technical text
 * 3. Display Font - Headlines, hero text
 */

// ============================================
// FONT PRESET TYPES
// ============================================

export type UIFontPreset = 
  | "inter" 
  | "roboto" 
  | "open-sans" 
  | "nunito" 
  | "lexend" 
  | "system";

export type CodeFontPreset = 
  | "jetbrains-mono" 
  | "fira-code" 
  | "source-code-pro" 
  | "roboto-mono" 
  | "system";

export type DisplayFontPreset = 
  | "same-as-ui" 
  | "playfair" 
  | "montserrat" 
  | "raleway";

// ============================================
// FONT WEIGHT TOKENS
// ============================================

export type FontWeight = "light" | "regular" | "medium" | "semibold" | "bold";

export const fontWeights: Record<FontWeight, number> = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const fontWeightOptions = [
  { value: "light" as const, label: "Light", numeric: 300 },
  { value: "regular" as const, label: "Regular", numeric: 400 },
  { value: "medium" as const, label: "Medium", numeric: 500 },
  { value: "semibold" as const, label: "Semibold", numeric: 600 },
  { value: "bold" as const, label: "Bold", numeric: 700 },
];

// ============================================
// LETTER SPACING TOKENS
// ============================================

export type LetterSpacing = "tighter" | "tight" | "normal" | "wide" | "wider";

export const letterSpacings: Record<LetterSpacing, string> = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
};

// ============================================
// FONT STACK DEFINITIONS
// ============================================

export const uiFontStacks: Record<UIFontPreset, string> = {
  "inter": "var(--font-inter), system-ui, sans-serif",
  "roboto": "var(--font-roboto), system-ui, sans-serif",
  "open-sans": "var(--font-open-sans), system-ui, sans-serif",
  "nunito": "var(--font-nunito), system-ui, sans-serif",
  "lexend": "var(--font-lexend), system-ui, sans-serif",
  "system": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

export const codeFontStacks: Record<CodeFontPreset, string> = {
  "jetbrains-mono": "var(--font-jetbrains-mono), ui-monospace, monospace",
  "fira-code": "var(--font-fira-code), ui-monospace, monospace",
  "source-code-pro": "var(--font-source-code-pro), ui-monospace, monospace",
  "roboto-mono": "var(--font-roboto-mono), ui-monospace, monospace",
  "system": "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, monospace",
};

export const displayFontStacks: Record<DisplayFontPreset, string> = {
  "same-as-ui": "var(--font-ui)",
  "playfair": "var(--font-playfair), Georgia, serif",
  "montserrat": "var(--font-montserrat), system-ui, sans-serif",
  "raleway": "var(--font-raleway), system-ui, sans-serif",
};

// ============================================
// UI OPTIONS FOR SELECTORS
// ============================================

export const uiFontOptions = [
  { 
    value: "inter" as const, 
    label: "Inter", 
    description: "Modern, screen-optimized",
    category: "Sans-serif",
  },
  { 
    value: "roboto" as const, 
    label: "Roboto", 
    description: "Neutral, enterprise",
    category: "Sans-serif",
  },
  { 
    value: "open-sans" as const, 
    label: "Open Sans", 
    description: "Friendly, humanist",
    category: "Sans-serif",
  },
  { 
    value: "nunito" as const, 
    label: "Nunito", 
    description: "Rounded, warm",
    category: "Sans-serif",
  },
  { 
    value: "lexend" as const, 
    label: "Lexend", 
    description: "Dyslexia-friendly",
    category: "Accessibility",
  },
  { 
    value: "system" as const, 
    label: "System", 
    description: "Native OS fonts",
    category: "System",
  },
];

export const codeFontOptions = [
  { 
    value: "jetbrains-mono" as const, 
    label: "JetBrains Mono", 
    description: "Ligatures, IDE-optimized",
    hasLigatures: true,
  },
  { 
    value: "fira-code" as const, 
    label: "Fira Code", 
    description: "Classic ligatures",
    hasLigatures: true,
  },
  { 
    value: "source-code-pro" as const, 
    label: "Source Code Pro", 
    description: "Clean, no ligatures",
    hasLigatures: false,
  },
  { 
    value: "roboto-mono" as const, 
    label: "Roboto Mono", 
    description: "Matches Roboto UI",
    hasLigatures: false,
  },
  { 
    value: "system" as const, 
    label: "System Mono", 
    description: "Native monospace",
    hasLigatures: false,
  },
];

export const displayFontOptions = [
  { 
    value: "same-as-ui" as const, 
    label: "Same as UI", 
    description: "Consistent with body",
    style: "match",
  },
  { 
    value: "playfair" as const, 
    label: "Playfair Display", 
    description: "Elegant serif",
    style: "serif",
  },
  { 
    value: "montserrat" as const, 
    label: "Montserrat", 
    description: "Geometric bold",
    style: "sans",
  },
  { 
    value: "raleway" as const, 
    label: "Raleway", 
    description: "Elegant thin",
    style: "sans",
  },
];

// ============================================
// DEFAULT VALUES
// ============================================

export const defaultUIFont: UIFontPreset = "inter";
export const defaultCodeFont: CodeFontPreset = "jetbrains-mono";
export const defaultDisplayFont: DisplayFontPreset = "same-as-ui";

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get CSS variables for a complete typography configuration
 */
export function getTypographyStyles(
  uiFont: UIFontPreset,
  codeFont: CodeFontPreset,
  displayFont: DisplayFontPreset
): Record<string, string> {
  return {
    "--font-ui": uiFontStacks[uiFont],
    "--font-code": codeFontStacks[codeFont],
    "--font-display": displayFontStacks[displayFont],
  };
}

/**
 * Check if a code font supports ligatures
 */
export function hasLigatures(codeFont: CodeFontPreset): boolean {
  const option = codeFontOptions.find(o => o.value === codeFont);
  return option?.hasLigatures ?? false;
}

/**
 * Check if the UI font is accessibility-focused
 */
export function isAccessibilityFont(uiFont: UIFontPreset): boolean {
  return uiFont === "lexend";
}
