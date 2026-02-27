"use client";

/**
 * CUSTOM TOKEN CREATOR
 * 
 * Create new custom tokens with DTCG validation and naming conventions.
 */

import * as React from "react";
import { Plus, AlertCircle, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  useEditorStore,
  type TokenCategory,
  type DTCGType,
} from "@/lib/component-editor";

// ============================================
// TYPES
// ============================================

interface CustomTokenCreatorProps {
  className?: string;
  onCreated?: (tokenId: string) => void;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

// ============================================
// CATEGORY TO DTCG TYPE MAPPING
// ============================================

const categoryToType: Record<TokenCategory, DTCGType> = {
  color: "color",
  spacing: "dimension",
  typography: "typography",
  radius: "dimension",
  border: "dimension",
  shadow: "shadow",
  motion: "duration",
  opacity: "number",
  zIndex: "number",
};

const categoryDescriptions: Record<TokenCategory, string> = {
  color: "Colors, backgrounds, borders, text colors",
  spacing: "Padding, margin, gap, width, height",
  typography: "Font family, size, weight, line height",
  radius: "Border radius values",
  border: "Border width",
  shadow: "Box shadows, drop shadows",
  motion: "Animation durations, transitions",
  opacity: "Opacity values",
  zIndex: "Z-index stacking values",
};

// ============================================
// NAMING CONVENTIONS
// ============================================

const namingConventions = {
  prefixes: {
    color: ["brand-", "semantic-", "component-"],
    spacing: ["inset-", "stack-", "inline-"],
    typography: ["font-", "text-", "heading-"],
    radius: ["radius-"],
    border: ["border-", "stroke-"],
    shadow: ["shadow-", "elevation-"],
    motion: ["duration-", "easing-"],
    opacity: ["opacity-"],
    zIndex: ["z-"],
  } as Record<TokenCategory, string[]>,
  
  suggestions: {
    color: ["brand-primary", "brand-accent", "semantic-success", "semantic-warning"],
    spacing: ["inset-sm", "stack-lg", "inline-xs"],
    typography: ["font-display", "text-caption"],
  } as Partial<Record<TokenCategory, string[]>>,
};

// ============================================
// MAIN COMPONENT
// ============================================

export function CustomTokenCreator({ className, onCreated }: CustomTokenCreatorProps) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState<TokenCategory>("color");
  const [value, setValue] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [validation, setValidation] = React.useState<ValidationResult | null>(null);

  const { createCustomToken } = useEditorStore();

  // Validate on changes
  React.useEffect(() => {
    if (name || value) {
      setValidation(validateToken(name, category, value));
    } else {
      setValidation(null);
    }
  }, [name, category, value]);

  const handleCreate = () => {
    if (!validation?.valid) return;

    const tokenId = createCustomToken({
      name,
      category,
      $type: categoryToType[category],
      $value: value,
      $description: description || undefined,
      description: description || undefined,
      createdBy: "user",
    });

    // Reset form
    setName("");
    setValue("");
    setDescription("");
    setOpen(false);

    onCreated?.(tokenId);
  };

