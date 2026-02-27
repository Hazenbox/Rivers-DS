/**
 * IMPACT ANALYZER
 * 
 * Analyzes the cascading impact of token changes across components.
 * Shows developers exactly what will change when they modify a token.
 */

import type { TokenReference, ComponentSpec } from "../types";
import { getAllComponents, getDependents, analyzeTokenImpact as registryAnalyzeTokenImpact } from "../registry";
import { resolveSlot, getAllSlots, slotInheritsFrom } from "../slots";

// ============================================
// IMPACT TYPES
// ============================================

export interface TokenChangeImpact {
  token: string;
  affectedComponents: ComponentImpact[];
  affectedSlots: SlotImpact[];
  totalAffectedProperties: number;
  severity: "low" | "medium" | "high";
}

export interface ComponentImpact {
  componentName: string;
  affectedProperties: PropertyImpact[];
  isDirectUsage: boolean;
  throughComponent?: string; // If impact is through nested component
  throughSlot?: string; // If impact is through slot
}

export interface PropertyImpact {
  property: string;
  slot: string;
  variant?: string;
  state?: string;
  currentValue: TokenReference;
  affectedBy: "direct" | "slot" | "nested";
}

export interface SlotImpact {
  slotId: string;
  slotName: string;
  affectedProperty: string;
  inheritedBy: string[]; // Slots that inherit from this
  usedByComponents: string[];
}

// ============================================
// IMPACT ANALYSIS
// ============================================

/**
 * Analyze the full impact of changing a system token
 */
export function analyzeTokenChange(tokenPath: string): TokenChangeImpact {
  const affectedComponents: ComponentImpact[] = [];
  const affectedSlots: SlotImpact[] = [];
  const seenComponents = new Set<string>();
  
  // 1. Find direct usage in component specs
  const directImpacts = registryAnalyzeTokenImpact(tokenPath);
  for (const impact of directImpacts) {
    if (!seenComponents.has(impact.component)) {
      seenComponents.add(impact.component);
      affectedComponents.push({
        componentName: impact.component,
        affectedProperties: [{
          property: impact.property,
          slot: impact.slot,
          variant: impact.variant,
          state: impact.state,
          currentValue: { type: "system", path: tokenPath },
          affectedBy: impact.isDirectUsage ? "direct" : "nested",
        }],
        isDirectUsage: impact.isDirectUsage,
        throughComponent: impact.throughComponent,
      });
    } else {
      // Add to existing component impact
      const existing = affectedComponents.find(c => c.componentName === impact.component);
      if (existing) {
        existing.affectedProperties.push({
          property: impact.property,
          slot: impact.slot,
          variant: impact.variant,
          state: impact.state,
          currentValue: { type: "system", path: tokenPath },
          affectedBy: impact.isDirectUsage ? "direct" : "nested",
        });
      }
    }
  }
  
  // 2. Find slot usage
  const slots = getAllSlots();
  for (const slot of slots) {
    const resolved = resolveSlot(slot.id);
    if (!resolved) continue;
    
    // Check if any resolved token uses this path
    const affectedProperty = findTokenInSlot(resolved.resolvedTokens as unknown as Record<string, unknown>, tokenPath);
    if (affectedProperty) {
      // Find slots that inherit from this
      const inheritedBy = slots
        .filter(s => s.extends && slotInheritsFrom(s.id, slot.id))
        .map(s => s.id);
      
      // Find components using this slot
      const usedByComponents = getAllComponents()
        .filter(c => 
          c.slots.some(s => s.defaultPreset === slot.id) ||
          c.variants.some(v => v.slotPreset === slot.id)
        )
        .map(c => c.name);
      
      affectedSlots.push({
        slotId: slot.id,
        slotName: slot.name,
        affectedProperty,
        inheritedBy,
        usedByComponents,
      });
      
      // Add component impacts from slot usage
      for (const compName of usedByComponents) {
        if (!seenComponents.has(compName)) {
          seenComponents.add(compName);
          affectedComponents.push({
            componentName: compName,
            affectedProperties: [{
              property: affectedProperty,
              slot: slot.id,
              currentValue: { type: "system", path: tokenPath },
              affectedBy: "slot",
            }],
            isDirectUsage: false,
            throughSlot: slot.id,
          });
        }
      }
    }
  }
  
  // 3. Calculate total affected properties
  const totalAffectedProperties = affectedComponents.reduce(
    (sum, c) => sum + c.affectedProperties.length, 0
  );
  
  // 4. Determine severity
  let severity: "low" | "medium" | "high" = "low";
  if (totalAffectedProperties > 20) severity = "high";
  else if (totalAffectedProperties > 5) severity = "medium";
  
  return {
    token: tokenPath,
    affectedComponents,
    affectedSlots,
    totalAffectedProperties,
    severity,
  };
}

/**
 * Find which property in slot tokens uses a given token path
 */
function findTokenInSlot(
  tokens: Record<string, unknown>,
  tokenPath: string
): string | null {
  const checkObject = (obj: Record<string, unknown>, path: string[] = []): string | null => {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === "object") {
        if ("type" in value && value.type === "system" && (value as { path?: string }).path === tokenPath) {
          return [...path, key].join(".");
        }
        const nested = checkObject(value as Record<string, unknown>, [...path, key]);
        if (nested) return nested;
      }
    }
    return null;
  };
  
  return checkObject(tokens);
}

