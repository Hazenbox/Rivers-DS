/**
 * PRIMITIVE TOKENS - Immutable raw values
 * These NEVER change regardless of density mode
 */
export const primitives = {
  // 4px base grid spacing scale
  spacing: {
    0: "0px",
    0.5: "2px",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "28px",
    8: "32px",
    9: "36px",
    10: "40px",
    12: "48px",
    16: "64px",
    20: "80px",
  },

  // Typography scale (FIXED - never changes with density)
  fontSize: {
    xs: "0.6875rem", // 11px
    sm: "0.75rem", // 12px
    base: "0.875rem", // 14px - body text
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.5rem", // 24px
    "2xl": "2rem", // 32px
    "3xl": "2.5rem", // 40px
  },

  // Border widths (FIXED)
  borderWidth: {
    DEFAULT: "1px",
    2: "2px",
  },

  // Focus ring (FIXED for accessibility)
  focusRing: "2px",

  // Min touch target (WCAG 2.5.5 Level AAA)
  minTouchTarget: "44px",
} as const;

export type Primitives = typeof primitives;
