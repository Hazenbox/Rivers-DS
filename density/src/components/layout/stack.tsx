import * as React from "react";
import { cn } from "@/lib/utils";

type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "section";

const gapClasses: Record<StackGap, string> = {
  none: "gap-0",
  xs: "gap-[var(--inset-xs)]",
  sm: "gap-[var(--inset-sm)]",
  md: "gap-[var(--stack-gap)]",
  lg: "gap-[var(--inset-lg)]",
  xl: "gap-[var(--inset-xl)]",
  section: "gap-[var(--section-gap)]",
};

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: StackGap;
  as?: "div" | "section" | "article" | "main" | "aside";
}

export function Stack({
  gap = "md",
  as: Component = "div",
  className,
  children,
  ...props
}: StackProps) {
  return (
    <Component
      className={cn("flex flex-col", gapClasses[gap], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