  const handleCategoryChange = (newCategory: TokenCategory) => {
    setCategory(newCategory);
    // Clear value when category changes
    setValue("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Plus className="size-4 mr-1.5" />
          New Token
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Custom Token</DialogTitle>
          <DialogDescription>
            Create a new design token that can be used across components.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(v) => handleCategoryChange(v as TokenCategory)}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(categoryToType) as TokenCategory[]).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    <div className="flex items-center justify-between w-full">
                      <span className="capitalize">{cat}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {categoryToType[cat]}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {categoryDescriptions[category]}
            </p>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="name">Token Name</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="size-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-[250px]">
                  <p className="text-xs">
                    Use kebab-case. Suggested prefixes:{" "}
                    {namingConventions.prefixes[category].join(", ")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={namingConventions.prefixes[category][0] + "example"}
            />
            {namingConventions.suggestions[category] && (
              <div className="flex gap-1 flex-wrap">
                {namingConventions.suggestions[category]!.map((suggestion) => (
                  <Badge
                    key={suggestion}
                    variant="secondary"
                    className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setName(suggestion)}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Value */}
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <TokenValueInput
              category={category}
              value={value}
              onChange={setValue}
            />
          </div>

          {/* Description (optional) */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe when and how to use this token..."
              rows={2}
            />
          </div>

          {/* Validation Messages */}
          {validation && (
            <ValidationMessages validation={validation} />
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!validation?.valid}>
            Create Token
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ============================================
// TOKEN VALUE INPUT
// ============================================

interface TokenValueInputProps {
  category: TokenCategory;
  value: string;
  onChange: (value: string) => void;
}

function TokenValueInput({ category, value, onChange }: TokenValueInputProps) {
  switch (category) {
    case "color":
      return (
        <div className="flex gap-2">
          <Input
            type="color"
            value={value.startsWith("#") ? value : "#3b82f6"}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-9 p-1 cursor-pointer"
          />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#3b82f6 or oklch(0.7 0.15 250)"
            className="flex-1"
          />
        </div>
      );

    case "spacing":
    case "radius":
    case "border":
      return (
        <div className="flex gap-2">
          <Input
            type="number"
            min="0"
            value={parseFloat(value) || ""}
            onChange={(e) => onChange(e.target.value ? `${e.target.value}px` : "")}
            placeholder="16"
            className="w-24"
          />
          <Select
            value={value.replace(/[\d.]/g, "") || "px"}
            onValueChange={(unit) => {
              const num = parseFloat(value) || 0;
              onChange(`${num}${unit}`);
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="px">px</SelectItem>
              <SelectItem value="rem">rem</SelectItem>
              <SelectItem value="%">%</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );

    case "opacity":
      return (
        <div className="flex gap-2 items-center">
          <Input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={parseFloat(value) || 1}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            min="0"
            max="1"
            step="0.05"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="1"
            className="w-20"
          />
        </div>
      );

    case "zIndex":
      return (
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="10"
        />
      );

    case "motion":
      return (
        <div className="flex gap-2">
          <Input
            type="number"
            min="0"
            value={parseFloat(value) || ""}
            onChange={(e) => onChange(e.target.value ? `${e.target.value}ms` : "")}
            placeholder="200"
            className="w-24"
          />
          <Select
            value={value.replace(/[\d.]/g, "") || "ms"}
            onValueChange={(unit) => {
              const num = parseFloat(value) || 0;
              onChange(`${num}${unit}`);
            }}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ms">ms</SelectItem>
              <SelectItem value="s">s</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );

    default:
      return (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter value..."
        />
      );
  }
}

// ============================================
// VALIDATION
// ============================================

function validateToken(
  name: string,
  category: TokenCategory,
  value: string
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Name validation
  if (!name) {
    errors.push("Token name is required");
  } else {
    if (!/^[a-z][a-z0-9-]*$/.test(name)) {
      errors.push("Name must be lowercase kebab-case starting with a letter");
    }
    if (name.length < 3) {
      errors.push("Name must be at least 3 characters");
    }
    if (name.length > 50) {
      errors.push("Name must be 50 characters or less");
    }
    
    // Check naming conventions
    const prefixes = namingConventions.prefixes[category];
    const hasValidPrefix = prefixes.some((p) => name.startsWith(p));
    if (!hasValidPrefix) {
      warnings.push(`Consider using a standard prefix: ${prefixes.join(", ")}`);
    }
  }

  // Value validation
  if (!value) {
    errors.push("Token value is required");
  } else {
    switch (category) {
      case "color":
        if (!isValidColor(value)) {
          errors.push("Invalid color format. Use hex, RGB, HSL, or OKLCH");
        }
        break;
      case "spacing":
      case "radius":
      case "border":
        if (!isValidDimension(value)) {
          errors.push("Invalid dimension. Use px, rem, or %");
        }
        break;
      case "opacity":
        const opacity = parseFloat(value);
        if (isNaN(opacity) || opacity < 0 || opacity > 1) {
          errors.push("Opacity must be between 0 and 1");
        }
        break;
      case "zIndex":
        if (isNaN(parseInt(value))) {
          errors.push("Z-index must be a number");
        }
        break;
      case "motion":
        if (!/^\d+(\.\d+)?(ms|s)$/.test(value)) {
          errors.push("Duration must be a number with ms or s unit");
        }
        break;
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

function isValidColor(value: string): boolean {
  // Hex
  if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value)) return true;
  // RGB/RGBA
  if (/^rgba?\([\d\s,.%]+\)$/i.test(value)) return true;
  // HSL/HSLA
  if (/^hsla?\([\d\s,.%deg]+\)$/i.test(value)) return true;
  // OKLCH
  if (/^oklch\([\d\s.%deg/]+\)$/i.test(value)) return true;
  return false;
}

function isValidDimension(value: string): boolean {
  return /^-?\d+(\.\d+)?(px|rem|em|%|vh|vw)$/.test(value);
}

// ============================================
// VALIDATION MESSAGES
// ============================================

function ValidationMessages({ validation }: { validation: ValidationResult }) {
  if (!validation.errors.length && !validation.warnings.length) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
        <Check className="size-4" />
        Valid token configuration
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {validation.errors.map((error, i) => (
        <div
          key={`error-${i}`}
          className="flex items-start gap-2 text-sm text-destructive"
        >
          <AlertCircle className="size-4 mt-0.5 shrink-0" />
          {error}
        </div>
      ))}
      {validation.warnings.map((warning, i) => (
        <div
          key={`warning-${i}`}
          className="flex items-start gap-2 text-sm text-amber-600 dark:text-amber-400"
        >
          <AlertCircle className="size-4 mt-0.5 shrink-0" />
          {warning}
        </div>
      ))}
    </div>
  );
}
