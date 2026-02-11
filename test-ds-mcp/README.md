# jio design system - complete button showcase

a comprehensive demonstration of **all 150+ button variants** from the jio design system, built with vite + react + typescript.

**updated: 2026-02-10** - synced with latest mcp specifications

## 🚀 quick start

```bash
npm install
npm run dev
```

open [http://localhost:5173](http://localhost:5173) to view the showcase.

## 📦 what's included

this project demonstrates every possible button variant from `@marcelinodzn/ds-react`:

### core variants (major update)
- **5 sizes**: `XS`, `S`, `M`, `L`, `XL` (NEW: XS and XL added)
- **9 appearances**: `auto`, `primary`, `secondary`, `sparkle`, `neutral`, `informative`, `positive`, `warning`, `negative`
- **3 attention levels**: `low`, `medium`, `high` (NEW)

### layout modifiers (NEW)
- **contained** - contained layout variant
- **condensed** - condensed spacing
- **single** - icon-only mode (requires aria-label)
- **fullWidth** - full-width button

### state variations
- **normal state** - default interactive
- **disabled state** - `isDisabled={true}`
- **loading state** - `loading={true}` (CORRECTED: was `isLoading`)

### advanced features
- ✅ **icon integration** - buttons with icons and icon-only buttons
- ✅ **react aria events** - `onPress`, `onHover`, `onFocus` handlers
- ✅ **accessibility** - `aria-label`, `aria-describedby`, `aria-pressed`
- ✅ **form types** - `type="submit"`, `type="button"`, `type="reset"`
- ✅ **focus management** - `autoFocus`, `excludeFromTabOrder`
- ✅ **interactive demos** - live state tracking and event monitoring

## 📚 showcase sections

the app is organized into 12 comprehensive sections:

1. **all sizes** - XS, S, M, L, XL with primary appearance
2. **all appearances** - 9 appearance variants at size M
3. **attention levels** - low, medium, high for different appearances
4. **layout modifiers** - contained, condensed, fullWidth examples
5. **loading states** - all appearances with corrected `loading` prop
6. **disabled states** - testing `isDisabled` across appearances
7. **icon only with single** - new single prop for icon-only buttons
8. **buttons with icons** - legacy children approach for icons
9. **combined states** - size + appearance + state combinations
10. **form buttons** - type="submit", type="reset" examples
11. **interactive demos** - hover/focus/press event handlers
12. **accessibility** - wcag aa compliant examples

## 🎨 button api reference (updated 2026-02-10)

### core props

```typescript
interface ButtonProps {
  // NEW: 5 sizes including XS and XL
  size?: "XS" | "S" | "M" | "L" | "XL";
  
  // NEW: 9 appearance options
  appearance?: "auto" | "primary" | "secondary" | "sparkle" | "neutral" | 
               "informative" | "positive" | "warning" | "negative";
  
  // NEW: attention level
  attention?: "low" | "medium" | "high";
  
  // NEW: layout modifiers
  contained?: boolean;
  condensed?: boolean;
  single?: boolean;  // for icon-only buttons
  fullWidth?: boolean;
  
  // State props
  isDisabled?: boolean;
  loading?: boolean;  // CORRECTED: was isLoading
  
  // Event handler
  onPress?: () => void;
  
  // NEW: Slot-based API (optional)
  start?: ReactNode;  // leading icon/content
  content?: ReactNode;  // main content
  end?: ReactNode;  // trailing icon/content
  children?: ReactNode;  // legacy approach still works
}
```

### react aria event props

```typescript
interface ButtonAriaProps {
  // press events
  onPress?: () => void;
  onPressStart?: () => void;
  onPressEnd?: () => void;
  onPressChange?: (isPressed: boolean) => void;
  onPressUp?: () => void;
  
  // hover events
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onHoverChange?: (isHovered: boolean) => void;
  
  // focus events
  onFocus?: () => void;
  onBlur?: () => void;
  onFocusChange?: (isFocused: boolean) => void;
}
```

### accessibility props

```typescript
interface ButtonA11yProps {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-pressed"?: boolean;
  autoFocus?: boolean;
  excludeFromTabOrder?: boolean;
  preventFocusOnPress?: boolean;
  allowFocusWhenDisabled?: boolean;
}
```

### html button props

```typescript
interface ButtonHTMLProps {
  type?: "button" | "submit" | "reset";
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
```

## 🔧 project structure

```
test-ds-mcp/
├── src/
│   ├── App.tsx           # comprehensive button showcase
│   ├── main.tsx          # react entry point
│   └── vite-env.d.ts     # vite types
├── public/
│   └── fonts/
│       └── fonts.css     # jiotype font loading
├── index.html            # html entry with font preload
├── package.json          # dependencies
├── tsconfig.json         # typescript config
├── vite.config.ts        # vite config
└── .npmrc                # npm registry config
```

## 📝 usage examples

### basic button

```tsx
import { Button } from '@marcelinodzn/ds-react';

<Button appearance="primary" size="M" onPress={() => console.log('clicked')}>
  click me
</Button>
```

### new appearances (sparkle, semantic)

```tsx
// Sparkle appearance (new)
<Button appearance="sparkle" size="M">sparkle button</Button>

// Semantic appearances
<Button appearance="positive" size="M">success</Button>
<Button appearance="warning" size="M">warning</Button>
<Button appearance="negative" size="M">error</Button>
<Button appearance="informative" size="M">info</Button>
```

### new sizes (XS and XL)

```tsx
<Button appearance="primary" size="XS">extra small</Button>
<Button appearance="primary" size="XL">extra large</Button>
```

### attention levels (new)

```tsx
<Button appearance="primary" attention="high" size="M">
  high attention
</Button>
<Button appearance="primary" attention="low" size="M">
  low attention
</Button>
```

### layout modifiers (new)

```tsx
// Contained layout
<Button contained size="M">contained</Button>

// Condensed spacing
<Button condensed size="M">condensed</Button>

// Full width
<Button fullWidth size="M">full width button</Button>

// Icon-only with single prop
<Button single size="M" aria-label="close">
  <Icon name="close" />
</Button>
```

### button with icon (legacy approach still works)

```tsx
import { Button, Icon } from '@marcelinodzn/ds-react';

<Button appearance="primary" size="M" onPress={handleClick}>
  <Icon name="home" />
  home
</Button>
```

### disabled button

```tsx
<Button appearance="primary" size="M" isDisabled>
  disabled
</Button>
```

### loading button (CORRECTED PROP)

```tsx
<Button appearance="primary" size="M" loading>
  loading...
</Button>
```

### form submit button

```tsx
<form onSubmit={handleSubmit}>
  <Button appearance="primary" size="M" type="submit">
    submit form
  </Button>
</form>
```

### interactive with events

```tsx
<Button 
  appearance="primary" 
  size="M"
  onPress={() => console.log('pressed')}
  onHoverStart={() => console.log('hover start')}
  onHoverEnd={() => console.log('hover end')}
  onFocusChange={(focused) => console.log('focus:', focused)}
>
  interactive button
</Button>
```

## 🎯 key features

- ✅ **comprehensive coverage** - all 150+ button combinations included
- ✅ **latest mcp specs** - synced with 2026-02-10 mcp update
- ✅ **new appearances** - sparkle, neutral, and semantic variants
- ✅ **new sizes** - XS and XL added
- ✅ **new props** - attention, contained, condensed, single, fullWidth
- ✅ **corrected api** - loading prop (was isLoading)
- ✅ **fully typed** - complete typescript support
- ✅ **accessible** - wcag aa compliant with react aria
- ✅ **interactive** - live demos with state tracking
- ✅ **well organized** - clear sections with labels
- ✅ **production ready** - follows jio design system best practices

## 📦 dependencies

```json
{
  "@marcelinodzn/ds-react": "^1.0.6",
  "@marcelinodzn/ds-tokens": "^1.0.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

## 🚀 build for production

```bash
npm run build
npm run preview
```

## 📖 learn more

- [jio design system npm package](https://www.npmjs.com/package/@marcelinodzn/ds-react)
- [react aria documentation](https://react-spectrum.adobe.com/react-aria/)
- [vite documentation](https://vitejs.dev/)

## 📄 license

mit

---

**note**: the jiotype font file (`@JioTypeVar.woff2`) needs to be obtained from the jio design system assets and placed in `public/fonts/` for proper typography rendering.
