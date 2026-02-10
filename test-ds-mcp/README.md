# jio design system - complete button showcase

a comprehensive demonstration of **all 50+ button variants** from the jio design system, built with vite + react + typescript.

## 🚀 quick start

```bash
npm install
npm run dev
```

open [http://localhost:5173](http://localhost:5173) to view the showcase.

## 📦 what's included

this project demonstrates every possible button variant from `@marcelinodzn/ds-react`:

### core variants (12 base combinations)
- **4 appearances**: `primary`, `secondary`, `ghost`, `link`
- **3 sizes**: `S`, `M`, `L`

### state variations (36+ combinations)
- **normal state** - default interactive
- **disabled state** - `isDisabled={true}`
- **loading state** - `isLoading={true}`

### advanced features
- ✅ **icon integration** - buttons with icons and icon-only buttons
- ✅ **react aria events** - `onPress`, `onHover`, `onFocus` handlers
- ✅ **accessibility** - `aria-label`, `aria-describedby`, `aria-pressed`
- ✅ **form types** - `type="submit"`, `type="button"`, `type="reset"`
- ✅ **focus management** - `autoFocus`, `excludeFromTabOrder`
- ✅ **interactive demos** - live state tracking and event monitoring

## 📚 showcase sections

the app is organized into 12 comprehensive sections:

1. **primary appearance** - all sizes (S, M, L)
2. **secondary appearance** - all sizes (S, M, L)
3. **ghost appearance** - all sizes (S, M, L)
4. **link appearance** - all sizes (S, M, L)
5. **disabled states** - all appearances at size M
6. **loading states** - all appearances at size M
7. **with icons** - primary buttons with icon children
8. **icon only** - buttons with only icon (proper aria-label)
9. **combined states** - disabled + loading for each appearance
10. **form buttons** - type="submit", type="reset" examples
11. **interactive demos** - hover/focus/press event handlers
12. **accessibility** - full aria attribute examples

## 🎨 button api reference

### core props

```typescript
interface ButtonProps {
  appearance?: "primary" | "secondary" | "ghost" | "link";
  size?: "S" | "M" | "L";
  isDisabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
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

### button with icon

```tsx
import { Button, Icon } from '@marcelinodzn/ds-react';

<Button appearance="primary" size="M" onPress={handleClick}>
  <Icon name="home" />
  home
</Button>
```

### icon-only button (accessible)

```tsx
<Button 
  appearance="primary" 
  size="M" 
  onPress={handleClick}
  aria-label="go to home"
>
  <Icon name="home" />
</Button>
```

### disabled button

```tsx
<Button appearance="primary" size="M" isDisabled>
  disabled
</Button>
```

### loading button

```tsx
<Button appearance="primary" size="M" isLoading>
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

- ✅ **no missing variants** - all 50+ button combinations included
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
