/**
 * CARD COMPONENT SPECIFICATION
 * 
 * Complete token specification for the Card composite component.
 */

import type { ComponentSpec } from "../../types";
import { createSystemRef, createLiteralRef } from "../../types";

export const cardSpec: ComponentSpec = {
  name: "Card",
  category: "composite",
  description: "Container for related content and actions",
  dependencies: ["Button"],
  
  slots: [
    {
      id: "root",
      name: "Card Root",
      description: "Main card container",
      isRoot: true,
      defaultPreset: "surface-card",
      element: "div",
    },
    {
      id: "header",
      name: "Card Header",
      description: "Card header section",
      parent: "root",
      element: "div",
    },
    {
      id: "title",
      name: "Card Title",
      description: "Card title text",
      parent: "header",
      element: "h3",
    },
    {
      id: "description",
      name: "Card Description",
      description: "Card subtitle/description text",
      parent: "header",
      element: "p",
    },
    {
      id: "content",
      name: "Card Content",
      description: "Main card content area",
      parent: "root",
      element: "div",
    },
    {
      id: "footer",
      name: "Card Footer",
      description: "Card footer with actions",
      parent: "root",
      element: "div",
    },
  ],
  
  variants: [
    {
      value: "default",
      label: "Default",
      description: "Standard card styling",
      slotPreset: "surface-card",
    },
    {
      value: "elevated",
      label: "Elevated",
      description: "Card with prominent shadow",
      tokenOverrides: {
        shadow: createSystemRef("shadow.md"),
      },
    },
    {
      value: "ghost",
      label: "Ghost",
      description: "Card without border or background",
      tokenOverrides: {
        background: createLiteralRef("transparent"),
        border: createLiteralRef("transparent"),
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
      defaultToken: createSystemRef("colors.card"),
      cssProperty: "background-color",
      customizable: true,
      description: "Card background color",
    },
    {
      name: "foreground",
      slot: "root",
      category: "color",
      defaultToken: createSystemRef("colors.card-foreground"),
      cssProperty: "color",
      customizable: true,
      description: "Card text color",
    },
    {
      name: "border",
      slot: "root",
      category: "color",
      defaultToken: createSystemRef("colors.border"),
      cssProperty: "border-color",
      customizable: true,
      description: "Card border color",
    },
    
    // Root - Spacing
    {
      name: "padding",
      slot: "root",
      category: "spacing",
      defaultToken: createSystemRef("spacing.6"),
      cssProperty: "padding",
      customizable: true,
      description: "Card internal padding",
    },
    {
      name: "gap",
      slot: "root",
      category: "spacing",
      defaultToken: createSystemRef("spacing.4"),
      cssProperty: "gap",
      customizable: true,
      description: "Gap between card sections",
    },
    
    // Root - Border
    {
      name: "borderRadius",
      slot: "root",
      category: "radius",
      defaultToken: createSystemRef("radius.xl"),
      cssProperty: "border-radius",
      customizable: true,
      description: "Card corner radius",
    },
    {
      name: "borderWidth",
      slot: "root",
      category: "border",
      defaultToken: createSystemRef("border.width"),
      cssProperty: "border-width",
      customizable: true,
      description: "Card border thickness",
    },
    
    // Root - Shadow
    {
      name: "shadow",
      slot: "root",
      category: "shadow",
      defaultToken: createSystemRef("shadow.sm"),
      cssProperty: "box-shadow",
      customizable: true,
      description: "Card shadow",
    },
    
    // Header
    {
      name: "headerGap",
      slot: "header",
      category: "spacing",
      defaultToken: createSystemRef("spacing.1.5"),
      cssProperty: "gap",
      customizable: true,
      description: "Gap between title and description",
    },
    
    // Title
    {
      name: "titleFontSize",
      slot: "title",
      category: "typography",
      defaultToken: createSystemRef("typography.fontSize.lg"),
      cssProperty: "font-size",
      customizable: true,
      description: "Title font size",
    },
    {
      name: "titleFontWeight",
      slot: "title",
      category: "typography",
      defaultToken: createSystemRef("typography.fontWeight.semibold"),
      cssProperty: "font-weight",
      customizable: true,
      description: "Title font weight",
    },
    {
      name: "titleLineHeight",
      slot: "title",
      category: "typography",
      defaultToken: createSystemRef("typography.lineHeight.none"),
      cssProperty: "line-height",
      customizable: false,
    },
    
    // Description
    {
      name: "descriptionColor",
      slot: "description",
      category: "color",
      defaultToken: createSystemRef("colors.muted-foreground"),
      cssProperty: "color",
      customizable: true,
      description: "Description text color",
    },
    {
      name: "descriptionFontSize",
      slot: "description",
      category: "typography",
      defaultToken: createSystemRef("typography.fontSize.sm"),
      cssProperty: "font-size",
      customizable: true,
      description: "Description font size",
    },
    
    // Footer
    {
      name: "footerGap",
      slot: "footer",
      category: "spacing",
      defaultToken: createSystemRef("spacing.2"),
      cssProperty: "gap",
      customizable: true,
      description: "Gap between footer items",
    },
    {
      name: "footerPaddingTop",
      slot: "footer",
      category: "spacing",
      defaultToken: createSystemRef("spacing.0"),
      cssProperty: "padding-top",
      customizable: true,
      description: "Footer top padding",
    },
  ],
  
  nestedComponents: {
    "footer-button": {
      component: "Button",
      parentSlot: "footer",
      defaultVariant: "default",
      defaultSize: "default",
      optional: true,
    },
  },
  
  figmaMapping: [
    {
      codeProperty: "variant",
      figmaPropertyType: "VARIANT",
      figmaPropertyName: "Variant",
      valueMapping: {
        default: "Default",
        elevated: "Elevated",
        ghost: "Ghost",
      },
    },
  ],
  
  compositionRules: [
    {
      type: "recommended",
      description: "Card should have at least a title or content",
      targets: ["title", "content"],
    },
    {
      type: "recommended",
      description: "Footer should contain actions if present",
      targets: ["footer"],
    },
  ],
  
  isSystem: true,
  tags: ["container", "surface", "layout"],
  version: "1.0.0",
};
