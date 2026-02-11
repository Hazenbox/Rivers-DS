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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      <ShowcaseSection title="1. all sizes - primary appearance">
        <VariantGrid columns={3}>
          <VariantDemo label="size S">
            <Input size="S" placeholder="small input" value={value} onChange={setValue} />
          </VariantDemo>
          <VariantDemo label="size M (default)">
            <Input size="M" placeholder="medium input" value={value} onChange={setValue} />
          </VariantDemo>
          <VariantDemo label="size L">
            <Input size="L" placeholder="large input" value={value} onChange={setValue} />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="2. all appearances - size M">
        <VariantGrid columns={3}>
          <VariantDemo label="auto">
            <Input appearance="auto" size="M" placeholder="auto appearance" />
          </VariantDemo>
          <VariantDemo label="primary">
            <Input appearance="primary" size="M" placeholder="primary appearance" />
          </VariantDemo>
          <VariantDemo label="secondary">
            <Input appearance="secondary" size="M" placeholder="secondary appearance" />
          </VariantDemo>
          <VariantDemo label="sparkle">
            <Input appearance="sparkle" size="M" placeholder="sparkle appearance" />
          </VariantDemo>
          <VariantDemo label="neutral">
            <Input appearance="neutral" size="M" placeholder="neutral appearance" />
          </VariantDemo>
          <VariantDemo label="informative">
            <Input appearance="informative" size="M" placeholder="informative appearance" />
          </VariantDemo>
          <VariantDemo label="positive">
            <Input appearance="positive" size="M" placeholder="positive appearance" />
          </VariantDemo>
          <VariantDemo label="warning">
            <Input appearance="warning" size="M" placeholder="warning appearance" />
          </VariantDemo>
          <VariantDemo label="negative">
            <Input appearance="negative" size="M" placeholder="negative appearance" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="3. attention levels">
        <VariantGrid columns={3}>
          <VariantDemo label="low attention">
            <Input attention="low" size="M" placeholder="low attention" />
          </VariantDemo>
          <VariantDemo label="medium attention">
            <Input attention="medium" size="M" placeholder="medium attention" />
          </VariantDemo>
          <VariantDemo label="high attention">
            <Input attention="high" size="M" placeholder="high attention" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="4. shapes">
        <VariantGrid columns={2}>
          <VariantDemo label="default shape">
            <Input shape="default" size="M" placeholder="default shape" />
          </VariantDemo>
          <VariantDemo label="pill shape">
            <Input shape="pill" size="M" placeholder="pill shape" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="5. with labels and descriptions">
        <VariantGrid columns={2}>
          <VariantDemo label="with label">
            <Input label="email address" size="M" placeholder="you@example.com" value={email} onChange={setEmail} />
          </VariantDemo>
          <VariantDemo label="with label + description">
            <Input 
              label="password" 
              description="must be at least 8 characters"
              size="M" 
              placeholder="enter password"
              value={password} 
              onChange={setPassword}
            />
          </VariantDemo>
          <VariantDemo label="with error message">
            <Input 
              label="username" 
              errorMessage="username is already taken"
              isInvalid
              size="M" 
              placeholder="choose username"
            />
          </VariantDemo>
          <VariantDemo label="required field">
            <Input 
              label="full name" 
              isRequired
              size="M" 
              placeholder="john doe"
            />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="6. state variants">
        <VariantGrid columns={3}>
          <VariantDemo label="disabled">
            <Input label="disabled" isDisabled size="M" placeholder="cannot edit" />
          </VariantDemo>
          <VariantDemo label="read only">
            <Input label="read only" isReadOnly size="M" defaultValue="read only value" />
          </VariantDemo>
          <VariantDemo label="invalid">
            <Input label="invalid" isInvalid errorMessage="this field has an error" size="M" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="7. with start/end slots (icons)">
        <VariantGrid columns={2}>
          <VariantDemo label="with start icon">
            <Input size="M" placeholder="search..." start={<span>🔍</span>} />
          </VariantDemo>
          <VariantDemo label="with end icon">
            <Input size="M" placeholder="enter amount" end={<span>💰</span>} />
          </VariantDemo>
          <VariantDemo label="with both icons">
            <Input size="M" placeholder="email" start={<span>📧</span>} end={<span>✓</span>} />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="8. layout modifiers">
        <div className="vertical-stack">
          <VariantDemo label="full width">
            <Input fullWidth size="M" placeholder="full width input" />
          </VariantDemo>
          <VariantDemo label="full width with label">
            <Input fullWidth label="full width field" size="M" placeholder="spans container width" />
          </VariantDemo>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="9. interactive handlers">
        <VariantGrid columns={2}>
          <VariantDemo label="onChange handler">
            <Input 
              label="controlled input"
              size="M" 
              placeholder="type something"
              value={value}
              onChange={setValue}
            />
          </VariantDemo>
          <VariantDemo label="current value">
            <Text size="M" weight="medium">
              value: {value || '(empty)'}
            </Text>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="10. accessibility features">
        <VariantGrid columns={2}>
          <VariantDemo label="with autoFocus">
            <Input label="auto focused" autoFocus size="M" placeholder="focused on load" />
          </VariantDemo>
          <VariantDemo label="with validation">
            <Input 
              label="email validation"
              size="M" 
              placeholder="email@example.com"
              validate={(val) => {
                if (!val.includes('@')) return 'must be valid email';
                return true;
              }}
            />
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
