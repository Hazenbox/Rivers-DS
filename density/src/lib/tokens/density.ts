/**
 * DENSITY TOKENS - Semantic tokens that change per density mode
 * Following shadcn convention: use CSS custom properties
 */
export type Density = "compact" | "default" | "spacious";

export interface DensityTokenSet {
  // Component Heights (most impactful lever)
  controlHeight: string;
  controlHeightSm: string;
  controlHeightLg: string;
  tableRowHeight: string;

  // Spacing - Vertical rhythm
  stackGap: string;
  sectionGap: string;

  // Spacing - Horizontal rhythm
  inlineGap: string;

  // Spacing - Insets (padding)
  insetXs: string;
  insetSm: string;
  insetMd: string;
  insetLg: string;
  insetXl: string;

  // Typography rhythm
  lineHeightBody: string;
  lineHeightHeading: string;
  textMarginAfterH1: string;
  textMarginAfterH2: string;
  textMarginAfterH3: string;
  textMarginAfterP: string;

  // Border radius (SCALES per user decision)
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  radiusXl: string;

  // Icon sizing
  iconSizeSm: string;
  iconSize: string;
  iconSizeLg: string;
}

export const densityTokens: Record<Density, DensityTokenSet> = {
  compact: {
    // Heights
    controlHeight: "32px",
    controlHeightSm: "24px",
    controlHeightLg: "40px",
    tableRowHeight: "36px",

    // Vertical spacing
    stackGap: "8px",
    sectionGap: "20px",

    // Horizontal spacing
    inlineGap: "6px",

    // Insets
    insetXs: "4px",
    insetSm: "6px",
    insetMd: "8px",
    insetLg: "12px",
    insetXl: "16px",

    // Typography rhythm
    lineHeightBody: "1.25",
    lineHeightHeading: "1.1",
    textMarginAfterH1: "12px",
    textMarginAfterH2: "8px",
    textMarginAfterH3: "6px",
    textMarginAfterP: "8px",

    // Border radius (sharper = more professional/dense feel)
    radiusSm: "2px",
    radiusMd: "4px",
    radiusLg: "6px",
    radiusXl: "8px",

    // Icons
    iconSizeSm: "12px",
    iconSize: "14px",
    iconSizeLg: "16px",
  },

  default: {
    // Heights
    controlHeight: "40px",
    controlHeightSm: "32px",
    controlHeightLg: "48px",
    tableRowHeight: "44px",

    // Vertical spacing
    stackGap: "12px",
    sectionGap: "24px",

    // Horizontal spacing
    inlineGap: "8px",

    // Insets
    insetXs: "6px",
    insetSm: "8px",
    insetMd: "12px",
    insetLg: "16px",
    insetXl: "24px",

    // Typography rhythm
    lineHeightBody: "1.43",
    lineHeightHeading: "1.25",
    textMarginAfterH1: "20px",
    textMarginAfterH2: "16px",
    textMarginAfterH3: "12px",
    textMarginAfterP: "16px",

    // Border radius (balanced)
    radiusSm: "4px",
    radiusMd: "6px",
    radiusLg: "8px",
    radiusXl: "12px",

    // Icons
    iconSizeSm: "14px",
    iconSize: "16px",
    iconSizeLg: "18px",
  },

  spacious: {
    // Heights
    controlHeight: "48px",
    controlHeightSm: "40px",
    controlHeightLg: "56px",
    tableRowHeight: "56px",

    // Vertical spacing
    stackGap: "16px",
    sectionGap: "32px",

    // Horizontal spacing
    inlineGap: "12px",

    // Insets
    insetXs: "8px",
    insetSm: "12px",
    insetMd: "16px",
    insetLg: "24px",
    insetXl: "32px",

    // Typography rhythm
    lineHeightBody: "1.57",
    lineHeightHeading: "1.35",
    textMarginAfterH1: "28px",
    textMarginAfterH2: "24px",
    textMarginAfterH3: "16px",
    textMarginAfterP: "24px",

    // Border radius (softer = more friendly/marketing feel)
    radiusSm: "6px",
    radiusMd: "8px",
    radiusLg: "12px",
    radiusXl: "16px",

    // Icons
    iconSizeSm: "16px",
    iconSize: "18px",
    iconSizeLg: "20px",
  },
};

// Vertical rhythm multipliers for documentation
export const densityMultipliers = {
  compact: 0.8, // -20% vertical rhythm
  default: 1.0, // baseline
  spacious: 1.25, // +25% vertical rhythm
} as const;

// Helper to get all density options for UI
export const densityOptions = [
  {
    value: "compact" as const,
    label: "Compact",
    description: "Data-dense layouts",
  },
  {
    value: "default" as const,
    label: "Default",
    description: "Balanced spacing",
  },
  {
    value: "spacious" as const,
    label: "Spacious",
    description: "Relaxed layouts",
  },
];
