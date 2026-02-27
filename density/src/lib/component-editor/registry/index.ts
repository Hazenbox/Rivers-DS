/**
 * COMPONENT REGISTRY EXPORTS
 */

export {
  registerComponent,
  registerComponents,
  unregisterComponent,
  getComponent,
  getAllComponents,
  getComponentsByCategory,
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
} from "./component-registry";
