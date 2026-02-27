import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stack } from "@/components/layout/stack";
import { Inline } from "@/components/layout/inline";
import { ArrowRight, Check, Zap, Shield, Globe } from "lucide-react";

export default function MarketingPage() {
  return (
    <Stack gap="section">
      {/* Hero */}
      <section className="text-center py-[var(--section-gap)] px-[var(--inset-lg)]">
        <Badge variant="secondary" className="mb-[var(--stack-gap)]">
          New Release
        </Badge>
        <h1
          className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto"
          style={{
            lineHeight: "var(--line-height-heading)",
            marginBottom: "var(--text-margin-after-h1)",
          }}
        >
          Build beautiful products faster with our design system
        </h1>
        <p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          style={{ marginBottom: "var(--text-margin-after-p)" }}
        >
          A comprehensive collection of components and patterns that help teams
          ship consistent, accessible interfaces at scale.
        </p>
        <Inline align="center" gap="md">
          <Button size="lg">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            View Demo
          </Button>
        </Inline>
      </section>

      {/* Features */}
      <section className="py-[var(--section-gap)] px-[var(--inset-lg)] bg-muted/50">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl font-bold text-center"
            style={{
              lineHeight: "var(--line-height-heading)",
              marginBottom: "var(--section-gap)",
            }}
          >
            Everything you need
          </h2>
          <div className="grid gap-[var(--stack-gap)] md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Density Modes",
                description:
                  "Switch between compact, default, and spacious layouts instantly.",
              },
              {
                icon: Shield,
                title: "Accessible",
                description:
                  "WCAG 2.2 compliant with proper touch targets and focus states.",
              },
              {
                icon: Globe,
                title: "Themeable",
                description:
                  "CSS variables make customization simple and performant.",
              },
            ].map((feature) => (
              <Card key={feature.title}>
                <CardContent className="pt-[var(--inset-lg)]">
                  <feature.icon className="h-8 w-8 mb-[var(--stack-gap)] text-primary" />
                  <h3
                    className="font-semibold"
                    style={{
                      lineHeight: "var(--line-height-heading)",
                      marginBottom: "var(--text-margin-after-h3)",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-[var(--section-gap)] px-[var(--inset-lg)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-[var(--section-gap)] md:grid-cols-4 text-center">
            {[
              { value: "50+", label: "Components" },
              { value: "10k+", label: "Downloads" },
              { value: "99%", label: "Satisfaction" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm mt-[var(--inset-xs)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-[var(--section-gap)] px-[var(--inset-lg)] bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-bold text-center"
            style={{
              lineHeight: "var(--line-height-heading)",
              marginBottom: "var(--section-gap)",
            }}
          >
            Simple pricing
          </h2>
          <div className="grid gap-[var(--stack-gap)] md:grid-cols-2">
            {[
              {
                name: "Starter",
                price: "$0",
                description: "Perfect for side projects",
                features: [
                  "10 components",
                  "Community support",
                  "MIT license",
                ],
              },
              {
                name: "Pro",
                price: "$99",
                description: "For professional teams",
                features: [
                  "All components",
                  "Priority support",
                  "Figma kit",
                  "Updates for 1 year",
                ],
                popular: true,
              },
            ].map((plan) => (
              <Card
                key={plan.name}
                className={plan.popular ? "border-primary border-2" : ""}
              >
                <CardContent className="pt-[var(--inset-lg)]">
                  {plan.popular && (
                    <Badge className="mb-[var(--inset-sm)]">Most Popular</Badge>
                  )}
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="mt-[var(--inset-sm)]">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== "$0" && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-[var(--inset-xs)]">
                    {plan.description}
                  </p>
                  <Stack gap="sm" className="mt-[var(--stack-gap)]">
                    {plan.features.map((feature) => (
                      <Inline key={feature} gap="sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </Inline>
                    ))}
                  </Stack>
                  <Button
                    className="w-full mt-[var(--stack-gap)]"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[var(--section-gap)] px-[var(--inset-lg)] text-center">
        <h2
          className="text-3xl font-bold"
          style={{
            lineHeight: "var(--line-height-heading)",
            marginBottom: "var(--text-margin-after-h2)",
          }}
        >
          Ready to get started?
        </h2>
        <p
          className="text-muted-foreground max-w-xl mx-auto"
          style={{ marginBottom: "var(--text-margin-after-p)" }}
        >
          Join thousands of developers building better interfaces with our
          design system.
        </p>
        <Button size="lg">
          Start Building
          <ArrowRight className="h-4 w-4" />
        </Button>
      </section>
    </Stack>
  );
}
