/**
 * INTERACTION STATES
 * 
 * Defines the state machine for component interactions.
 * Used for token resolution per state and state simulation in the editor.
 */

// ============================================
// INTERACTION STATE TYPES
// ============================================

export type InteractionState =
  | "default"
  | "hover"
  | "focus"
  | "focus-visible"
  | "focus-within"
  | "active"
  | "pressed"
  | "disabled"
  | "loading"
  | "selected"
  | "checked"
  | "unchecked"
  | "indeterminate"
  | "invalid"
  | "valid"
  | "required"
  | "readonly"
  | "placeholder"
  | "empty"
  | "open"
  | "closed"
  | "expanded"
  | "collapsed"
  | "dragging"
  | "dropping"
  | "on"
  | "off";

export type TriggerType = 
  | "mouse"
  | "keyboard"
  | "touch"
  | "programmatic";

// ============================================
// STATE TRANSITION DEFINITION
// ============================================

export interface StateTransition {
  from: InteractionState;
  to: InteractionState;
  trigger: TriggerType;
  duration?: string; // Token reference or literal
  easing?: string;   // Token reference or literal
  reversible?: boolean;
}

// ============================================
// COMPONENT STATE SPECIFICATION
// ============================================

export interface InteractionStateSpec {
  states: InteractionState[];
  defaultState: InteractionState;
  transitions: StateTransition[];
  mutuallyExclusive?: InteractionState[][]; // Groups that can't coexist
  stateOrder?: InteractionState[]; // Priority order for CSS specificity
}

// ============================================
// PRESET STATE SPECS BY COMPONENT TYPE
// ============================================

export const buttonStateSpec: InteractionStateSpec = {
  states: ["default", "hover", "focus-visible", "active", "disabled", "loading"],
  defaultState: "default",
  transitions: [
    { from: "default", to: "hover", trigger: "mouse", duration: "150ms", easing: "ease-out" },
    { from: "hover", to: "default", trigger: "mouse", duration: "150ms", easing: "ease-out", reversible: true },
    { from: "hover", to: "active", trigger: "mouse", duration: "75ms", easing: "ease-in" },
    { from: "active", to: "hover", trigger: "mouse", duration: "75ms", easing: "ease-out", reversible: true },
    { from: "default", to: "focus-visible", trigger: "keyboard", duration: "0ms" },
    { from: "focus-visible", to: "default", trigger: "keyboard", duration: "150ms", reversible: true },
    { from: "default", to: "disabled", trigger: "programmatic", duration: "0ms" },
    { from: "default", to: "loading", trigger: "programmatic", duration: "0ms" },
  ],
  mutuallyExclusive: [
    ["disabled", "loading"], // Can't be both
    ["default", "disabled", "loading"], // One of these at a time
  ],
  stateOrder: ["default", "hover", "focus-visible", "active", "disabled", "loading"],
};

export const inputStateSpec: InteractionStateSpec = {
  states: ["default", "hover", "focus", "focus-visible", "disabled", "readonly", "invalid", "valid", "placeholder"],
  defaultState: "default",
  transitions: [
    { from: "default", to: "hover", trigger: "mouse", duration: "150ms" },
    { from: "hover", to: "focus", trigger: "mouse", duration: "0ms" },
    { from: "default", to: "focus", trigger: "keyboard", duration: "0ms" },
    { from: "focus", to: "default", trigger: "keyboard", duration: "150ms", reversible: true },
  ],
  mutuallyExclusive: [
    ["disabled", "readonly"],
    ["invalid", "valid"],
  ],
  stateOrder: ["default", "placeholder", "hover", "focus", "focus-visible", "invalid", "valid", "disabled", "readonly"],
};

export const checkboxStateSpec: InteractionStateSpec = {
  states: ["unchecked", "checked", "indeterminate", "hover", "focus-visible", "disabled"],
  defaultState: "unchecked",
  transitions: [
    { from: "unchecked", to: "checked", trigger: "mouse", duration: "150ms", easing: "ease-out" },
    { from: "checked", to: "unchecked", trigger: "mouse", duration: "150ms", easing: "ease-out", reversible: true },
    { from: "unchecked", to: "hover", trigger: "mouse", duration: "100ms" },
    { from: "checked", to: "hover", trigger: "mouse", duration: "100ms" },
  ],
  mutuallyExclusive: [
    ["unchecked", "checked", "indeterminate"],
  ],
  stateOrder: ["unchecked", "checked", "indeterminate", "hover", "focus-visible", "disabled"],
};

