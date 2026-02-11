# MCP Component Fetch & Showcase - Examples

This document provides real-world examples of how the skill works for different component scenarios.

---

## Example 1: Simple Component (Badge)

### User Request
> "add Badge component"

### Skill Workflow

**Step 1: Fetch MCP Data**
```javascript
user-jio-design-system-get-component-code("Badge", "react")
```

**Step 2: Parse Props**
```typescript
Props found:
- size: "XS" | "S" | "M" | "L" | "XL"
- appearance: "auto" | "primary" | "secondary" | "sparkle" | "neutral" | "informative" | "positive" | "warning" | "negative"
- attention: "low" | "medium" | "high"
- children: ReactNode
```

**Step 3: Plan Sections**
- Section 1: Sizes (5 variants)
- Section 2: Appearances (9 variants)
- Section 3: Attention (3 variants)
- Section 4: With numbers (4 variants - demonstration)
- Section 5: With icons (4 variants - demonstration)
- Section 6: On buttons (2 variants - demonstration)
- Section 7: Combined (6 variants - demonstration)

**Total: 33 actual variants**

**Step 4: Generate Code**
```typescript
import { Badge, Text } from '@marcelinodzn/ds-react';
import { ShowcaseSection } from '../components/ShowcaseSection';
import { VariantGrid } from '../components/VariantGrid';
import { VariantDemo } from '../components/VariantDemo';

/**
 * COMPREHENSIVE BADGE SHOWCASE
 * 
 * Actual Variants Displayed: 33
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
          complete showcase - 33 variants
        </Text>
      </div>

      <ShowcaseSection title="1. all sizes">
        <VariantGrid columns={3}>
          <VariantDemo label="XS">
            <Badge size="XS">xs</Badge>
          </VariantDemo>
          {/* ... more sizes */}
        </VariantGrid>
      </ShowcaseSection>
      
      {/* ... more sections */}
    </div>
  );
}
```

**Step 5: Validate**
```javascript
user-jio-design-system-validate-component-usage(generatedCode, "Badge")
// Result: ✅ Valid
```

**Step 6: Update Navigation**
- Add route to App.tsx
- Add link to SideNav.tsx under "display components"

**Step 7: Commit**
```bash
git add src/pages/BadgeShowcase.tsx src/App.tsx src/components/SideNav.tsx
git commit -m "feat: add Badge showcase with 33 variants from MCP"
```

---

## Example 2: Form Component with States (Input)

### User Request
> "showcase Input component"

### Skill Workflow

**Step 1: Fetch MCP Data**
```javascript
user-jio-design-system-get-component-code("Input", "react")
```

**Step 2: Parse Props**
```typescript
Props found:
- size: "S" | "M" | "L"
- appearance: 9 options (same as Badge)
- attention: "low" | "medium" | "high"
- shape: "default" | "pill"
- start: ReactNode (icon slot)
- end: ReactNode (icon slot)
- label: ReactNode
- description: ReactNode
- errorMessage: ReactNode | function
- fullWidth: boolean
- value: string
- onChange: (value: string) => void
- isDisabled: boolean
- isReadOnly: boolean
- isInvalid: boolean
- isRequired: boolean
```

**Step 3: Plan Sections**
- Section 1: Sizes (3 variants)
- Section 2: Appearances (9 variants)
- Section 3: Attention (3 variants)
- Section 4: Shapes (2 variants)
- Section 5: Labels (4 variants)
- Section 6: States (3 variants)
- Section 7: Icons (3 variants)
- Section 8: Full width (2 variants)
- Section 9: Controlled (2 variants: input + display)

**Total: 31 actual variants**

**Step 4: Add State (if needed)**
```typescript
export function InputShowcase() {
  const [value, setValue] = useState(''); // For controlled example only
  
  return (
    // ...
  );
}
```

**Step 5: Generate Controlled Section**
```typescript
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
```

---

## Example 3: Layout Component (Divider)

### User Request
> "create Divider page"

### Skill Workflow

**Step 1: Fetch MCP Data**
```javascript
user-jio-design-system-get-component-code("Divider", "react")
```