// ============================================
// SLOT IMPACT ANALYSIS
// ============================================

/**
 * Analyze impact of changing a slot preset
 */
export function analyzeSlotChange(slotId: string): {
  slot: string;
  affectedComponents: string[];
  inheritedSlots: string[];
  impactSeverity: "low" | "medium" | "high";
} {
  const slot = resolveSlot(slotId);
  if (!slot) {
    return {
      slot: slotId,
      affectedComponents: [],
      inheritedSlots: [],
      impactSeverity: "low",
    };
  }
  
  // Find slots that inherit from this
  const allSlots = getAllSlots();
  const inheritedSlots = allSlots
    .filter(s => s.extends && slotInheritsFrom(s.id, slotId))
    .map(s => s.id);
  
  // Find components using this slot or any inheriting slot
  const relevantSlots = [slotId, ...inheritedSlots];
  const affectedComponents = getAllComponents()
    .filter(c => 
      c.slots.some(s => relevantSlots.includes(s.defaultPreset!)) ||
      c.variants.some(v => relevantSlots.includes(v.slotPreset!))
    )
    .map(c => c.name);
  
  // Determine severity
  let impactSeverity: "low" | "medium" | "high" = "low";
  if (affectedComponents.length > 10) impactSeverity = "high";
  else if (affectedComponents.length > 3) impactSeverity = "medium";
  
  return {
    slot: slotId,
    affectedComponents,
    inheritedSlots,
    impactSeverity,
  };
}

// ============================================
// COMPONENT IMPACT ANALYSIS
// ============================================

/**
 * Analyze cascading impact when a component changes
 */
export function analyzeComponentChange(componentName: string): {
  component: string;
  dependentComponents: string[];
  affectedByNesting: ComponentNestingImpact[];
  impactSeverity: "low" | "medium" | "high";
} {
  // Get components that depend on this one (use it nested)
  const dependentComponents = getDependents(componentName);
  
  // Find where this component is nested
  const affectedByNesting: ComponentNestingImpact[] = [];
  const allComponents = getAllComponents();
  
  for (const comp of allComponents) {
    if (comp.nestedComponents) {
      for (const [key, nested] of Object.entries(comp.nestedComponents)) {
        if (nested.component === componentName) {
          affectedByNesting.push({
            parentComponent: comp.name,
            nestingSlot: nested.parentSlot,
            nestingKey: key,
            hasOverrides: Boolean(nested.tokenOverrides && Object.keys(nested.tokenOverrides).length > 0),
          });
        }
      }
    }
  }
  
  // Determine severity
  let impactSeverity: "low" | "medium" | "high" = "low";
  const totalImpact = dependentComponents.length + affectedByNesting.length;
  if (totalImpact > 10) impactSeverity = "high";
  else if (totalImpact > 3) impactSeverity = "medium";
  
  return {
    component: componentName,
    dependentComponents,
    affectedByNesting,
    impactSeverity,
  };
}

export interface ComponentNestingImpact {
  parentComponent: string;
  nestingSlot: string;
  nestingKey: string;
  hasOverrides: boolean;
}

// ============================================
// CUSTOM TOKEN IMPACT
// ============================================

/**
 * Analyze impact of changing a custom token
 */
export function analyzeCustomTokenChange(
  tokenId: string,
  usedBy: Array<{ componentName: string; slot: string; property: string }>
): {
  token: string;
  directUsage: typeof usedBy;
  totalAffected: number;
} {
  return {
    token: tokenId,
    directUsage: usedBy,
    totalAffected: usedBy.length,
  };
}

// ============================================
// IMPACT SUMMARY
// ============================================

/**
 * Generate a human-readable impact summary
 */
export function generateImpactSummary(impact: TokenChangeImpact): string {
  const lines: string[] = [];
  
  lines.push(`Token Change Impact: ${impact.token}`);
  lines.push(`Severity: ${impact.severity.toUpperCase()}`);
  lines.push(`Total affected properties: ${impact.totalAffectedProperties}`);
  lines.push("");
  
  if (impact.affectedSlots.length > 0) {
    lines.push("Affected Slots:");
    for (const slot of impact.affectedSlots) {
      lines.push(`  - ${slot.slotName} (${slot.slotId})`);
      if (slot.inheritedBy.length > 0) {
        lines.push(`    Inherited by: ${slot.inheritedBy.join(", ")}`);
      }
      if (slot.usedByComponents.length > 0) {
        lines.push(`    Used by: ${slot.usedByComponents.join(", ")}`);
      }
    }
    lines.push("");
  }
  
  if (impact.affectedComponents.length > 0) {
    lines.push("Affected Components:");
    for (const comp of impact.affectedComponents) {
      const via = comp.throughSlot 
        ? `(via slot: ${comp.throughSlot})`
        : comp.throughComponent 
          ? `(via nested: ${comp.throughComponent})`
          : "(direct)";
      lines.push(`  - ${comp.componentName} ${via}`);
      for (const prop of comp.affectedProperties) {
        const stateInfo = prop.state ? `[${prop.state}]` : "";
        lines.push(`    • ${prop.property}@${prop.slot}${stateInfo}`);
      }
    }
  }
  
  return lines.join("\n");
}
