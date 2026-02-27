/**
 * EXPORT MODULE INDEX
 */

export {
  type CSSExportOptions,
  type CSSExportResult,
  exportCustomTokensAsCSS,
  exportComponentTokensAsCSS,
  exportFullCSS,
  exportAsTailwindConfig,
} from "./css-export";

export {
  type DTCGToken,
  type DTCGGroup,
  type DTCGExportOptions,
  type DTCGExportResult,
  exportAsDTCG,
  importFromDTCG,
} from "./dtcg-export";

export {
  type FigmaExportOptions,
  type FigmaExportResult,
  exportForFigma,
  generateCodeConnectConfigs,
  exportForFigmaTokensPlugin,
} from "./figma-export";

// Figma Plugin Export (DS-Bridge)
export {
  type FigmaPluginExport,
  type FigmaPluginVariableCollection,
  type FigmaPluginVariable,
  type FigmaPluginComponent,
  type FigmaPluginComponentVariant,
  type FigmaPluginSlot,
  type FigmaPluginTextStyle,
  type FigmaPluginEffectStyle,
  type FigmaPluginCodeConnect,
  type FigmaVariableScope,
  type FigmaVariableType,
  isValidFigmaPluginExport,
  validateFigmaPluginExport,
} from "./figma-plugin-schema";

export {
  type ExportOptions as FigmaPluginExportOptions,
  exportForFigmaPlugin,
  exportForFigmaPluginAsJSON,
  downloadFigmaPluginExport,
} from "./figma-plugin-export";
