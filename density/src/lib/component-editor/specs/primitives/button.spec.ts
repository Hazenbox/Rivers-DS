/**
 * BUTTON COMPONENT SPECIFICATION
 * 
 * Complete token specification for the Button component.
 */

import type { ComponentSpec } from "../../types";
import { createSystemRef, createLiteralRef, buttonStateSpec } from "../../types";

export const buttonSpec: ComponentSpec = {
  name: "Button",
  category: "primitive",
  description: "Clickable button for user interactions",
  dependencies: ["Icon"],
  
  slots: [
    {
      id: "root",
      name: "Button Root",
      description: "Main button container",
      isRoot: true,
      element: "button",
    },
    {
      id: "iconLeft",
      name: "Left Icon",
      description: "Optional icon on the left side of the button",
      parent: "root",
      element: "svg",
    },
    {
      id: "label",
      name: "Label",
      description: "Button text content",
      parent: "root",
      element: "span",
    },
    {
      id: "iconRight",
      name: "Right Icon",
      description: "Optional icon on the right side of the button",
      parent: "root",
      element: "svg",
    },
  ],
  
  variants: [
    {
      value: "default",
      label: "Default",
      description: "Primary action button",
      slotPreset: "action-primary",
    },
    {
      value: "destructive",
      label: "Destructive",
      description: "Dangerous/destructive action",
      slotPreset: "action-destructive",
    },
    {
      value: "outline",
      label: "Outline",
      description: "Bordered button with transparent background",
      slotPreset: "action-outline",
    },
    {
      value: "secondary",
      label: "Secondary",
      description: "Secondary action button",
      slotPreset: "action-secondary",
    },
    {
      value: "ghost",
      label: "Ghost",
      description: "Minimal button with no background",
      slotPreset: "action-ghost",
    },
    {
      value: "link",
      label: "Link",
      description: "Button styled as a text link",
      slotPreset: "action-link",
    },
  ],
  
  sizes: [
    {
      value: "xs",
      label: "Extra Small",
      tokenOverrides: {
        height: createSystemRef("spacing.7"),
        paddingX: createSystemRef("spacing.2"),
        fontSize: createSystemRef("typography.fontSize.xs"),
      },
    },
    {
      value: "sm",
      label: "Small",
      tokenOverrides: {
        height: createSystemRef("spacing.8"),
        paddingX: createSystemRef("spacing.3"),
        fontSize: createSystemRef("typography.fontSize.xs"),
      },
    },
    {
      value: "default",
      label: "Default",
      tokenOverrides: {
        height: createSystemRef("spacing.9"),
        paddingX: createSystemRef("spacing.4"),
        fontSize: createSystemRef("typography.fontSize.sm"),
      },
    },
    {
      value: "lg",
      label: "Large",
      tokenOverrides: {
        height: createSystemRef("spacing.10"),
        paddingX: createSystemRef("spacing.6"),
        fontSize: createSystemRef("typography.fontSize.sm"),
      },
    },
    {
      value: "icon",
      label: "Icon Only",
      tokenOverrides: {
        height: createSystemRef("spacing.9"),
        width: createSystemRef("spacing.9"),
        paddingX: createLiteralRef("0"),
      },
    },
    {
      value: "icon-xs",
      label: "Icon Extra Small",
      tokenOverrides: {
        height: createSystemRef("spacing.6"),
        width: createSystemRef("spacing.6"),
        paddingX: createLiteralRef("0"),
      },
    },
    {
      value: "icon-sm",
      label: "Icon Small",
      tokenOverrides: {
        height: createSystemRef("spacing.8"),
        width: createSystemRef("spacing.8"),
        paddingX: createLiteralRef("0"),
      },
    },
    {
      value: "icon-lg",
      label: "Icon Large",
      tokenOverrides: {
        height: createSystemRef("spacing.10"),
        width: createSystemRef("spacing.10"),
        paddingX: createLiteralRef("0"),
      },
    },
  ],
  
  tokenableProperties: [
    // Root - Colors
    {
      name: "background",
      slot: "root",
      category: "color",
      defaultToken: createSystemRef("colors.primary"),
      states: ["default", "hover", "active", "disabled"],
      cssProperty: "background-color",
      customizable: true,
      description: "Button background color",
    },
    {
      name: "foreground",
      slot: "root",
      category: "color",
      defaultToken: createSystemRef("colors.primary-foreground"),
      states: ["default", "hover", "active", "disabled"],
      cssProperty: "color",
      customizable: true,
      description: "Button text/icon color",
    },
    {
      name: "border",
      slot: "root",
      category: "color",
      defaultToken: createLiteralRef("transparent"),
      states: ["default", "hover", "focus"],
      variants: ["outline"],
      cssProperty: "border-color",
      customizable: true,
      description: "Button border color",
    },
    
    // Root - Spacing
    {
      name: "paddingX",
      slot: "root",
      category: "spacing",
      defaultToken: createSystemRef("spacing.4"),
      cssProperty: "padding-inline",
      customizable: true,
      description: "Horizontal padding",
    },
    {
      name: "paddingY",
      slot: "root",
      category: "spacing",
      defaultToken: createSystemRef("spacing.2"),
      cssProperty: "padding-block",
      customizable: true,
      description: "Vertical padding",
    },
    {
      name: "gap",
      slot: "root",
      category: "spacing",
      defaultToken: createSystemRef("spacing.2"),
      cssProperty: "gap",
      customizable: true,
      description: "Gap between icon and label",
    },
    
    // Root - Sizing
    {
      name: "height",
      slot: "root",
      category: "spacing",
      defaultToken: createSystemRef("spacing.9"),
      cssProperty: "height",
      customizable: true,
      description: "Button height",
    },
    {
      name: "minWidth",
      slot: "root",
      category: "spacing",
      defaultToken: createLiteralRef("auto"),
      cssProperty: "min-width",
      customizable: true,
      description: "Minimum button width",
    },
    
    // Root - Border
    {
      name: "borderRadius",
      slot: "root",
      category: "radius",
      defaultToken: createSystemRef("radius.md"),
      cssProperty: "border-radius",
      customizable: true,
      description: "Button corner radius",
    },
    {
      name: "borderWidth",
      slot: "root",
      category: "border",
      defaultToken: createSystemRef("border.width"),
      cssProperty: "border-width",
      customizable: true,
      description: "Button border thickness",
    },
    
    // Root - Typography
    {
      name: "fontSize",
      slot: "root",
      category: "typography",
      defaultToken: createSystemRef("typography.fontSize.sm"),
      cssProperty: "font-size",
      customizable: true,
      description: "Button text size",
    },
    {
      name: "fontWeight",
      slot: "root",
      category: "typography",
      defaultToken: createSystemRef("typography.fontWeight.medium"),
      cssProperty: "font-weight",
      customizable: true,
      description: "Button text weight",
    },
    {
      name: "lineHeight",
      slot: "root",
      category: "typography",
      defaultToken: createSystemRef("typography.lineHeight.normal"),
      cssProperty: "line-height",
      customizable: false,
    },
    
    // Root - Effects
    {
      name: "shadow",
      slot: "root",
      category: "shadow",
      defaultToken: createSystemRef("shadow.xs"),
      cssProperty: "box-shadow",
      customizable: true,
      description: "Button shadow",
    },
    {
      name: "ringColor",
      slot: "root",
      category: "color",
      defaultToken: createSystemRef("colors.ring"),
      states: ["focus-visible"],
      cssProperty: "--tw-ring-color",
      customizable: true,
      description: "Focus ring color",
    },
    {
      name: "ringWidth",
      slot: "root",
      category: "border",
      defaultToken: createLiteralRef("3px"),
      states: ["focus-visible"],
      cssProperty: "--tw-ring-width",
      customizable: true,
      description: "Focus ring thickness",
    },
    {
      name: "ringOffset",
      slot: "root",
      category: "spacing",
      defaultToken: createLiteralRef("2px"),
      states: ["focus-visible"],
      cssProperty: "--tw-ring-offset-width",
      customizable: true,
      description: "Focus ring offset",
    },
    
    // Left Icon slot
    {
      name: "iconLeftSize",
      slot: "iconLeft",
      category: "spacing",
      defaultToken: createSystemRef("spacing.4"),
      cssProperty: "width",
      customizable: true,
      description: "Left icon dimensions",
    },
    {
      name: "iconLeftColor",
      slot: "iconLeft",
      category: "color",
      defaultToken: createLiteralRef("currentColor"),
      cssProperty: "color",
      customizable: false,
      description: "Left icon color (inherits from foreground)",
    },
    
    // Right Icon slot
    {
      name: "iconRightSize",
      slot: "iconRight",
      category: "spacing",
      defaultToken: createSystemRef("spacing.4"),
      cssProperty: "width",
      customizable: true,
      description: "Right icon dimensions",
    },
    {
      name: "iconRightColor",
      slot: "iconRight",
      category: "color",
      defaultToken: createLiteralRef("currentColor"),
      cssProperty: "color",
      customizable: false,
      description: "Right icon color (inherits from foreground)",
    },
  ],
  
  stateSpec: buttonStateSpec,
  
  motionTokens: {
    enterDuration: "instant",
    exitDuration: "instant",
    enterEasing: "ease-out",
    exitEasing: "ease-in",
    hoverDuration: "fast",
    focusDuration: "instant",
  },
  
  figmaMapping: [
    {
      codeProperty: "variant",
      figmaPropertyType: "VARIANT",
      figmaPropertyName: "Variant",
      valueMapping: {
        default: "Primary",
        destructive: "Destructive",
        outline: "Outline",
        secondary: "Secondary",
        ghost: "Ghost",
        link: "Link",
      },
    },
    {
      codeProperty: "size",
      figmaPropertyType: "VARIANT",
      figmaPropertyName: "Size",
      valueMapping: {
        xs: "XS",
        sm: "SM",
        default: "MD",
        lg: "LG",
        icon: "Icon",
        "icon-xs": "Icon-XS",
        "icon-sm": "Icon-SM",
        "icon-lg": "Icon-LG",
      },
    },
    {
      codeProperty: "disabled",
      figmaPropertyType: "BOOLEAN",
      figmaPropertyName: "Disabled",
      defaultValue: false,
    },
    {
      codeProperty: "children",
      figmaPropertyType: "TEXT",
      figmaPropertyName: "Label",
      defaultValue: "Button",
    },
    {
      codeProperty: "showLeftIcon",
      figmaPropertyType: "BOOLEAN",
      figmaPropertyName: "Show Left Icon",
      defaultValue: false,
    },
    {
      codeProperty: "showRightIcon",
      figmaPropertyType: "BOOLEAN",
      figmaPropertyName: "Show Right Icon",
      defaultValue: false,
    },
    {
      codeProperty: "iconLeft",
      figmaPropertyType: "INSTANCE_SWAP",
      figmaPropertyName: "Left Icon",
    },
    {
      codeProperty: "iconRight",
      figmaPropertyType: "INSTANCE_SWAP",
      figmaPropertyName: "Right Icon",
    },
  ],
  
  compositionRules: [
    {
      type: "recommended",
      description: "Use icon size that matches button height",
      targets: ["iconLeft", "iconRight", "root"],
    },
    {
      type: "forbidden",
      description: "Icon-only button should not have label",
      targets: ["label"],
      condition: "size.startsWith('icon')",
    },
    {
      type: "recommended",
      description: "Icon-only button should use iconLeft for the icon",
      targets: ["iconLeft"],
      condition: "size.startsWith('icon')",
    },
  ],
  
  isSystem: true,
  tags: ["interactive", "action", "form", "cta"],
  version: "1.0.0",
};
