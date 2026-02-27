"use client";

import * as React from "react";
import {
  type RadiusMode,
  type RadiusPreset,
  defaultRadiusMode,
  defaultRadiusPreset,
} from "@/lib/tokens";

interface RadiusContextValue {
  radiusMode: RadiusMode;
  setRadiusMode: (mode: RadiusMode) => void;
  radiusPreset: RadiusPreset;
  setRadiusPreset: (preset: RadiusPreset) => void;
}

const RadiusContext = React.createContext<RadiusContextValue | null>(null);

export function useRadius() {
  const context = React.useContext(RadiusContext);
  if (!context) {
    throw new Error("useRadius must be used within a RadiusProvider");
  }
  return context;
}

interface RadiusProviderProps {
  children: React.ReactNode;
  defaultMode?: RadiusMode;
  defaultPreset?: RadiusPreset;
  storageModeKey?: string;
  storagePresetKey?: string;
}

export function RadiusProvider({
  children,
  defaultMode = defaultRadiusMode,
  defaultPreset = defaultRadiusPreset,
  storageModeKey = "radius-mode",
  storagePresetKey = "radius-preset",
}: RadiusProviderProps) {
  const [radiusMode, setRadiusModeState] = React.useState<RadiusMode>(defaultMode);
  const [radiusPreset, setRadiusPresetState] = React.useState<RadiusPreset>(defaultPreset);
  const [mounted, setMounted] = React.useState(false);

  // Load from localStorage on mount
  React.useEffect(() => {
    const storedMode = localStorage.getItem(storageModeKey) as RadiusMode | null;
    const storedPreset = localStorage.getItem(storagePresetKey) as RadiusPreset | null;

    if (storedMode && ["density", "custom"].includes(storedMode)) {
      setRadiusModeState(storedMode);
    }
    if (storedPreset && ["sharp", "subtle", "rounded", "pill"].includes(storedPreset)) {
      setRadiusPresetState(storedPreset);
    }

    setMounted(true);
  }, [storageModeKey, storagePresetKey]);

  // Update data-radius-mode and data-radius attributes on <html>
  React.useEffect(() => {
    if (mounted) {
      document.documentElement.dataset.radiusMode = radiusMode;
      if (radiusMode === "custom") {
        document.documentElement.dataset.radius = radiusPreset;
      } else {
        // Remove data-radius when in density mode (CSS will use density-based radius)
        delete document.documentElement.dataset.radius;
      }
    }
  }, [radiusMode, radiusPreset, mounted]);

  const setRadiusMode = React.useCallback(
    (newMode: RadiusMode) => {
      setRadiusModeState(newMode);
      localStorage.setItem(storageModeKey, newMode);
    },
    [storageModeKey]
  );

  const setRadiusPreset = React.useCallback(
    (newPreset: RadiusPreset) => {
      setRadiusPresetState(newPreset);
      localStorage.setItem(storagePresetKey, newPreset);
    },
    [storagePresetKey]
  );

  // Prevent flash of wrong radius on SSR
  if (!mounted) {
    return (
      <RadiusContext.Provider
        value={{
          radiusMode: defaultMode,
          setRadiusMode,
          radiusPreset: defaultPreset,
          setRadiusPreset,
        }}
      >
        {children}
      </RadiusContext.Provider>
    );
  }

  return (
    <RadiusContext.Provider
      value={{
        radiusMode,
        setRadiusMode,
        radiusPreset,
        setRadiusPreset,
      }}
    >
      {children}
    </RadiusContext.Provider>
  );
}
