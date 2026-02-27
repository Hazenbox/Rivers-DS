"use client";

import * as React from "react";
import { type Density, densityTokens } from "@/lib/tokens";

interface DensityContextValue {
  density: Density;
  setDensity: (density: Density) => void;
  tokens: (typeof densityTokens)["default"];
}

const DensityContext = React.createContext<DensityContextValue | null>(null);

export function useDensity() {
  const context = React.useContext(DensityContext);
  if (!context) {
    throw new Error("useDensity must be used within a DensityProvider");
  }
  return context;
}

interface DensityProviderProps {
  children: React.ReactNode;
  defaultDensity?: Density;
  storageKey?: string;
}

export function DensityProvider({
  children,
  defaultDensity = "default",
  storageKey = "density-preference",
}: DensityProviderProps) {
  const [density, setDensityState] = React.useState<Density>(defaultDensity);
  const [mounted, setMounted] = React.useState(false);

  // Load from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Density | null;
    if (stored && ["compact", "default", "spacious"].includes(stored)) {
      setDensityState(stored);
    }
    setMounted(true);
  }, [storageKey]);

  // Update data-density attribute on <html>
  React.useEffect(() => {
    if (mounted) {
      document.documentElement.dataset.density = density;
    }
  }, [density, mounted]);

  const setDensity = React.useCallback(
    (newDensity: Density) => {
      setDensityState(newDensity);
      localStorage.setItem(storageKey, newDensity);
    },
    [storageKey]
  );

  const tokens = densityTokens[density];

  // Prevent flash of wrong density on SSR
  if (!mounted) {
    return (
      <DensityContext.Provider
        value={{
          density: defaultDensity,
          setDensity,
          tokens: densityTokens[defaultDensity],
        }}
      >
        {children}
      </DensityContext.Provider>
    );
  }

  return (
    <DensityContext.Provider value={{ density, setDensity, tokens }}>
      {children}
    </DensityContext.Provider>
  );
}
