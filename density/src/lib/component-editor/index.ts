/**
 * COMPONENT EDITOR
 * 
 * Main entry point for the component token editor system.
 * 
 * This module provides:
 * - Type definitions for component specifications
 * - Component registry with dependency tracking
 * - Slot presets with inheritance
 * - Token resolution with context awareness
 * - Impact analysis for token changes
 */

// Types
export * from "./types";

// Registry (exclude duplicated exports)
export {
  registerComponent,
  registerComponents,
  unregisterComponent,
  getComponent,
  getAllComponents,
  getComponentsGroupedByCategory,
  getComponentDependency,
  getDependents,
  getDependencies,
  getDependencyTree,
  searchComponents,
  analyzeTokenImpact,
  analyzeSlotImpact,
  getRegistry,
  isRegistered,
  getComponentCount,
  getCategoryCounts,
  validateRegistry,
  clearRegistry,
  type TokenImpact,
  type RegistryValidationResult,
} from "./registry";

// Slots
export * from "./slots";

// Resolver
export * from "./resolver";

// Store
export * from "./store";

// Export
export * from "./export";

// Figma Integration
export {
  type FigmaSyncConfig,
  type FigmaDesignContext,
  type FigmaVariableDef,
  type FigmaCodeConnectMapping,
  type FigmaSyncResult,
  parseFigmaUrl,
  createFigmaSyncConfig,
  type DesignTokenMapping,
  type PropertyTypeMapping,
  mapFigmaVariablesToTokens,
  mapTokensToFigmaVariables,
  createPropertyTypeMapping,
  inferTokenCategoryFromFigmaType,
  type CodeConnectSuggestion,
  generateCodeConnectConfigs as generateFigmaCodeConnectConfigs,
  mapComponentToCodeConnect,
} from "./figma";

// Specifications
export {
  allComponentSpecs,
  primitiveSpecs,
  compositeSpecs,
  overlaySpecs,
  buttonSpec,
  inputSpec,
  badgeSpec,
  cardSpec,
  alertSpec,
  dialogSpec,
  initializeComponentSpecs,
  isInitialized,
  getAllSpecs,
  getSpecByName,
} from "./specs";

// ============================================
// QUICK START
// ============================================

import { initializeComponentSpecs } from "./specs";
import { initializeSlotRegistry } from "./slots";

/**
 * Initialize the full component editor system
 */
export function initializeComponentEditor(): void {
  initializeSlotRegistry();
  initializeComponentSpecs();
}

// Auto-initialize on import
initializeComponentEditor();
