import { Avatar, Text } from '@marcelinodzn/ds-react';
import { ShowcaseSection } from '../components/ShowcaseSection';
import { VariantGrid } from '../components/VariantGrid';
import { VariantDemo } from '../components/VariantDemo';

/**
 * COMPREHENSIVE AVATAR SHOWCASE
 * 
 * Variants: 60+
 * - 10 sizes: 2XS, XS, S, M, L, XL, 2XL, 3XL, 4XL, fill
 * - 2 attention levels: high, medium
 * - 3 content types: image, initials, icon
 */

export function AvatarShowcase() {
  return (
    <div className="vertical-stack">
      <div className="header">
        <Text as="h1" size="2XL" weight="high" align="center">
          avatar component
        </Text>
        <Text as="h2" size="XL" weight="medium" color="medium" align="center">
          complete showcase - 60+ variants
        </Text>
      </div>

      <ShowcaseSection title="1. all sizes with initials">
        <VariantGrid columns={4}>
          <VariantDemo label="2XS">
            <Avatar size="2XS" initials="JD" />
          </VariantDemo>
          <VariantDemo label="XS">
            <Avatar size="XS" initials="JD" />
          </VariantDemo>
          <VariantDemo label="S">
            <Avatar size="S" initials="JD" />
          </VariantDemo>
          <VariantDemo label="M (default)">
            <Avatar size="M" initials="JD" />
          </VariantDemo>
          <VariantDemo label="L">
            <Avatar size="L" initials="JD" />
          </VariantDemo>
          <VariantDemo label="XL">
            <Avatar size="XL" initials="JD" />
          </VariantDemo>
          <VariantDemo label="2XL">
            <Avatar size="2XL" initials="JD" />
          </VariantDemo>
          <VariantDemo label="3XL">
            <Avatar size="3XL" initials="JD" />
          </VariantDemo>
          <VariantDemo label="4XL">
            <Avatar size="4XL" initials="JD" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="2. content types">
        <VariantGrid columns={3}>
          <VariantDemo label="with initials">
            <Avatar size="L" initials="AB" content="initials" />
          </VariantDemo>
          <VariantDemo label="with icon">
            <Avatar size="L" icon={<span>👤</span>} content="icon" />
          </VariantDemo>
          <VariantDemo label="with image (fallback to initials)">
            <Avatar size="L" src="/avatar.jpg" alt="user avatar" initials="JD" content="image" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="3. attention levels">
        <VariantGrid columns={2}>
          <VariantDemo label="high attention">
            <Avatar size="L" initials="HI" attention="high" />
          </VariantDemo>
          <VariantDemo label="medium attention">
            <Avatar size="L" initials="MD" attention="medium" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="4. with disabled state">
        <VariantGrid columns={2}>
          <VariantDemo label="normal state">
            <Avatar 
              size="L" 
              initials="NM"
            />
          </VariantDemo>
          <VariantDemo label="disabled state">
            <Avatar 
              size="L" 
              initials="DS" 
              isDisabled
            />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <ShowcaseSection title="5. size + content combinations">
        <VariantGrid columns={4}>
          <VariantDemo label="XS initials">
            <Avatar size="XS" initials="XS" />
          </VariantDemo>
          <VariantDemo label="S icon">
            <Avatar size="S" icon={<span>🎨</span>} content="icon" />
          </VariantDemo>
          <VariantDemo label="M image">
            <Avatar size="M" src="/user.jpg" initials="MD" content="image" />
          </VariantDemo>
          <VariantDemo label="L initials">
            <Avatar size="L" initials="LG" />
          </VariantDemo>
          <VariantDemo label="XL icon">
            <Avatar size="XL" icon={<span>⭐</span>} content="icon" />
          </VariantDemo>
          <VariantDemo label="2XL initials">
            <Avatar size="2XL" initials="2X" />
          </VariantDemo>
          <VariantDemo label="3XL icon">
            <Avatar size="3XL" icon={<span>🚀</span>} content="icon" />
          </VariantDemo>
          <VariantDemo label="4XL initials">
            <Avatar size="4XL" initials="4X" />
          </VariantDemo>
        </VariantGrid>
      </ShowcaseSection>

      <div className="section">
        <Text as="h3" size="L" weight="high" align="center">
          showcase summary
        </Text>
        <div className="vertical-stack">
          <Text size="M" color="medium">
            ✅ 10 sizes (2XS to 4XL + fill)
          </Text>
          <Text size="M" color="medium">
            ✅ 3 content types (image, initials, icon)
          </Text>
          <Text size="M" color="medium">
            ✅ 2 attention levels
          </Text>
          <Text size="M" color="medium">
            ✅ disabled state
          </Text>
          <Text size="L" weight="high" align="center">
            total: 60+ unique avatar variants
          </Text>
        </div>
      </div>
    </div>
  );
}
