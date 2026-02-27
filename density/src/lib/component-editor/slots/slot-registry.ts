/**
 * SLOT REGISTRY
 * 
 * Central registry for all slot presets.
 * Slots are reusable token bundles that can be applied across components.
 */

import type { SlotDefinition, SlotTokens, SlotStateTokens, ResolvedSlot } from "../types";
import type { InteractionState } from "../types";
import { createSystemRef, createLiteralRef } from "../types";

// ============================================
// REGISTRY STATE
// ============================================

const slotRegistry: Map<string, SlotDefinition> = new Map();

// ============================================
// ACTION SLOTS
// ============================================

export const actionPrimarySlot: SlotDefinition = {
  id: "action-primary",
  name: "Primary Action",
  description: "Primary interactive elements like default buttons",
  category: "action",
  tokens: {
    colors: {
      background: createSystemRef("colors.primary"),
      foreground: createSystemRef("colors.primary-foreground"),
      border: createLiteralRef("transparent"),
    },
    border: {
      borderRadius: createSystemRef("radius.md"),
      borderWidth: createSystemRef("border.width"),
    },
  },
  states: {
    hover: {
      colors: {
        background: createSystemRef("colors.primary/90"),
      },
    },
    "focus-visible": {
      colors: {
        ring: createSystemRef("colors.ring"),
      },
    },
    disabled: {
      colors: {
        background: createSystemRef("colors.primary/50"),
        foreground: createSystemRef("colors.primary-foreground/50"),
      },
    },
  },
  applicableTo: ["Button", "Badge", "Link"],
  isSystem: true,
  tags: ["interactive", "primary", "cta"],
};

export const actionSecondarySlot: SlotDefinition = {
  id: "action-secondary",
  name: "Secondary Action",
  description: "Secondary interactive elements",
  category: "action",
  tokens: {
    colors: {
      background: createSystemRef("colors.secondary"),
      foreground: createSystemRef("colors.secondary-foreground"),
      border: createLiteralRef("transparent"),
    },
    border: {
      borderRadius: createSystemRef("radius.md"),
    },
  },
  states: {
    hover: {
      colors: {
        background: createSystemRef("colors.secondary/80"),
      },
    },
  },
  applicableTo: ["Button", "Badge"],
  isSystem: true,
  tags: ["interactive", "secondary"],
};

export const actionDestructiveSlot: SlotDefinition = {
  id: "action-destructive",
  name: "Destructive Action",
  description: "Destructive/danger actions",
  category: "action",
  tokens: {
    colors: {
      background: createSystemRef("colors.destructive"),
      foreground: createLiteralRef("white"),
      border: createLiteralRef("transparent"),
    },
    border: {
      borderRadius: createSystemRef("radius.md"),
    },
  },
  states: {
    hover: {
      colors: {
        background: createSystemRef("colors.destructive/90"),
      },
    },
  },
  applicableTo: ["Button", "Badge", "Alert"],
  isSystem: true,
  tags: ["interactive", "danger", "destructive"],
};

export const actionOutlineSlot: SlotDefinition = {
  id: "action-outline",
  name: "Outline Action",
  description: "Outlined interactive elements",
  category: "action",
  tokens: {
    colors: {
      background: createLiteralRef("transparent"),
      foreground: createSystemRef("colors.foreground"),
      border: createSystemRef("colors.border"),
    },
    border: {
      borderRadius: createSystemRef("radius.md"),
      borderWidth: createSystemRef("border.width"),
    },
  },
  states: {
    hover: {
      colors: {
        background: createSystemRef("colors.accent"),
        foreground: createSystemRef("colors.accent-foreground"),
      },
    },
  },
  applicableTo: ["Button", "Badge"],
  isSystem: true,
  tags: ["interactive", "outline", "bordered"],
};

