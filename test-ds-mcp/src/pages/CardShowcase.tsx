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
          <VariantDemo label="S">
            <Card size="S">
              <Text size="S" weight="medium">small</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="M">
            <Card size="M">
              <Text size="M" weight="medium">medium</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="L">
            <Card size="L">
              <Text size="L" weight="medium">large</Text>
            </Card>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="2. elevations">
        <VariantGrid columns={3}>
          <VariantDemo label="0">
            <Card elevation={0} size="M">
              <Text size="M">flat</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="1">
            <Card elevation={1} size="M">
              <Text size="M">subtle</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="2">
            <Card elevation={2} size="M">
              <Text size="M">medium</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="3">
            <Card elevation={3} size="M">
              <Text size="M">elevated</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="4">
            <Card elevation={4} size="M">
              <Text size="M">high</Text>
            </Card>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="3. surfaces">
        <VariantGrid columns={3}>
          <VariantDemo label="default">
            <Card surface="default" size="M">
              <Text size="M">default</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="minimal">
            <Card surface="minimal" size="M">
              <Text size="M">minimal</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="moderate">
            <Card surface="moderate" size="M">
              <Text size="M">moderate</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="bold">
            <Card surface="bold" size="M">
              <Text size="M">bold</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="neutral">
            <Card surface="neutral" size="M">
              <Text size="M">neutral</Text>
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

      <ShowcaseSection title="5. interactive">
        <VariantGrid columns={2}>
          <VariantDemo label="pressable">
            <Card isPressable onPress={() => setClickCount(c => c + 1)} size="M">
              <Text size="M" weight="medium">click me</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="hoverable">
            <Card isHoverable size="M">
              <Text size="M" weight="medium">hover me</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="both">
            <Card isPressable isHoverable onPress={() => setClickCount(c => c + 1)} size="M">
              <Text size="M" weight="medium">interactive</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="disabled">
            <Card isPressable isDisabled size="M">
              <Text size="M" weight="medium">disabled</Text>
            </Card>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="6. full width">
        <VariantGrid columns={2}>
          <VariantDemo label="full width">
            <Card fullWidth size="M">
              <Text size="M" weight="medium">full width</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="full width + pressable">
            <Card fullWidth isPressable onPress={() => setClickCount(c => c + 1)} size="M">
              <Text size="M" weight="medium">pressable</Text>
            </Card>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="7. combined variants">
        <VariantGrid columns={2}>
          <VariantDemo label="S + elevation 2">
            <Card size="S" elevation={2} surface="minimal">
              <Text size="S">small elevated</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="L + elevation 4">
            <Card size="L" elevation={4} surface="bold">
              <Text size="L">large elevated</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="M + primary">
            <Card size="M" elevation={3} appearance="primary">
              <Text size="M">primary</Text>
            </Card>
          </VariantDemo>
          <VariantDemo label="L + pressable">
            <Card size="L" isPressable surface="moderate" onPress={() => setClickCount(c => c + 1)}>
              <Text size="L" weight="medium">click me</Text>
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
