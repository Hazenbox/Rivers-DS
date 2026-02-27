/**
 * TOKEN RESOLVER
 * 
 * Resolves token references to actual CSS values based on context.
 * Handles the resolution chain: instance override -> slot -> variant -> semantic -> primitive
 */

import type {
  TokenReference,
  TokenResolutionContext,
  ComponentSpec,
  TokenablePropertySpec,
  InteractionState,
  Breakpoint,
} from "../types";
import { resolveSlot } from "../slots";
import { getComponent } from "../registry";

// ============================================
// RESOLUTION CONTEXT
// ============================================

export interface ResolverConfig {
  context: TokenResolutionContext;
  customTokens: Map<string, string>; // id -> resolved value
  componentOverrides: Map<string, Map<string, TokenReference>>; // componentName -> (propertyKey -> override)
}

export function createDefaultContext(): TokenResolutionContext {
  return {
    theme: "light",
    density: "default",
    colorPreset: "default",
    neutralScale: "slate",
    breakpoint: undefined,
  };
}

export function createResolverConfig(
  partial: Partial<ResolverConfig> = {}
): ResolverConfig {
  return {
    context: partial.context || createDefaultContext(),
    customTokens: partial.customTokens || new Map(),
    componentOverrides: partial.componentOverrides || new Map(),
  };
}

// ============================================
// CORE RESOLUTION
// ============================================

/**
 * Resolve a token reference to a CSS value
 */
export function resolveToken(
  ref: TokenReference,
  config: ResolverConfig
): string {
  switch (ref.type) {
    case "literal":
      return ref.value;
    
    case "system":
      return resolveSystemToken(ref.path, config);
    
    case "custom":
      return resolveCustomToken(ref.id, config);
    
    case "alias":
      return resolveAliasToken(ref.ref, config);
    
    default:
      return "";
  }
}

/**
 * Resolve a system token path to CSS variable reference
 */
function resolveSystemToken(
  path: string,
  config: ResolverConfig
): string {
  // Convert path like "colors.primary" to CSS variable "--primary"
  // or "spacing.4" to CSS variable "--spacing-4"
  const parts = path.split(".");
  
  if (parts[0] === "colors") {
    // Handle color tokens: colors.primary -> var(--primary)
    const colorName = parts.slice(1).join("-");
    return `var(--${colorName})`;
  }
  
  if (parts[0] === "spacing") {
    // Handle spacing tokens: spacing.4 -> var(--spacing-4) or use rem value
    const spacingValue = parts.slice(1).join("-");
    return `var(--spacing-${spacingValue}, ${convertSpacingToRem(spacingValue)})`;
  }
  
  if (parts[0] === "radius") {
    // Handle radius tokens
    const radiusName = parts.slice(1).join("-");
    return `var(--radius-${radiusName})`;
  }
  
  if (parts[0] === "typography") {
    // Handle typography tokens
    const typoPart = parts[1];
    const typoValue = parts.slice(2).join("-");
    if (typoPart === "fontSize") {
      return `var(--font-size-${typoValue})`;
    }
    if (typoPart === "fontWeight") {
      return `var(--font-weight-${typoValue})`;
    }
    if (typoPart === "lineHeight") {
      return `var(--line-height-${typoValue})`;
    }
  }
  
  if (parts[0] === "shadow") {
    // Handle shadow tokens
    const shadowName = parts.slice(1).join("-");
    return `var(--shadow-${shadowName})`;
  }
  
  if (parts[0] === "border") {
    // Handle border tokens
    const borderPart = parts.slice(1).join("-");
    return `var(--border-${borderPart})`;
  }
  
  // Generic fallback
  const varName = parts.join("-");
  return `var(--${varName})`;
}

/**
 * Resolve a custom token by ID
 */
function resolveCustomToken(
  id: string,
  config: ResolverConfig
): string {
  const value = config.customTokens.get(id);
  if (value) return value;
  
  // Return a CSS variable reference for the custom token
  return `var(--custom-${id})`;
}

/**
 * Resolve an alias reference (recursive)
 */
