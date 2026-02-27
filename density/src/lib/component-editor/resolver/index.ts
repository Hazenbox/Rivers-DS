/**
 * RESOLVER EXPORTS
 */

export {
  // Types
  type ResolverConfig,
  type ResolvedComponentTokens,
  type PropertyKey,
  
  // Context creation
  createDefaultContext,
  createResolverConfig,
  
  // Core resolution
  resolveToken,
  resolveComponentTokens,
  
  // Property keys
  createPropertyKey,
  parsePropertyKey,
  
  // CSS generation
  generateCSSVariables,
  generateInlineStyles,
  
  // Context-aware resolution
  resolveResponsiveTokens,
  resolveThemedTokens,
} from "./token-resolver";

export {
  // Types
  type TokenChangeImpact,
  type ComponentImpact,
  type PropertyImpact,
  type SlotImpact,
  type ComponentNestingImpact,
  
  // Impact analysis
  analyzeTokenChange,
  analyzeSlotChange,
  analyzeComponentChange,
  analyzeCustomTokenChange,
  
  // Summary
  generateImpactSummary,
} from "./impact-analyzer";
