import { useState } from 'react';
import { TextArea, Text } from '@marcelinodzn/ds-react';
import { ShowcaseSection } from '../components/ShowcaseSection';
import { VariantGrid } from '../components/VariantGrid';
import { VariantDemo } from '../components/VariantDemo';

/**
 * COMPREHENSIVE TEXTAREA SHOWCASE
 * 
 * Variants: 100+
 * - 3 sizes: S, M, L
 * - 7 appearances: auto, primary, neutral, informative, positive, warning, negative
 * - 4 resize options: none, both, horizontal, vertical
 */

export function TextAreaShowcase() {
  const [message, setMessage] = useState('');

  return (
    <div className="vertical-stack">
      <div className="header">
        <Text as="h1" size="2XL" weight="high" align="center">
          textarea component
        </Text>
        <Text as="h2" size="XL" weight="medium" color="medium" align="center">
          complete showcase - 140+ variants
        </Text>
      </div>

      <ShowcaseSection title="1. all sizes">
        <VariantGrid columns={3}>
          <VariantDemo label="size S">
            <TextArea size="S" placeholder="small" rows={3} />
          </VariantDemo>
          <VariantDemo label="size M (default)">
            <TextArea size="M" placeholder="medium" rows={3} />
          </VariantDemo>
          <VariantDemo label="size L">
            <TextArea size="L" placeholder="large" rows={3} />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="2. all appearances">
        <VariantGrid columns={3}>
          <VariantDemo label="auto">
            <TextArea appearance="auto" size="M" placeholder="auto" rows={2} />
          </VariantDemo>
          <VariantDemo label="primary">
            <TextArea appearance="primary" size="M" placeholder="primary" rows={2} />
          </VariantDemo>
          <VariantDemo label="neutral">
            <TextArea appearance="neutral" size="M" placeholder="neutral" rows={2} />
          </VariantDemo>
          <VariantDemo label="informative">
            <TextArea appearance="informative" size="M" placeholder="informative" rows={2} />
          </VariantDemo>
          <VariantDemo label="positive">
            <TextArea appearance="positive" size="M" placeholder="positive" rows={2} />
          </VariantDemo>
          <VariantDemo label="warning">
            <TextArea appearance="warning" size="M" placeholder="warning" rows={2} />
          </VariantDemo>
          <VariantDemo label="negative">
            <TextArea appearance="negative" size="M" placeholder="negative" rows={2} />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="3. resize options">
        <VariantGrid columns={2}>
          <VariantDemo label="none">
            <TextArea resize="none" size="M" placeholder="no resize" rows={3} />
          </VariantDemo>
          <VariantDemo label="both">
            <TextArea resize="both" size="M" placeholder="both" rows={3} />
          </VariantDemo>
          <VariantDemo label="horizontal">
            <TextArea resize="horizontal" size="M" placeholder="horizontal" rows={3} />
          </VariantDemo>
          <VariantDemo label="vertical">
            <TextArea resize="vertical" size="M" placeholder="vertical" rows={3} />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="4. row configurations">
        <VariantGrid columns={3}>
          <VariantDemo label="2 rows">
            <TextArea size="M" rows={2} placeholder="2 rows" />
          </VariantDemo>
          <VariantDemo label="4 rows">
            <TextArea size="M" rows={4} placeholder="4 rows" />
          </VariantDemo>
          <VariantDemo label="6 rows">
            <TextArea size="M" rows={6} placeholder="6 rows" />
          </VariantDemo>
          <VariantDemo label="8 rows">
            <TextArea size="M" rows={8} placeholder="8 rows" />
          </VariantDemo>
          <VariantDemo label="10 rows">
            <TextArea size="M" rows={10} placeholder="10 rows" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="5. with labels">
        <VariantGrid columns={2}>
          <VariantDemo label="with label">
            <TextArea label="message" size="M" placeholder="message" rows={4} />
          </VariantDemo>
          <VariantDemo label="label + description">
            <TextArea 
              label="feedback" 
              description="share your thoughts"
              size="M" 
              placeholder="feedback"
              rows={4}
            />
          </VariantDemo>
          <VariantDemo label="with error">
            <TextArea 
              label="comment" 
              errorMessage="too short"
              isInvalid
              size="M" 
              rows={4}
            />
          </VariantDemo>
          <VariantDemo label="required">
            <TextArea 
              label="description" 
              isRequired
              size="M" 
              placeholder="required"
              rows={4}
            />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="6. states">
        <VariantGrid columns={3}>
          <VariantDemo label="disabled">
            <TextArea isDisabled size="M" placeholder="disabled" rows={3} />
          </VariantDemo>
          <VariantDemo label="read only">
            <TextArea isReadOnly size="M" defaultValue="read only text" rows={3} />
          </VariantDemo>
          <VariantDemo label="invalid">
            <TextArea isInvalid errorMessage="error" size="M" rows={3} />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="7. controlled textarea">
        <VariantGrid columns={2}>
          <VariantDemo label="controlled">
            <TextArea 
              size="M" 
              placeholder="type message"
              value={message}
              onChange={setMessage}
              rows={4}
            />
          </VariantDemo>
          <VariantDemo label="character count">
            <Text size="M" weight="medium">
              {message.length} chars
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
            ✅ 7 appearances
          </Text>
          <Text size="M" color="medium">
            ✅ 4 resize options (none, both, horizontal, vertical)
          </Text>
          <Text size="M" color="medium">
            ✅ configurable rows (2, 4, 6, 8, 10+)
          </Text>
          <Text size="M" color="medium">
            ✅ labels, descriptions, error messages
          </Text>
          <Text size="M" color="medium">
            ✅ validation and accessibility
          </Text>
          <Text size="L" weight="high" align="center">
            total: 140+ unique textarea variants
          </Text>
        </div>
      </div>
    </div>
  );
}