function resolveAliasToken(
  refPath: string,
  config: ResolverConfig,
  visited: Set<string> = new Set()
): string {
  // Prevent infinite loops
  if (visited.has(refPath)) {
    console.warn(`Circular token reference detected: ${refPath}`);
    return "";
  }
  visited.add(refPath);
  
  // Check if it's a custom token
  if (config.customTokens.has(refPath)) {
    return resolveCustomToken(refPath, config);
  }
  
  // Otherwise treat as system token
  return resolveSystemToken(refPath, config);
}

/**
 * Convert spacing value to rem
 */
function convertSpacingToRem(value: string): string {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return value;
  
  // Tailwind spacing scale: 1 = 0.25rem
  return `${numericValue * 0.25}rem`;
}

// ============================================
// COMPONENT TOKEN RESOLUTION
// ============================================

export interface ResolvedComponentTokens {
  [propertyKey: string]: string; // property@slot@variant@state -> CSS value
}

export interface PropertyKey {
  property: string;
  slot: string;
  variant?: string;
  state?: string;
}

export function createPropertyKey(parts: PropertyKey): string {
  const { property, slot, variant, state } = parts;
  let key = `${property}@${slot}`;
  if (variant) key += `@${variant}`;
  if (state) key += `@${state}`;
  return key;
}

export function parsePropertyKey(key: string): PropertyKey {
  const [property, slot, variant, state] = key.split("@");
  return { property, slot, variant, state };
}

/**
 * Resolve all tokens for a component
 */
export function resolveComponentTokens(
  componentName: string,
  config: ResolverConfig,
  options: {
    variant?: string;
    size?: string;
    states?: InteractionState[];
  } = {}
): ResolvedComponentTokens {
  const spec = getComponent(componentName);
  if (!spec) return {};
  
  const resolved: ResolvedComponentTokens = {};
  const { variant = spec.variants[0]?.value, size, states = ["default"] } = options;
  
  // Get component-level overrides
  const componentOverrides = config.componentOverrides.get(componentName);
  
  for (const prop of spec.tokenableProperties) {
    // Skip if property doesn't apply to this variant
    if (prop.variants && !prop.variants.includes(variant!)) {
      continue;
    }
    
    // Resolve for each applicable state
    const applicableStates = prop.states 
      ? states.filter(s => prop.states!.includes(s))
      : states;
    
    for (const state of applicableStates) {
      const propertyKey = createPropertyKey({
        property: prop.name,
        slot: prop.slot,
        variant,
        state,
      });
      
      // Resolution chain: override -> slot state -> slot default -> property default
      let tokenRef: TokenReference | undefined;
      
      // 1. Check component-level overrides
      if (componentOverrides) {
        tokenRef = componentOverrides.get(propertyKey);
      }
      
      // 2. Check slot preset for this variant
      if (!tokenRef) {
        const variantSpec = spec.variants.find(v => v.value === variant);
        if (variantSpec?.slotPreset) {
          const resolvedSlot = resolveSlot(variantSpec.slotPreset);
          if (resolvedSlot) {
            // Check state-specific token
            if (state !== "default" && resolvedSlot.resolvedStates[state]) {
              const stateTokens = resolvedSlot.resolvedStates[state];
              const slotTokenRef = getSlotToken(stateTokens as unknown as Record<string, unknown>, prop);
              if (slotTokenRef) tokenRef = slotTokenRef;
            }
            
            // Fall back to default slot token
            if (!tokenRef) {
              const slotTokenRef = getSlotToken(resolvedSlot.resolvedTokens as unknown as Record<string, unknown>, prop);
              if (slotTokenRef) tokenRef = slotTokenRef;
            }
          }
        }
      }
      
      // 3. Check size overrides
      if (!tokenRef && size) {
        const sizeSpec = spec.sizes.find(s => s.value === size);
        if (sizeSpec?.tokenOverrides?.[prop.name]) {
          tokenRef = sizeSpec.tokenOverrides[prop.name];
        }
      }
      
      // 4. Fall back to property default
      if (!tokenRef) {
        tokenRef = prop.defaultToken;
      }
      
      // Resolve the token reference
      resolved[propertyKey] = resolveToken(tokenRef, config);
    }
  }
  
  return resolved;
}

