"use client";

import * as React from "react";
import {
  type UIFontPreset,
  type CodeFontPreset,
  type DisplayFontPreset,
  defaultUIFont,
  defaultCodeFont,
  defaultDisplayFont,
} from "@/lib/tokens";

interface FontContextValue {
  uiFont: UIFontPreset;
  setUIFont: (font: UIFontPreset) => void;
  codeFont: CodeFontPreset;
  setCodeFont: (font: CodeFontPreset) => void;
  displayFont: DisplayFontPreset;
  setDisplayFont: (font: DisplayFontPreset) => void;
}

const FontContext = React.createContext<FontContextValue | null>(null);

export function useFont() {
  const context = React.useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
}

interface FontProviderProps {
  children: React.ReactNode;
  defaultUI?: UIFontPreset;
  defaultCode?: CodeFontPreset;
  defaultDisplay?: DisplayFontPreset;
  storageUIKey?: string;
  storageCodeKey?: string;
  storageDisplayKey?: string;
}

const validUIFonts: UIFontPreset[] = ["geist", "inter", "roboto", "open-sans", "nunito", "lexend", "system"];
const validCodeFonts: CodeFontPreset[] = ["geist-mono", "jetbrains-mono", "fira-code", "source-code-pro", "roboto-mono", "system"];
const validDisplayFonts: DisplayFontPreset[] = ["same-as-ui", "playfair", "montserrat", "raleway"];

export function FontProvider({
  children,
  defaultUI = defaultUIFont,
  defaultCode = defaultCodeFont,
  defaultDisplay = defaultDisplayFont,
  storageUIKey = "ui-font",
  storageCodeKey = "code-font",
  storageDisplayKey = "display-font",
}: FontProviderProps) {
  const [uiFont, setUIFontState] = React.useState<UIFontPreset>(defaultUI);
  const [codeFont, setCodeFontState] = React.useState<CodeFontPreset>(defaultCode);
  const [displayFont, setDisplayFontState] = React.useState<DisplayFontPreset>(defaultDisplay);
  const [mounted, setMounted] = React.useState(false);

  // Load from localStorage on mount
  React.useEffect(() => {
    const storedUI = localStorage.getItem(storageUIKey) as UIFontPreset | null;
    const storedCode = localStorage.getItem(storageCodeKey) as CodeFontPreset | null;
    const storedDisplay = localStorage.getItem(storageDisplayKey) as DisplayFontPreset | null;

    if (storedUI && validUIFonts.includes(storedUI)) {
      setUIFontState(storedUI);
    }
    if (storedCode && validCodeFonts.includes(storedCode)) {
      setCodeFontState(storedCode);
    }
    if (storedDisplay && validDisplayFonts.includes(storedDisplay)) {
      setDisplayFontState(storedDisplay);
    }

    setMounted(true);
  }, [storageUIKey, storageCodeKey, storageDisplayKey]);

  // Update data attributes on <html>
  React.useEffect(() => {
    if (mounted) {
      document.documentElement.dataset.uiFont = uiFont;
      document.documentElement.dataset.codeFont = codeFont;
      document.documentElement.dataset.displayFont = displayFont;
    }
  }, [uiFont, codeFont, displayFont, mounted]);

  const setUIFont = React.useCallback(
    (newFont: UIFontPreset) => {
      setUIFontState(newFont);
      localStorage.setItem(storageUIKey, newFont);
    },
    [storageUIKey]
  );

  const setCodeFont = React.useCallback(
    (newFont: CodeFontPreset) => {
      setCodeFontState(newFont);
      localStorage.setItem(storageCodeKey, newFont);
    },
    [storageCodeKey]
  );

  const setDisplayFont = React.useCallback(
    (newFont: DisplayFontPreset) => {
      setDisplayFontState(newFont);
      localStorage.setItem(storageDisplayKey, newFont);
    },
    [storageDisplayKey]
  );

  // Prevent flash of wrong font on SSR
  if (!mounted) {
    return (
      <FontContext.Provider
        value={{
          uiFont: defaultUI,
          setUIFont,
          codeFont: defaultCode,
          setCodeFont,
          displayFont: defaultDisplay,
          setDisplayFont,
        }}
      >
        {children}
      </FontContext.Provider>
    );
  }

  return (
    <FontContext.Provider
      value={{
        uiFont,
        setUIFont,
        codeFont,
        setCodeFont,
        displayFont,
        setDisplayFont,
      }}
    >
      {children}
    </FontContext.Provider>
  );
}
