"use client";

import * as React from "react";
import { useDensity } from "./density-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Rows3, Rows4, Square } from "lucide-react";
import { type Density, densityOptions } from "@/lib/tokens";

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
