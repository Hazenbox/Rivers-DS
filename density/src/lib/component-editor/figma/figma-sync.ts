/**
 * FIGMA SYNC MODULE
 * 
 * Handles synchronization between the component editor and Figma designs.
 * Integrates with the Figma MCP server for design context and variables.
 */

import type { CustomToken, ComponentSpec } from "../types";

// ============================================
// TYPES
// ============================================

export interface FigmaSyncConfig {
  fileKey: string;
  nodeId?: string;
  clientLanguages?: string;
  clientFrameworks?: string;
}

export interface FigmaDesignContext {
  code: string;
  screenshot?: string;
  assets: Record<string, string>;
  codeConnect?: {
    source: string;
    name: string;
  };
  variables?: FigmaVariableDef[];
  annotations?: string[];
}

export interface FigmaVariableDef {
  name: string;
  value: string | number | object;
  type: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
  collection?: string;
  mode?: string;
  description?: string;
}

export interface FigmaCodeConnectMapping {
  nodeId: string;
  componentName: string;
  source: string;
  label: "React" | "Vue" | "Svelte" | "Web Components" | "Swift UIKit" | "SwiftUI" | "Compose" | "Flutter";
}

export interface FigmaSyncResult {
  success: boolean;
  tokens?: CustomToken[];
  codeConnect?: FigmaCodeConnectMapping[];
  errors?: string[];
}

// ============================================
// URL PARSING
// ============================================

/**
 * Parse a Figma URL to extract fileKey and nodeId
 */
export function parseFigmaUrl(url: string): { fileKey: string; nodeId?: string } | null {
  try {
    const urlObj = new URL(url);
    
    if (!urlObj.hostname.includes("figma.com")) {
      return null;
    }
    
    const pathParts = urlObj.pathname.split("/").filter(Boolean);
    
    // Handle different URL formats
    // figma.com/design/:fileKey/:fileName
    // figma.com/design/:fileKey/branch/:branchKey/:fileName
    // figma.com/make/:makeFileKey/:makeFileName
    // figma.com/board/:fileKey/:fileName (FigJam)
    
    let fileKey: string | null = null;
    
    if (pathParts[0] === "design" || pathParts[0] === "board") {
      if (pathParts[2] === "branch" && pathParts[3]) {
        // Branch URL - use branchKey as fileKey
        fileKey = pathParts[3];
      } else if (pathParts[1]) {
        fileKey = pathParts[1];
      }
    } else if (pathParts[0] === "make" && pathParts[1]) {
      fileKey = pathParts[1];
    }
    
    if (!fileKey) {
      return null;
    }
    
    // Extract nodeId from query params
    const nodeIdParam = urlObj.searchParams.get("node-id");
    let nodeId: string | undefined;
    
    if (nodeIdParam) {
      // Convert "1-2" format to "1:2" format
      nodeId = nodeIdParam.replace("-", ":");
    }
    
    return { fileKey, nodeId };
  } catch {
    return null;
  }
}

/**
 * Create a FigmaSyncConfig from a URL or manual parameters
 */
export function createFigmaSyncConfig(
  input: string | { fileKey: string; nodeId?: string }
): FigmaSyncConfig | null {
  if (typeof input === "string") {
    const parsed = parseFigmaUrl(input);
    if (!parsed) return null;
    
    return {
      fileKey: parsed.fileKey,
      nodeId: parsed.nodeId,
      clientLanguages: "typescript",
      clientFrameworks: "react",
    };
  }
  
  return {
    fileKey: input.fileKey,
    nodeId: input.nodeId,
    clientLanguages: "typescript",
    clientFrameworks: "react",
  };
}

// ============================================
// MCP TOOL CALL HELPERS
// ============================================

/**
 * Build arguments for the get_design_context MCP tool
 */
export function buildGetDesignContextArgs(config: FigmaSyncConfig) {
  return {
    fileKey: config.fileKey,
    nodeId: config.nodeId || "",
    clientLanguages: config.clientLanguages || "typescript",
    clientFrameworks: config.clientFrameworks || "react",
    excludeScreenshot: false,
  };
}

/**
 * Build arguments for the get_variable_defs MCP tool
 */
export function buildGetVariableDefsArgs(config: FigmaSyncConfig) {
  return {
    fileKey: config.fileKey,
    nodeId: config.nodeId || "",
    clientLanguages: config.clientLanguages || "typescript",
    clientFrameworks: config.clientFrameworks || "react",
  };
}

/**
 * Build arguments for the get_code_connect_map MCP tool
 */
export function buildGetCodeConnectMapArgs(config: FigmaSyncConfig, label?: string) {
  return {
    fileKey: config.fileKey,
    nodeId: config.nodeId || "",
    codeConnectLabel: label || "React",
  };
}

/**
 * Build arguments for the send_code_connect_mappings MCP tool
 */
export function buildSendCodeConnectMappingsArgs(
  config: FigmaSyncConfig,
  mappings: FigmaCodeConnectMapping[]
) {
  return {
    fileKey: config.fileKey,
    nodeId: config.nodeId || "",
    clientLanguages: config.clientLanguages || "typescript",
    clientFrameworks: config.clientFrameworks || "react",
    mappings: mappings.map((m) => ({
      nodeId: m.nodeId,
      componentName: m.componentName,
      source: m.source,
      label: m.label,
    })),
  };
}

// ============================================
// COMPONENT MAPPING
// ============================================

/**
 * Map a ComponentSpec to Figma Code Connect format
 */
export function mapComponentSpecToFigma(
  spec: ComponentSpec,
  codebasePath: string
): FigmaCodeConnectMapping[] {
  const mappings: FigmaCodeConnectMapping[] = [];
  
  // Create mapping for base component
  mappings.push({
    nodeId: "", // Will be filled when syncing with Figma
    componentName: spec.name,
    source: `${codebasePath}/components/ui/${spec.name.toLowerCase()}.tsx`,
    label: "React",
  });
  
  // Create mappings for variants
  for (const variant of spec.variants) {
    mappings.push({
      nodeId: "",
      componentName: `${spec.name}/${variant.label}`,
      source: `${codebasePath}/components/ui/${spec.name.toLowerCase()}.tsx`,
      label: "React",
    });
  }
  
  return mappings;
}

/**
 * Generate component source path based on naming conventions
 */
export function generateComponentSourcePath(
  componentName: string,
  options: {
    basePath?: string;
    useKebabCase?: boolean;
    extension?: string;
  } = {}
): string {
  const {
    basePath = "src/components/ui",
    useKebabCase = true,
    extension = "tsx",
  } = options;
  
  const fileName = useKebabCase
    ? componentName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
    : componentName.toLowerCase();
  
  return `${basePath}/${fileName}.${extension}`;
}
