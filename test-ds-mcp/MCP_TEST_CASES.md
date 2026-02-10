# jio design system mcp - test cases

comprehensive test scenarios for validating mcp functionality.

---

## test case format

```markdown
### TC-XXX: test case name

**category**: component usage | token resolution | validation | generation | discovery
**priority**: high | medium | low
**status**: ✅ pass | ❌ fail | ⏳ pending | ⚠️ partial

**preconditions**:
- what needs to be true before test

**test steps**:
1. action one
2. action two
3. verify result

**expected result**:
what should happen

**actual result**:
what actually happened

**pass criteria**:
- criterion 1
- criterion 2

**notes**:
additional observations
```

---

## component usage test cases

### TC-001: fetch button component documentation

**category**: component usage
**priority**: high
**status**: ⏳ pending

**test steps**:
1. call `get-component-code` with componentName="Button", platform="react"
2. verify response contains all props
3. verify code examples compile

**expected result**:
- complete prop definitions
- working code examples
- accurate typescript types
- accessibility guidelines included

**pass criteria**:
- [ ] all appearance options documented (primary, secondary, ghost, link)
- [ ] all size options documented (S, M, L)
- [ ] event handlers listed (onPress, onHover, onFocus, etc.)
- [ ] aria props documented
- [ ] at least 3 working examples provided

---

### TC-002: validate component with incorrect props

**category**: validation
**priority**: high
**status**: ⏳ pending

**test steps**:
1. create code with intentional errors:
   ```tsx
   <Button size="medium" color="#fff">click</Button>
   ```
2. call `validate-component-usage` with the code
3. verify errors are detected

**expected result**:
- flags `size="medium"` as invalid (should be S/M/L)
- flags `color` as unsupported prop
- suggests correct alternatives

**pass criteria**:
- [ ] detects invalid size value
- [ ] detects invalid prop name
- [ ] provides correct suggestions
- [ ] error messages are clear

---

## token resolution test cases

### TC-010: resolve surface token in light mode

**category**: token resolution
**priority**: high
**status**: ⏳ pending

**test steps**:
1. call `resolve-token` with tokenName="Surface/Bold/idle"
2. set context: Color Mode="Light", Platform="Desktop (1440)"
3. verify resolved value

**expected result**:
- returns correct hex/rgb value
- includes css value
- resolution metadata provided

**pass criteria**:
- [ ] token resolves successfully
- [ ] value matches design system specification
- [ ] css format is correct
- [ ] response time < 2s

---

### TC-011: resolve non-existent token

**category**: token resolution
**priority**: medium
**status**: ⏳ pending

**test steps**:
1. call `resolve-token` with tokenName="FakeToken/DoesNotExist"
2. verify error handling

**expected result**:
- returns error indicating token not found
- suggests similar token names
- error message is helpful

**pass criteria**:
- [ ] error is graceful (no crash)
- [ ] suggests alternatives
- [ ] error message explains issue

---

## validation test cases

### TC-020: detect hardcoded color values

**category**: validation
**priority**: high
**status**: ⏳ pending

**test steps**:
1. create code with hardcoded colors:
   ```tsx
   const style = { color: '#ff0000', background: 'rgb(255,255,255)' };
   ```
2. call `validate-token-usage` with the code
3. verify violations detected

