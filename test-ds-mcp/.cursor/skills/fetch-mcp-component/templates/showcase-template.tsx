import { ComponentName, Text } from '@marcelinodzn/ds-react';
import { ShowcaseSection } from '../components/ShowcaseSection';
import { VariantGrid } from '../components/VariantGrid';
import { VariantDemo } from '../components/VariantDemo';

/**
 * COMPREHENSIVE [COMPONENT_NAME] SHOWCASE
 * 
 * Actual Variants Displayed: [VARIANT_COUNT]
 * - [PROP_CATEGORY_1]: [VALUES]
 * - [PROP_CATEGORY_2]: [VALUES]
 * - [PROP_CATEGORY_N]: [VALUES]
 */

export function ComponentNameShowcase() {
  // [OPTIONAL_STATE]
  // Only add state if component needs controlled behavior
  // Example: const [value, setValue] = useState('');
  
  return (
    <div className="vertical-stack">
      <div className="header">
        <Text as="h1" size="2XL" weight="high" align="center">
          [component_name] component
        </Text>
        <Text as="h2" size="XL" weight="medium" color="medium" align="center">
          complete showcase - [VARIANT_COUNT] variants
        </Text>
      </div>

      {/* SECTION 1: SIZES (if component has size prop) */}
      <ShowcaseSection title="1. all sizes">
        <VariantGrid columns={3}>
          <VariantDemo label="XS">
            <ComponentName size="XS">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="S">
            <ComponentName size="S">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="M">
            <ComponentName size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="L">
            <ComponentName size="L">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="XL">
            <ComponentName size="XL">[content]</ComponentName>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      {/* SECTION 2: APPEARANCES (if component has appearance prop) */}
      <ShowcaseSection title="2. all appearances">
        <VariantGrid columns={3}>
          <VariantDemo label="auto">
            <ComponentName appearance="auto" size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="primary">
            <ComponentName appearance="primary" size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="secondary">
            <ComponentName appearance="secondary" size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="sparkle">
            <ComponentName appearance="sparkle" size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="neutral">
            <ComponentName appearance="neutral" size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="informative">
            <ComponentName appearance="informative" size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="positive">
            <ComponentName appearance="positive" size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="warning">
            <ComponentName appearance="warning" size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="negative">
            <ComponentName appearance="negative" size="M">[content]</ComponentName>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      {/* SECTION 3: ATTENTION LEVELS (if component has attention prop) */}
      <ShowcaseSection title="3. attention levels">
        <VariantGrid columns={3}>
          <VariantDemo label="low">
            <ComponentName attention="low" size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="medium">
            <ComponentName attention="medium" size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="high">
            <ComponentName attention="high" size="M">[content]</ComponentName>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      {/* SECTION 4: SHAPES (if component has shape prop) */}
      <ShowcaseSection title="4. shapes">
        <VariantGrid columns={2}>
          <VariantDemo label="default">
            <ComponentName shape="default" size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="pill">
            <ComponentName shape="pill" size="M">[content]</ComponentName>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      {/* SECTION 5: STATES (if component has state props) */}
      <ShowcaseSection title="5. states">
        <VariantGrid columns={3}>
          <VariantDemo label="disabled">
            <ComponentName isDisabled size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="read only">
            <ComponentName isReadOnly size="M" defaultValue="read only">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="invalid">
            <ComponentName isInvalid errorMessage="error" size="M">[content]</ComponentName>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      {/* SECTION 6: SLOTS/ICONS (if component has start/end/icon props) */}
      <ShowcaseSection title="6. with icons">
        <VariantGrid columns={3}>
          <VariantDemo label="start icon">
            <ComponentName size="M" start={<span>🔍</span>}>[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="end icon">
            <ComponentName size="M" end={<span>✓</span>}>[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="both icons">
            <ComponentName size="M" start={<span>📧</span>} end={<span>✓</span>}>[content]</ComponentName>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      {/* SECTION 7: LABELS (if component has label/description props) */}
      <ShowcaseSection title="7. with labels">
        <VariantGrid columns={2}>
          <VariantDemo label="with label">
            <ComponentName label="label text" size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="label + description">
            <ComponentName 
              label="label text" 
              description="helper text"
              size="M"
            >[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="with error">
            <ComponentName 
              label="label text" 
              errorMessage="error message"
              isInvalid
              size="M"
            >[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="required">
            <ComponentName 
              label="label text" 
              isRequired
              size="M"
            >[content]</ComponentName>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      {/* SECTION 8: LAYOUT (if component has layout props) */}
      <ShowcaseSection title="8. layout modifiers">
        <VariantGrid columns={3}>
          <VariantDemo label="contained">
            <ComponentName contained size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="condensed">
            <ComponentName condensed size="M">[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="full width">
            <ComponentName fullWidth size="M">[content]</ComponentName>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      {/* SECTION 9: CONTROLLED (if component has value/onChange) */}
      <ShowcaseSection title="9. controlled">
        <VariantGrid columns={2}>
          <VariantDemo label="controlled">
            <ComponentName 
              size="M" 
              value={value}
              onChange={setValue}
            >[content]</ComponentName>
          </VariantDemo>
          <VariantDemo label="value display">
            <Text size="M" weight="medium">
              {value || '(empty)'}
            </Text>
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      {/* SHOWCASE SUMMARY */}
      <div className="section">
        <Text as="h3" size="L" weight="high" align="center">
          showcase summary
        </Text>
        <div className="vertical-stack">
          <Text size="M" color="medium">
            ✅ [PROP_CATEGORY_1]
          </Text>
          <Text size="M" color="medium">
            ✅ [PROP_CATEGORY_2]
          </Text>
          <Text size="M" color="medium">
            ✅ [PROP_CATEGORY_N]
          </Text>
          <Text size="L" weight="high" align="center">
            total: [VARIANT_COUNT] unique variants displayed
          </Text>
        </div>
      </div>
    </div>
  );
}

/**
 * TEMPLATE USAGE INSTRUCTIONS:
 * 
 * 1. Replace [ComponentName] with actual component name (e.g., Button, Input)
 * 2. Replace [component_name] with lowercase version (e.g., button, input)
 * 3. Replace [VARIANT_COUNT] with actual count of VariantDemo instances
 * 4. Replace [PROP_CATEGORY_X] with actual prop categories and values
 * 5. Replace [content] with appropriate content for the component
 * 6. Remove sections that don't apply to the component
 * 7. Add component-specific sections as needed
 * 8. Add [OPTIONAL_STATE] only if component needs controlled behavior
 * 
 * LABEL RULES:
 * - Simple, lowercase: "primary", "disabled", "XS"
 * - No verbose descriptions: ❌ "primary appearance" → ✅ "primary"
 * 
 * GRID COLUMN RULES:
 * - 2 columns: Shapes, controlled demos, full-width items
 * - 3 columns: Sizes, appearances, attention, states, icons
 * - 4 columns: Many small items (badges, avatar sizes)
 * 
 * SECTION TITLE RULES:
 * - Lowercase: "1. all sizes", "2. all appearances"
 * - No title case: ❌ "Size Variants" → ✅ "all sizes"
 * 
 * VALIDATION:
 * - After generating, call: user-jio-design-system-validate-component-usage
 * - Fix any validation errors before finalizing
 * - Ensure all props exist in MCP spec
 * - Verify prop values are valid
 */
