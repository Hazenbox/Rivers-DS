import { Divider, Text } from '@marcelinodzn/ds-react';
import { ShowcaseSection } from '../components/ShowcaseSection';
import { VariantDemo } from '../components/VariantDemo';

/**
 * COMPREHENSIVE DIVIDER SHOWCASE
 * 
 * Variants: 18+
 * - 2 orientations: horizontal, vertical
 * - 3 attention levels: low, medium, high
 * - 3 alignments: start, center, end
 */

export function DividerShowcase() {
  return (
    <div className="vertical-stack">
      <div className="header">
        <Text as="h1" size="2XL" weight="high" align="center">
          divider component
        </Text>
        <Text as="h2" size="XL" weight="medium" color="medium" align="center">
          complete showcase - 18+ variants
        </Text>
      </div>

      <ShowcaseSection title="1. orientations">
        <div className="vertical-stack">
          <VariantDemo label="horizontal (default)">
            <div className="vertical-stack">
              <Text size="M">content above</Text>
              <Divider orientation="horizontal" />
              <Text size="M">content below</Text>
            </div>
          </VariantDemo>
          <VariantDemo label="vertical">
            <div className="horizontal-flex">
              <Text size="M">left content</Text>
              <Divider orientation="vertical" />
              <Text size="M">right content</Text>
            </div>
          </VariantDemo>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="2. attention levels - horizontal">
        <div className="vertical-stack">
          <VariantDemo label="low attention">
            <div className="vertical-stack">
              <Text size="M">content</Text>
              <Divider attention="low" />
              <Text size="M">content</Text>
            </div>
          </VariantDemo>
          <VariantDemo label="medium attention">
            <div className="vertical-stack">
              <Text size="M">content</Text>
              <Divider attention="medium" />
              <Text size="M">content</Text>
            </div>
          </VariantDemo>
          <VariantDemo label="high attention">
            <div className="vertical-stack">
              <Text size="M">content</Text>
              <Divider attention="high" />
              <Text size="M">content</Text>
            </div>
          </VariantDemo>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="3. with labels - horizontal">
        <div className="vertical-stack">
          <VariantDemo label="label aligned start">
            <div className="vertical-stack">
              <Text size="M">content above</Text>
              <Divider alignment="start">section</Divider>
              <Text size="M">content below</Text>
            </div>
          </VariantDemo>
          <VariantDemo label="label aligned center">
            <div className="vertical-stack">
              <Text size="M">content above</Text>
              <Divider alignment="center">or</Divider>
              <Text size="M">content below</Text>
            </div>
          </VariantDemo>
          <VariantDemo label="label aligned end">
            <div className="vertical-stack">
              <Text size="M">content above</Text>
              <Divider alignment="end">end</Divider>
              <Text size="M">content below</Text>
            </div>
          </VariantDemo>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="4. with icons">
        <div className="vertical-stack">
          <VariantDemo label="icon in center">
            <div className="vertical-stack">
              <Text size="M">content above</Text>
              <Divider alignment="center">⭐</Divider>
              <Text size="M">content below</Text>
            </div>
          </VariantDemo>
          <VariantDemo label="icon at start">
            <div className="vertical-stack">
              <Text size="M">content above</Text>
              <Divider alignment="start">🔥</Divider>
              <Text size="M">content below</Text>
            </div>
          </VariantDemo>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="5. combined variants">
        <div className="vertical-stack">
          <VariantDemo label="high attention + center label">
            <div className="vertical-stack">
              <Text size="M">section 1</Text>
              <Divider attention="high" alignment="center">important</Divider>
              <Text size="M">section 2</Text>
            </div>
          </VariantDemo>
          <VariantDemo label="medium attention + start label">
            <div className="vertical-stack">
              <Text size="M">header</Text>
              <Divider attention="medium" alignment="start">details</Divider>
              <Text size="M">body content</Text>
            </div>
          </VariantDemo>
          <VariantDemo label="low attention + icon">
            <div className="vertical-stack">
              <Text size="M">part 1</Text>
              <Divider attention="low" alignment="center">✨</Divider>
              <Text size="M">part 2</Text>
            </div>
          </VariantDemo>
        </div>
      </ShowcaseSection>

      <div className="section">
        <Text as="h3" size="L" weight="high" align="center">
          showcase summary
        </Text>
        <div className="vertical-stack">
          <Text size="M" color="medium">
            ✅ 2 orientations (horizontal, vertical)
          </Text>
          <Text size="M" color="medium">
            ✅ 3 attention levels
          </Text>
          <Text size="M" color="medium">
            ✅ 3 alignments (start, center, end)
          </Text>
          <Text size="M" color="medium">
            ✅ with labels and icons
          </Text>
          <Text size="L" weight="high" align="center">
            total: 18+ unique divider variants
          </Text>
        </div>
      </div>
    </div>
  );
}