**expected result**:
- detects hex color (#ff0000)
- detects rgb value
- suggests appropriate design tokens

**pass criteria**:
- [ ] all hardcoded colors flagged
- [ ] token suggestions provided
- [ ] validates hex, rgb, rgba, hsl formats
- [ ] explanation is clear

---

### TC-021: detect hardcoded spacing values

**category**: validation
**priority**: high
**status**: ⏳ pending

**test steps**:
1. create code with hardcoded spacing:
   ```tsx
   const style = { padding: '16px', margin: '24px' };
   ```
2. call `validate-token-usage`
3. verify px values detected

**expected result**:
- detects all px values
- suggests spacing tokens

**pass criteria**:
- [ ] hardcoded padding detected
- [ ] hardcoded margin detected
- [ ] spacing token alternatives suggested

---

## code generation test cases

### TC-030: scaffold basic component

**category**: generation
**priority**: high
**status**: ⏳ pending

**test steps**:
1. call `scaffold-component` with componentName="MyButton"
2. verify generated files
3. compile and run generated code

**expected result**:
- component file created
- types file created
- uses design tokens
- follows best practices

**pass criteria**:
- [ ] code compiles without errors
- [ ] uses correct imports from @marcelinodzn/ds-react
- [ ] no hardcoded values
- [ ] proper typescript typing
- [ ] includes accessibility attributes

---

### TC-031: scaffold mobile app layout

**category**: generation
**priority**: medium
**status**: ⏳ pending

**test steps**:
1. call `scaffold-layout` with type="mobile-app-finance"
2. verify generated code structure
3. test in react native environment

**expected result**:
- complete app structure
- navigation configured
- components properly imported
- follows ds patterns

**pass criteria**:
- [ ] all imports resolve correctly
- [ ] code compiles
- [ ] layout renders properly
- [ ] uses design system components
- [ ] no hardcoded values

---

## icon search test cases

### TC-040: search icons by keyword

**category**: discovery
**priority**: high
**status**: ⏳ pending

**test steps**:
1. call `search-icons` with query="home"
2. verify results
3. test importing suggested icons

**expected result**:
- returns relevant home-related icons
- icon names are correct
- import examples work

**pass criteria**:
- [ ] at least 3 relevant results
- [ ] icon names are importable
- [ ] no duplicate results
- [ ] results ranked by relevance

---

### TC-041: browse all icons with empty query

**category**: discovery
**priority**: medium
**status**: ⏳ pending

**test steps**:
1. call `search-icons` with query="" or "*"
2. verify pagination
3. check limit/offset work

**expected result**:
- returns first page of icons
- pagination works correctly
- total count provided

**pass criteria**:
- [ ] returns results (not error)
- [ ] respects limit parameter
- [ ] offset works for pagination
- [ ] total count is accurate

---

## accessibility test cases

### TC-050: detect missing aria-label on icon-only button

**category**: validation
**priority**: high
**status**: ⏳ pending

**test steps**:
1. create icon-only button without aria-label:
   ```tsx
   <Button><Icon name="home" /></Button>
   ```
2. call `check-accessibility`
3. verify issue detected

**expected result**:
- flags missing aria-label
- explains wcag requirement
- suggests fix

**pass criteria**:
- [ ] detects missing aria-label
- [ ] error message mentions wcag
- [ ] provides example fix
- [ ] explains why it matters

---

## performance test cases

### TC-060: measure token resolution speed

**category**: performance
**priority**: medium
**status**: ⏳ pending

**test steps**:
1. resolve 10 different tokens
2. measure response time for each
3. calculate average

**expected result**:
- average < 2s per token
- no timeouts
- consistent performance

**pass criteria**:
- [ ] avg response time < 2s
- [ ] no requests exceed 5s
- [ ] 95th percentile < 3s

---

### TC-061: measure component fetch speed

**category**: performance
**priority**: medium
**status**: ⏳ pending

**test steps**:
1. fetch 5 different components
2. measure response time
3. analyze payload size

**expected result**:
- quick responses
- reasonable payload sizes

**pass criteria**:
- [ ] avg response time < 3s
- [ ] payload < 100kb per component
- [ ] no unnecessary data

---

## platform compatibility test cases

### TC-070: check web-only component

**category**: platform
**priority**: high
**status**: ⏳ pending

**test steps**:
1. call `check-platform` for HeaderNavigation on native
2. verify correct availability reported
3. check if alternatives suggested

**expected result**:
- reports unavailable for native
- suggests alternatives
- explanation is clear

**pass criteria**:
- [ ] correctly reports unavailability
- [ ] suggests native alternative
- [ ] explains why unavailable

---

## test execution log

**last run**: [date]
**total test cases**: 15
**passed**: 0
**failed**: 0
**pending**: 15

**execution notes**:
[add notes after running tests]

---

## automation opportunities

potential tests to automate:
- [ ] component prop validation against actual package
- [ ] token resolution accuracy checks
- [ ] code generation compilation tests
- [ ] performance regression tests
- [ ] icon search result verification

---

## next test session
**scheduled**: [add date]
**focus areas**: [list priority areas]
