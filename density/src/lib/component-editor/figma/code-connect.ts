/**
 * CODE CONNECT MODULE
 * 
 * Generates Figma Code Connect configurations from component specifications.
 */

import type { ComponentSpec, TokenablePropertySpec } from "../types";
import { getAllComponents } from "../registry";

// ============================================
// TYPES
// ============================================

export interface CodeConnectConfig {
  componentName: string;
  componentPath: string;
  figmaNodeId?: string;
  props: CodeConnectProp[];
  variants: CodeConnectVariant[];
  example: string;
}

export interface CodeConnectProp {
  name: string;
  type: "string" | "boolean" | "number" | "enum";
  figmaProperty?: string;
  defaultValue?: string | boolean | number;
  options?: string[];
}

export interface CodeConnectVariant {
  name: string;
  figmaVariant: string;
  props: Record<string, string | boolean | number>;
}

export interface CodeConnectSuggestion {
  componentName: string;
  figmaNodeName: string;
  confidence: number;
  suggestedMapping: {
    props: Array<{ codeProp: string; figmaProp: string }>;
    variants: Array<{ codeVariant: string; figmaVariant: string }>;
  };
}

// ============================================
// CODE CONNECT GENERATION
// ============================================

/**
 * Generate Code Connect configs for all registered components
 */
export function generateCodeConnectConfigs(
  options: {
    basePath?: string;
    fileExtension?: string;
    exportFormat?: "default" | "named";
  } = {}
): CodeConnectConfig[] {
  const {
    basePath = "@/components/ui",
    fileExtension = "tsx",
    exportFormat = "named",
  } = options;
  
  const components = getAllComponents();
  const configs: CodeConnectConfig[] = [];
  
  for (const spec of components) {
    configs.push(generateCodeConnectForComponent(spec, {
      basePath,
      fileExtension,
      exportFormat,
    }));
  }
  
  return configs;
}

/**
 * Generate Code Connect config for a single component
 */
export function generateCodeConnectForComponent(
  spec: ComponentSpec,
  options: {
    basePath?: string;
    fileExtension?: string;
    exportFormat?: "default" | "named";
  } = {}
): CodeConnectConfig {
  const {
    basePath = "@/components/ui",
    fileExtension = "tsx",
    exportFormat = "named",
  } = options;
  
  const componentFileName = spec.name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();
  
  const componentPath = `${basePath}/${componentFileName}.${fileExtension}`;
  
  // Generate props from variants and sizes
  const props: CodeConnectProp[] = [];
  
  // Add variant prop
  if (spec.variants.length > 1) {
    props.push({
      name: "variant",
      type: "enum",
      figmaProperty: "Variant",
      defaultValue: spec.variants[0]?.value || "default",
      options: spec.variants.map((v) => v.value),
    });
  }
  
  // Add size prop
  if (spec.sizes.length > 1) {
    props.push({
      name: "size",
      type: "enum",
      figmaProperty: "Size",
      defaultValue: spec.sizes.find((s) => s.value === "default")?.value || spec.sizes[0]?.value,
      options: spec.sizes.map((s) => s.value),
    });
  }
  
  // Add disabled prop for components with disabled state
  if (spec.stateSpec?.states?.includes("disabled")) {
    props.push({
      name: "disabled",
      type: "boolean",
      figmaProperty: "Disabled",
      defaultValue: false,
    });
  }
  
  // Add loading prop if applicable
  if (spec.stateSpec?.states?.includes("loading")) {
    props.push({
      name: "loading",
      type: "boolean",
      figmaProperty: "Loading",
      defaultValue: false,
    });
  }
  
  // Generate variants
  const variants: CodeConnectVariant[] = spec.variants.map((v) => ({
    name: v.value,
    figmaVariant: v.label,
    props: { variant: v.value },
  }));
  
  // Generate example code
  const example = generateExampleCode(spec, exportFormat);
  
  return {
    componentName: spec.name,
    componentPath,
    props,
    variants,
    example,
  };
}

/**
 * Generate example JSX code for a component
 */
function generateExampleCode(spec: ComponentSpec, exportFormat: "default" | "named"): string {
  const componentName = spec.name;
  const importStatement = exportFormat === "named"
    ? `import { ${componentName} } from "@/components/ui/${spec.name.toLowerCase()}"`
    : `import ${componentName} from "@/components/ui/${spec.name.toLowerCase()}"`;
  
  // Build props string
  const propsEntries: string[] = [];
  
  if (spec.variants.length > 1) {
    propsEntries.push('variant="default"');
  }
  
  if (spec.sizes.length > 1) {
    propsEntries.push('size="default"');
  }
  
  const propsString = propsEntries.length > 0
    ? ` ${propsEntries.join(" ")}`
    : "";
  
  // Check if self-closing or has children
  const hasChildren = ["Button", "Card", "Alert", "Dialog", "Badge"].includes(componentName);
  
  const jsxContent = hasChildren
    ? `<${componentName}${propsString}>Content</${componentName}>`
    : `<${componentName}${propsString} />`;
  
  return `${importStatement}

export default function Example() {
  return (
    ${jsxContent}
  )
}`;
}

