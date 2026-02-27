"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DensityProvider, DensityToggle, MetricsPanel } from "@/components/density";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/components", label: "Components" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/forms", label: "Forms" },
  { href: "/marketing", label: "Marketing" },
];

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <DensityProvider defaultDensity="default">
      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="flex items-center justify-between h-[var(--control-height-lg)] px-[var(--inset-lg)]">
            <nav className="flex items-center gap-[var(--inline-gap)]">
              <span className="font-bold mr-[var(--inset-md)]">Density Lab</span>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors px-[var(--inset-sm)] py-[var(--inset-xs)] rounded-[var(--density-radius-sm)]",
                    pathname === link.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <DensityToggle />
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
      <MetricsPanel />
    </DensityProvider>
  );
}