export const actionGhostSlot: SlotDefinition = {
  id: "action-ghost",
  name: "Ghost Action",
  description: "Minimal/ghost interactive elements",
  category: "action",
  tokens: {
    colors: {
      background: createLiteralRef("transparent"),
      foreground: createSystemRef("colors.foreground"),
      border: createLiteralRef("transparent"),
    },
    border: {
      borderRadius: createSystemRef("radius.md"),
    },
  },
  states: {
    hover: {
      colors: {
        background: createSystemRef("colors.accent"),
        foreground: createSystemRef("colors.accent-foreground"),
      },
    },
  },
  applicableTo: ["Button", "DropdownMenuItem"],
  isSystem: true,
  tags: ["interactive", "ghost", "minimal"],
};

export const actionLinkSlot: SlotDefinition = {
  id: "action-link",
  name: "Link Action",
  description: "Text link styling",
  category: "action",
  tokens: {
    colors: {
      background: createLiteralRef("transparent"),
      foreground: createSystemRef("colors.primary"),
      border: createLiteralRef("transparent"),
    },
  },
  states: {
    hover: {
      colors: {
        foreground: createSystemRef("colors.primary/80"),
      },
    },
  },
  applicableTo: ["Button", "Link"],
  isSystem: true,
  tags: ["interactive", "link", "text"],
};

// ============================================
// SURFACE SLOTS
// ============================================

export const surfaceBaseSlot: SlotDefinition = {
  id: "surface-base",
  name: "Base Surface",
  description: "Default page/app background",
  category: "surface",
  tokens: {
    colors: {
      background: createSystemRef("colors.background"),
      foreground: createSystemRef("colors.foreground"),
      border: createSystemRef("colors.border"),
    },
  },
  isSystem: true,
  tags: ["surface", "background", "base"],
};

export const surfaceCardSlot: SlotDefinition = {
  id: "surface-card",
  name: "Card Surface",
  description: "Card and container backgrounds",
  category: "surface",
  extends: "surface-base",
  tokens: {
    colors: {
      background: createSystemRef("colors.card"),
      foreground: createSystemRef("colors.card-foreground"),
      border: createSystemRef("colors.border"),
    },
    border: {
      borderRadius: createSystemRef("radius.lg"),
      borderWidth: createSystemRef("border.width"),
    },
  },
  applicableTo: ["Card", "Dialog", "Sheet", "Popover"],
  isSystem: true,
  tags: ["surface", "card", "container"],
};

export const surfacePopoverSlot: SlotDefinition = {
  id: "surface-popover",
  name: "Popover Surface",
  description: "Popover, dropdown, and menu backgrounds",
  category: "surface",
  extends: "surface-card",
  tokens: {
    colors: {
      background: createSystemRef("colors.popover"),
      foreground: createSystemRef("colors.popover-foreground"),
      border: createSystemRef("colors.border"),
      shadow: createSystemRef("shadow.md"),
    },
    border: {
      borderRadius: createSystemRef("radius.md"),
    },
  },
  applicableTo: ["Popover", "DropdownMenu", "Select", "Combobox"],
  isSystem: true,
  tags: ["surface", "popover", "dropdown", "floating"],
};

export const surfaceDialogSlot: SlotDefinition = {
  id: "surface-dialog",
  name: "Dialog Surface",
  description: "Modal dialog backgrounds",
  category: "surface",
  extends: "surface-popover",
  tokens: {
    colors: {
      background: createSystemRef("colors.background"),
      foreground: createSystemRef("colors.foreground"),
      shadow: createSystemRef("shadow.lg"),
    },
    border: {
      borderRadius: createSystemRef("radius.lg"),
    },
  },
  applicableTo: ["Dialog", "AlertDialog", "Sheet"],
  isSystem: true,
  tags: ["surface", "dialog", "modal"],
};

export const surfaceTooltipSlot: SlotDefinition = {
  id: "surface-tooltip",
  name: "Tooltip Surface",
  description: "Tooltip backgrounds (inverted)",
  category: "surface",
  tokens: {
    colors: {
      background: createSystemRef("colors.primary"),
      foreground: createSystemRef("colors.primary-foreground"),
    },
    border: {
      borderRadius: createSystemRef("radius.md"),
    },
  },
  applicableTo: ["Tooltip"],
  isSystem: true,
  tags: ["surface", "tooltip", "inverted"],
};

// ============================================
// INPUT SLOTS
// ============================================

