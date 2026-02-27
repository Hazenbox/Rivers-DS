/**
 * COMPONENT REGISTRY
 * 
 * Central registry for all component specifications.
 * Handles registration, dependency tracking, and component lookup.
 */

import type {
  ComponentSpec,
  ComponentCategory,
  ComponentRegistry,
  ComponentDependency,
} from "../types";

// ============================================
// REGISTRY STATE
// ============================================

const registryState: ComponentRegistry = {
  components: {},
  dependencies: {},
  categories: {
    primitive: [],
    composite: [],
    overlay: [],
    layout: [],
    feedback: [],
    navigation: [],
    "data-display": [],
  },
};

// ============================================
// REGISTRATION FUNCTIONS
// ============================================

/**
 * Register a component specification
 */
export function registerComponent(spec: ComponentSpec): void {
  // Add to components map
  registryState.components[spec.name] = spec;
  
  // Add to category index
  if (!registryState.categories[spec.category]) {
    registryState.categories[spec.category] = [];
  }
  if (!registryState.categories[spec.category].includes(spec.name)) {
    registryState.categories[spec.category].push(spec.name);
  }
  
  // Initialize dependency entry
  if (!registryState.dependencies[spec.name]) {
    registryState.dependencies[spec.name] = {
      component: spec.name,
      usedIn: [],
      usedBy: spec.dependencies,
    };
  } else {
    registryState.dependencies[spec.name].usedBy = spec.dependencies;
  }
  
  // Update reverse dependencies
  for (const dep of spec.dependencies) {
    if (!registryState.dependencies[dep]) {
      registryState.dependencies[dep] = {
        component: dep,
        usedIn: [spec.name],
        usedBy: [],
      };
    } else if (!registryState.dependencies[dep].usedIn.includes(spec.name)) {
      registryState.dependencies[dep].usedIn.push(spec.name);
    }
  }
}

/**
 * Register multiple components at once
 */
export function registerComponents(specs: ComponentSpec[]): void {
  for (const spec of specs) {
    registerComponent(spec);
  }
}

/**
 * Unregister a component
 */
export function unregisterComponent(name: string): void {
  const spec = registryState.components[name];
  if (!spec) return;
  
  // Remove from category
  const categoryIndex = registryState.categories[spec.category].indexOf(name);
  if (categoryIndex !== -1) {
    registryState.categories[spec.category].splice(categoryIndex, 1);
  }
  
  // Remove dependency references
  for (const dep of spec.dependencies) {
    const depEntry = registryState.dependencies[dep];
    if (depEntry) {
      const usedInIndex = depEntry.usedIn.indexOf(name);
      if (usedInIndex !== -1) {
        depEntry.usedIn.splice(usedInIndex, 1);
      }
    }
  }
  
  // Remove component
  delete registryState.components[name];
  delete registryState.dependencies[name];
}

// ============================================
// QUERY FUNCTIONS
// ============================================

/**
 * Get a component specification by name
 */
export function getComponent(name: string): ComponentSpec | undefined {
  return registryState.components[name];
}

/**
 * Get all registered components
 */
export function getAllComponents(): ComponentSpec[] {
  return Object.values(registryState.components);
}

/**
 * Get components by category
 */
export function getComponentsByCategory(category: ComponentCategory): ComponentSpec[] {
  const names = registryState.categories[category] || [];
  return names.map(name => registryState.components[name]).filter(Boolean);
}

/**
 * Get all categories with their components
 */
export function getComponentsGroupedByCategory(): Record<ComponentCategory, ComponentSpec[]> {
  const grouped: Record<string, ComponentSpec[]> = {};
  for (const [category, names] of Object.entries(registryState.categories)) {
    grouped[category] = names.map(name => registryState.components[name]).filter(Boolean);
  }
  return grouped as Record<ComponentCategory, ComponentSpec[]>;
}

/**
 * Get component dependency information
 */
export function getComponentDependency(name: string): ComponentDependency | undefined {
  return registryState.dependencies[name];
}

/**
 * Get all components that depend on a given component
 */
export function getDependents(componentName: string): string[] {
  return registryState.dependencies[componentName]?.usedIn || [];
}

/**
 * Get all components that a given component depends on
 */
export function getDependencies(componentName: string): string[] {
  return registryState.dependencies[componentName]?.usedBy || [];
}

/**
 * Get the full dependency tree for a component (recursive)
 */
export function getDependencyTree(
  componentName: string,
  direction: "up" | "down" = "down",
  visited: Set<string> = new Set()
): string[] {
  if (visited.has(componentName)) return [];
  visited.add(componentName);
  
  const deps = direction === "down"
    ? getDependencies(componentName)
    : getDependents(componentName);
  
  const tree: string[] = [...deps];
  for (const dep of deps) {
    tree.push(...getDependencyTree(dep, direction, visited));
  }
  
  return [...new Set(tree)];
}

/**
 * Search components by name or tags
 */
