/**
 * SLOT REGISTRY EXPORTS
 */

export {
  // Action slots
  actionPrimarySlot,
  actionSecondarySlot,
  actionDestructiveSlot,
  actionOutlineSlot,
  actionGhostSlot,
  actionLinkSlot,
  
  // Surface slots
  surfaceBaseSlot,
  surfaceCardSlot,
  surfacePopoverSlot,
  surfaceDialogSlot,
  surfaceTooltipSlot,
  
  // Input slots
  inputDefaultSlot,
  inputCheckboxSlot,
  inputSwitchSlot,
  
  // Feedback slots
  feedbackInfoSlot,
  feedbackSuccessSlot,
  feedbackWarningSlot,
  feedbackDestructiveSlot,
  
  // Overlay slots
  overlayBackdropSlot,
  
  // Navigation slots
  navItemSlot,
  navItemActiveSlot,
  
  // Registry functions
  registerSlot,
  registerSlots,
  getSlot,
  getAllSlots,
  getSlotsByCategory,
  getSlotsForComponent,
  resolveSlot,
  getInheritanceChain,
  slotInheritsFrom,
  searchSlots,
  initializeSlotRegistry,
} from "./slot-registry";
