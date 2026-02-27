"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stack } from "@/components/layout/stack";
import { Inline } from "@/components/layout/inline";
import { useDensity } from "@/components/density";
import {
  ArrowRight,
  LayoutDashboard,
  FileText,
  Megaphone,
  Rows3,
  Rows4,
  Square,
} from "lucide-react";

const densityInfo = {
  compact: {
    icon: Rows4,
    title: "Compact Density",
    description:
      "Maximizes information density. Ideal for data-heavy dashboards, admin panels, and power user interfaces.",
    useCase: "Admin dashboards, tables, data grids",
  },
  default: {
    icon: Rows3,
    title: "Default Density",
    description:
      "Balanced spacing for general-purpose interfaces. Works well for most product screens.",
    useCase: "Product UIs, forms, settings",
  },
  spacious: {
    icon: Square,
    title: "Spacious Density",
    description:
      "Relaxed, breathing layouts with generous whitespace. Perfect for marketing and content-focused pages.",
    useCase: "Marketing, landing pages, content",
  },
};

export default function Home() {
  const { density, tokens } = useDensity();
  const currentDensity = densityInfo[density];
  const DensityIcon = currentDensity.icon;

  return (
    <Stack gap="section" className="p-[var(--section-gap)] max-w-4xl mx-auto">
      <div className="text-center">
        <Badge variant="secondary" className="mb-[var(--stack-gap)]">
          Density Playground
        </Badge>
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{
            lineHeight: "var(--line-height-heading)",
            marginBottom: "var(--text-margin-after-h1)",
          }}
        >
          UI Density Testing Lab
        </h1>
        <p
          className="text-muted-foreground max-w-2xl mx-auto"
          style={{ marginBottom: "var(--text-margin-after-p)" }}
        >
          Experiment with different density modes and see how they affect
          real-world UI patterns. Switch between Compact, Default, and Spacious
          using the toggle above.
        </p>
      </div>

      <Card className="border-primary border-2">
        <CardHeader>
          <Inline gap="sm">
            <DensityIcon className="h-5 w-5 text-primary" />
            <CardTitle>{currentDensity.title}</CardTitle>
          </Inline>
        </CardHeader>
        <CardContent>
          <Stack gap="md">
            <p>{currentDensity.description}</p>
            <div className="bg-muted rounded-md p-[var(--inset-md)]">
              <div className="text-xs text-muted-foreground mb-[var(--inset-xs)]">
                Best for:
              </div>
              <div className="font-medium">{currentDensity.useCase}</div>
            </div>
          </Stack>
        </CardContent>
      </Card>

      <div>
        <h2
          className="text-xl font-semibold mb-[var(--stack-gap)]"
          style={{ lineHeight: "var(--line-height-heading)" }}
        >
          Current Token Values
        </h2>
        <div className="grid gap-[var(--stack-gap)] sm:grid-cols-2 md:grid-cols-3">
          {[
            { label: "Control Height", value: tokens.controlHeight },
            { label: "Stack Gap", value: tokens.stackGap },
            { label: "Section Gap", value: tokens.sectionGap },
            { label: "Table Row", value: tokens.tableRowHeight },
            { label: "Border Radius", value: tokens.radiusMd },
            { label: "Line Height", value: tokens.lineHeightBody },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-muted rounded-md p-[var(--inset-md)]"
            >
              <div className="text-xs text-muted-foreground">{item.label}</div>
              <div className="font-mono font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2
          className="text-xl font-semibold mb-[var(--stack-gap)]"
          style={{ lineHeight: "var(--line-height-heading)" }}
        >
          Test Pattern Pages
        </h2>
        <div className="grid gap-[var(--stack-gap)] md:grid-cols-3">
          {[
            {
              href: "/dashboard",
              icon: LayoutDashboard,
              title: "Dashboard",
              description: "Data tables, stats, and dense layouts",
            },
            {
              href: "/forms",
              icon: FileText,
              title: "Forms",
              description: "Input fields, settings, and controls",
            },
            {
              href: "/marketing",
              icon: Megaphone,
              title: "Marketing",
              description: "Hero sections, pricing, and CTAs",
            },
          ].map((page) => (
            <Card key={page.href}>
              <CardContent className="pt-[var(--inset-lg)]">
                <page.icon className="h-8 w-8 mb-[var(--stack-gap)] text-muted-foreground" />
                <h3 className="font-semibold mb-[var(--inset-xs)]">
                  {page.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-[var(--stack-gap)]">
                  {page.description}
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={page.href}>
                    View Page
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-muted/30">
        <CardContent className="pt-[var(--inset-lg)]">
          <h3 className="font-semibold mb-[var(--inset-xs)]">How It Works</h3>
          <Stack gap="sm" className="text-sm text-muted-foreground">
            <p>
              1. <strong>Toggle density</strong> using the switcher in the
              header
            </p>
            <p>
              2. <strong>Browse pattern pages</strong> to see real-world UI
              examples
            </p>
            <p>
              3. <strong>Check the metrics panel</strong> (bug icon, bottom
              right) for token values
            </p>
            <p>
              4. <strong>Compare densities</strong> to understand their impact
              on information density
            </p>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