**Step 2: Parse Props**
```typescript
Props found:
- orientation: "horizontal" | "vertical"
- attention: "low" | "medium" | "high"
- alignment: "start" | "center" | "end"
- children: ReactNode (for labels)
```

**Step 3: Plan Sections**
- Section 1: Orientations (2 variants)
- Section 2: Attention (3 variants)
- Section 3: With labels (3 variants - showing alignment)
- Section 4: With icons (2 variants)
- Section 5: Combined (3 variants)

**Total: 13 variants**

**Step 4: Special Handling - Orientation Context**

For Divider, need to show context (content above/below for horizontal, left/right for vertical):

```typescript
<ShowcaseSection title="1. orientations">
  <VariantGrid columns={2}>
    <VariantDemo label="horizontal">
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
  </VariantGrid>
</ShowcaseSection>
```

---

## Example 4: Interactive Component (Button)

### User Request
> "update Button showcase"

### Skill Workflow

**Step 1: Check Existing File**
```bash
ls src/pages/ButtonShowcase.tsx
# File exists
```

**Step 2: Read Current File**
```typescript
// Reads existing showcase to understand what's already there
```

**Step 3: Fetch Latest MCP Data**
```javascript
user-jio-design-system-get-component-code("Button", "react")
```

**Step 4: Compare Props**
```typescript
Old props: size, appearance, isDisabled, isLoading, onPress
New props: size, appearance, isDisabled, loading (renamed!), onPress, attention, contained, condensed, fullWidth, single

Changes detected:
- ❌ Removed: isLoading
- ✅ Added: loading
- ✅ Added: attention prop
- ✅ Added: contained, condensed, fullWidth, single layout props
```

**Step 5: Update Showcase**
- Replace all `isLoading` with `loading`
- Add new section for attention levels
- Add new section for layout modifiers
- Fix variant count

**Step 6: Validate**
```javascript
user-jio-design-system-validate-component-usage(updatedCode, "Button")
// Check for any errors
```

**Step 7: Commit**
```bash
git add src/pages/ButtonShowcase.tsx
git commit -m "fix: update Button showcase to match latest MCP API (isLoading → loading, add attention & layout props)"
```

---

## Example 5: Component with Slots (Card)

### User Request
> "add Card component"

### Skill Workflow

**Step 1: Fetch MCP Data**
```javascript
user-jio-design-system-get-component-code("Card", "react")
```

**Step 2: Parse Props**
```typescript
Props found:
- size: "S" | "M" | "L"
- elevation: 0 | 1 | 2 | 3 | 4
- surface: "default" | "minimal" | "moderate" | "bold" | "neutral"
- appearance: 4 options
- isPressable: boolean
- isHoverable: boolean
- isDisabled: boolean
- fullWidth: boolean
- onPress: function
- children: ReactNode
```

**Step 3: Plan Sections**
- Section 1: Sizes (3 variants)
- Section 2: Elevations (5 variants)
- Section 3: Surfaces (5 variants)
- Section 4: Appearances (4 variants)
- Section 5: Interactive (4 variants - pressable, hoverable, both, disabled)
- Section 6: Full width (2 variants)
- Section 7: Combined (4 variants)

**Total: 27 variants**

**Step 4: Interactive State Handling**

Card needs state for click demos:

```typescript
export function CardShowcase() {
  const [clickCount, setClickCount] = useState(0);
  
  return (
    <div className="vertical-stack">
      <div className="header">
        <Text as="h1" size="2XL" weight="high" align="center">
          card component
        </Text>
        <Text as="h2" size="XL" weight="medium" color="medium" align="center">
          complete showcase - 27 variants
        </Text>
        <Text size="L" weight="medium" align="center">
          card clicks: {clickCount}
        </Text>
      </div>

      {/* ... sections ... */}

      <ShowcaseSection title="5. interactive">
        <VariantGrid columns={2}>
          <VariantDemo label="pressable">
            <Card isPressable onPress={() => setClickCount(c => c + 1)} size="M">
              <Text size="M" weight="medium">click me</Text>
            </Card>
          </VariantDemo>
          {/* ... more */}
        </VariantGrid>
      </ShowcaseSection>
    </div>
  );
}
```

---

## Example 6: Component Not Available

