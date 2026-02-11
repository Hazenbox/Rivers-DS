# MCP Component Fetch & Showcase Builder Skill

## Status: ✅ Ready to Use

This skill is now active and will automatically trigger when you request to add or showcase Jio Design System components.

## Quick Start

Simply tell the AI assistant:
- "add Badge component"
- "showcase Input"
- "create Button page"
- "fetch Avatar from mcp"
- "update Card showcase"
- "generate Divider variants"

The skill will automatically:
1. ✅ Fetch latest component specs from MCP
2. ✅ Parse all available props and values
3. ✅ Generate comprehensive showcase following Badge pattern
4. ✅ Calculate accurate variant count
5. ✅ Validate code with MCP tools
6. ✅ Update App.tsx and SideNav.tsx
7. ✅ Commit changes with descriptive message

## What This Skill Does

### Automatic Detection
The skill detects when you mention:
- Component names (Button, Input, Badge, Card, Avatar, Divider, TextArea, etc.)
- Action words (add, showcase, create, fetch, update, generate)
- Component-related context

### MCP Integration
- Calls `user-jio-design-system-get-component-code` for latest specs
- Calls `user-jio-design-system-validate-component-usage` to verify code
- Calls `user-jio-design-system-check-platform` to verify availability
- Always uses fresh data, never relies on assumptions

### Code Generation
Generates showcases that:
- Follow the Badge pattern exactly
- Use ShowcaseSection, VariantGrid, VariantDemo components
- Have simple, lowercase labels
- Show accurate variant counts (no theoretical numbers)
- Include all prop categories from MCP
- Pass MCP validation checks

## Files Created

```
.cursor/skills/fetch-mcp-component/
├── SKILL.md                    # Main skill instructions (auto-loaded by Cursor)
├── templates/
│   └── showcase-template.tsx   # Reusable template structure
├── examples.md                 # 6 detailed examples with workflows
└── README.md                   # This file
```

## Example Usage

### Example 1: New Component

You say:
> "add Badge component"

The AI will:
1. Fetch Badge specs from MCP
2. Find: 5 sizes, 9 appearances, 3 attention levels
3. Generate BadgeShowcase.tsx with 33 variants
4. Add route to App.tsx
5. Add link to SideNav.tsx
6. Commit: "feat: add Badge showcase with 33 variants from MCP"

### Example 2: Update Existing

You say:
> "update Input showcase"

The AI will:
1. Read current InputShowcase.tsx
2. Fetch latest Input specs from MCP
3. Compare old vs new props
4. Add missing sections for new props
5. Fix any deprecated prop usage
6. Update variant count
7. Commit: "fix: update Input showcase with latest MCP specs"

### Example 3: Component Not Available

You say:
> "add Checkbox component"

The AI will:
1. Try to fetch Checkbox from MCP
2. Detect it's not available
3. Inform you: "Checkbox not yet exported from @marcelinodzn/ds-react"
4. Suggest alternatives (Switch, Radio)
5. Offer to track in issues

## Pattern Rules

### Label Formatting
- ✅ Simple: "primary", "disabled", "XS"
- ❌ Verbose: "primary appearance", "disabled state"

### Section Titles
- ✅ Lowercase: "1. all sizes", "2. all appearances"
- ❌ Title case: "Size Variants", "Appearance Options"

### Grid Columns
- 2 columns: Shapes, controlled demos, full-width
- 3 columns: Sizes, appearances, states, icons
- 4 columns: Many small items (Avatar sizes, Badge numbers)

### Variant Counting
- ✅ Accurate: Count each VariantDemo instance
- ❌ Theoretical: "270+" when showing 31 actual variants

## Validation

Every generated showcase:
- ✅ Fetches latest MCP data
- ✅ Uses correct prop names and values
- ✅ Includes required accessibility props
- ✅ Has no hardcoded colors or spacing
- ✅ Passes TypeScript compilation
- ✅ Passes MCP validation tools
- ✅ Updates navigation properly

## References

- **Template**: `templates/showcase-template.tsx`
- **Examples**: `examples.md` (6 detailed scenarios)
- **Badge Pattern**: `src/pages/BadgeShowcase.tsx` (gold standard)
- **Components**: `src/components/ShowcaseSection.tsx`, `VariantGrid.tsx`, `VariantDemo.tsx`

## Troubleshooting

If the skill doesn't trigger:
- Make sure you mention a component name explicitly
- Use trigger words: "add", "showcase", "create", "fetch"
- Example: "add Button component" or "showcase Input"

If validation fails:
- Check MCP response for correct prop names
- Verify prop values match enum options (size="M" not "medium")
- Ensure required props are included (aria-label for icon-only buttons)

## Success Criteria

A successful showcase has:
- ✅ Accurate variant count
- ✅ All MCP props represented
- ✅ Simple, consistent labels
- ✅ Proper grid layouts
- ✅ Minimal state usage
- ✅ No errors or warnings
- ✅ Passes MCP validation
- ✅ Navigation updated
- ✅ Committed to git

---

**Version**: 1.0.0  
**Last Updated**: 2026-02-11  
**Status**: Production Ready ✅
