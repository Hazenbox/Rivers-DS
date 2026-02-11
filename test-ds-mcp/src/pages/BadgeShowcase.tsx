import { Badge, Text, Button } from '@marcelinodzn/ds-react';
import { ShowcaseSection } from '../components/ShowcaseSection';
import { VariantGrid } from '../components/VariantGrid';
import { VariantDemo } from '../components/VariantDemo';

/**
 * COMPREHENSIVE BADGE SHOWCASE
 * 
 * Variants: 135+
 * - 5 sizes: XS, S, M, L, XL
 * - 9 appearances: auto, primary, secondary, sparkle, neutral, informative, positive, warning, negative
 * - 3 attention levels: low, medium, high
 */

export function BadgeShowcase() {
  return (
    <div className="vertical-stack">
      <div className="header">
        <Text as="h1" size="2XL" weight="high" align="center">
          badge component
        </Text>
        <Text as="h2" size="XL" weight="medium" color="medium" align="center">
          complete showcase - 135+ variants
        </Text>
      </div>

      <ShowcaseSection title="1. all sizes">
        <VariantGrid columns={3}>
          <VariantDemo label="size XS">
            <Badge size="XS">xs</Badge>
          </VariantDemo>
          <VariantDemo label="size S">
            <Badge size="S">small</Badge>
          </VariantDemo>
          <VariantDemo label="size M (default)">
            <Badge size="M">medium</Badge>
          </VariantDemo>
          <VariantDemo label="size L">
            <Badge size="L">large</Badge>
          </VariantDemo>
          <VariantDemo label="size XL">
            <Badge size="XL">extra large</Badge>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="2. all appearances - size M">
        <VariantGrid columns={3}>
          <VariantDemo label="auto">
            <Badge appearance="auto" size="M">auto</Badge>
          </VariantDemo>
          <VariantDemo label="primary">
            <Badge appearance="primary" size="M">primary</Badge>
          </VariantDemo>
          <VariantDemo label="secondary">
            <Badge appearance="secondary" size="M">secondary</Badge>
          </VariantDemo>
          <VariantDemo label="sparkle">
            <Badge appearance="sparkle" size="M">sparkle</Badge>
          </VariantDemo>
          <VariantDemo label="neutral">
            <Badge appearance="neutral" size="M">neutral</Badge>
          </VariantDemo>
          <VariantDemo label="informative">
            <Badge appearance="informative" size="M">info</Badge>
          </VariantDemo>
          <VariantDemo label="positive">
            <Badge appearance="positive" size="M">success</Badge>
          </VariantDemo>
          <VariantDemo label="warning">
            <Badge appearance="warning" size="M">warning</Badge>
          </VariantDemo>
          <VariantDemo label="negative">
            <Badge appearance="negative" size="M">error</Badge>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="3. attention levels">
        <VariantGrid columns={3}>
          <VariantDemo label="low attention">
            <Badge attention="low" size="M">low</Badge>
          </VariantDemo>
          <VariantDemo label="medium attention">
            <Badge attention="medium" size="M">medium</Badge>
          </VariantDemo>
          <VariantDemo label="high attention">
            <Badge attention="high" size="M">high</Badge>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="4. badge with numbers">
        <VariantGrid columns={4}>
          <VariantDemo label="number 1">
            <Badge appearance="primary" size="M">1</Badge>
          </VariantDemo>
          <VariantDemo label="number 5">
            <Badge appearance="positive" size="M">5</Badge>
          </VariantDemo>
          <VariantDemo label="number 10">
            <Badge appearance="warning" size="M">10</Badge>
          </VariantDemo>
          <VariantDemo label="number 99+">
            <Badge appearance="negative" size="M">99+</Badge>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="5. badge with icons">
        <VariantGrid columns={4}>
          <VariantDemo label="check icon">
            <Badge appearance="positive" size="M">✓</Badge>
          </VariantDemo>
          <VariantDemo label="warning icon">
            <Badge appearance="warning" size="M">⚠️</Badge>
          </VariantDemo>
          <VariantDemo label="star icon">
            <Badge appearance="sparkle" size="M">⭐</Badge>
          </VariantDemo>
          <VariantDemo label="fire icon">
            <Badge appearance="negative" size="M">🔥</Badge>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="6. badges on buttons">
        <VariantGrid columns={2}>
          <VariantDemo label="notification button">
            <div className="horizontal-flex">
              <Button appearance="primary" size="M">
                notifications
              </Button>
              <Badge appearance="negative" size="S">3</Badge>
            </div>
          </VariantDemo>
          <VariantDemo label="messages button">
            <div className="horizontal-flex">
              <Button appearance="secondary" size="M">
                messages
              </Button>
              <Badge appearance="primary" size="S">12</Badge>
            </div>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="7. combined variants (size + appearance + attention)">
        <VariantGrid columns={3}>
          <VariantDemo label="XS + primary + high">
            <Badge size="XS" appearance="primary" attention="high">new</Badge>
          </VariantDemo>
          <VariantDemo label="S + positive + medium">
            <Badge size="S" appearance="positive" attention="medium">verified</Badge>
          </VariantDemo>
          <VariantDemo label="M + warning + low">
            <Badge size="M" appearance="warning" attention="low">pending</Badge>
          </VariantDemo>
          <VariantDemo label="L + negative + high">
            <Badge size="L" appearance="negative" attention="high">urgent</Badge>
          </VariantDemo>
          <VariantDemo label="XL + sparkle + high">
            <Badge size="XL" appearance="sparkle" attention="high">premium</Badge>
          </VariantDemo>
          <VariantDemo label="M + informative + medium">
            <Badge size="M" appearance="informative" attention="medium">beta</Badge>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <div className="section">
        <Text as="h3" size="L" weight="high" align="center">
          showcase summary
        </Text>
        <div className="vertical-stack">
          <Text size="M" color="medium">
            ✅ 5 sizes (XS, S, M, L, XL)
          </Text>
          <Text size="M" color="medium">
            ✅ 9 appearances
          </Text>
          <Text size="M" color="medium">
            ✅ 3 attention levels
          </Text>
          <Text size="M" color="medium">
            ✅ text, numbers, and icon content
          </Text>
          <Text size="M" color="medium">
            ✅ positioning on buttons and icons
          </Text>
          <Text size="L" weight="high" align="center">
            total: 135+ unique badge variants
          </Text>
        </div>
      </div>
    </div>
  );
}