// ============================================
// COMPONENT MAPPING
// ============================================

/**
 * Map a component spec to Code Connect format
 */
export function mapComponentToCodeConnect(
  spec: ComponentSpec,
  figmaNodeId: string,
  codebasePath: string = "src/components/ui"
): {
  nodeId: string;
  componentName: string;
  source: string;
  label: "React";
} {
  const fileName = spec.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  
  return {
    nodeId: figmaNodeId,
    componentName: spec.name,
    source: `${codebasePath}/${fileName}.tsx`,
    label: "React",
  };
}

/**
 * Generate Code Connect file content for a component
 */
export function generateCodeConnectFileContent(config: CodeConnectConfig): string {
  const lines: string[] = [
    `// Code Connect configuration for ${config.componentName}`,
    `// Generated by Component Token Editor`,
    "",
    `import { ${config.componentName} } from "${config.componentPath.replace('.tsx', '')}"`,
    `import figma from "@figma/code-connect"`,
    "",
    `figma.connect(${config.componentName}, "FIGMA_NODE_URL", {`,
    `  props: {`,
  ];
  
  // Add props
  for (const prop of config.props) {
    if (prop.type === "enum") {
      lines.push(`    ${prop.name}: figma.enum("${prop.figmaProperty || prop.name}", {`);
      for (const option of prop.options || []) {
        lines.push(`      "${option}": "${option}",`);
      }
      lines.push(`    }),`);
    } else if (prop.type === "boolean") {
      lines.push(`    ${prop.name}: figma.boolean("${prop.figmaProperty || prop.name}"),`);
    } else {
      lines.push(`    ${prop.name}: figma.string("${prop.figmaProperty || prop.name}"),`);
    }
  }
  
  lines.push(`  },`);
  lines.push(`  example: (props) => <${config.componentName} {...props} />,`);
  lines.push(`})`);
  
  return lines.join("\n");
}

/**
 * Suggest Code Connect mappings based on component names
 */
export function suggestCodeConnectMappings(
  figmaComponents: Array<{ name: string; nodeId: string }>,
  codeComponents: ComponentSpec[]
): CodeConnectSuggestion[] {
  const suggestions: CodeConnectSuggestion[] = [];
  
  for (const figmaComp of figmaComponents) {
    const figmaNameNormalized = normalizeName(figmaComp.name);
    
    for (const codeComp of codeComponents) {
      const codeNameNormalized = normalizeName(codeComp.name);
      
      const similarity = calculateSimilarity(figmaNameNormalized, codeNameNormalized);
      
      if (similarity > 0.5) {
        suggestions.push({
          componentName: codeComp.name,
          figmaNodeName: figmaComp.name,
          confidence: similarity,
          suggestedMapping: {
            props: suggestPropMappings(codeComp),
            variants: suggestVariantMappings(codeComp),
          },
        });
      }
    }
  }
  
  // Sort by confidence
  suggestions.sort((a, b) => b.confidence - a.confidence);
  
  return suggestions;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

function calculateSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length === 0 || b.length === 0) return 0;
  
  // Check if one contains the other
  if (a.includes(b) || b.includes(a)) {
    return 0.8;
  }
  
  // Simple Levenshtein-based similarity
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  const longerLength = longer.length;
  
  if (longerLength === 0) return 1;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longerLength - editDistance) / longerLength;
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[b.length][a.length];
}

function suggestPropMappings(spec: ComponentSpec): Array<{ codeProp: string; figmaProp: string }> {
  const mappings: Array<{ codeProp: string; figmaProp: string }> = [];
  
  if (spec.variants.length > 0) {
    mappings.push({ codeProp: "variant", figmaProp: "Variant" });
  }
  
  if (spec.sizes.length > 0) {
    mappings.push({ codeProp: "size", figmaProp: "Size" });
  }
  
  if (spec.stateSpec?.states?.includes("disabled")) {
    mappings.push({ codeProp: "disabled", figmaProp: "Disabled" });
  }
  
  return mappings;
}

function suggestVariantMappings(spec: ComponentSpec): Array<{ codeVariant: string; figmaVariant: string }> {
  return spec.variants.map((v) => ({
    codeVariant: v.value,
    figmaVariant: v.label,
  }));
}
