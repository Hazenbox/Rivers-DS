/**
 * RESPONSIVE TOKENS
 * 
 * Defines breakpoint-aware token resolution for responsive design.
 */

import type { TokenReference } from "./token-reference";

// ============================================
// BREAKPOINT DEFINITIONS
// ============================================

export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface BreakpointDefinition {
  name: Breakpoint;
  minWidth: number;
  label: string;
  description?: string;
}

export const breakpoints: Record<Breakpoint, BreakpointDefinition> = {
  base: {
    name: "base",
    minWidth: 0,
    label: "Base",
    description: "Mobile-first base styles",
  },
  sm: {
    name: "sm",
    minWidth: 640,
    label: "Small",
    description: "Small tablets and large phones (640px+)",
  },
  md: {
    name: "md",
    minWidth: 768,
    label: "Medium",
    description: "Tablets (768px+)",
  },
  lg: {
    name: "lg",
    minWidth: 1024,
    label: "Large",
    description: "Small laptops (1024px+)",
  },
  xl: {
    name: "xl",
    minWidth: 1280,
    label: "Extra Large",
    description: "Desktops (1280px+)",
  },
  "2xl": {
    name: "2xl",
    minWidth: 1536,
    label: "2X Large",
    description: "Large desktops (1536px+)",
  },
};

export const breakpointOrder: Breakpoint[] = ["base", "sm", "md", "lg", "xl", "2xl"];

// ============================================
// RESPONSIVE TOKEN OVERRIDE
// ============================================

export interface ResponsiveTokenValue {
  /**
   * Base value (mobile-first)
   */
  base: TokenReference;
  
  /**
   * Breakpoint-specific overrides
   */
  breakpoints?: Partial<Record<Breakpoint, TokenReference>>;
}

export interface ResponsivePropertyOverride {
  /**
   * Component name
   */
  component: string;
  
  /**
   * Property name
   */
  property: string;
  
  /**
   * Slot (if applicable)
   */
  slot?: string;
  
  /**
   * Variant (if applicable)
   */
  variant?: string;
  
  /**
   * Responsive values
   */
  values: ResponsiveTokenValue;
}

// ============================================
// CONTAINER QUERY SUPPORT
// ============================================

export interface ContainerDefinition {
  name: string;
  type: "inline-size" | "size" | "normal";
}

export interface ContainerQueryOverride {
  /**
   * Container name (or empty for nearest)
   */
  container?: string;
  
  /**
   * Min width condition
   */
  minWidth?: number;
  
  /**
   * Max width condition
   */
  maxWidth?: number;
  
  /**
   * Token override
   */
  token: TokenReference;
}

// ============================================
// RESPONSIVE CONTEXT
// ============================================

export interface ResponsiveContext {
  /**
   * Current viewport breakpoint
   */
  viewport: Breakpoint;
  
  /**
   * Current viewport width
   */
  viewportWidth: number;
  
  /**
   * Container contexts (for container queries)
   */
  containers?: Record<string, number>;
  
  /**
   * Whether to prefer reduced motion
   */
  prefersReducedMotion?: boolean;
  
  /**
   * User's preferred color scheme
   */
  prefersColorScheme?: "light" | "dark" | "no-preference";
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get the current breakpoint based on viewport width
 */
export function getCurrentBreakpoint(width: number): Breakpoint {
  const orderedBreakpoints = [...breakpointOrder].reverse();
  for (const bp of orderedBreakpoints) {
    if (width >= breakpoints[bp].minWidth) {
      return bp;
    }
  }
  return "base";
}

/**
 * Resolve a responsive token value for a given breakpoint
 */
export function resolveResponsiveValue(
  value: ResponsiveTokenValue,
  breakpoint: Breakpoint
): TokenReference {
  if (!value.breakpoints) {
    return value.base;
  }
  
  // Find the closest defined breakpoint at or below the target
  const targetIndex = breakpointOrder.indexOf(breakpoint);
  for (let i = targetIndex; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (value.breakpoints[bp]) {
      return value.breakpoints[bp]!;
    }
  }
  
  return value.base;
}

/**
 * Check if a responsive value has any breakpoint overrides
 */
export function hasResponsiveOverrides(value: ResponsiveTokenValue): boolean {
  return Boolean(value.breakpoints && Object.keys(value.breakpoints).length > 0);
}

/**
 * Generate CSS media query for a breakpoint
 */
export function generateMediaQuery(breakpoint: Breakpoint): string {
  if (breakpoint === "base") {
    return ""; // No media query for base
  }
  return `@media (min-width: ${breakpoints[breakpoint].minWidth}px)`;
}

/**
 * Generate all CSS for responsive token
 */
export function generateResponsiveCSS(
  property: string,
  value: ResponsiveTokenValue,
  selector: string
): string {
  const lines: string[] = [];
  
  // Base value
  lines.push(`${selector} {`);
  lines.push(`  ${property}: var(--${tokenRefToVar(value.base)});`);
  lines.push(`}`);
  
  // Breakpoint overrides
  if (value.breakpoints) {
    for (const bp of breakpointOrder) {
      if (bp === "base") continue;
      const override = value.breakpoints[bp];
      if (override) {
        const mediaQuery = generateMediaQuery(bp);
        lines.push(`${mediaQuery} {`);
        lines.push(`  ${selector} {`);
        lines.push(`    ${property}: var(--${tokenRefToVar(override)});`);
        lines.push(`  }`);
        lines.push(`}`);
      }
    }
  }
  
  return lines.join("\n");
}

/**
 * Convert token reference to CSS variable name
 */
function tokenRefToVar(ref: TokenReference): string {
  if (ref.type === "system") {
    return ref.path.replace(/\./g, "-");
  }
  if (ref.type === "custom") {
    return `custom-${ref.id}`;
  }
  if (ref.type === "literal") {
    return ref.value;
  }
  if (ref.type === "alias") {
    return ref.ref.replace(/\./g, "-");
  }
  return "unknown";
}

// ============================================
// FLUID SCALING
// ============================================

export interface FluidScaleConfig {
  /**
   * Minimum value
   */
  min: string;
  
  /**
   * Maximum value
   */
  max: string;
  
  /**
   * Minimum viewport width
   */
  minViewport: number;
  
  /**
   * Maximum viewport width
   */
  maxViewport: number;
}

/**
 * Generate CSS clamp() for fluid scaling
 */
export function generateFluidClamp(config: FluidScaleConfig): string {
  const { min, max, minViewport, maxViewport } = config;
  
  // Calculate the slope
  const minValue = parseFloat(min);
  const maxValue = parseFloat(max);
  const minUnit = min.replace(/[\d.]/g, "");
  
  const slope = (maxValue - minValue) / (maxViewport - minViewport);
  const yIntercept = minValue - slope * minViewport;
  
  // Convert to vw-based calculation
  const slopeVw = slope * 100;
  
  return `clamp(${min}, ${yIntercept.toFixed(4)}${minUnit} + ${slopeVw.toFixed(4)}vw, ${max})`;
}
