/**
 * COMPONENT EDITOR TYPE SYSTEM
 * 
 * Central export for all type definitions used in the component editor.
 */

// Token Reference System
export {
  type DTCGType,
  type TokenCategory,
  type SystemTokenReference,
  type CustomTokenReference,
  type LiteralTokenReference,
  type AliasTokenReference,
  type TokenReference,
  type ColorValue,
  type DimensionValue,
  type DurationValue,
  type CubicBezierValue,
  type NumberValue,
  type FontFamilyValue,
  type FontWeightValue,
  type ShadowValue,
  type BorderValue,
  type TypographyValue,
  type TokenValue,
  type ComponentUsage,
  type CustomToken,
  type TokenResolutionContext,
  isSystemToken,
  isCustomToken,
  isLiteralToken,
  isAliasToken,
  createSystemRef,
  createCustomRef,
  createLiteralRef,
  createAliasRef,
} from "./token-reference";

// Interaction States
export {
  type InteractionState,
  type TriggerType,
  type StateTransition,
  type InteractionStateSpec,
  buttonStateSpec,
  inputStateSpec,
  checkboxStateSpec,
  toggleStateSpec,
  selectStateSpec,
  accordionStateSpec,
  dialogStateSpec,
  stateSpecRegistry,
  getStateSpec,
  getAvailableStates,
  canTransition,
  getTransition,
  areMutuallyExclusive,
} from "./interaction-states";

// Motion Tokens
export {
  type DurationToken,
  type EasingToken,
  type AnimationPreset,
  type AnimationDefinition,
  type MotionPreference,
  type MotionConfig,
  type ComponentMotionTokens,
  durationValues,
  easingValues,
  animationPresets,
  defaultComponentMotion,
  getDurationValue,
  getEasingValue,
  getComponentMotion,
  buildTransitionValue,
  shouldReduceMotion,
} from "./motion";

// Slot System
export {
  type SlotColorTokens,
  type SlotSpacingTokens,
  type SlotTypographyTokens,
  type SlotBorderTokens,
  type SlotSizingTokens,
  type SlotTokens,
  type SlotStateTokens,
  type SlotCategory,
  type SlotDefinition,
  type SlotAssignment,
  type ResolvedSlot,
  type SlotValidationResult,
  mergeSlotTokens,
  getAllTokenReferences,
  slotUsesToken,
  getPropertyCategory,
  validateSlotDefinition,
} from "./slot";

// Component Specification
export {
  type ComponentCategory,
  type TokenablePropertySpec,
  type VariantSpec,
  type SizeSpec,
  type NestedComponentSpec,
  type ComponentSlotSpec,
  type FigmaPropertyType,
  type FigmaPropertyMapping,
  type ResponsiveTokenOverride,
  type CompositionRule,
  type ComponentSpec,
  type ComponentDependency,
  type ComponentRegistry,
  type ComponentSpecValidationResult,
  getComponentsByCategory,
  getComponentDependents,
  getComponentDependencies,
  getSlotById,
  getPropertiesForSlot,
  getPropertiesForState,
  getVariantByValue,
  getSizeByValue,
  validateComponentSpec,
} from "./component-spec";

// Figma Mapping
export {
  type FigmaVariableType,
  type FigmaVariableScope,
  type FigmaVariableDefinition,
  type FigmaVariableCollection,
  type FigmaVariableGroup,
  type FigmaAutoLayoutMapping,
  type FigmaAutoLayoutProperty,
  type CodeConnectConfig,
  type FigmaSyncState,
  type FigmaVariableChange,
  cssToFigmaAutoLayout,
  generateCodeConnectConfig,
  generateFigmaVariableCollection,
  getFigmaVariableType,
  getFigmaScopes,
} from "./figma-mapping";

// Responsive System
export {
  type Breakpoint,
  type BreakpointDefinition,
  type ResponsiveTokenValue,
  type ResponsivePropertyOverride,
  type ContainerDefinition,
  type ContainerQueryOverride,
  type ResponsiveContext,
  type FluidScaleConfig,
  breakpoints,
  breakpointOrder,
  getCurrentBreakpoint,
  resolveResponsiveValue,
  hasResponsiveOverrides,
  generateMediaQuery,
  generateResponsiveCSS,
  generateFluidClamp,
} from "./responsive";
