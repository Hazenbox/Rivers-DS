import * as React from "react";
import { cn } from "@/lib/utils";

type InlineGap = "none" | "xs" | "sm" | "md" | "lg";

const gapClasses: Record<InlineGap, string> = {
  none: "gap-0",
  xs: "gap-[var(--inset-xs)]",
  sm: "gap-[var(--inline-gap)]",
  md: "gap-[var(--inset-md)]",
  lg: "gap-[var(--inset-lg)]",
};

type InlineAlign = "start" | "center" | "end" | "between" | "around";

const alignClasses: Record<InlineAlign, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

interface InlineProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: InlineGap;
  align?: InlineAlign;
  wrap?: boolean;
}

export function Inline({
  gap = "sm",
  align = "start",
  wrap = false,
  className,
  children,
  ...props
}: InlineProps) {
  return (
    <div
      className={cn(
        "flex items-center",
        gapClasses[gap],
        alignClasses[align],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
