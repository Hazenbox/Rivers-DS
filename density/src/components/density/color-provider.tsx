"use client";

import * as React from "react";
import {
  type ColorPreset,
  type NeutralScale,
  defaultColorPreset,
  defaultNeutralScale,
} from "@/lib/tokens";

interface ColorContextValue {
  colorPreset: ColorPreset;
  setColorPreset: (preset: ColorPreset) => void;
  neutralScale: NeutralScale;
  setNeutralScale: (scale: NeutralScale) => void;
}

const ColorContext = React.createContext<ColorContextValue | null>(null);

export function useColor() {
  const context = React.useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}

interface ColorProviderProps {
  children: React.ReactNode;
  defaultPreset?: ColorPreset;
  defaultScale?: NeutralScale;
  storagePresetKey?: string;
  storageScaleKey?: string;
}

const validColorPresets: ColorPreset[] = [
  "neutral", "zinc", "slate", "blue", "violet", "green", "orange", "rose"
];
const validNeutralScales: NeutralScale[] = [
  "gray", "slate", "zinc", "neutral", "stone"
];

export function ColorProvider({
  children,
  defaultPreset = defaultColorPreset,
  defaultScale = defaultNeutralScale,
  storagePresetKey = "color-preset",
  storageScaleKey = "neutral-scale",
}: ColorProviderProps) {
  const [colorPreset, setColorPresetState] = React.useState<ColorPreset>(defaultPreset);
  const [neutralScale, setNeutralScaleState] = React.useState<NeutralScale>(defaultScale);
  const [mounted, setMounted] = React.useState(false);

  // Load from localStorage on mount
  React.useEffect(() => {
    const storedPreset = localStorage.getItem(storagePresetKey) as ColorPreset | null;
    const storedScale = localStorage.getItem(storageScaleKey) as NeutralScale | null;

    if (storedPreset && validColorPresets.includes(storedPreset)) {
      setColorPresetState(storedPreset);
    }
    if (storedScale && validNeutralScales.includes(storedScale)) {
      setNeutralScaleState(storedScale);
    }

    setMounted(true);
  }, [storagePresetKey, storageScaleKey]);

  // Update data attributes on <html>
  React.useEffect(() => {
    if (mounted) {
      document.documentElement.dataset.colorPreset = colorPreset;
      document.documentElement.dataset.neutralScale = neutralScale;
    }
  }, [colorPreset, neutralScale, mounted]);

  const setColorPreset = React.useCallback(
    (newPreset: ColorPreset) => {
      setColorPresetState(newPreset);
      localStorage.setItem(storagePresetKey, newPreset);
    },
    [storagePresetKey]
  );

  const setNeutralScale = React.useCallback(
    (newScale: NeutralScale) => {
      setNeutralScaleState(newScale);
      localStorage.setItem(storageScaleKey, newScale);
    },
    [storageScaleKey]
  );

  // Prevent flash of wrong colors on SSR
  if (!mounted) {
    return (
      <ColorContext.Provider
        value={{
          colorPreset: defaultPreset,
          setColorPreset,
          neutralScale: defaultScale,
          setNeutralScale,
        }}
      >
        {children}
      </ColorContext.Provider>
    );
  }

  return (
    <ColorContext.Provider
      value={{
        colorPreset,
        setColorPreset,
        neutralScale,
        setNeutralScale,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
}
