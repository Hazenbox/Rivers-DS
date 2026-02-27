/**
 * MOTION TOKENS
 * 
 * Defines animation and transition tokens for consistent motion design.
 * Follows the semantic naming pattern: instant, fast, base, slow.
 */

// ============================================
// DURATION TOKENS
// ============================================

export type DurationToken =
  | "instant"    // 0ms - immediate, no animation
  | "fast"       // 100ms - micro-interactions, feedback
  | "base"       // 200ms - standard transitions
  | "slow"       // 300ms - emphasis, large elements
  | "slower"     // 500ms - page transitions, complex animations
  | "slowest";   // 700ms - dramatic reveals

export const durationValues: Record<DurationToken, string> = {
  instant: "0ms",
  fast: "100ms",
  base: "200ms",
  slow: "300ms",
  slower: "500ms",
  slowest: "700ms",
};

// ============================================
// EASING TOKENS
// ============================================

export type EasingToken =
  | "linear"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "ease-emphasized-in"
  | "ease-emphasized-out"
  | "ease-spring"
  | "ease-bounce";

export const easingValues: Record<EasingToken, string> = {
  linear: "linear",
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  "ease-emphasized-in": "cubic-bezier(0.05, 0.7, 0.1, 1)",
  "ease-emphasized-out": "cubic-bezier(0.3, 0, 0.8, 0.15)",
  "ease-spring": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "ease-bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
};

// ============================================
// ANIMATION KEYFRAME PRESETS
// ============================================

export type AnimationPreset =
  | "fade-in"
  | "fade-out"
  | "scale-in"
  | "scale-out"
  | "slide-in-from-top"
  | "slide-in-from-bottom"
  | "slide-in-from-left"
  | "slide-in-from-right"
  | "slide-out-to-top"
  | "slide-out-to-bottom"
  | "slide-out-to-left"
  | "slide-out-to-right"
  | "zoom-in"
  | "zoom-out"
  | "spin"
  | "ping"
  | "pulse"
  | "bounce";

export interface AnimationDefinition {
  keyframes: Record<string, Record<string, string>>;
  defaultDuration: DurationToken;
  defaultEasing: EasingToken;
}