export const inputDefaultSlot: SlotDefinition = {
  id: "input-default",
  name: "Default Input",
  description: "Standard form input styling",
  category: "input",
  tokens: {
    colors: {
      background: createLiteralRef("transparent"),
      foreground: createSystemRef("colors.foreground"),
      border: createSystemRef("colors.input"),
      placeholder: createSystemRef("colors.muted-foreground"),
    },
    border: {
      borderRadius: createSystemRef("radius.md"),
      borderWidth: createSystemRef("border.width"),
    },
  },
  states: {
    hover: {
      colors: {
        border: createSystemRef("colors.input"),
      },
    },
    focus: {
      colors: {
        border: createSystemRef("colors.ring"),
        ring: createSystemRef("colors.ring"),
      },
    },
    invalid: {
      colors: {
        border: createSystemRef("colors.destructive"),
        ring: createSystemRef("colors.destructive"),
      },
    },
    disabled: {
      colors: {
        background: createSystemRef("colors.muted"),
        foreground: createSystemRef("colors.muted-foreground"),
      },
    },
  },
  applicableTo: ["Input", "Textarea", "Select", "Combobox"],
  isSystem: true,
  tags: ["input", "form", "field"],
};

export const inputCheckboxSlot: SlotDefinition = {
  id: "input-checkbox",
  name: "Checkbox Input",
  description: "Checkbox and radio styling",
  category: "input",
  tokens: {
    colors: {
      background: createLiteralRef("transparent"),
      foreground: createSystemRef("colors.primary-foreground"),
      border: createSystemRef("colors.primary"),
    },
    border: {
      borderRadius: createSystemRef("radius.xs"),
      borderWidth: createSystemRef("border.width"),
    },
  },
  states: {
    checked: {
      colors: {
        background: createSystemRef("colors.primary"),
        foreground: createSystemRef("colors.primary-foreground"),
      },
    },
    "focus-visible": {
      colors: {
        ring: createSystemRef("colors.ring"),
      },
    },
    disabled: {
      colors: {
        background: createSystemRef("colors.muted"),
        border: createSystemRef("colors.muted"),
      },
    },
  },
  applicableTo: ["Checkbox", "RadioGroup"],
  isSystem: true,
  tags: ["input", "form", "checkbox", "radio"],
};

export const inputSwitchSlot: SlotDefinition = {
  id: "input-switch",
  name: "Switch Input",
  description: "Toggle switch styling",
  category: "input",
  tokens: {
    colors: {
      background: createSystemRef("colors.input"),
      foreground: createSystemRef("colors.background"),
    },
    border: {
      borderRadius: createSystemRef("radius.full"),
    },
  },
  states: {
    checked: {
      colors: {
        background: createSystemRef("colors.primary"),
      },
    },
    disabled: {
      colors: {
        background: createSystemRef("colors.muted"),
      },
    },
  },
  applicableTo: ["Switch"],
  isSystem: true,
  tags: ["input", "form", "switch", "toggle"],
};

// ============================================
// FEEDBACK SLOTS
// ============================================

export const feedbackInfoSlot: SlotDefinition = {
  id: "feedback-info",
  name: "Info Feedback",
  description: "Informational alerts and toasts",
  category: "feedback",
  tokens: {
    colors: {
      background: createSystemRef("colors.muted"),
      foreground: createSystemRef("colors.foreground"),
      border: createSystemRef("colors.border"),
    },
    border: {
      borderRadius: createSystemRef("radius.md"),
    },
  },
  applicableTo: ["Alert", "Toast"],
  isSystem: true,
  tags: ["feedback", "info", "alert"],
};

export const feedbackSuccessSlot: SlotDefinition = {
  id: "feedback-success",
  name: "Success Feedback",
  description: "Success alerts and toasts",
  category: "feedback",
  tokens: {
    colors: {
      background: createSystemRef("colors.success/10"),
      foreground: createSystemRef("colors.success"),
      border: createSystemRef("colors.success/20"),
    },
    border: {
      borderRadius: createSystemRef("radius.md"),
    },
  },
  applicableTo: ["Alert", "Toast"],
  isSystem: true,
  tags: ["feedback", "success", "alert"],
};

