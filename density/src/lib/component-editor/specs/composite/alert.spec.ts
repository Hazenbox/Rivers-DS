/**
 * ALERT COMPONENT SPECIFICATION
 * 
 * Complete token specification for the Alert component.
 */

import type { ComponentSpec } from "../../types";
import { createSystemRef, createLiteralRef } from "../../types";

export const alertSpec: ComponentSpec = {
  name: "Alert",
  category: "composite",
  description: "Feedback message for user attention",
  dependencies: ["Icon"],
  
  slots: [
    {
      id: "root",
      name: "Alert Root",
      description: "Main alert container",
      isRoot: true,
      defaultPreset: "feedback-info",
      element: "div",
    },
    {
      id: "icon",
      name: "Alert Icon",
      description: "Alert status icon",
      parent: "root",
      element: "svg",
    },
    {
      id: "content",
      name: "Alert Content",
      description: "Alert text content wrapper",
      parent: "root",
      element: "div",
    },
    {
      id: "title",
      name: "Alert Title",
      description: "Alert title/heading",
      parent: "content",
      element: "h5",
    },
    {
      id: "description",
      name: "Alert Description",
      description: "Alert description text",
      parent: "content",
      element: "p",
    },
  ],
  
  variants: [
    {
      value: "default",
      label: "Default",
      description: "Default/info alert",
      slotPreset: "feedback-info",
    },
    {
      value: "destructive",
      label: "Destructive",
      description: "Error/danger alert",
      slotPreset: "feedback-destructive",
    },
    {
      value: "success",
      label: "Success",
      description: "Success confirmation",
      slotPreset: "feedback-success",
      tokenOverrides: {
        iconColor: createSystemRef("colors.success"),
      },
    },
    {
      value: "warning",
      label: "Warning",
      description: "Warning message",
      slotPreset: "feedback-warning",
      tokenOverrides: {
        iconColor: createSystemRef("colors.warning"),
      },
    },
  ],
  
  sizes: [
    {
      value: "default",
      label: "Default",
    },
  ],
  
  tokenableProperties: [
    // Root - Colors
    {
      name: "background",
      slot: "root",
      category: "color",
      defaultToken: createSystemRef("colors.muted"),
      cssProperty: "background-color",
      customizable: true,
      description: "Alert background color",
    },
    {
      name: "foreground",
      slot: "root",
      category: "color",
      defaultToken: createSystemRef("colors.foreground"),
      cssProperty: "color",
      customizable: true,
      description: "Alert text color",
    },
    {
      name: "border",
      slot: "root",
      category: "color",
      defaultToken: createSystemRef("colors.border"),
      cssProperty: "border-color",
      customizable: true,
      description: "Alert border color",
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
      defaultToken: createSystemRef("spacing.4"),
      cssProperty: "padding-block",
      customizable: true,
      description: "Vertical padding",
    },
    {
      name: "gap",
      slot: "root",
      category: "spacing",
      defaultToken: createSystemRef("spacing.3"),
      cssProperty: "gap",
      customizable: true,
      description: "Gap between icon and content",
    },
    
    // Root - Border
    {
      name: "borderRadius",
      slot: "root",
      category: "radius",
      defaultToken: createSystemRef("radius.lg"),
      cssProperty: "border-radius",
      customizable: true,
      description: "Alert corner radius",
    },
    {
      name: "borderWidth",
      slot: "root",
      category: "border",
      defaultToken: createSystemRef("border.width"),
      cssProperty: "border-width",
      customizable: true,
      description: "Alert border thickness",
    },
    
    // Icon
    {
      name: "iconSize",
      slot: "icon",
      category: "spacing",
      defaultToken: createSystemRef("spacing.4"),
      cssProperty: "width",
      customizable: true,
      description: "Icon dimensions",
    },
    {
      name: "iconColor",
      slot: "icon",
      category: "color",
      defaultToken: createSystemRef("colors.foreground"),
      cssProperty: "color",
      customizable: true,
      description: "Icon color",
    },
    
    // Content
    {
      name: "contentGap",
      slot: "content",
      category: "spacing",
      defaultToken: createSystemRef("spacing.1"),
      cssProperty: "gap",
      customizable: true,
      description: "Gap between title and description",
    },
    
    // Title
    {
      name: "titleFontSize",
      slot: "title",
      category: "typography",
      defaultToken: createSystemRef("typography.fontSize.sm"),
      cssProperty: "font-size",
      customizable: true,
      description: "Title font size",
    },
    {
      name: "titleFontWeight",
      slot: "title",
      category: "typography",
      defaultToken: createSystemRef("typography.fontWeight.medium"),
      cssProperty: "font-weight",
      customizable: true,
      description: "Title font weight",
    },
    {
      name: "titleLineHeight",
      slot: "title",
      category: "typography",
      defaultToken: createSystemRef("typography.lineHeight.tight"),
      cssProperty: "line-height",
      customizable: false,
    },
    
    // Description
    {
      name: "descriptionFontSize",
      slot: "description",
      category: "typography",
      defaultToken: createSystemRef("typography.fontSize.sm"),
      cssProperty: "font-size",
      customizable: true,
      description: "Description font size",
    },
    {
      name: "descriptionOpacity",
      slot: "description",
      category: "opacity",
      defaultToken: createLiteralRef("0.9"),
      cssProperty: "opacity",
      customizable: true,
      description: "Description text opacity",
    },
  ],
  
  figmaMapping: [
    {
      codeProperty: "variant",
      figmaPropertyType: "VARIANT",
      figmaPropertyName: "Variant",
      valueMapping: {
        default: "Info",
        destructive: "Error",
        success: "Success",
        warning: "Warning",
      },
    },
  ],
  
  compositionRules: [
    {
      type: "recommended",
      description: "Alert should have at least a title or description",
      targets: ["title", "description"],
    },
    {
      type: "recommended",
      description: "Icon helps convey alert severity",
      targets: ["icon"],
    },
  ],
  
  isSystem: true,
  tags: ["feedback", "notification", "message"],
  version: "1.0.0",
};
