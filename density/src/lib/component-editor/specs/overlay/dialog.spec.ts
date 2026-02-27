/**
 * DIALOG COMPONENT SPECIFICATION
 * 
 * Complete token specification for the Dialog overlay component.
 */

import type { ComponentSpec } from "../../types";
import { createSystemRef, createLiteralRef, dialogStateSpec } from "../../types";

export const dialogSpec: ComponentSpec = {
  name: "Dialog",
  category: "overlay",
  description: "Modal dialog for focused user interactions",
  dependencies: ["Button"],
  
  slots: [
    {
      id: "overlay",
      name: "Dialog Overlay",
      description: "Background overlay/backdrop",
      defaultPreset: "overlay-backdrop",
      element: "div",
    },
    {
      id: "content",
      name: "Dialog Content",
      description: "Main dialog container",
      isRoot: true,
      defaultPreset: "surface-dialog",
      element: "div",
    },
    {
      id: "header",
      name: "Dialog Header",
      description: "Header with title and close button",
      parent: "content",
      element: "div",
    },
    {
      id: "title",
      name: "Dialog Title",
      description: "Dialog title text",
      parent: "header",
      element: "h2",
    },
    {
      id: "description",
      name: "Dialog Description",
      description: "Dialog description/subtitle",
      parent: "header",
      element: "p",
    },
    {
      id: "body",
      name: "Dialog Body",
      description: "Main content area",
      parent: "content",
      element: "div",
    },
    {
      id: "footer",
      name: "Dialog Footer",
      description: "Footer with action buttons",
      parent: "content",
      element: "div",
    },
    {
      id: "close-button",
      name: "Close Button",
      description: "Dialog close button",
      parent: "header",
      element: "button",
    },
  ],
  
  variants: [
    {
      value: "default",
      label: "Default",
      description: "Standard dialog",
      slotPreset: "surface-dialog",
    },
  ],
  
  sizes: [
    {
      value: "sm",
      label: "Small",
      tokenOverrides: {
        maxWidth: createLiteralRef("425px"),
      },
    },
    {
      value: "default",
      label: "Default",
      tokenOverrides: {
        maxWidth: createLiteralRef("512px"),
      },
    },
    {
      value: "lg",
      label: "Large",
      tokenOverrides: {
        maxWidth: createLiteralRef("640px"),
      },
    },
    {
      value: "xl",
      label: "Extra Large",
      tokenOverrides: {
        maxWidth: createLiteralRef("768px"),
      },
    },
    {
      value: "full",
      label: "Full Width",
      tokenOverrides: {
        maxWidth: createLiteralRef("calc(100% - 2rem)"),
      },
    },
  ],
  
  tokenableProperties: [
    // Overlay
    {
      name: "overlayBackground",
      slot: "overlay",
      category: "color",
      defaultToken: createLiteralRef("rgb(0 0 0 / 0.5)"),
      cssProperty: "background-color",
      customizable: true,
      description: "Overlay backdrop color",
    },
    {
      name: "overlayBlur",
      slot: "overlay",
      category: "shadow",
      defaultToken: createLiteralRef("0"),
      cssProperty: "backdrop-filter",
      customizable: true,
      description: "Overlay backdrop blur",
    },
    
    // Content
    {
      name: "background",
      slot: "content",
      category: "color",
      defaultToken: createSystemRef("colors.background"),
      cssProperty: "background-color",
      customizable: true,
      description: "Dialog background color",
    },
    {
      name: "foreground",
      slot: "content",
      category: "color",
      defaultToken: createSystemRef("colors.foreground"),
      cssProperty: "color",
      customizable: true,
      description: "Dialog text color",
    },
    {
      name: "border",
      slot: "content",
      category: "color",
      defaultToken: createSystemRef("colors.border"),
      cssProperty: "border-color",
      customizable: true,
      description: "Dialog border color",
    },
    {
      name: "shadow",
      slot: "content",
      category: "shadow",
      defaultToken: createSystemRef("shadow.lg"),
      cssProperty: "box-shadow",
      customizable: true,
      description: "Dialog shadow",
    },
    {
      name: "borderRadius",
      slot: "content",
      category: "radius",
      defaultToken: createSystemRef("radius.lg"),
      cssProperty: "border-radius",
      customizable: true,
      description: "Dialog corner radius",
    },
    {
      name: "borderWidth",
      slot: "content",
      category: "border",
      defaultToken: createSystemRef("border.width"),
      cssProperty: "border-width",
      customizable: true,
      description: "Dialog border thickness",
    },
    {
      name: "padding",
      slot: "content",
      category: "spacing",
      defaultToken: createSystemRef("spacing.6"),
      cssProperty: "padding",
      customizable: true,
      description: "Dialog internal padding",
    },
    {
      name: "gap",
      slot: "content",
      category: "spacing",
      defaultToken: createSystemRef("spacing.4"),
      cssProperty: "gap",
      customizable: true,
      description: "Gap between dialog sections",
    },
    {
      name: "maxWidth",
      slot: "content",
      category: "spacing",
      defaultToken: createLiteralRef("512px"),
      cssProperty: "max-width",
      customizable: true,
      description: "Maximum dialog width",
    },
    {
      name: "width",
      slot: "content",
      category: "spacing",
      defaultToken: createLiteralRef("100%"),
      cssProperty: "width",
      customizable: true,
      description: "Dialog width",
    },
    
    // Header
    {
      name: "headerGap",
      slot: "header",
      category: "spacing",
      defaultToken: createSystemRef("spacing.2"),
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
      description: "Gap between footer buttons",
    },
    {
      name: "footerJustify",
      slot: "footer",
      category: "spacing",
      defaultToken: createLiteralRef("flex-end"),
      cssProperty: "justify-content",
      customizable: true,
      description: "Footer button alignment",
    },
    
    // Close button
    {
      name: "closeButtonSize",
      slot: "close-button",
      category: "spacing",
      defaultToken: createSystemRef("spacing.4"),
      cssProperty: "width",
      customizable: true,
      description: "Close button size",
    },
    {
      name: "closeButtonColor",
      slot: "close-button",
      category: "color",
      defaultToken: createSystemRef("colors.muted-foreground"),
      cssProperty: "color",
      customizable: true,
      description: "Close button color",
    },
    {
      name: "closeButtonOffset",
      slot: "close-button",
      category: "spacing",
      defaultToken: createSystemRef("spacing.4"),
      cssProperty: "top",
      customizable: true,
      description: "Close button position offset",
    },
  ],
  
  nestedComponents: {
    "close-button": {
      component: "Button",
      parentSlot: "close-button",
      defaultVariant: "ghost",
      defaultSize: "icon",
      tokenOverrides: {
        foreground: createSystemRef("colors.muted-foreground"),
      },
    },
    "footer-primary": {
      component: "Button",
      parentSlot: "footer",
      defaultVariant: "default",
      defaultSize: "default",
      optional: true,
    },
    "footer-secondary": {
      component: "Button",
      parentSlot: "footer",
      defaultVariant: "outline",
      defaultSize: "default",
      optional: true,
    },
  },
  
  stateSpec: dialogStateSpec,
  
  motionTokens: {
    enterDuration: "base",
    exitDuration: "fast",
    enterEasing: "ease-out",
    exitEasing: "ease-in",
    enterAnimation: "scale-in",
    exitAnimation: "scale-out",
  },
  
  figmaMapping: [
    {
      codeProperty: "open",
      figmaPropertyType: "BOOLEAN",
      figmaPropertyName: "Open",
      defaultValue: true,
    },
  ],
  
  compositionRules: [
    {
      type: "recommended",
      description: "Dialog should have a title for accessibility",
      targets: ["title"],
    },
    {
      type: "recommended",
      description: "Destructive actions should have a cancel option",
      targets: ["footer"],
    },
  ],
  
  responsiveOverrides: [
    {
      breakpoint: "sm",
      property: "maxWidth",
      token: createLiteralRef("calc(100% - 2rem)"),
    },
  ],
  
  isSystem: true,
  tags: ["overlay", "modal", "popup", "interactive"],
  version: "1.0.0",
};
