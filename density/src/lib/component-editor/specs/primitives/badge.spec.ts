/**
 * BADGE COMPONENT SPECIFICATION
 * 
 * Complete token specification for the Badge component.
 */

import type { ComponentSpec } from "../../types";
import { createSystemRef, createLiteralRef } from "../../types";

export const badgeSpec: ComponentSpec = {
  name: "Badge",
  category: "primitive",
  description: "Small status indicator or label",
  dependencies: [],
  
  slots: [
    {
      id: "root",
      name: "Badge Root",
      description: "Main badge container",
      isRoot: true,
      element: "span",
    },
  ],
  
  variants: [
    {
      value: "default",
      label: "Default",
      description: "Primary badge styling",
      slotPreset: "action-primary",
    },
    {
      value: "secondary",
      label: "Secondary",
      description: "Secondary/muted badge",
      slotPreset: "action-secondary",
    },
    {
      value: "destructive",
      label: "Destructive",
      description: "Error/danger badge",
      slotPreset: "action-destructive",
    },
    {
      value: "outline",
      label: "Outline",
      description: "Bordered badge with transparent background",
      slotPreset: "action-outline",
    },
  ],
  
  sizes: [
    {
      value: "sm",
      label: "Small",
      tokenOverrides: {
        paddingX: createSystemRef("spacing.1.5"),
        paddingY: createSystemRef("spacing.0.5"),
        fontSize: createSystemRef("typography.fontSize.xs"),
      },
    },
    {
      value: "default",
      label: "Default",
      tokenOverrides: {
        paddingX: createSystemRef("spacing.2.5"),
        paddingY: createSystemRef("spacing.0.5"),
        fontSize: createSystemRef("typography.fontSize.xs"),
      },
    },
  ],
  
  tokenableProperties: [
    // Colors
    {
      name: "background",
      slot: "root",
      category: "color",
      defaultToken: createSystemRef("colors.primary"),
      cssProperty: "background-color",
      customizable: true,
      description: "Badge background color",
    },
    {
      name: "foreground",
      slot: "root",
      category: "color",
      defaultToken: createSystemRef("colors.primary-foreground"),
      cssProperty: "color",
      customizable: true,
      description: "Badge text color",
    },
    {
      name: "border",
      slot: "root",
      category: "color",
      defaultToken: createLiteralRef("transparent"),
      variants: ["outline"],
      cssProperty: "border-color",
      customizable: true,
      description: "Badge border color",
    },
    
    // Spacing
    {
      name: "paddingX",
      slot: "root",
      category: "spacing",
      defaultToken: createSystemRef("spacing.2.5"),
      cssProperty: "padding-inline",
      customizable: true,
      description: "Horizontal padding",
    },
    {
      name: "paddingY",
      slot: "root",
      category: "spacing",
      defaultToken: createSystemRef("spacing.0.5"),
      cssProperty: "padding-block",
      customizable: true,
      description: "Vertical padding",
    },
    
    // Border
    {
      name: "borderRadius",
      slot: "root",
      category: "radius",
      defaultToken: createSystemRef("radius.md"),
      cssProperty: "border-radius",
      customizable: true,
      description: "Badge corner radius",
    },
    {
      name: "borderWidth",
      slot: "root",
      category: "border",
      defaultToken: createSystemRef("border.width"),
      variants: ["outline"],
      cssProperty: "border-width",
      customizable: true,
      description: "Badge border thickness",
    },
    
    // Typography
    {
      name: "fontSize",
      slot: "root",
      category: "typography",
      defaultToken: createSystemRef("typography.fontSize.xs"),
      cssProperty: "font-size",
      customizable: true,
      description: "Badge text size",
    },
    {
      name: "fontWeight",
      slot: "root",
      category: "typography",
      defaultToken: createSystemRef("typography.fontWeight.medium"),
      cssProperty: "font-weight",
      customizable: true,
      description: "Badge text weight",
    },
    {
      name: "lineHeight",
      slot: "root",
      category: "typography",
      defaultToken: createSystemRef("typography.lineHeight.none"),
      cssProperty: "line-height",
      customizable: false,
    },
  ],
  
  figmaMapping: [
    {
      codeProperty: "variant",
      figmaPropertyType: "VARIANT",
      figmaPropertyName: "Variant",
      valueMapping: {
        default: "Primary",
        secondary: "Secondary",
        destructive: "Destructive",
        outline: "Outline",
      },
    },
    {
      codeProperty: "children",
      figmaPropertyType: "TEXT",
      figmaPropertyName: "Label",
      defaultValue: "Badge",
    },
  ],
  
  isSystem: true,
  tags: ["status", "indicator", "label", "tag"],
  version: "1.0.0",
};