### User Request
> "showcase Checkbox component"

### Skill Workflow

**Step 1: Fetch MCP Data**
```javascript
user-jio-design-system-get-component-code("Checkbox", "react")
```

**Step 2: Check Result**
```javascript
// MCP returns error or component not found
```

**Step 3: Verify with Platform Check**
```javascript
user-jio-design-system-check-platform("Checkbox", "web")
// Result: Not available for web platform
```

**Step 4: Inform User**
> "⚠️ The Checkbox component is not currently available in the Jio Design System for React (web). 
> 
> According to MCP:
> - Component exists in the design system
> - Not yet exported from @marcelinodzn/ds-react
> - May be available in future releases
> 
> Would you like me to:
> 1. Check for alternative components (like Switch or Radio)
> 2. Add this to the component issues tracker
> 3. Create a placeholder showcase for when it becomes available"

---

## Common Patterns & Tips

### Pattern 1: Accurate Variant Counting

**❌ Wrong:**
```typescript
// Theoretical: 3 sizes × 9 appearances × 3 attention = 81 combinations
Variants: 81+
```

**✅ Right:**
```typescript
// Actual: Count each VariantDemo
// Sizes section: 3 demos
// Appearances section: 9 demos
// Attention section: 3 demos
// Total: 15 demos
Variants: 15
```

### Pattern 2: Label Simplification

**❌ Wrong:**
```typescript
<VariantDemo label="primary appearance">
<VariantDemo label="size M (medium)">
<VariantDemo label="disabled state">
```

**✅ Right:**
```typescript
<VariantDemo label="primary">
<VariantDemo label="M">
<VariantDemo label="disabled">
```

### Pattern 3: Grid Column Selection

**2 Columns:**
- Shapes (default, pill)
- Controlled input + display
- Full-width demonstrations
- Large comparison items

**3 Columns:**
- Sizes (S, M, L or XS, S, M, L, XL)
- Appearances (9 options fit well)
- Attention levels (low, medium, high)
- States (3-4 state variants)
- Icons (start, end, both)

**4 Columns:**
- Many small items (Avatar sizes, Badge numbers)
- Icon demonstrations
- Simple boolean toggles

### Pattern 4: Section Ordering

**Standard Order:**
1. Sizes (most fundamental)
2. Appearances (visual variety)
3. Attention levels (emphasis)
4. Shapes (form factor)
5. States (interaction states)
6. Slots/Icons (content slots)
7. Labels (form helpers)
8. Layout (positioning)
9. Controlled (interactive demos)
10. Special features (component-specific)
11. Combined variants (demonstrations)

---

## Validation Checklist

Before finalizing any showcase:

- [ ] Fetched latest MCP data
- [ ] Counted variants accurately (each VariantDemo)
- [ ] Used simple, lowercase labels
- [ ] Selected appropriate grid columns (2, 3, or 4)
- [ ] Added state only when needed
- [ ] Validated code with MCP tools
- [ ] Updated App.tsx with route
- [ ] Updated SideNav.tsx with link
- [ ] No TypeScript errors
- [ ] No linter warnings
- [ ] Committed to git

---

## Troubleshooting Examples

### Issue: Validation Fails

**Error:**
```
Property 'isLoading' does not exist on type 'ButtonProps'
```

**Solution:**
```typescript
// Check MCP for correct prop name
user-jio-design-system-get-component-code("Button", "react")
// Found: 'loading' not 'isLoading'

// Fix:
<Button loading onPress={handlePress}>loading</Button>
```

### Issue: Wrong Prop Values

**Error:**
```
Type '"medium"' is not assignable to type 'ButtonSize'
```

**Solution:**
```typescript
// MCP shows valid sizes: "XS" | "S" | "M" | "L" | "XL"
// Fix:
<Button size="M">button</Button>  // not size="medium"
```

### Issue: Missing Required Prop

**Error:**
```
Property 'aria-label' is missing in type 'ButtonProps'
```

**Solution:**
```typescript
// For icon-only buttons, aria-label is required
<Button single aria-label="home button">🏠</Button>
```

---

These examples demonstrate the full workflow from user request to completed showcase, covering simple components, complex interactions, updates to existing showcases, and error handling.