export const feedbackWarningSlot: SlotDefinition = {
  id: "feedback-warning",
  name: "Warning Feedback",
  description: "Warning alerts and toasts",
  category: "feedback",
  tokens: {
    colors: {
      background: createSystemRef("colors.warning/10"),
      foreground: createSystemRef("colors.warning"),
      border: createSystemRef("colors.warning/20"),
    },
    border: {
      borderRadius: createSystemRef("radius.md"),
    },
  },
  applicableTo: ["Alert", "Toast"],
  isSystem: true,
  tags: ["feedback", "warning", "alert"],
};

export const feedbackDestructiveSlot: SlotDefinition = {
  id: "feedback-destructive",
  name: "Destructive Feedback",
  description: "Error/destructive alerts and toasts",
  category: "feedback",
  tokens: {
    colors: {
      background: createSystemRef("colors.destructive/10"),
      foreground: createSystemRef("colors.destructive"),
      border: createSystemRef("colors.destructive/20"),
    },
    border: {
      borderRadius: createSystemRef("radius.md"),
    },
  },
  applicableTo: ["Alert", "Toast"],
  isSystem: true,
  tags: ["feedback", "destructive", "error", "alert"],
};

// ============================================
// OVERLAY SLOTS
// ============================================

export const overlayBackdropSlot: SlotDefinition = {
  id: "overlay-backdrop",
  name: "Overlay Backdrop",
  description: "Modal backdrop/scrim",
  category: "overlay",
  tokens: {
    colors: {
      background: createLiteralRef("rgb(0 0 0 / 0.5)"),
    },
  },
  applicableTo: ["Dialog", "AlertDialog", "Sheet", "Drawer"],
  isSystem: true,
  tags: ["overlay", "backdrop", "scrim"],
};

// ============================================
// NAVIGATION SLOTS
// ============================================

export const navItemSlot: SlotDefinition = {
  id: "nav-item",
  name: "Navigation Item",
  description: "Default navigation item styling",
  category: "navigation",
  tokens: {
    colors: {
      background: createLiteralRef("transparent"),
      foreground: createSystemRef("colors.muted-foreground"),
    },
    border: {
      borderRadius: createSystemRef("radius.md"),
    },
  },
  states: {
    hover: {
      colors: {
        background: createSystemRef("colors.accent"),
        foreground: createSystemRef("colors.accent-foreground"),
      },
    },
    selected: {
      colors: {
        background: createSystemRef("colors.accent"),
        foreground: createSystemRef("colors.accent-foreground"),
      },
    },
  },
  applicableTo: ["NavigationMenu", "Tabs", "Breadcrumb"],
  isSystem: true,
  tags: ["navigation", "menu", "item"],
};

export const navItemActiveSlot: SlotDefinition = {
  id: "nav-item-active",
  name: "Active Navigation Item",
  description: "Active/selected navigation item",
  category: "navigation",
  extends: "nav-item",
  tokens: {
    colors: {
      background: createSystemRef("colors.accent"),
      foreground: createSystemRef("colors.accent-foreground"),
    },
  },
  applicableTo: ["NavigationMenu", "Tabs", "Breadcrumb"],
  isSystem: true,
  tags: ["navigation", "menu", "item", "active"],
};

// ============================================
// REGISTRY FUNCTIONS
// ============================================

/**
 * Register a slot preset
 */
export function registerSlot(slot: SlotDefinition): void {
  slotRegistry.set(slot.id, slot);
}

/**
 * Register multiple slots
 */
export function registerSlots(slots: SlotDefinition[]): void {
  for (const slot of slots) {
    registerSlot(slot);
  }
}

/**
 * Get a slot by ID
 */
export function getSlot(id: string): SlotDefinition | undefined {
  return slotRegistry.get(id);
}

/**
 * Get all registered slots
 */
export function getAllSlots(): SlotDefinition[] {
  return Array.from(slotRegistry.values());
}

/**
 * Get slots by category
 */
export function getSlotsByCategory(category: string): SlotDefinition[] {
  return getAllSlots().filter(slot => slot.category === category);
}

