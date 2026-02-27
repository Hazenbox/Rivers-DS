"use client";

import * as React from "react";
import { useColor } from "./color-provider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  colorPresetOptions,
  neutralScaleOptions,
  type ColorPreset,
  type NeutralScale,
} from "@/lib/tokens";

function ColorSwatch({ color }: { color: string }) {
  return (
    <div
      className="w-3 h-3 rounded-full border border-border/50 flex-shrink-0"
      style={{ backgroundColor: color }}
    />
  );
}

export function ColorControls() {
  const { colorPreset, setColorPreset, neutralScale, setNeutralScale } = useColor();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <Label className="text-sm whitespace-nowrap">Brand Color</Label>
        <Select
          value={colorPreset}
          onValueChange={(value) => setColorPreset(value as ColorPreset)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue>
              <div className="flex items-center gap-2">
                <ColorSwatch
                  color={
                    colorPresetOptions.find((o) => o.value === colorPreset)?.swatch ||
                    "#27272a"
                  }
                />
                <span>
                  {colorPresetOptions.find((o) => o.value === colorPreset)?.label}
                </span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {colorPresetOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <ColorSwatch color={option.swatch} />
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Label className="text-sm whitespace-nowrap">Neutral Tone</Label>
        <Select
          value={neutralScale}
          onValueChange={(value) => setNeutralScale(value as NeutralScale)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue>
              {neutralScaleOptions.find((o) => o.value === neutralScale)?.label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {neutralScaleOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex flex-col">
                  <span>{option.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function ColorPresetPicker() {
  const { colorPreset, setColorPreset } = useColor();

  return (
    <div className="flex items-center gap-1.5">
      {colorPresetOptions.map((option) => {
        const isActive = colorPreset === option.value;
        return (
          <button
            key={option.value}
            onClick={() => setColorPreset(option.value)}
            className={`
              w-6 h-6 rounded-full border-2 transition-all cursor-pointer
              ${isActive ? "border-foreground scale-110" : "border-transparent hover:border-muted-foreground/50"}
            `}
            style={{ backgroundColor: option.swatch }}
            title={option.label}
            aria-pressed={isActive}
          />
        );
      })}
    </div>
  );
}

export function NeutralScalePicker() {
  const { neutralScale, setNeutralScale } = useColor();

  const scaleSwatches: Record<NeutralScale, string> = {
    gray: "#71717a",
    slate: "#64748b",
    zinc: "#71717a",
    neutral: "#737373",
    stone: "#78716c",
  };

  return (
    <div className="flex items-center gap-1.5">
      {neutralScaleOptions.map((option) => {
        const isActive = neutralScale === option.value;
        return (
          <button
            key={option.value}
            onClick={() => setNeutralScale(option.value)}
            className={`
              w-6 h-6 rounded-md border-2 transition-all cursor-pointer
              ${isActive ? "border-foreground scale-110" : "border-transparent hover:border-muted-foreground/50"}
            `}
            style={{ backgroundColor: scaleSwatches[option.value] }}
            title={option.label}
            aria-pressed={isActive}
          />
        );
      })}
    </div>
  );
}