/**
 * Get a token from slot tokens based on property spec
 */
function getSlotToken(
  slotTokens: Record<string, unknown>,
  prop: TokenablePropertySpec
): TokenReference | undefined {
  // Map property name to slot token path
  const category = prop.category;
  const name = prop.name;
  
  // Check in category-specific section
  const categoryTokens = slotTokens[`${category}s`] || slotTokens[category];
  if (categoryTokens && typeof categoryTokens === "object") {
    const token = (categoryTokens as Record<string, unknown>)[name];
    if (token && typeof token === "object" && "type" in token) {
      return token as TokenReference;
    }
  }
  
  // Check color mappings
  if (category === "color") {
    const colors = slotTokens.colors;
    if (colors && typeof colors === "object") {
      // Map property names to slot color names
      const colorMapping: Record<string, string> = {
        background: "background",
        foreground: "foreground",
        border: "border",
        placeholder: "placeholder",
        ring: "ring",
        shadow: "shadow",
      };
      const colorKey = colorMapping[name] || name;
      const token = (colors as Record<string, unknown>)[colorKey];
      if (token && typeof token === "object" && "type" in token) {
        return token as TokenReference;
      }
    }
  }
  
  // Check border/radius
  if (category === "radius" || category === "border") {
    const border = slotTokens.border;
    if (border && typeof border === "object") {
      const token = (border as Record<string, unknown>)[name];
      if (token && typeof token === "object" && "type" in token) {
        return token as TokenReference;
      }
    }
  }
  
  return undefined;
}

// ============================================
// CSS GENERATION
// ============================================

/**
 * Generate CSS custom properties for resolved tokens
 */
export function generateCSSVariables(
  resolved: ResolvedComponentTokens,
  options: {
    prefix?: string;
    selector?: string;
  } = {}
): string {
  const { prefix = "", selector = ":root" } = options;
  
  const lines: string[] = [`${selector} {`];
  
  for (const [key, value] of Object.entries(resolved)) {
    const varName = prefix 
      ? `--${prefix}-${key.replace(/@/g, "-")}`
      : `--${key.replace(/@/g, "-")}`;
    lines.push(`  ${varName}: ${value};`);
  }
  
  lines.push("}");
  return lines.join("\n");
}

/**
 * Generate inline styles for live preview
 */
export function generateInlineStyles(
  resolved: ResolvedComponentTokens,
  propertyMappings: Record<string, string>
): Record<string, string> {
  const styles: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(resolved)) {
    const { property } = parsePropertyKey(key);
    const cssProperty = propertyMappings[property];
    if (cssProperty) {
      styles[cssProperty] = value;
    }
  }
  
  return styles;
}

// ============================================
// CONTEXT-AWARE RESOLUTION
// ============================================

/**
 * Resolve tokens with breakpoint awareness
 */
export function resolveResponsiveTokens(
  componentName: string,
  config: ResolverConfig,
  breakpoints: Breakpoint[]
): Record<Breakpoint, ResolvedComponentTokens> {
  const result: Record<string, ResolvedComponentTokens> = {};
  
  for (const bp of breakpoints) {
    // Only set breakpoint if it's a valid TokenResolutionContext breakpoint
    const contextBreakpoint = bp === "base" ? undefined : bp;
    const bpConfig: ResolverConfig = {
      ...config,
      context: { ...config.context, breakpoint: contextBreakpoint },
    };
    result[bp] = resolveComponentTokens(componentName, bpConfig);
  }
  
  return result as Record<Breakpoint, ResolvedComponentTokens>;
}

/**
 * Resolve tokens for theme switching
 */
export function resolveThemedTokens(
  componentName: string,
  config: ResolverConfig
): {
  light: ResolvedComponentTokens;
  dark: ResolvedComponentTokens;
} {
  const lightConfig: ResolverConfig = {
    ...config,
    context: { ...config.context, theme: "light" },
  };
  
  const darkConfig: ResolverConfig = {
    ...config,
    context: { ...config.context, theme: "dark" },
  };
  
  return {
    light: resolveComponentTokens(componentName, lightConfig),
    dark: resolveComponentTokens(componentName, darkConfig),
  };
}
