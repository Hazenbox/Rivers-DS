/**
 * INPUT COMPONENT SPECIFICATION
 * 
 * Complete token specification for the Input component.
 */

import type { ComponentSpec } from "../../types";
import { createSystemRef, createLiteralRef, inputStateSpec } from "../../types";

export const inputSpec: ComponentSpec = {
  name: "Input",
  category: "primitive",
  description: "Text input field for forms",
  dependencies: [],
  
  slots: [
    {
      id: "root",
      name: "Input Root",
      description: "Main input element",
      isRoot: true,
      defaultPreset: "input-default",
      element: "input",
    },
  ],
  
  variants: [
    {
      value: "default",
      label: "Default",
      description: "Standard input styling",
      slotPreset: "input-default",
    },
  ],
  
  sizes: [
    {
      value: "sm",
      label: "Small",
      tokenOverrides: {
        height: createSystemRef("spacing.8"),
        paddingX: createSystemRef("spacing.2"),
        fontSize: createSystemRef("typography.fontSize.xs"),
      },
    },
    {
      value: "default",
      label: "Default",
      tokenOverrides: {
        height: createSystemRef("spacing.9"),
        paddingX: createSystemRef("spacing.3"),
        fontSize: createSystemRef("typography.fontSize.sm"),
      },
    },
    {
      value: "lg",
      label: "Large",
      tokenOverrides: {
        height: createSystemRef("spacing.11"),
        paddingX: createSystemRef("spacing.4"),
        fontSize: createSystemRef("typography.fontSize.base"),
      },
    },
  ],
  
  tokenableProperties: [
    // Colors
    {
      name: "background",
      slot: "root",
      category: "color",
      defaultToken: createLiteralRef("transparent"),
      states: ["default", "hover", "focus", "disabled"],
      cssProperty: "background-color",
      customizable: true,
      description: "Input background color",
    },
    {
      name: "foreground",
      slot: "root",
      category: "color",
      defaultToken: createSystemRef("colors.foreground"),
      states: ["default", "disabled"],
      cssProperty: "color",
      customizable: true,
      description: "Input text color",
    },
    {
      name: "border",
      slot: "root",
      category: "color",
      defaultToken: createSystemRef("colors.input"),
      states: ["default", "hover", "focus", "invalid", "disabled"],
      cssProperty: "border-color",
      customizable: true,
      description: "Input border color",
    },
    {
      name: "placeholder",
      slot: "root",
      category: "color",
      defaultToken: createSystemRef("colors.muted-foreground"),
      cssProperty: "::placeholder color",
      customizable: true,
      description: "Placeholder text color",
    },
    {
      name: "ring",
      slot: "root",
      category: "color",
      defaultToken: createSystemRef("colors.ring"),
      states: ["focus"],
      cssProperty: "--tw-ring-color",
      customizable: true,
      description: "Focus ring color",
    },
    
    // Spacing
    {
      name: "paddingX",
      slot: "root",
      category: "spacing",
      defaultToken: createSystemRef("spacing.3"),
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
    
    // Sizing
    {
      name: "height",
      slot: "root",
      category: "spacing",
      defaultToken: createSystemRef("spacing.9"),
      cssProperty: "height",
      customizable: true,
      description: "Input height",
    },
    {
      name: "minWidth",
      slot: "root",
      category: "spacing",
      defaultToken: createLiteralRef("0"),
      cssProperty: "min-width",
      customizable: true,
      description: "Minimum input width",
    },
    
    // Border
    {
      name: "borderRadius",
      slot: "root",
      category: "radius",
      defaultToken: createSystemRef("radius.md"),
      cssProperty: "border-radius",
      customizable: true,
      description: "Input corner radius",
    },
    {
      name: "borderWidth",
      slot: "root",
      category: "border",
      defaultToken: createSystemRef("border.width"),
      cssProperty: "border-width",
      customizable: true,
      description: "Input border thickness",
    },
    
    // Typography
    {
      name: "fontSize",
      slot: "root",
      category: "typography",
      defaultToken: createSystemRef("typography.fontSize.sm"),
      cssProperty: "font-size",
      customizable: true,
      description: "Input text size",
    },
    {
      name: "fontWeight",
      slot: "root",
      category: "typography",
      defaultToken: createSystemRef("typography.fontWeight.normal"),
      cssProperty: "font-weight",
      customizable: false,
    },
    {
      name: "lineHeight",
      slot: "root",
      category: "typography",
      defaultToken: createSystemRef("typography.lineHeight.normal"),
      cssProperty: "line-height",
      customizable: false,
    },
    
    // Effects
    {
      name: "shadow",
      slot: "root",
      category: "shadow",
      defaultToken: createSystemRef("shadow.xs"),
      cssProperty: "box-shadow",
      customizable: true,
      description: "Input shadow",
    },
    {
      name: "ringWidth",
      slot: "root",
      category: "border",
      defaultToken: createLiteralRef("3px"),
      states: ["focus"],
      cssProperty: "--tw-ring-width",
      customizable: true,
      description: "Focus ring thickness",
    },
    {
      name: "ringOffset",
      slot: "root",
      category: "spacing",
      defaultToken: createLiteralRef("0px"),
      states: ["focus"],
      cssProperty: "--tw-ring-offset-width",
      customizable: true,
      description: "Focus ring offset",
    },
  ],
  
  stateSpec: inputStateSpec,
  
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
      codeProperty: "size",
      figmaPropertyType: "VARIANT",
      figmaPropertyName: "Size",
      valueMapping: {
        sm: "SM",
        default: "MD",
        lg: "LG",
      },
    },
    {
      codeProperty: "disabled",
      figmaPropertyType: "BOOLEAN",
      figmaPropertyName: "Disabled",
      defaultValue: false,
    },
    {
      codeProperty: "placeholder",
      figmaPropertyType: "TEXT",
      figmaPropertyName: "Placeholder",
      defaultValue: "Enter text...",
    },
    {
      codeProperty: "value",
      figmaPropertyType: "TEXT",
      figmaPropertyName: "Value",
      defaultValue: "",
    },
  ],
  
  isSystem: true,
  tags: ["form", "input", "text", "field"],
  version: "1.0.0",
};
