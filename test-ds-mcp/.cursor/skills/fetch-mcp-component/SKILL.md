---
name: fetch-mcp-component
description: Automatically fetches latest Jio Design System component specs from MCP and builds comprehensive showcases with accurate props and variants. Triggers when user mentions adding/showcasing components.
---

# MCP Component Fetch & Showcase Builder

## Purpose

This skill automatically detects when you're adding or showcasing a Jio Design System component and fetches the latest specifications from MCP to build comprehensive, accurate component showcases.

## When This Skill Activates

**Automatic Triggers** - When user message contains:
- "add [component] component"
- "showcase [component]"
- "create [component] page"
- "fetch [component] from mcp"
- "update [component] showcase"
- "generate [component] variants"

**Component Names**: Button, Input, Badge, Avatar, Card, Divider, TextArea, etc.

## Workflow

### Phase 1: Detect & Confirm

1. **Identify the component** from user's message
2. **Check if showcase exists** in `src/pages/`
3. **Confirm action** with user:
   - If new: "I'll create a showcase for [Component] with latest MCP specs"
   - If exists: "I'll update [Component] showcase with latest MCP specs"

### Phase 2: Fetch MCP Data

**Call MCP tools in parallel** for efficiency:

```javascript
// Tool 1: Get component specification
user-jio-design-system-get-component-code(componentName, "react")

// Tool 2: Verify platform availability
user-jio-design-system-check-platform(componentName, "web")
```

**Extract from MCP response:**
- All prop names and their types
- Size options (XS, S, M, L, XL, 2XL, etc.)
- Appearance options (auto, primary, secondary, sparkle, neutral, informative, positive, warning, negative)
- Attention levels (low, medium, high)
- State props (isDisabled, isReadOnly, isInvalid, loading, etc.)
- Layout props (fullWidth, contained, condensed, single, etc.)
- Slot props (start, end, icon, content, etc.)
- Event handlers (onPress, onChange, onFocus, onBlur, etc.)
- Special features (shape, alignment, resize, etc.)
- Accessibility requirements

### Phase 3: Parse & Plan Sections

**Analyze props to determine sections:**

1. **Sizes Section** - If component has `size` prop
   - Extract all size values from type definition
   - Use `columns={3}` for VariantGrid
   - Labels: Just the size name ("XS", "S", "M", "L", "XL")

2. **Appearances Section** - If component has `appearance` prop
   - Extract all appearance values
   - Use `columns={3}` for VariantGrid
   - Labels: Just the appearance name ("primary", "secondary", etc.)

3. **Attention Section** - If component has `attention` prop
   - Typically: low, medium, high
   - Use `columns={3}` for VariantGrid
   - Labels: "low", "medium", "high"

4. **Shapes Section** - If component has `shape` prop
   - Common values: default, pill, rounded, square, circle
   - Use `columns={2}` for VariantGrid
   - Labels: Shape name only

5. **States Section** - If component has state-related boolean props
   - Include: isDisabled, isReadOnly, isInvalid, loading
   - Use `columns={3}` for VariantGrid
   - Labels: "disabled", "read only", "invalid", "loading"

6. **Slots/Icons Section** - If component has start/end/icon props
   - Show: start only, end only, both
   - Use `columns={3}` for VariantGrid
   - Use emoji icons for demonstrations (🔍, 📧, ✓, 💰, etc.)
   - Labels: "start icon", "end icon", "both icons"

7. **Labels Section** - If component has label/description/errorMessage props
   - Show: label only, label + description, with error, required
   - Use `columns={2}` for VariantGrid
   - Labels: "with label", "label + description", "with error", "required"

8. **Layout Section** - If component has layout props
   - Show: fullWidth, contained, condensed, etc.
   - Use appropriate column count based on number of variants
   - Labels: "full width", "contained", "condensed", etc.

9. **Controlled Section** - If component has value/onChange props
   - Show controlled example + value display
   - Use `columns={2}` for VariantGrid
   - Add minimal state: `const [value, setValue] = useState('')`
   - Labels: "controlled", "value display"

10. **Special Features** - Component-specific props
    - For Divider: orientation, alignment
    - For Avatar: initials, image
    - For Card: elevation, surface
    - Adapt grid columns and labels accordingly