/**
 * Get slots applicable to a component
 */
export function getSlotsForComponent(componentName: string): SlotDefinition[] {
  return getAllSlots().filter(
    slot => !slot.applicableTo || slot.applicableTo.includes(componentName)
  );
}

/**
 * Resolve slot with inheritance chain
 */
export function resolveSlot(id: string): ResolvedSlot | undefined {
  const definition = slotRegistry.get(id);
  if (!definition) return undefined;

  const inheritanceChain: string[] = [id];
  let resolvedTokens: SlotTokens = { ...definition.tokens };
  let resolvedStates: Partial<Record<InteractionState, SlotStateTokens>> = {
    ...(definition.states || {}),
  };

  // Walk up inheritance chain
  let currentId = definition.extends;
  while (currentId) {
    const parent = slotRegistry.get(currentId);
    if (!parent) break;

    inheritanceChain.unshift(currentId);

    // Merge tokens (child overrides parent)
    resolvedTokens = {
      colors: { ...parent.tokens?.colors, ...resolvedTokens.colors },
      spacing: { ...parent.tokens?.spacing, ...resolvedTokens.spacing },
      typography: { ...parent.tokens?.typography, ...resolvedTokens.typography },
      border: { ...parent.tokens?.border, ...resolvedTokens.border },
      sizing: { ...parent.tokens?.sizing, ...resolvedTokens.sizing },
    };

    // Merge states
    if (parent.states) {
      for (const [state, tokens] of Object.entries(parent.states)) {
        if (!resolvedStates[state as InteractionState]) {
          resolvedStates[state as InteractionState] = tokens;
        } else {
          resolvedStates[state as InteractionState] = {
            ...tokens,
            ...resolvedStates[state as InteractionState],
          };
        }
      }
    }

    currentId = parent.extends;
  }

  return {
    definition,
    inheritanceChain,
    resolvedTokens,
    resolvedStates,
  };
}

/**
 * Get inheritance chain for a slot
 */
export function getInheritanceChain(id: string): string[] {
  const chain: string[] = [];
  let currentId: string | undefined = id;

  while (currentId) {
    chain.push(currentId);
    const slot = slotRegistry.get(currentId);
    currentId = slot?.extends;
  }

  return chain;
}

/**
 * Check if one slot inherits from another
 */
export function slotInheritsFrom(childId: string, parentId: string): boolean {
  const chain = getInheritanceChain(childId);
  return chain.includes(parentId);
}

/**
 * Search slots
 */
export function searchSlots(query: string): SlotDefinition[] {
  const lowerQuery = query.toLowerCase();
  return getAllSlots().filter(slot => {
    if (slot.id.toLowerCase().includes(lowerQuery)) return true;
    if (slot.name.toLowerCase().includes(lowerQuery)) return true;
    if (slot.description?.toLowerCase().includes(lowerQuery)) return true;
    if (slot.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) return true;
    return false;
  });
}

// ============================================
// INITIALIZE REGISTRY
// ============================================

export function initializeSlotRegistry(): void {
  // Action slots
  registerSlots([
    actionPrimarySlot,
    actionSecondarySlot,
    actionDestructiveSlot,
    actionOutlineSlot,
    actionGhostSlot,
    actionLinkSlot,
  ]);

  // Surface slots
  registerSlots([
    surfaceBaseSlot,
    surfaceCardSlot,
    surfacePopoverSlot,
    surfaceDialogSlot,
    surfaceTooltipSlot,
  ]);

  // Input slots
  registerSlots([
    inputDefaultSlot,
    inputCheckboxSlot,
    inputSwitchSlot,
  ]);

  // Feedback slots
  registerSlots([
    feedbackInfoSlot,
    feedbackSuccessSlot,
    feedbackWarningSlot,
    feedbackDestructiveSlot,
  ]);

  // Overlay slots
  registerSlots([
    overlayBackdropSlot,
  ]);

  // Navigation slots
  registerSlots([
    navItemSlot,
    navItemActiveSlot,
  ]);
}

// Auto-initialize
initializeSlotRegistry();