export const toggleStateSpec: InteractionStateSpec = {
  states: ["off", "on", "hover", "focus-visible", "disabled"],
  defaultState: "off",
  transitions: [
    { from: "off", to: "on", trigger: "mouse", duration: "200ms", easing: "ease-in-out" },
    { from: "on", to: "off", trigger: "mouse", duration: "200ms", easing: "ease-in-out", reversible: true },
  ],
  mutuallyExclusive: [
    ["off", "on"],
  ],
  stateOrder: ["off", "on", "hover", "focus-visible", "disabled"],
};

export const selectStateSpec: InteractionStateSpec = {
  states: ["default", "hover", "focus", "open", "disabled", "invalid", "placeholder"],
  defaultState: "default",
  transitions: [
    { from: "default", to: "hover", trigger: "mouse", duration: "100ms" },
    { from: "hover", to: "open", trigger: "mouse", duration: "150ms" },
    { from: "open", to: "default", trigger: "mouse", duration: "100ms", reversible: true },
  ],
  mutuallyExclusive: [
    ["open", "closed"],
  ],
  stateOrder: ["default", "placeholder", "hover", "focus", "open", "invalid", "disabled"],
};

export const accordionStateSpec: InteractionStateSpec = {
  states: ["collapsed", "expanded", "hover", "focus-visible", "disabled"],
  defaultState: "collapsed",
  transitions: [
    { from: "collapsed", to: "expanded", trigger: "mouse", duration: "200ms", easing: "ease-out" },
    { from: "expanded", to: "collapsed", trigger: "mouse", duration: "200ms", easing: "ease-in", reversible: true },
  ],
  mutuallyExclusive: [
    ["collapsed", "expanded"],
  ],
  stateOrder: ["collapsed", "expanded", "hover", "focus-visible", "disabled"],
};

export const dialogStateSpec: InteractionStateSpec = {
  states: ["closed", "open"],
  defaultState: "closed",
  transitions: [
    { from: "closed", to: "open", trigger: "programmatic", duration: "200ms", easing: "ease-out" },
    { from: "open", to: "closed", trigger: "programmatic", duration: "150ms", easing: "ease-in", reversible: true },
  ],
  mutuallyExclusive: [
    ["closed", "open"],
  ],
  stateOrder: ["closed", "open"],
};

// ============================================
// STATE SPEC REGISTRY
// ============================================

export const stateSpecRegistry: Record<string, InteractionStateSpec> = {
  button: buttonStateSpec,
  input: inputStateSpec,
  checkbox: checkboxStateSpec,
  toggle: toggleStateSpec,
  switch: toggleStateSpec, // Same as toggle
  select: selectStateSpec,
  accordion: accordionStateSpec,
  dialog: dialogStateSpec,
  sheet: dialogStateSpec, // Same as dialog
  drawer: dialogStateSpec,
  popover: dialogStateSpec,
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getStateSpec(componentName: string): InteractionStateSpec | undefined {
  return stateSpecRegistry[componentName.toLowerCase()];
}

export function getAvailableStates(componentName: string): InteractionState[] {
  const spec = getStateSpec(componentName);
  return spec?.states || ["default", "hover", "focus", "disabled"];
}

export function canTransition(
  spec: InteractionStateSpec,
  from: InteractionState,
  to: InteractionState
): boolean {
  return spec.transitions.some(t => t.from === from && t.to === to);
}

export function getTransition(
  spec: InteractionStateSpec,
  from: InteractionState,
  to: InteractionState
): StateTransition | undefined {
  return spec.transitions.find(t => t.from === from && t.to === to);
}

export function areMutuallyExclusive(
  spec: InteractionStateSpec,
  state1: InteractionState,
  state2: InteractionState
): boolean {
  if (!spec.mutuallyExclusive) return false;
  return spec.mutuallyExclusive.some(
    group => group.includes(state1) && group.includes(state2)
  );
}
