/**
 * FIGMA MCP INTEGRATION
 * 
 * Integration module for syncing between the component editor and Figma.
 * Uses the Figma MCP server for design-to-code workflows.
 */

export {
  type FigmaSyncConfig,
  type FigmaDesignContext,
  type FigmaVariableDef,
  type FigmaCodeConnectMapping,
  type FigmaSyncResult,
  parseFigmaUrl,
  createFigmaSyncConfig,
} from "./figma-sync";

export {
  type DesignTokenMapping,
  type PropertyTypeMapping,
  mapFigmaVariablesToTokens,
  mapTokensToFigmaVariables,
  createPropertyTypeMapping,
  inferTokenCategoryFromFigmaType,
} from "./token-mapping";

export {
  type CodeConnectConfig,
  type CodeConnectSuggestion,
  generateCodeConnectConfigs,
  mapComponentToCodeConnect,
} from "./code-connect";

export {
  figmaToLucideMap,
  figmaIconToLucide,
  generateIconImport,
  buttonSizeToIconSize,
  getIconSizeForButton,
  kebabToPascal,
  pascalToKebab,
} from "./icon-mapping";