export function searchComponents(query: string): ComponentSpec[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(registryState.components).filter(spec => {
    if (spec.name.toLowerCase().includes(lowerQuery)) return true;
    if (spec.description?.toLowerCase().includes(lowerQuery)) return true;
    if (spec.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) return true;
    return false;
  });
}

// ============================================
// IMPACT ANALYSIS
// ============================================

export interface TokenImpact {
  component: string;
  slot: string;
  property: string;
  variant?: string;
  state?: string;
  isDirectUsage: boolean;
  throughComponent?: string; // If impact is through a nested component
}

/**
 * Analyze the impact of changing a token
 */
export function analyzeTokenImpact(tokenPath: string): TokenImpact[] {
  const impacts: TokenImpact[] = [];
  
  for (const spec of Object.values(registryState.components)) {
    // Check direct usage in tokenable properties
    for (const prop of spec.tokenableProperties) {
      if (
        prop.defaultToken.type === "system" &&
        prop.defaultToken.path === tokenPath
      ) {
        impacts.push({
          component: spec.name,
          slot: prop.slot,
          property: prop.name,
          variant: prop.variants?.[0],
          state: prop.states?.[0],
          isDirectUsage: true,
        });
      }
    }
    
    // Check nested component impacts
    if (spec.nestedComponents) {
      for (const [key, nested] of Object.entries(spec.nestedComponents)) {
        // Check token overrides
        if (nested.tokenOverrides) {
          for (const [propName, override] of Object.entries(nested.tokenOverrides)) {
            if (
              override.type === "system" &&
              override.path === tokenPath
            ) {
              impacts.push({
                component: spec.name,
                slot: nested.parentSlot,
                property: propName,
                isDirectUsage: false,
                throughComponent: nested.component,
              });
            }
          }
        }
        
        // Also check if the nested component itself uses the token
        const nestedSpec = registryState.components[nested.component];
        if (nestedSpec) {
          for (const prop of nestedSpec.tokenableProperties) {
            if (
              prop.defaultToken.type === "system" &&
              prop.defaultToken.path === tokenPath
            ) {
              impacts.push({
                component: spec.name,
                slot: nested.parentSlot,
                property: prop.name,
                isDirectUsage: false,
                throughComponent: nested.component,
              });
            }
          }
        }
      }
    }
  }
  
  return impacts;
}

/**
 * Get components affected by changing a slot preset
 */
export function analyzeSlotImpact(slotPresetId: string): string[] {
  const affected: string[] = [];
  
  for (const spec of Object.values(registryState.components)) {
    // Check if any slot uses this preset
    for (const slot of spec.slots) {
      if (slot.defaultPreset === slotPresetId) {
        affected.push(spec.name);
        break;
      }
    }
    
    // Check variant slot presets
    for (const variant of spec.variants) {
      if (variant.slotPreset === slotPresetId) {
        if (!affected.includes(spec.name)) {
          affected.push(spec.name);
        }
        break;
      }
    }
  }
  
  return affected;
}

// ============================================
// REGISTRY ACCESS
// ============================================

/**
 * Get the full registry state (readonly)
 */
export function getRegistry(): Readonly<ComponentRegistry> {
  return registryState;
}

/**
 * Check if a component is registered
 */
export function isRegistered(name: string): boolean {
  return name in registryState.components;
}

/**
 * Get count of registered components
 */
export function getComponentCount(): number {
  return Object.keys(registryState.components).length;
}

/**
 * Get count per category
 */
export function getCategoryCounts(): Record<ComponentCategory, number> {
  const counts: Record<string, number> = {};
  for (const [category, names] of Object.entries(registryState.categories)) {
    counts[category] = names.length;
  }
  return counts as Record<ComponentCategory, number>;
}

// ============================================
// VALIDATION
// ============================================

export interface RegistryValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate the entire registry for consistency
 */
export function validateRegistry(): RegistryValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  for (const spec of Object.values(registryState.components)) {
    // Check that all dependencies are registered
    for (const dep of spec.dependencies) {
      if (!registryState.components[dep]) {
        warnings.push(`${spec.name} depends on unregistered component "${dep}"`);
      }
    }
    
    // Check nested component references
    if (spec.nestedComponents) {
      for (const [key, nested] of Object.entries(spec.nestedComponents)) {
        if (!registryState.components[nested.component]) {
          warnings.push(
            `${spec.name} has nested component "${nested.component}" that is not registered`
          );
        }
      }
    }
  }
  
  // Check for circular dependencies
  for (const name of Object.keys(registryState.components)) {
    const tree = getDependencyTree(name, "down");
    if (tree.includes(name)) {
      errors.push(`Circular dependency detected for "${name}"`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Clear the registry (useful for testing)
 */
export function clearRegistry(): void {
  registryState.components = {};
  registryState.dependencies = {};
  for (const category of Object.keys(registryState.categories)) {
    registryState.categories[category as ComponentCategory] = [];
  }
}