### Phase 4: Calculate Variant Count

**Count actual VariantDemo instances:**

```javascript
let count = 0;

// Count each section's variants
if (hasSizeProp) count += sizeValues.length;
if (hasAppearanceProp) count += appearanceValues.length;
if (hasAttentionProp) count += 3; // low, medium, high
if (hasShapeProp) count += shapeValues.length;
// ... continue for all sections

// This is the ACTUAL count to display
totalVariants = count;
```

**IMPORTANT**: Never use theoretical combinations like "270+". Only count what's actually displayed.

### Phase 5: Generate Showcase Code

**Use the Badge pattern as template** (see `templates/showcase-template.tsx`):

```typescript
import { ComponentName, Text } from '@marcelinodzn/ds-react';
import { ShowcaseSection } from '../components/ShowcaseSection';
import { VariantGrid } from '../components/VariantGrid';
import { VariantDemo } from '../components/VariantDemo';

/**
 * COMPREHENSIVE [COMPONENT] SHOWCASE
 * 
 * Actual Variants Displayed: [ACCURATE_COUNT]
 * - [prop1]: [values]
 * - [prop2]: [values]
 * ...
 */

export function ComponentNameShowcase() {
  // Only add state if component needs it (value/onChange)
  // const [value, setValue] = useState('');
  
  return (
    <div className="vertical-stack">
      <div className="header">
        <Text as="h1" size="2XL" weight="high" align="center">
          [component] component
        </Text>
        <Text as="h2" size="XL" weight="medium" color="medium" align="center">
          complete showcase - [COUNT] variants
        </Text>
      </div>

      {/* Generate sections based on available props */}
      
      <div className="section">
        <Text as="h3" size="L" weight="high" align="center">
          showcase summary
        </Text>
        <div className="vertical-stack">
          {/* List all prop categories covered */}
          <Text size="L" weight="high" align="center">
            total: [COUNT] unique variants displayed
          </Text>
        </div>
      </div>
    </div>
  );
}
```

**Label Formatting Rules:**
- ✅ Simple, concise: "XS", "primary", "disabled"
- ❌ Verbose: "size XS", "primary appearance", "disabled state"
- ✅ Lowercase section titles: "1. all sizes", "2. all appearances"
- ❌ Title case: "1. Size Variants", "2. Appearance Options"

**Grid Column Guidelines:**
- 2 columns: Shapes, full-width demos, controlled input + display
- 3 columns: Sizes, appearances, attention, states, icons
- 4 columns: Many small items (like Avatar sizes)

### Phase 6: Validate Generated Code

**Before presenting code, validate with MCP:**

```javascript
// Validate the generated showcase code
user-jio-design-system-validate-component-usage(generatedCode, componentName)
```

**Check for common issues:**
- All props exist in MCP spec
- Prop values are correct (size="M" not size="medium")
- Required accessibility props included (aria-label for icon-only buttons)
- No hardcoded colors or spacing values
- Imports are correct
- Component usage follows MCP patterns

**If validation fails:**
1. Read the validation error carefully
2. Fix the specific issue
3. Validate again
4. Repeat until clean

### Phase 7: Update Supporting Files

**After creating showcase, update navigation:**

1. **Add route to App.tsx:**
```typescript
import { ComponentNameShowcase } from './pages/ComponentNameShowcase';
// In Routes:
<Route path="/componentname" element={<ComponentNameShowcase />} />
```

2. **Add navigation link to SideNav.tsx:**
```typescript
<Link to="/componentname">
  <Button appearance={isActive('/componentname') ? 'primary' : 'neutral'} fullWidth size="S">
    component name
  </Button>
</Link>
```

Place the link in the appropriate category (form components, display components, etc.).

### Phase 8: Commit Changes

**After all files are created and validated:**

```bash
git add src/pages/ComponentNameShowcase.tsx src/App.tsx src/components/SideNav.tsx
git commit -m "feat: add [Component] showcase with [COUNT] variants from MCP"
```

## Critical Rules

