import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
}

export function Section({
  title,
  description,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("space-y-[var(--stack-gap)]", className)}
      {...props}
    >
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h2
              className="text-lg font-semibold"
              style={{
                lineHeight: "var(--line-height-heading)",
                marginBottom: "var(--text-margin-after-h2)",
              }}
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
