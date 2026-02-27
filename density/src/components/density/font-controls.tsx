"use client";

import * as React from "react";
import { useFont } from "./font-provider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  type UIFontPreset,
  type CodeFontPreset,
  type DisplayFontPreset,
  uiFontOptions,
  codeFontOptions,
  displayFontOptions,
} from "@/lib/tokens";
import { Check, Type, Code, Heading } from "lucide-react";

interface FontButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
  description: string;
  badge?: string;
}

function FontButton({ isActive, onClick, label, description, badge }: FontButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-start gap-0.5 p-2 rounded-md border text-left transition-colors cursor-pointer
        ${isActive
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
        }
      `}
      aria-pressed={isActive}
    >
      {isActive && (
        <Check className="absolute top-1.5 right-1.5 h-3 w-3 text-primary" />
      )}
      <span className="text-xs font-medium pr-4">{label}</span>
      <span className="text-[10px] text-muted-foreground">{description}</span>
      {badge && (
        <Badge variant="secondary" className="mt-1 text-[9px] px-1 py-0">
          {badge}
        </Badge>
      )}
    </button>
  );
}

export function FontControls() {
  const { uiFont, setUIFont, codeFont, setCodeFont, displayFont, setDisplayFont } = useFont();

  return (
    <div className="space-y-4">
      {/* UI/Body Font */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Type className="h-3.5 w-3.5 text-muted-foreground" />
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            UI / Body Font
          </Label>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {uiFontOptions.map((option) => (
            <FontButton
              key={option.value}
              isActive={uiFont === option.value}
              onClick={() => setUIFont(option.value)}
              label={option.label}
              description={option.description}
              badge={option.category === "Accessibility" ? "A11y" : undefined}
            />
          ))}
        </div>
      </div>

      {/* Code Font */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Code className="h-3.5 w-3.5 text-muted-foreground" />
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Code Font
          </Label>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {codeFontOptions.map((option) => (
            <FontButton
              key={option.value}
              isActive={codeFont === option.value}
              onClick={() => setCodeFont(option.value)}
              label={option.label}
              description={option.description}
              badge={option.hasLigatures ? "Ligatures" : undefined}
            />
          ))}
        </div>
      </div>

      {/* Display Font */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Heading className="h-3.5 w-3.5 text-muted-foreground" />
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Display / Headlines
          </Label>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {displayFontOptions.map((option) => (
            <FontButton
              key={option.value}
              isActive={displayFont === option.value}
              onClick={() => setDisplayFont(option.value)}
              label={option.label}
              description={option.description}
            />
          ))}
        </div>
      </div>

      {/* Preview */}
      <FontPreview />
    </div>
  );
}

function FontPreview() {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Preview
      </Label>
      <div className="p-3 border border-dashed rounded-lg bg-muted/30 space-y-2">
        {/* UI/Body text preview */}
        <p className="text-sm font-sans">
          The quick brown fox jumps over the lazy dog. 0123456789
        </p>
        
        {/* Code preview */}
        <pre className="text-xs font-mono bg-muted/50 p-2 rounded overflow-x-auto">
          <code>{`const greeting = "Hello, World!";
function add(a, b) { return a + b; }
// => !== === -> <> {} [] ()`}</code>
        </pre>
        
        {/* Display/headline preview */}
        <h3 
          className="text-lg font-semibold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Display Headline
        </h3>
      </div>
    </div>
  );
}

export function FontToggle() {
  const { uiFont, setUIFont, codeFont, setCodeFont } = useFont();

  return (
    <div className="flex items-center gap-1">
      <div className="flex rounded-md border text-xs" role="group">
        {uiFontOptions.slice(0, 4).map((option, index) => {
          const isActive = uiFont === option.value;
          const isFirst = index === 0;
          const isLast = index === 3;
          return (
            <button
              key={option.value}
              onClick={() => setUIFont(option.value)}
              className={`
                px-2 py-1 transition-colors cursor-pointer
                ${isFirst ? "rounded-l-md" : ""}
                ${isLast ? "rounded-r-md" : ""}
                ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
              `}
              aria-pressed={isActive}
              title={option.label}
            >
              {option.label.slice(0, 2)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