export const animationPresets: Record<AnimationPreset, AnimationDefinition> = {
  "fade-in": {
    keyframes: {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
    defaultDuration: "base",
    defaultEasing: "ease-out",
  },
  "fade-out": {
    keyframes: {
      "0%": { opacity: "1" },
      "100%": { opacity: "0" },
    },
    defaultDuration: "fast",
    defaultEasing: "ease-in",
  },
  "scale-in": {
    keyframes: {
      "0%": { transform: "scale(0.95)", opacity: "0" },
      "100%": { transform: "scale(1)", opacity: "1" },
    },
    defaultDuration: "base",
    defaultEasing: "ease-out",
  },
  "scale-out": {
    keyframes: {
      "0%": { transform: "scale(1)", opacity: "1" },
      "100%": { transform: "scale(0.95)", opacity: "0" },
    },
    defaultDuration: "fast",
    defaultEasing: "ease-in",
  },
  "slide-in-from-top": {
    keyframes: {
      "0%": { transform: "translateY(-100%)" },
      "100%": { transform: "translateY(0)" },
    },
    defaultDuration: "base",
    defaultEasing: "ease-out",
  },
  "slide-in-from-bottom": {
    keyframes: {
      "0%": { transform: "translateY(100%)" },
      "100%": { transform: "translateY(0)" },
    },
    defaultDuration: "base",
    defaultEasing: "ease-out",
  },
  "slide-in-from-left": {
    keyframes: {
      "0%": { transform: "translateX(-100%)" },
      "100%": { transform: "translateX(0)" },
    },
    defaultDuration: "base",
    defaultEasing: "ease-out",
  },
  "slide-in-from-right": {
    keyframes: {
      "0%": { transform: "translateX(100%)" },
      "100%": { transform: "translateX(0)" },
    },
    defaultDuration: "base",
    defaultEasing: "ease-out",
  },
  "slide-out-to-top": {
    keyframes: {
      "0%": { transform: "translateY(0)" },
      "100%": { transform: "translateY(-100%)" },
    },
    defaultDuration: "fast",
    defaultEasing: "ease-in",
  },
  "slide-out-to-bottom": {
    keyframes: {
      "0%": { transform: "translateY(0)" },
      "100%": { transform: "translateY(100%)" },
    },
    defaultDuration: "fast",
    defaultEasing: "ease-in",
  },
  "slide-out-to-left": {
    keyframes: {
      "0%": { transform: "translateX(0)" },
      "100%": { transform: "translateX(-100%)" },
    },
    defaultDuration: "fast",
    defaultEasing: "ease-in",
  },
  "slide-out-to-right": {
    keyframes: {
      "0%": { transform: "translateX(0)" },
      "100%": { transform: "translateX(100%)" },
    },
    defaultDuration: "fast",
    defaultEasing: "ease-in",
  },
  "zoom-in": {
    keyframes: {
      "0%": { transform: "scale(0)", opacity: "0" },
      "100%": { transform: "scale(1)", opacity: "1" },
    },
    defaultDuration: "base",
    defaultEasing: "ease-spring",
  },
  "zoom-out": {
    keyframes: {
      "0%": { transform: "scale(1)", opacity: "1" },
      "100%": { transform: "scale(0)", opacity: "0" },
    },
    defaultDuration: "fast",
    defaultEasing: "ease-in",
  },
  spin: {
    keyframes: {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
    defaultDuration: "slower",
    defaultEasing: "linear",
  },
  ping: {
    keyframes: {
      "0%": { transform: "scale(1)", opacity: "1" },
      "75%, 100%": { transform: "scale(2)", opacity: "0" },
    },
    defaultDuration: "slower",
    defaultEasing: "ease-out",
  },
  pulse: {
    keyframes: {
      "0%, 100%": { opacity: "1" },
      "50%": { opacity: "0.5" },
    },
    defaultDuration: "slower",
    defaultEasing: "ease-in-out",
  },
  bounce: {
    keyframes: {
      "0%, 100%": { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)" },
      "50%": { transform: "translateY(-25%)", animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" },
    },
    defaultDuration: "slower",
    defaultEasing: "ease-in-out",
  },
};

// ============================================
// MOTION PREFERENCE
// ============================================

export type MotionPreference = "full" | "reduced" | "no-preference";

export interface MotionConfig {
  preference: MotionPreference;
  respectSystemPreference: boolean;
}

// ============================================
// COMPONENT MOTION TOKENS
// ============================================

export interface ComponentMotionTokens {
  enterDuration: DurationToken;
  exitDuration: DurationToken;
  enterEasing: EasingToken;
  exitEasing: EasingToken;
  enterAnimation?: AnimationPreset;
  exitAnimation?: AnimationPreset;
  hoverDuration?: DurationToken;
  focusDuration?: DurationToken;
}

export const defaultComponentMotion: Record<string, ComponentMotionTokens> = {
  button: {
    enterDuration: "instant",
    exitDuration: "instant",
    enterEasing: "ease-out",
    exitEasing: "ease-in",
    hoverDuration: "fast",
    focusDuration: "instant",
  },
  dialog: {
    enterDuration: "base",
    exitDuration: "fast",
    enterEasing: "ease-out",
    exitEasing: "ease-in",
    enterAnimation: "scale-in",
    exitAnimation: "scale-out",
  },
  sheet: {
    enterDuration: "base",
    exitDuration: "fast",
    enterEasing: "ease-out",
    exitEasing: "ease-in",
    enterAnimation: "slide-in-from-right",
    exitAnimation: "slide-out-to-right",
  },
  drawer: {
    enterDuration: "base",
    exitDuration: "fast",
    enterEasing: "ease-out",
    exitEasing: "ease-in",
    enterAnimation: "slide-in-from-bottom",
    exitAnimation: "slide-out-to-bottom",
  },
  popover: {
    enterDuration: "fast",
    exitDuration: "fast",
    enterEasing: "ease-out",
    exitEasing: "ease-in",
    enterAnimation: "scale-in",
    exitAnimation: "fade-out",
  },
  tooltip: {
    enterDuration: "fast",
    exitDuration: "fast",
    enterEasing: "ease-out",
    exitEasing: "ease-in",
    enterAnimation: "fade-in",
    exitAnimation: "fade-out",
  },
  accordion: {
    enterDuration: "base",
    exitDuration: "base",
    enterEasing: "ease-out",
    exitEasing: "ease-in",
  },
  select: {
    enterDuration: "fast",
    exitDuration: "fast",
    enterEasing: "ease-out",
    exitEasing: "ease-in",
    enterAnimation: "scale-in",
    exitAnimation: "scale-out",
  },
  spinner: {
    enterDuration: "slowest",
    exitDuration: "slowest",
    enterEasing: "linear",
    exitEasing: "linear",
    enterAnimation: "spin",
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getDurationValue(token: DurationToken): string {
  return durationValues[token];
}

export function getEasingValue(token: EasingToken): string {
  return easingValues[token];
}

export function getComponentMotion(componentName: string): ComponentMotionTokens | undefined {
  return defaultComponentMotion[componentName.toLowerCase()];
}

export function buildTransitionValue(
  properties: string[],
  duration: DurationToken,
  easing: EasingToken
): string {
  const durationValue = getDurationValue(duration);
  const easingValue = getEasingValue(easing);
  return properties.map(prop => `${prop} ${durationValue} ${easingValue}`).join(", ");
}

export function shouldReduceMotion(preference: MotionPreference): boolean {
  return preference === "reduced";
}
