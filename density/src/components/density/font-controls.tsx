"use client";

import { useFont } from "./font-provider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  uiFontOptions,
  codeFontOptions,
  displayFontOptions,
} from "@/lib/tokens";

export function FontControls() {
  const { uiFont, setUIFont, codeFont, setCodeFont, displayFont, setDisplayFont } = useFont();

  return (
    <div className="space-y-3">
      {/* UI/Body Font */}
      <div className="flex items-center justify-between gap-4">
        <Label className="text-sm whitespace-nowrap">UI Font</Label>
        <Select value={uiFont} onValueChange={setUIFont}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {uiFontOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Code Font */}
      <div className="flex items-center justify-between gap-4">
        <Label className="text-sm whitespace-nowrap">Code Font</Label>
        <Select value={codeFont} onValueChange={setCodeFont}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {codeFontOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Display Font */}
      <div className="flex items-center justify-between gap-4">
        <Label className="text-sm whitespace-nowrap">Display Font</Label>
        <Select value={displayFont} onValueChange={setDisplayFont}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {displayFontOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function FontToggle() {
  const { uiFont, setUIFont } = useFont();

  return (
    <Select value={uiFont} onValueChange={setUIFont}>
      <SelectTrigger className="w-[140px] h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {uiFontOptions.slice(0, 4).map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