### MUST DO:
1. ✅ Fetch latest MCP data BEFORE generating code
2. ✅ Calculate accurate variant count (count VariantDemo instances)
3. ✅ Follow Badge showcase pattern exactly
4. ✅ Use existing ShowcaseSection, VariantGrid, VariantDemo components
5. ✅ Use simple, lowercase labels
6. ✅ Validate generated code with MCP tools
7. ✅ Update App.tsx and SideNav.tsx

### MUST NOT DO:
1. ❌ Generate theoretical variant counts ("270+" when showing 31)
2. ❌ Create custom Section/Grid/Demo components
3. ❌ Add verbose labels ("primary appearance" → just "primary")
4. ❌ Generate showcases without fetching MCP first
5. ❌ Use hardcoded colors, spacing, or CSS values
6. ❌ Skip validation step
7. ❌ Forget to update navigation files

## Examples

### Example 1: User asks "add Checkbox component"

**Step 1**: Fetch MCP data
```javascript
user-jio-design-system-get-component-code("Checkbox", "react")
```

**Step 2**: Parse props
- size: S, M, L
- appearance: primary, neutral
- isDisabled: boolean
- isInvalid: boolean
- label: ReactNode

**Step 3**: Plan sections
1. Sizes (3 variants)
2. Appearances (2 variants)
3. States (2 variants - disabled, invalid)
4. With labels (2 variants)
Total: 9 variants

**Step 4**: Generate code following Badge pattern

**Step 5**: Validate with MCP

**Step 6**: Update App.tsx and SideNav.tsx

**Step 7**: Commit

### Example 2: User asks "update Input showcase"

**Step 1**: Read existing `src/pages/InputShowcase.tsx`

**Step 2**: Fetch latest MCP data

**Step 3**: Compare old vs new props
- Identify new props added
- Identify deprecated props
- Check if prop values changed

**Step 4**: Update showcase with new sections for new props

**Step 5**: Fix variant count if incorrect

**Step 6**: Validate

**Step 7**: Commit with message about what changed

## Reference Files

**Study these files to understand the pattern:**
- `src/pages/BadgeShowcase.tsx` - Perfect example to follow
- `src/components/ShowcaseSection.tsx` - Section wrapper
- `src/components/VariantGrid.tsx` - Grid layout with column control
- `src/components/VariantDemo.tsx` - Individual variant display
- `src/layout.css` - CSS classes for layout (vertical-stack, section, header)

**For validation context:**
- `.cursor/rules/design-system-mcp-review.mdc` - MCP review protocol
- `mcp-reports/Input_MCP_report.md` - Example of thorough component analysis

## Success Metrics

**A successful showcase has:**
- ✅ Accurate variant count matching actual VariantDemo instances
- ✅ All prop categories from MCP represented
- ✅ Simple, consistent labels throughout
- ✅ Proper grid layouts (2, 3, or 4 columns as appropriate)
- ✅ Minimal state usage (only when needed for controlled demos)
- ✅ No TypeScript errors or linter warnings
- ✅ Passes MCP validation checks
- ✅ Navigation properly updated in App.tsx and SideNav.tsx
- ✅ Committed to git with clear message

## Tips for Best Results

1. **Always start fresh**: Fetch MCP data every time, don't rely on old assumptions
2. **Think in sections**: Each prop category = one section
3. **Keep it simple**: Simple labels, clear structure, no over-engineering
4. **Validate early**: Check with MCP before presenting final code
5. **Count accurately**: Never guess variant counts, calculate them
6. **Follow the pattern**: Badge showcase is the gold standard
7. **Test the showcase**: Make sure it actually works after generation

## Troubleshooting

**If MCP fetch fails:**
- Check if component name is spelled correctly
- Verify component exists in @marcelinodzn/ds-react
- Check MCP connection status

**If validation fails:**
- Read error message carefully
- Check prop names match MCP exactly
- Verify prop values are valid enum options
- Ensure required props are included

**If showcase looks wrong:**
- Compare with BadgeShowcase.tsx
- Check grid column counts
- Verify label formatting (lowercase, simple)
- Ensure proper imports

## Notes

This skill eliminates manual prop lookup, reduces errors from outdated information, and ensures consistency across all component showcases. It's designed to work seamlessly with the Jio Design System MCP and follows the established patterns in this project.
