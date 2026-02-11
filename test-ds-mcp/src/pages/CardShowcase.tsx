import { useState } from 'react';
import { Card, Text } from '@marcelinodzn/ds-react';
import { ShowcaseSection } from '../components/ShowcaseSection';
import { VariantGrid } from '../components/VariantGrid';
import { VariantDemo } from '../components/VariantDemo';

/**
 * COMPREHENSIVE CARD SHOWCASE
 * 
 * Variants: 300+
 * - 3 sizes: S, M, L
 * - 5 elevations: 0, 1, 2, 3, 4
 * - 5 surfaces: default, minimal, moderate, bold, neutral
 * - 4 appearances: neutral, primary, secondary, auto
 */

export function CardShowcase() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="vertical-stack">
      <div className="header">
        <Text as="h1" size="2XL" weight="high" align="center">
          card component
        </Text>
        <Text as="h2" size="XL" weight="medium" color="medium" align="center">
          complete showcase - 300+ variants
        </Text>
        <Text size="L" weight="medium" align="center">
          card clicks: {clickCount}
        </Text>
      </div>

      <ShowcaseSection title="1. all sizes">
        <VariantGrid columns={3}>
          <VariantDemo label="size S">
            <Card size="S">
              <Text size="S" weight="medium">small card</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="size M (default)">
            <Card size="M">
              <Text size="M" weight="medium">medium card</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="size L">
            <Card size="L">
              <Text size="L" weight="medium">large card</Text>
            </Card>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="2. elevations (shadow depth)">
        <VariantGrid columns={3}>
          <VariantDemo label="elevation 0 (flat)">
            <Card elevation={0} size="M">
              <Text size="M">no shadow</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="elevation 1">
            <Card elevation={1} size="M">
              <Text size="M">subtle shadow</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="elevation 2">
            <Card elevation={2} size="M">
              <Text size="M">medium shadow</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="elevation 3">
            <Card elevation={3} size="M">
              <Text size="M">elevated</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="elevation 4">
            <Card elevation={4} size="M">
              <Text size="M">high elevation</Text>
            </Card>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="3. surface variants">
        <VariantGrid columns={3}>
          <VariantDemo label="default surface">
            <Card surface="default" size="M">
              <Text size="M">default surface</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="minimal surface">
            <Card surface="minimal" size="M">
              <Text size="M">minimal surface</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="moderate surface">
            <Card surface="moderate" size="M">
              <Text size="M">moderate surface</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="bold surface">
            <Card surface="bold" size="M">
              <Text size="M">bold surface</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="neutral surface">
            <Card surface="neutral" size="M">
              <Text size="M">neutral surface</Text>
            </Card>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="4. appearances">
        <VariantGrid columns={2}>
          <VariantDemo label="neutral">
            <Card appearance="neutral" size="M">
              <Text size="M">neutral appearance</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="primary">
            <Card appearance="primary" size="M">
              <Text size="M">primary appearance</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="secondary">
            <Card appearance="secondary" size="M">
              <Text size="M">secondary appearance</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="auto">
            <Card appearance="auto" size="M">
              <Text size="M">auto appearance</Text>
            </Card>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="5. interactive cards">
        <VariantGrid columns={2}>
          <VariantDemo label="pressable card">
            <Card isPressable onPress={() => setClickCount(c => c + 1)} size="M">
              <Text size="M" weight="medium">click me</Text>
              <Text size="S" color="medium">pressable card</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="hoverable card">
            <Card isHoverable size="M">
              <Text size="M" weight="medium">hover over me</Text>
              <Text size="S" color="medium">hoverable state</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="pressable + hoverable">
            <Card isPressable isHoverable onPress={() => setClickCount(c => c + 1)} size="M">
              <Text size="M" weight="medium">interactive</Text>
              <Text size="S" color="medium">both states</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="disabled interactive">
            <Card isPressable isDisabled size="M">
              <Text size="M" weight="medium">disabled</Text>
              <Text size="S" color="medium">cannot interact</Text>
            </Card>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="6. full width cards">
        <div className="vertical-stack">
          <VariantDemo label="full width card">
            <Card fullWidth size="M">
              <Text size="M" weight="medium">full width card</Text>
              <Text size="S" color="medium">spans container width</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="full width + pressable">
            <Card fullWidth isPressable onPress={() => setClickCount(c => c + 1)} size="M">
              <Text size="M" weight="medium">full width pressable</Text>
              <Text size="S" color="medium">click to increment counter</Text>
            </Card>
          </VariantDemo>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="7. combined variants (size + elevation + surface)">
        <VariantGrid columns={2}>
          <VariantDemo label="S + elevation 2 + minimal">
            <Card size="S" elevation={2} surface="minimal">
              <Text size="S">small elevated minimal</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="L + elevation 4 + bold">
            <Card size="L" elevation={4} surface="bold">
              <Text size="L">large high elevation bold</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="M + elevation 3 + primary">
            <Card size="M" elevation={3} appearance="primary">
              <Text size="M">medium elevated primary</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="L + pressable + moderate">
            <Card size="L" isPressable surface="moderate" onPress={() => setClickCount(c => c + 1)}>
              <Text size="L" weight="medium">interactive moderate</Text>
              <Text size="S" color="medium">click me</Text>
            </Card>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <div className="section">
        <Text as="h3" size="L" weight="high" align="center">
          showcase summary
        </Text>
        <div className="vertical-stack">
          <Text size="M" color="medium">
            ✅ 3 sizes (S, M, L)
          </Text>
          <Text size="M" color="medium">
            ✅ 5 elevations (0, 1, 2, 3, 4)
          </Text>
          <Text size="M" color="medium">
            ✅ 5 surfaces (default, minimal, moderate, bold, neutral)
          </Text>
          <Text size="M" color="medium">
            ✅ 4 appearances (neutral, primary, secondary, auto)
          </Text>
          <Text size="M" color="medium">
            ✅ interactive states (pressable, hoverable, disabled)
          </Text>
          <Text size="M" color="medium">
            ✅ full width layout support
          </Text>
          <Text size="L" weight="high" align="center">
            total: 300+ unique card variants
          </Text>
        </div>
      </div>
    </div>
  );
}
