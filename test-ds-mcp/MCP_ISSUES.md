# jio design system mcp - issues tracker

track all discovered issues, bugs, and limitations in the design system mcp.

---

## issue tracking format

```markdown
### [ISSUE-XXX] short issue title

**date discovered**: yyyy-mm-dd
**severity**: 🔴 critical | 🟡 major | 🟢 minor
**mcp tool**: tool-name-here
**category**: validation | documentation | performance | discovery | other

**description**:
clear description of what went wrong

**reproduction steps**:
1. step one
2. step two
3. observe issue

**expected behavior**:
what should happen

**actual behavior**:
what actually happened

**impact**:
how this affects users

**workaround**:
temporary solution if any

**proposed fix**:
suggested solution

**status**: 🔴 open | 🟡 investigating | 🟢 resolved
**tracking**: github issue #, jira ticket, etc.
```

---

## open issues

### [ISSUE-001] ghost component: box not exported

**date discovered**: 2026-02-11
**severity**: 🔴 critical
**mcp tool**: get-component-code
**category**: documentation / export validation

**description**:
mcp claims Box component is available and provides import instructions, but component is not actually exported from @marcelinodzn/ds-react@1.0.6.

**reproduction steps**:
1. call `get-component-code(componentName: "Box", platform: "react")`
2. mcp returns success with import: `import { Box } from '@marcelinodzn/ds-react';`
3. attempt import in typescript
4. observe error: Module has no exported member 'Box'

**expected behavior**:
mcp should return error indicating component not available, suggest alternatives

**actual behavior**:
mcp returns success with full import instructions for non-existent component

**impact**:
high - causes immediate import failure, no clear workaround, users waste time debugging

**workaround**:
use custom css div elements for layout

**proposed fix**:
- validate component exports against actual package before returning
- flag as "status: planned" if in spec but not implemented
- suggest alternatives (custom div with css)

