import { useState } from 'react';
import { Input, Text } from '@marcelinodzn/ds-react';
import { ShowcaseSection } from '../components/ShowcaseSection';
import { VariantGrid } from '../components/VariantGrid';
import { VariantDemo } from '../components/VariantDemo';

/**
 * COMPREHENSIVE INPUT SHOWCASE
 * 
 * Actual Variants Displayed: 46
 * - 3 sizes: S, M, L
 * - 9 appearances: auto, primary, secondary, sparkle, neutral, informative, positive, warning, negative
 * - 3 attention levels: low, medium, high
 * - 2 shapes: default, pill
 * - 5 state prop values: idle, filled, read only, positive, negative
 * - Boolean states: disabled, read only, invalid
 * - 2 placeholder attention levels: low, high
 * - 2 text alignment options: start, center
 * - HTML5 validation: pattern, length limits, autocomplete
 * - Input behaviors: autoFocus, spellCheck, autoCorrect
 * - With labels, descriptions, errors, icons
 * - Controlled/uncontrolled examples
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
          complete showcase - 46 variants
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

      <ShowcaseSection title="9. state prop variants">
        <VariantGrid columns={3}>
          <VariantDemo label="idle">
            <Input state="idle" size="M" placeholder="idle state" />
          </VariantDemo>
          <VariantDemo label="filled">
            <Input state="filled" size="M" defaultValue="filled state" />
          </VariantDemo>
          <VariantDemo label="read only">
            <Input state="read only" size="M" defaultValue="read only state" />
          </VariantDemo>
          <VariantDemo label="positive">
            <Input state="positive" size="M" placeholder="positive state" />
          </VariantDemo>
          <VariantDemo label="negative">
            <Input state="negative" size="M" placeholder="negative state" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="10. placeholder styling">
        <VariantGrid columns={2}>
          <VariantDemo label="low attention">
            <Input placeholderAttention="low" size="M" placeholder="low attention placeholder" />
          </VariantDemo>
          <VariantDemo label="high attention">
            <Input placeholderAttention="high" size="M" placeholder="high attention placeholder" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="11. text alignment">
        <VariantGrid columns={2}>
          <VariantDemo label="start">
            <Input inputValueAlign="start" size="M" defaultValue="left aligned" />
          </VariantDemo>
          <VariantDemo label="center">
            <Input inputValueAlign="center" size="M" defaultValue="centered" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="12. html5 validation">
        <VariantGrid columns={3}>
          <VariantDemo label="pattern">
            <Input pattern="[0-9]{3}-[0-9]{4}" size="M" placeholder="123-4567" label="phone (pattern)" />
          </VariantDemo>
          <VariantDemo label="length limits">
            <Input minLength={8} maxLength={20} size="M" placeholder="8-20 chars" label="password" />
          </VariantDemo>
          <VariantDemo label="autocomplete">
            <Input autoComplete="email" size="M" placeholder="email@example.com" label="email" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="13. input behaviors">
        <VariantGrid columns={3}>
          <VariantDemo label="auto focus">
            <Input autoFocus size="M" placeholder="auto focused" />
          </VariantDemo>
          <VariantDemo label="spell check off">
            <Input spellCheck={false} size="M" placeholder="no spell check" />
          </VariantDemo>
          <VariantDemo label="auto correct off">
            <Input autoCorrect="off" size="M" placeholder="no auto correct" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="14. controlled input">
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
            ✅ 5 state prop values (idle, filled, read only, positive, negative)
          </Text>
          <Text size="M" color="medium">
            ✅ boolean states (disabled, read only, invalid)
          </Text>
          <Text size="M" color="medium">
            ✅ start/end slots for icons
          </Text>
          <Text size="M" color="medium">
            ✅ labels, descriptions, error messages
          </Text>
          <Text size="M" color="medium">
            ✅ placeholder styling (low, high attention)
          </Text>
          <Text size="M" color="medium">
            ✅ text alignment (start, center)
          </Text>
          <Text size="M" color="medium">
            ✅ html5 validation (pattern, length, autocomplete)
          </Text>
          <Text size="M" color="medium">
            ✅ input behaviors (autoFocus, spellCheck, autoCorrect)
          </Text>
          <Text size="L" weight="high" align="center">
            total: 46 unique input variants displayed
          </Text>
        </div>
      </div>
    </div>
  );
}
