/**
 * COMPONENT SPECIFICATIONS INDEX
 * 
 * Central export and registration for all component specifications.
 */

import { registerComponents } from "../registry";
import type { ComponentSpec } from "../types";

// Primitive components
import { buttonSpec } from "./primitives/button.spec";
import { inputSpec } from "./primitives/input.spec";
import { badgeSpec } from "./primitives/badge.spec";

// Composite components
import { cardSpec } from "./composite/card.spec";
import { alertSpec } from "./composite/alert.spec";

// Overlay components
import { dialogSpec } from "./overlay/dialog.spec";

// ============================================
// ALL SPECIFICATIONS
// ============================================

export const allComponentSpecs: ComponentSpec[] = [
  // Primitives
  buttonSpec,
  inputSpec,
  badgeSpec,
  
  // Composites
  cardSpec,
  alertSpec,
  
  // Overlays
  dialogSpec,
];

// ============================================
// GROUPED EXPORTS
// ============================================

export const primitiveSpecs = {
  button: buttonSpec,
  input: inputSpec,
  badge: badgeSpec,
};

export const compositeSpecs = {
  card: cardSpec,
  alert: alertSpec,
};

export const overlaySpecs = {
  dialog: dialogSpec,
};

// ============================================
// INDIVIDUAL EXPORTS
// ============================================

export {
  buttonSpec,
  inputSpec,
  badgeSpec,
  cardSpec,
  alertSpec,
  dialogSpec,
};

// ============================================
// INITIALIZATION
// ============================================

let initialized = false;

/**
 * Initialize all component specifications in the registry
 */
export function initializeComponentSpecs(): void {
  if (initialized) return;
  
  registerComponents(allComponentSpecs);
  initialized = true;
}

/**
 * Check if specs are initialized
 */
export function isInitialized(): boolean {
  return initialized;
}

/**
 * Get all component specs
 */
export function getAllSpecs(): ComponentSpec[] {
  return [...allComponentSpecs];
}

/**
 * Get spec by component name
 */
export function getSpecByName(name: string): ComponentSpec | undefined {
  return allComponentSpecs.find(spec => spec.name === name);
}

// Auto-initialize
initializeComponentSpecs();
