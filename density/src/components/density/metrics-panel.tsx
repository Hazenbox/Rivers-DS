"use client";

import * as React from "react";
import { useDensity } from "./density-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Bug } from "lucide-react";

export function MetricsPanel() {
  const { density, tokens } = useDensity();
  const [isOpen, setIsOpen] = React.useState(false);
  const [viewportHeight, setViewportHeight] = React.useState(0);

  React.useEffect(() => {
    setViewportHeight(window.innerHeight);
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const controlHeightPx = parseInt(tokens.controlHeight);
  const tableRowHeightPx = parseInt(tokens.tableRowHeight);
  const stackGapPx = parseInt(tokens.stackGap);

  const visibleTableRows = Math.floor(viewportHeight / tableRowHeightPx);
  const visibleFormFields = Math.floor(
    viewportHeight / (controlHeightPx + stackGapPx)
  );

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <Bug className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Density Metrics</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Badge variant="secondary" className="w-fit">
          {density.toUpperCase()}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4 text-xs font-mono">
        <div>
          <div className="text-muted-foreground mb-1">Token Values</div>
          <div className="grid grid-cols-2 gap-1">
            <span>Control Height:</span>
            <span>{tokens.controlHeight}</span>
            <span>Table Row:</span>
            <span>{tokens.tableRowHeight}</span>
            <span>Stack Gap:</span>
            <span>{tokens.stackGap}</span>
            <span>Section Gap:</span>
            <span>{tokens.sectionGap}</span>
            <span>Border Radius:</span>
            <span>{tokens.radiusMd}</span>
            <span>Line Height:</span>
            <span>{tokens.lineHeightBody}</span>
          </div>
        </div>

        <div className="border-t pt-2">
          <div className="text-muted-foreground mb-1">Calculated Metrics</div>
          <div className="grid grid-cols-2 gap-1">
            <span>Viewport:</span>
            <span>{viewportHeight}px</span>
            <span>Visible Rows:</span>
            <span>~{visibleTableRows}</span>
            <span>Visible Fields:</span>
            <span>~{visibleFormFields}</span>
          </div>
        </div>

        <div className="border-t pt-2">
          <div className="text-muted-foreground mb-1">Density Comparison</div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>vs Compact:</span>
              <span>
                {density === "compact" ? "Current" : `+${Math.round((1 - 0.8) * 100)}%`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>vs Spacious:</span>
              <span>
                {density === "spacious" ? "Current" : `-${Math.round((1.25 - 1) * 100)}%`}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