**status**: 🔴 open
**tracking**: see [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#box)

---

### [ISSUE-002] ghost component: stack not exported

**date discovered**: 2026-02-11
**severity**: 🔴 critical
**mcp tool**: get-component-code
**category**: documentation / export validation

**description**:
mcp claims Stack component is available but it's not exported from the package.

**impact**: high - layout component is fundamental building block

**workaround**: use custom css classes (.vertical-stack, .horizontal-flex)

**status**: 🔴 open
**tracking**: see [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#stack)

---

### [ISSUE-003] ghost component: flex not exported

**date discovered**: 2026-02-11
**severity**: 🔴 critical
**mcp tool**: get-component-code
**category**: documentation / export validation

**description**:
mcp claims Flex component is available but it's not exported from the package.

**impact**: high - flex layout is fundamental

**workaround**: use custom css flexbox

**status**: 🔴 open
**tracking**: see [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#flex)

---

### [ISSUE-004] ghost component: container not exported

**date discovered**: 2026-02-11
**severity**: 🔴 critical
**mcp tool**: get-component-code
**category**: documentation / export validation

**description**:
mcp claims Container component is available but it's not exported from the package.

**impact**: high - responsive containers needed for layout

**workaround**: use custom css or plain div

**status**: 🔴 open
**tracking**: see [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#container)

---

### [ISSUE-005] ghost component: alert not exported

**date discovered**: 2026-02-11
**severity**: 🔴 critical
**mcp tool**: get-component-code
**category**: documentation / export validation

**description**:
mcp claims Alert component is available but it's not exported from the package.

**impact**: high - alert/notification patterns blocked

**workaround**: use Toast component (actually exported)

**alternative**: `import { Toast, ToastQueue, ToastRegion } from '@marcelinodzn/ds-react';`

**status**: 🔴 open
**tracking**: see [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#alert)

---

### [ISSUE-006] ghost component: modal not exported

**date discovered**: 2026-02-11
**severity**: 🔴 critical
**mcp tool**: get-component-code
**category**: documentation / export validation

**description**:
mcp claims Modal component is available but it's not exported from the package.

**impact**: high - modal dialogs are common ui pattern

**workaround**: implement custom modal or use third-party library

**status**: 🔴 open
**tracking**: see [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#modal)

---

### [ISSUE-007] ghost component: spinner not exported

**date discovered**: 2026-02-11
**severity**: 🔴 critical
**mcp tool**: get-component-code
**category**: documentation / export validation

**description**:
mcp claims Spinner component is available but it's not exported from the package.

**impact**: medium - loading indicators needed

**workaround**: use Button loading state: `<Button loading>loading...</Button>`

**status**: 🔴 open
**tracking**: see [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#spinner)

---

### [ISSUE-008] ghost component: progressbar not exported

**date discovered**: 2026-02-11
**severity**: 🔴 critical
**mcp tool**: get-component-code
**category**: documentation / export validation

**description**:
mcp claims ProgressBar component is available but it's not exported from the package.

**impact**: medium - progress indication needed

**workaround**: use custom css progress bar

**status**: 🔴 open
**tracking**: see [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#progressbar)

---

### [ISSUE-009] ghost component: link not exported

**date discovered**: 2026-02-11
**severity**: 🔴 critical
**mcp tool**: get-component-code
**category**: documentation / export validation

**description**:
mcp claims Link component is available but it's not exported from the package.

**impact**: high - navigation links require custom implementation

**workaround**: use html `<a>` tag with Text component: `<a href="/page"><Text>link text</Text></a>`

**status**: 🔴 open
**tracking**: see [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#link)

---

### [ISSUE-010] ghost component: tag not exported

**date discovered**: 2026-02-11
**severity**: 🔴 critical
**mcp tool**: get-component-code
**category**: documentation / export validation

**description**:
mcp claims Tag component is available but it's not exported from the package.

**impact**: medium - tags/chips needed for categorization

**workaround**: use Chip component (actually exported)

**alternative**: `import { Chip } from '@marcelinodzn/ds-react';`

**status**: 🔴 open
**tracking**: see [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#tag)

---

### [ISSUE-011] ghost component: select not exported (base ui)

**date discovered**: 2026-02-11
**severity**: 🔴 critical
**mcp tool**: get-component-code
**category**: documentation / export validation

**description**:
mcp claims Select component is available with full props documentation (propsSource: "spec") and Base UI architecture, but component is not exported from the package.

**reproduction steps**:
1. mcp returns detailed props: size, attention, appearance, shape, etc.
2. attempt import: `import { Select } from '@marcelinodzn/ds-react';`
3. typescript error: no exported member 'Select'

**expected behavior**:
mcp should flag as planned/not implemented

**actual behavior**:
mcp provides extensive documentation for non-existent component

**impact**: high - dropdown selection is fundamental form control

**workaround**: use SearchField or SegmentedControl (both exported)

**alternative**: `import { SearchField, SegmentedControl } from '@marcelinodzn/ds-react';`

**proposed fix**:
- add component status field to mcp response
- validate against package exports
- provide alternatives in response

**status**: 🔴 open
**tracking**: see [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#select)

---

### [ISSUE-012] ghost component: slider not exported (base ui)

**date discovered**: 2026-02-11
**severity**: 🔴 critical
**mcp tool**: get-component-code
**category**: documentation / export validation

**description**:
mcp claims Slider component is available with full props (propsSource: "spec"), but not exported.

**impact**: medium - range input controls not available

**workaround**: use html `<input type="range">` with custom styling

**status**: 🔴 open
**tracking**: see [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#slider)

---

### [ISSUE-013] ghost component: accordion not exported (base ui)

**date discovered**: 2026-02-11
**severity**: 🔴 critical
**mcp tool**: get-component-code
**category**: documentation / export validation

**description**:
mcp claims Accordion component is available with full props (propsSource: "spec"), but not exported.

**impact**: high - no workaround, manual implementation required

**workaround**: use html `<details>` element or custom implementation

**status**: 🔴 open
**tracking**: see [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#accordion)

---

### [ISSUE-014] ghost component: tooltip not exported (base ui)

**date discovered**: 2026-02-11
**severity**: 🔴 critical
**mcp tool**: get-component-code
**category**: documentation / export validation

**description**:
mcp claims Tooltip component is available with full props (propsSource: "spec"), but not exported.

**impact**: medium - tooltips needed for contextual help

**workaround**: use title attribute or custom tooltip implementation

**status**: 🔴 open
**tracking**: see [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#tooltip)

---

### [ISSUE-015] button: isLoading vs loading prop mismatch

**date discovered**: 2026-02-10 (documented 2026-02-11)
**severity**: 🟡 major
**mcp tool**: get-component-code
**category**: documentation / api accuracy

**description**:
mcp documents Button component with `isLoading` prop, but actual package uses `loading` prop.

**reproduction steps**:
1. mcp suggests: `<Button isLoading>loading</Button>`
2. typescript compilation fails: Property 'isLoading' does not exist. Did you mean 'loading'?

**expected behavior**:
mcp should document correct prop name: `loading`

**actual behavior**:
mcp uses incorrect prop name: `isLoading`

**impact**: medium - causes typescript errors, requires manual correction

**workaround**: manually change `isLoading` to `loading` in all code

**proposed fix**: update mcp data to use correct prop name `loading`

**status**: 🔴 open
**tracking**: see [mcp-reports/Button_MCP_report.md](mcp-reports/Button_MCP_report.md) and [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#button)

---

### [ISSUE-016] button: ghost and link appearance variants rejected by typescript

**date discovered**: 2026-02-10 (documented 2026-02-11)
**severity**: 🟡 major
**mcp tool**: get-component-code
**category**: documentation / api accuracy

**description**:
mcp lists Button appearance types as `"primary" | "secondary" | "ghost" | "link"` but typescript rejects "ghost" and "link" as invalid.

**reproduction steps**:
1. mcp suggests: `<Button appearance="ghost">ghost</Button>`
2. typescript error: Type '"ghost"' is not assignable to type 'ButtonAppearance'

**impact**: medium - users get compile errors if they use these variants

**workaround**: only use "primary" and "secondary" appearances

**proposed fix**: verify actual ButtonAppearance type definition and update mcp, or clarify which variants are supported

**status**: 🔴 open
**tracking**: see [mcp-reports/Button_MCP_report.md](mcp-reports/Button_MCP_report.md) and [COMPONENT_ISSUES_REPORT.md](COMPONENT_ISSUES_REPORT.md#button)

---

## resolved issues

### [ISSUE-001-RESOLVED] example placeholder issue

**date discovered**: 2026-02-10
**severity**: 🟢 minor
**mcp tool**: n/a
**category**: documentation

**description**:
this was a placeholder issue to demonstrate the tracking format.

**status**: 🟢 resolved
**resolution**: created proper issue tracking system

---

## issue statistics

**total issues logged**: 17
**open**: 16
**in progress**: 0
**resolved**: 1

**by severity**:
- 🔴 critical: 14 (ghost components)
- 🟡 major: 2 (button api mismatches)
- 🟢 minor: 1 (resolved - placeholder)

**by category**:
- validation: 0
- documentation: 16 (ghost components + button issues)
- export validation: 14 (ghost components)
- api accuracy: 2 (button issues)
- performance: 0
- discovery: 0
- generation: 0
- other: 1 (resolved)

---

## next review date
**scheduled**: [add date for next comprehensive review]
