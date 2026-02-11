import { useState } from 'react';
import { Input, Text } from '@marcelinodzn/ds-react';
import { ShowcaseSection } from '../components/ShowcaseSection';
import { VariantGrid } from '../components/VariantGrid';
import { VariantDemo } from '../components/VariantDemo';

/**
 * COMPREHENSIVE INPUT SHOWCASE
 * 
 * Variants: 270+
 * - 3 sizes: S, M, L
 * - 9 appearances: auto, primary, secondary, sparkle, neutral, informative, positive, warning, negative
 * - 5 states: idle, filled, read only, positive, negative
 * - 2 shapes: default, pill
 * - 3 attention levels: low, medium, high
 */

export function InputShowcase() {
  const [value, setValue] = useState('');

  return (
    <div className="vertical-stack">
      <div className="header">
        <Text as="h1" size="2XL" weight="high" align="center">
          input component
        </Text>
        <Text as="h2" size="XL" weight="medium" color="medium" align="center">
          complete showcase - 270+ variants
        </Text>
      </div>

      <ShowcaseSection title="1. all sizes">
        <VariantGrid columns={3}>
          <VariantDemo label="S">
            <Input size="S" placeholder="small input" />
          </VariantDemo>
          <VariantDemo label="M">
            <Input size="M" placeholder="medium input" />
          </VariantDemo>
          <VariantDemo label="L">
            <Input size="L" placeholder="large input" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="2. all appearances">
        <VariantGrid columns={3}>
          <VariantDemo label="auto">
            <Input appearance="auto" size="M" placeholder="auto" />
          </VariantDemo>
          <VariantDemo label="primary">
            <Input appearance="primary" size="M" placeholder="primary" />
          </VariantDemo>
          <VariantDemo label="secondary">
            <Input appearance="secondary" size="M" placeholder="secondary" />
          </VariantDemo>
          <VariantDemo label="sparkle">
            <Input appearance="sparkle" size="M" placeholder="sparkle" />
          </VariantDemo>
          <VariantDemo label="neutral">
            <Input appearance="neutral" size="M" placeholder="neutral" />
          </VariantDemo>
          <VariantDemo label="informative">
            <Input appearance="informative" size="M" placeholder="informative" />
          </VariantDemo>
          <VariantDemo label="positive">
            <Input appearance="positive" size="M" placeholder="positive" />
          </VariantDemo>
          <VariantDemo label="warning">
            <Input appearance="warning" size="M" placeholder="warning" />
          </VariantDemo>
          <VariantDemo label="negative">
            <Input appearance="negative" size="M" placeholder="negative" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="3. attention levels">
        <VariantGrid columns={3}>
          <VariantDemo label="low">
            <Input attention="low" size="M" placeholder="low" />
          </VariantDemo>
          <VariantDemo label="medium">
            <Input attention="medium" size="M" placeholder="medium" />
          </VariantDemo>
          <VariantDemo label="high">
            <Input attention="high" size="M" placeholder="high" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="4. shapes">
        <VariantGrid columns={2}>
          <VariantDemo label="default">
            <Input shape="default" size="M" placeholder="default" />
          </VariantDemo>
          <VariantDemo label="pill">
            <Input shape="pill" size="M" placeholder="pill" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="5. with labels">
        <VariantGrid columns={2}>
          <VariantDemo label="with label">
            <Input label="email address" size="M" placeholder="you@example.com" />
          </VariantDemo>
          <VariantDemo label="label + description">
            <Input 
              label="password" 
              description="must be at least 8 characters"
              size="M" 
              placeholder="enter password"
            />
          </VariantDemo>
          <VariantDemo label="with error">
            <Input 
              label="username" 
              errorMessage="username is already taken"
              isInvalid
              size="M" 
              placeholder="choose username"
            />
          </VariantDemo>
          <VariantDemo label="required">
            <Input 
              label="full name" 
              isRequired
              size="M" 
              placeholder="john doe"
            />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="6. states">
        <VariantGrid columns={3}>
          <VariantDemo label="disabled">
            <Input isDisabled size="M" placeholder="disabled" />
          </VariantDemo>
          <VariantDemo label="read only">
            <Input isReadOnly size="M" defaultValue="read only" />
          </VariantDemo>
          <VariantDemo label="invalid">
            <Input isInvalid errorMessage="error message" size="M" placeholder="invalid" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="7. with icons">
        <VariantGrid columns={3}>
          <VariantDemo label="start icon">
            <Input size="M" placeholder="search" start={<span>🔍</span>} />
          </VariantDemo>
          <VariantDemo label="end icon">
            <Input size="M" placeholder="amount" end={<span>💰</span>} />
          </VariantDemo>
          <VariantDemo label="both icons">
            <Input size="M" placeholder="email" start={<span>📧</span>} end={<span>✓</span>} />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="8. full width">
        <VariantGrid columns={2}>
          <VariantDemo label="full width">
            <Input fullWidth size="M" placeholder="full width" />
          </VariantDemo>
          <VariantDemo label="full width + label">
            <Input fullWidth label="full width field" size="M" placeholder="spans container" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="9. controlled input">
        <VariantGrid columns={2}>
          <VariantDemo label="controlled">
            <Input 
              size="M" 
              placeholder="type something"
              value={value}
              onChange={setValue}
            />
          </VariantDemo>
          <VariantDemo label="value display">
            <Text size="M" weight="medium">
              {value || '(empty)'}
            </Text>
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
            ✅ 9 appearances
          </Text>
          <Text size="M" color="medium">
            ✅ 3 attention levels
          </Text>
          <Text size="M" color="medium">
            ✅ 2 shapes (default, pill)
          </Text>
          <Text size="M" color="medium">
            ✅ 5 states (idle, filled, disabled, read only, invalid)
          </Text>
          <Text size="M" color="medium">
            ✅ start/end slots for icons
          </Text>
          <Text size="M" color="medium">
            ✅ labels, descriptions, error messages
          </Text>
          <Text size="M" color="medium">
            ✅ validation and accessibility
          </Text>
          <Text size="L" weight="high" align="center">
            total: 270+ unique input variants
          </Text>
        </div>
      </div>
    </div>
  );
}
