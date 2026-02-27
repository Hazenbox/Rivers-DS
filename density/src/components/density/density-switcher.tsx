"use client";

import * as React from "react";
import { useDensity } from "./density-provider";
import { useRadius } from "./radius-provider";
import { useFont } from "./font-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Rows3, Rows4, Square, Settings2, ChevronDown, Type, Palette } from "lucide-react";
import {
  type Density,
  type RadiusPreset,
  densityOptions,
  radiusPresetOptions,
  uiFontOptions,
  codeFontOptions,
  displayFontOptions,
} from "@/lib/tokens";
import { RadiusControls } from "./radius-controls";
import { FontControls } from "./font-controls";
import { ColorControls } from "./color-controls";

const densityIcons: Record<Density, React.ElementType> = {
  compact: Rows4,
  default: Rows3,
  spacious: Square,
};

export function DensitySwitcher() {
  const { density, setDensity } = useDensity();
  const currentOption = densityOptions.find((opt) => opt.value === density)!;
  const Icon = densityIcons[density];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{currentOption.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {densityOptions.map((option) => {
          const OptionIcon = densityIcons[option.value];
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setDensity(option.value)}
              className="gap-2"
            >
              <OptionIcon className="h-4 w-4" />
              <div className="flex flex-col">
                <span>{option.label}</span>
                <span className="text-xs text-muted-foreground">
                  {option.description}
                </span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DensityToggle() {
  const { density, setDensity } = useDensity();

  return (
    <div className="flex rounded-md border" role="group">
      {densityOptions.map((option) => {
        const Icon = densityIcons[option.value];
        const isActive = density === option.value;
        return (
          <button
            key={option.value}
            onClick={() => setDensity(option.value)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors cursor-pointer
              first:rounded-l-md last:rounded-r-md
              ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }
            `}
            aria-pressed={isActive}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden md:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function RadiusPresetIcon({ preset, size = 14 }: { preset: RadiusPreset; size?: number }) {
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

export function DensityAndRadiusPanel() {
  const { density, setDensity } = useDensity();
  const { radiusMode, setRadiusMode, radiusPreset, setRadiusPreset } = useRadius();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          <span className="hidden sm:inline">Display</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Density
            </h4>
            <div className="flex rounded-md border" role="group">
              {densityOptions.map((option) => {
                const Icon = densityIcons[option.value];
                const isActive = density === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setDensity(option.value)}
                    className={`
                      flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm transition-colors cursor-pointer
                      first:rounded-l-md last:rounded-r-md
                      ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
                    `}
                    aria-pressed={isActive}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Border Radius
            </h4>
            <div className="flex rounded-md border" role="group">
              <button
                onClick={() => setRadiusMode("density")}
                className={`
                  flex items-center justify-center gap-1.5 px-3 py-2 text-sm transition-colors cursor-pointer
                  rounded-l-md
                  ${radiusMode === "density" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
                `}
                aria-pressed={radiusMode === "density"}
                title="Auto (ties to density)"
              >
                Auto
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
                      flex-1 flex items-center justify-center gap-1.5 px-2 py-2 text-sm transition-colors cursor-pointer
                      ${isLast ? "rounded-r-md" : ""}
                      ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
                    `}
                    aria-pressed={isActive}
                    title={option.label}
                  >
                    <RadiusPresetIcon preset={option.value} size={16} />
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              {radiusMode === "density"
                ? "Radius scales with density (sharp in compact, rounded in spacious)"
                : `Using ${radiusPresetOptions.find(o => o.value === radiusPreset)?.label} preset`
              }
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function DisplaySettingsPanel() {
  const { density, setDensity } = useDensity();
  const { radiusMode, setRadiusMode, radiusPreset, setRadiusPreset } = useRadius();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          <span className="hidden sm:inline">Display</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[400px] p-0">
        <ScrollArea className="h-[500px]">
          <div className="p-4 space-y-6">
            {/* Density Section */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Density
              </h4>
              <div className="flex rounded-md border" role="group">
                {densityOptions.map((option) => {
                  const Icon = densityIcons[option.value];
                  const isActive = density === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setDensity(option.value)}
                      className={`
                        flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm transition-colors cursor-pointer
                        first:rounded-l-md last:rounded-r-md
                        ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
                      `}
                      aria-pressed={isActive}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Border Radius Section */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Border Radius
              </h4>
              <div className="flex rounded-md border" role="group">
                <button
                  onClick={() => setRadiusMode("density")}
                  className={`
                    flex items-center justify-center gap-1.5 px-3 py-2 text-sm transition-colors cursor-pointer
                    rounded-l-md
                    ${radiusMode === "density" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
                  `}
                  aria-pressed={radiusMode === "density"}
                  title="Auto (ties to density)"
                >
                  Auto
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
                        flex-1 flex items-center justify-center gap-1.5 px-2 py-2 text-sm transition-colors cursor-pointer
                        ${isLast ? "rounded-r-md" : ""}
                        ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
                      `}
                      aria-pressed={isActive}
                      title={option.label}
                    >
                      <RadiusPresetIcon preset={option.value} size={16} />
                    </button>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Typography Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Typography
                </h4>
              </div>
              <FontControls />
            </div>

            <Separator />

            {/* Colors Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Colors
                </h4>
              </div>
              <ColorControls />
            </div>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
