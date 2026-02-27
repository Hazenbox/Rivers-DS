"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ComponentEditor,
  ComponentPicker,
  TokenPropertyEditor,
  LivePreview,
  CustomTokenCreator,
} from "@/components/component-editor";
import {
  useEditorStore,
  getAllComponents,
  getComponentsGroupedByCategory,
  getComponent,
  type CustomToken,
  type ComponentSpec,
} from "@/lib/component-editor";
import {
  exportAsDTCG,
  exportCustomTokensAsCSS,
  exportForFigma,
} from "@/lib/component-editor/export";

export default function ComponentEditorPage() {
  const [activeTab, setActiveTab] = useState("editor");
  const [exportFormat, setExportFormat] = useState<"dtcg" | "css" | "figma">("css");
  const [exportOutput, setExportOutput] = useState("");
  
  const selectedComponent = useEditorStore((state) => state.selectedComponent);
  const customTokens = useEditorStore((state) => state.customTokens);
  const componentOverrides = useEditorStore((state) => state.componentOverrides);
  const history = useEditorStore((state) => state.history);
  const historyIndex = useEditorStore((state) => state.historyIndex);
  const selectComponent = useEditorStore((state) => state.selectComponent);
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);

  const selectedSpec = selectedComponent 
    ? getComponent(selectedComponent) || null
    : null;

  const customTokensArray = useMemo(() => Object.values(customTokens), [customTokens]);
  
  const resolvedTokens = useMemo(() => {
    const result: Record<string, string | number> = {};
    customTokensArray.forEach(token => {
      const cssName = `--${token.category}-${token.name.replace(/\s+/g, '-').toLowerCase()}`;
      result[cssName] = typeof token.$value === 'object' 
        ? JSON.stringify(token.$value) 
        : token.$value as string | number;
    });
    return result;
  }, [customTokensArray]);

  const handleExport = () => {
    switch (exportFormat) {
      case "dtcg":
        const dtcgResult = exportAsDTCG(customTokensArray);
        setExportOutput(JSON.stringify(dtcgResult.tokens, null, 2));
        break;
      case "css":
        const cssOutput = exportCustomTokensAsCSS(customTokensArray);
        setExportOutput(cssOutput);
        break;
      case "figma":
        const figmaResult = exportForFigma(customTokensArray);
        setExportOutput(JSON.stringify(figmaResult.variables, null, 2));
        break;
    }
  };

  const handleExportComponentOverrides = () => {
    if (selectedComponent && selectedSpec) {
      const overrides = componentOverrides[selectedComponent];
      if (overrides) {
        const overrideValues = Object.entries(overrides).map(([key, ref]) => ({
          name: key,
          value: typeof ref === 'object' && '$value' in ref ? ref.$value : ref,
        }));
        const css = `:root {\n${overrideValues
          .map(o => `  --${selectedComponent}-${o.name}: ${o.value};`)
          .join('\n')}\n}`;
        setExportOutput(css);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Component Token Editor</h1>
              <p className="text-sm text-muted-foreground">
                Edit component tokens, preview changes in real-time, and export to various formats
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={undo}
                disabled={historyIndex <= 0}
              >
                Undo
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
              >
                Redo
              </Button>
              <Badge variant="secondary">
                {customTokensArray.length} custom tokens
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="editor">Component Editor</TabsTrigger>
            <TabsTrigger value="tokens">Custom Tokens</TabsTrigger>
            <TabsTrigger value="registry">Component Registry</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Component Picker */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Component</CardTitle>
                  <CardDescription>
                    Choose a component to customize its tokens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ComponentPicker />
                </CardContent>
              </Card>

              {/* Token Editor */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {selectedSpec ? selectedSpec.name : "Token Editor"}
                  </CardTitle>
                  <CardDescription>
                    {selectedSpec 
                      ? `Edit tokens for ${selectedSpec.name} component`
                      : "Select a component to edit its tokens"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedComponent ? (
                    <TokenPropertyEditor componentName={selectedComponent} />
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      Select a component from the picker to start editing
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Live Preview */}
            {selectedComponent && (
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                  <CardDescription>
                    See your changes in real-time with state and responsive simulation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LivePreview componentName={selectedComponent} />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="tokens" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Token Creator */}
              <Card>
                <CardHeader>
                  <CardTitle>Create Custom Token</CardTitle>
                  <CardDescription>
                    Define new tokens with DTCG-compliant structure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CustomTokenCreator />
                </CardContent>
              </Card>

              {/* Token List */}
              <Card>
                <CardHeader>
                  <CardTitle>Custom Tokens</CardTitle>
                  <CardDescription>
                    Your custom tokens ({customTokensArray.length} total)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    {customTokensArray.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        No custom tokens created yet
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {customTokensArray.map((token: CustomToken) => (
                          <div
                            key={token.id}
                            className="p-3 border rounded-lg space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <code className="text-sm font-medium">{token.name}</code>
                              <Badge variant="outline">{token.$type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {token.description || "No description"}
                            </p>
                            <div className="text-xs font-mono bg-muted p-2 rounded">
                              {typeof token.$value === "object" 
                                ? JSON.stringify(token.$value) 
                                : String(token.$value)
                              }
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Resolved Tokens */}
            <Card>
              <CardHeader>
                <CardTitle>Resolved Token Values</CardTitle>
                <CardDescription>
                  All tokens resolved for the current context (theme: light, density: comfortable)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(resolvedTokens).slice(0, 30).map(([key, value]) => (
                      <div
                        key={key}
                        className="p-2 border rounded text-sm"
                      >
                        <code className="text-xs block truncate" title={key}>
                          {key}
                        </code>
                        <div className="flex items-center gap-2 mt-1">
                          {key.includes("color") && (
                            <div
                              className="w-4 h-4 rounded border"
                              style={{ backgroundColor: value as string }}
                            />
                          )}
                          <span className="text-muted-foreground truncate">
                            {String(value)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registry" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Registry Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Registry Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Components</span>
                    <Badge>{getAllComponents().length}</Badge>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">By Category</h4>
                    {Object.entries(getComponentsGroupedByCategory()).map(([cat, specs]) => (
                      <div key={cat} className="flex justify-between text-sm">
                        <span className="capitalize">{cat}</span>
                        <span className="text-muted-foreground">
                          {specs.length}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Component List */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Registered Components</CardTitle>
                  <CardDescription>
                    All components available in the registry
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      {getAllComponents().map((spec: ComponentSpec) => (
                        <div
                          key={spec.name}
                          className="p-4 border rounded-lg space-y-2 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => {
                            selectComponent(spec.name);
                            setActiveTab("editor");
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{spec.name}</h4>
                            <div className="flex gap-2">
                              <Badge variant="outline">{spec.category}</Badge>
                              {spec.stateSpec && (
                                <Badge variant="secondary">Stateful</Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {spec.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {spec.slots.map((slot) => (
                              <Badge key={slot.name} variant="outline" className="text-xs">
                                {slot.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Export Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Export Options</CardTitle>
                  <CardDescription>
                    Choose a format and export your tokens
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Export Format</label>
                    <div className="flex gap-2">
                      <Button
                        variant={exportFormat === "css" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setExportFormat("css")}
                      >
                        CSS Variables
                      </Button>
                      <Button
                        variant={exportFormat === "dtcg" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setExportFormat("dtcg")}
                      >
                        DTCG JSON
                      </Button>
                      <Button
                        variant={exportFormat === "figma" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setExportFormat("figma")}
                      >
                        Figma Variables
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button onClick={handleExport} className="w-full">
                      Export Custom Tokens
                    </Button>
                    {selectedComponent && (
                      <Button
                        variant="outline"
                        onClick={handleExportComponentOverrides}
                        className="w-full"
                      >
                        Export {selectedSpec?.name} Overrides
                      </Button>
                    )}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p><strong>CSS Variables:</strong> Ready for web consumption</p>
                    <p><strong>DTCG JSON:</strong> W3C Design Tokens specification</p>
                    <p><strong>Figma Variables:</strong> For Figma plugin integration</p>
                  </div>
                </CardContent>
              </Card>

              {/* Export Output */}
              <Card>
                <CardHeader>
                  <CardTitle>Export Output</CardTitle>
                  <CardDescription>
                    Generated output in selected format
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    {exportOutput ? (
                      <pre className="text-xs font-mono bg-muted p-4 rounded-lg overflow-x-auto">
                        {exportOutput}
                      </pre>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        Click "Export" to generate output
                      </div>
                    )}
                  </ScrollArea>
                  {exportOutput && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => {
                        navigator.clipboard.writeText(exportOutput);
                      }}
                    >
                      Copy to Clipboard
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Usage Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Integration Guide</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium">CSS Variables</h4>
                    <p className="text-sm text-muted-foreground">
                      Import the generated CSS file in your global styles:
                    </p>
                    <pre className="text-xs bg-muted p-2 rounded">
{`/* globals.css */
@import './tokens.css';`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-medium">DTCG JSON</h4>
                    <p className="text-sm text-muted-foreground">
                      Use with Style Dictionary or other token tools:
                    </p>
                    <pre className="text-xs bg-muted p-2 rounded">
{`// style-dictionary.config.js
module.exports = {
  source: ['tokens.json'],
  // ...
}`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-medium">Figma Variables</h4>
                    <p className="text-sm text-muted-foreground">
                      Import via Figma plugin or API:
                    </p>
                    <pre className="text-xs bg-muted p-2 rounded">
{`// Use Figma Variables API
figma.variables.
  createVariable(...)`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
