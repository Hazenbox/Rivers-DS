# mcp testing - quick start guide

## how to test a component

### simple command format:

```
test [component name] with mcp
```

**examples**:
- "test button with mcp"
- "test input component with mcp"
- "test header navigation with mcp"

---

## what happens automatically

when you ask to test a component, the ai will:

1. **run comprehensive tests** across 10 dimensions:
   - tool availability & discovery
   - documentation accuracy
   - code generation quality
   - validation effectiveness
   - variant coverage
   - prop accuracy
   - typescript support
   - accessibility compliance
   - platform compatibility
   - performance metrics

2. **verify everything**:
   - call mcp tools
   - compare with actual @marcelinodzn/ds-react package
   - compile and test generated code
   - validate accessibility
   - measure performance

3. **generate one comprehensive report** in `MCP_COMPONENT_REPORTS.md`:
   - ✅ what worked
   - ⚠️ what had issues
   - ❌ what failed
   - 📊 performance data
   - 🐛 bugs discovered
   - 💡 improvement suggestions
   - **final score**: 0-100 with grade (A-F)
   - **recommendation**: ready for use | needs improvement | critical issues

---

## viewing results

### main report file
open `MCP_COMPONENT_REPORTS.md` and:
1. check the **index table** at the top for overview
2. scroll to your component's section for full details
3. review the final score and recommendation

### quick status check
```
component: Button
status: 🟢 excellent
score: 92/100 (grade A)
recommendation: ready for use with minor documentation improvements
```

---

## example workflow

```bash
# 1. ask to test
you: "test button with mcp"

# 2. ai runs comprehensive tests
# (calls mcp tools, verifies code, tests everything)

# 3. ai generates report
# opens MCP_COMPONENT_REPORTS.md and adds complete report

# 4. review results
you open: MCP_COMPONENT_REPORTS.md
you see: 
  - index updated with button test
  - full report with all findings
  - score: 85/100 (grade B)
  - recommendation: use with caution, validation has issues

# 5. ai tells you
ai: "completed comprehensive test of button component.
     score: 85/100 (B). found 3 issues in validation.
     full report in MCP_COMPONENT_REPORTS.md"
```

---

## interpreting scores

**grade scale**:
- **A (90-100)**: excellent, mcp works great for this component
- **B (80-89)**: good, minor issues that don't block usage
- **C (70-79)**: acceptable, moderate issues need workarounds
- **D (60-69)**: poor, significant problems require manual fixes
- **F (<60)**: failing, mcp not reliable for this component

**recommendations**:
- **ready for use**: trust mcp output, minimal verification needed
- **use with caution**: verify mcp output before using
- **needs improvement**: significant manual corrections required
- **do not use**: mcp output unreliable, use manual approach

---

## testing multiple components

```bash
# test components one by one
you: "test button with mcp"
# wait for report

you: "test input with mcp"
# new report added

you: "test select with mcp"
# another report added

# all reports accumulate in MCP_COMPONENT_REPORTS.md
```

---

## reference files (optional)

these files exist for deeper analysis but aren't needed for basic testing:

- `MCP_ISSUES.md` - historical issue log
- `MCP_TEST_CASES.md` - test scenario templates
- `MCP_IMPROVEMENTS.md` - enhancement proposals
- `MCP_METRICS.md` - aggregate performance data

**focus on**: `MCP_COMPONENT_REPORTS.md` - this is your main deliverable.

---

## tips

1. **be specific**: "test button" is better than "test the component"
2. **one at a time**: test one component per request for thorough testing
3. **review reports**: actually read the generated reports for insights
4. **track trends**: compare scores across components to identify patterns
5. **share findings**: reports are comprehensive enough to share with team

---

## what you get

every component test report includes:

✅ **complete testing** - all 10 dimensions covered
✅ **real verification** - code compiled and tested
✅ **clear issues** - bugs documented with severity
✅ **actionable suggestions** - improvement proposals with priority
✅ **objective score** - data-driven 0-100 grade
✅ **clear recommendation** - can you trust mcp for this component?
✅ **all evidence** - code samples, comparisons, test data

**one report = everything you need to know**

---

## example report structure

```markdown
## Button - comprehensive test report

📋 summary: 🟢 excellent | score: 92/100 | grade: A

1️⃣ tool availability: ✅ all tools work
2️⃣ documentation: ✅ 95% accurate
3️⃣ code generation: ✅ compiles and runs
4️⃣ validation: ⚠️ missed one edge case
5️⃣ variant coverage: ✅ all variants documented
6️⃣ prop accuracy: ✅ 100% match
7️⃣ typescript: ✅ perfect types
8️⃣ accessibility: ✅ wcag aa compliant
9️⃣ platform: ✅ both web and native
🔟 performance: ✅ < 2s average

🐛 issues: 1 minor (validation missed size edge case)
💡 suggestions: 2 low priority improvements
✅ recommendation: ready for use
```

---

## that's it!

just say: **"test [component] with mcp"**

and you'll get a complete, comprehensive, single report with everything you need.
