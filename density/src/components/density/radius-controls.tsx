"use client";

import * as React from "react";
import { useRadius } from "./radius-provider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  type RadiusPreset,
  type RadiusMode,
  radiusPresetOptions,
  radiusModeOptions,
} from "@/lib/tokens";
import { Square, Circle } from "lucide-react";

function RadiusPresetIcon({ preset, size = 20 }: { preset: RadiusPreset; size?: number }) {
  const radiusMap: Record<RadiusPreset, number> = {
    sharp: 0,
    subtle: 2,
    rounded: 4,
    pill: size / 2,
  };

  return (
    <div
      className="border-2 border-current"
      style={{
        width: size,
        height: size,
        borderRadius: radiusMap[preset],
      }}
    />
  );
}

export function RadiusControls() {
  const { radiusMode, setRadiusMode, radiusPreset, setRadiusPreset } = useRadius();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Border Radius Mode
        </Label>
        <RadioGroup
          value={radiusMode}
          onValueChange={(value) => setRadiusMode(value as RadiusMode)}
          className="gap-2"
        >
          {radiusModeOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`radius-mode-${option.value}`} />
              <Label
                htmlFor={`radius-mode-${option.value}`}
                className="text-sm font-normal cursor-pointer"
              >
                {option.label}
                <span className="text-xs text-muted-foreground ml-1">
                  ({option.description})
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {radiusMode === "custom" && (
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Radius Preset
          </Label>
          <div className="grid grid-cols-4 gap-2">
            {radiusPresetOptions.map((option) => {
              const isActive = radiusPreset === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setRadiusPreset(option.value)}
                  className={`
                    flex flex-col items-center gap-1.5 p-3 rounded-md border transition-colors cursor-pointer
                    ${isActive
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }
                  `}
                  aria-pressed={isActive}
                >
                  <RadiusPresetIcon preset={option.value} size={24} />
                  <span className="text-xs font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <RadiusPreview />
    </div>
  );
}

function RadiusPreview() {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Preview
      </Label>
      <div className="flex flex-wrap items-center gap-3 p-4 border border-dashed rounded-lg bg-muted/30">
        <Button size="sm">Button</Button>
        <Input placeholder="Input" className="w-28 h-8" />
        <Badge>Badge</Badge>
        <div className="w-12 h-12 bg-muted border rounded-lg flex items-center justify-center text-xs text-muted-foreground">
          Card
        </div>
      </div>
    </div>
  );
}

export function RadiusToggle() {
  const { radiusMode, setRadiusMode, radiusPreset, setRadiusPreset } = useRadius();

  return (
    <div className="flex items-center gap-2">
      <div className="flex rounded-md border" role="group">
        <button
          onClick={() => setRadiusMode("density")}
          className={`
            flex items-center gap-1.5 px-2 py-1 text-xs transition-colors cursor-pointer
            rounded-l-md
            ${radiusMode === "density"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
            }
          `}
          aria-pressed={radiusMode === "density"}
          title="Tie to density"
        >
          <span className="hidden sm:inline">Auto</span>
        </button>
        {radiusPresetOptions.map((option, index) => {
          const isActive = radiusMode === "custom" && radiusPreset === option.value;
          const isLast = index === radiusPresetOptions.length - 1;
          return (
            <button
              key={option.value}
              onClick={() => {
                setRadiusMode("custom");
                setRadiusPreset(option.value);
              }}
              className={`
                flex items-center justify-center px-2 py-1 text-xs transition-colors cursor-pointer
                ${isLast ? "rounded-r-md" : ""}
                ${isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
                }
              `}
              aria-pressed={isActive}
              title={option.label}
            >
              <RadiusPresetIcon preset={option.value} size={14} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
