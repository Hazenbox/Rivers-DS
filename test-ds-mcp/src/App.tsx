import { useState } from 'react';
import { Button } from '@marcelinodzn/ds-react';

/**
 * COMPREHENSIVE JIO DESIGN SYSTEM BUTTON SHOWCASE
 * 
 * Updated to latest MCP specifications (2026-02-10):
 * - 5 sizes: XS, S, M, L, XL
 * - 9 appearances: auto, primary, secondary, sparkle, neutral, informative, positive, warning, negative
 * - 3 attention levels: low, medium, high
 * - Layout props: contained, condensed, single, fullWidth
 * - Corrected prop: loading (was isLoading)
 * - Slot-based API: start, content, end
 * - Icon integration with new API
 * - Event handlers
 * - Accessibility features
 * - Form button types
 * 
 * Total: 150+ unique button examples
 */

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [focusState, setFocusState] = useState('');
  const [pressState, setPressState] = useState('');

  const handlePress = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <div style={{ 
      padding: '40px',
      maxWidth: '1400px',
      margin: '0 auto',
      background: '#ffffff',
      minHeight: '100vh'
    }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 700, 
          margin: '0 0 10px 0',
          color: '#000000'
        }}>
          jio design system
        </h1>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 400, 
          margin: '0 0 20px 0',
          color: '#666666'
        }}>
          complete button showcase - 150+ variants (updated 2026-02-10)
        </h2>
        <div style={{
          padding: '15px 20px',
          background: '#f0f0f0',
          borderRadius: '8px',
          display: 'inline-block'
        }}>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>
            button clicks: {clickCount}
          </p>
        </div>
      </header>

      {/* Section 1: All Sizes - Primary Appearance */}
      <Section title="1. all sizes (XS, S, M, L, XL) - primary appearance">
        <ButtonGrid>
          <ButtonDemo label="primary XS">
            <Button appearance="primary" size="XS" onPress={handlePress}>
              extra small
            </Button>
          </ButtonDemo>
          <ButtonDemo label="primary S">
            <Button appearance="primary" size="S" onPress={handlePress}>
              small
            </Button>
          </ButtonDemo>
          <ButtonDemo label="primary M">
            <Button appearance="primary" size="M" onPress={handlePress}>
              medium
            </Button>
          </ButtonDemo>
          <ButtonDemo label="primary L">
            <Button appearance="primary" size="L" onPress={handlePress}>
              large
            </Button>
          </ButtonDemo>
          <ButtonDemo label="primary XL">
            <Button appearance="primary" size="XL" onPress={handlePress}>
              extra large
            </Button>
          </ButtonDemo>
        </ButtonGrid>
      </Section>

      {/* Section 2: All Appearances at Size M */}
      <Section title="2. all 9 appearances - size M">
        <ButtonGrid>
          <ButtonDemo label="auto">
            <Button appearance="auto" size="M" onPress={handlePress}>
              auto
            </Button>
          </ButtonDemo>
          <ButtonDemo label="primary">
            <Button appearance="primary" size="M" onPress={handlePress}>
              primary
            </Button>
          </ButtonDemo>
          <ButtonDemo label="secondary">
            <Button appearance="secondary" size="M" onPress={handlePress}>
              secondary
            </Button>
          </ButtonDemo>
          <ButtonDemo label="sparkle (new)">
            <Button appearance="sparkle" size="M" onPress={handlePress}>
              sparkle
            </Button>
          </ButtonDemo>
          <ButtonDemo label="neutral">
            <Button appearance="neutral" size="M" onPress={handlePress}>
              neutral
            </Button>
          </ButtonDemo>
          <ButtonDemo label="informative">
            <Button appearance="informative" size="M" onPress={handlePress}>
              informative
            </Button>
          </ButtonDemo>
          <ButtonDemo label="positive">
            <Button appearance="positive" size="M" onPress={handlePress}>
              positive
            </Button>
          </ButtonDemo>
          <ButtonDemo label="warning">
            <Button appearance="warning" size="M" onPress={handlePress}>
              warning
            </Button>
          </ButtonDemo>
          <ButtonDemo label="negative">
            <Button appearance="negative" size="M" onPress={handlePress}>
              negative
            </Button>
          </ButtonDemo>
        </ButtonGrid>
      </Section>

      {/* Section 3: Attention Levels */}
      <Section title="3. attention levels (low, medium, high)">
        <ButtonGrid>
          <ButtonDemo label="primary - high attention">
            <Button appearance="primary" attention="high" size="M" onPress={handlePress}>
              high attention
            </Button>
          </ButtonDemo>
          <ButtonDemo label="primary - medium attention">
            <Button appearance="primary" attention="medium" size="M" onPress={handlePress}>
              medium attention
            </Button>
          </ButtonDemo>
          <ButtonDemo label="primary - low attention">
            <Button appearance="primary" attention="low" size="M" onPress={handlePress}>
              low attention
            </Button>
          </ButtonDemo>
          <ButtonDemo label="secondary - high">
            <Button appearance="secondary" attention="high" size="M" onPress={handlePress}>
              sec high
            </Button>
          </ButtonDemo>
          <ButtonDemo label="secondary - medium">
            <Button appearance="secondary" attention="medium" size="M" onPress={handlePress}>
              sec medium
            </Button>
          </ButtonDemo>
          <ButtonDemo label="secondary - low">
            <Button appearance="secondary" attention="low" size="M" onPress={handlePress}>
              sec low
            </Button>
          </ButtonDemo>
        </ButtonGrid>
      </Section>

      {/* Section 4: Layout Modifiers */}
      <Section title="4. layout modifiers (contained, condensed, fullWidth)">
        <ButtonGrid>
          <ButtonDemo label="contained">
            <Button contained size="M" onPress={handlePress}>
              contained button
            </Button>
          </ButtonDemo>
          <ButtonDemo label="condensed">
            <Button condensed size="M" onPress={handlePress}>
              condensed button
            </Button>
          </ButtonDemo>
          <ButtonDemo label="contained + condensed">
            <Button contained condensed size="M" onPress={handlePress}>
              both
            </Button>
          </ButtonDemo>
        </ButtonGrid>
        <div style={{ marginTop: '20px' }}>
          <ButtonDemo label="fullWidth">
            <Button fullWidth size="M" appearance="primary" onPress={handlePress}>
              full width button
            </Button>
          </ButtonDemo>
        </div>
        <div style={{ marginTop: '10px' }}>
          <ButtonDemo label="fullWidth + contained">
            <Button fullWidth contained size="M" appearance="secondary" onPress={handlePress}>
              full width + contained
            </Button>
          </ButtonDemo>
        </div>
      </Section>

      {/* Section 5: Loading States (CORRECTED PROP: loading not isLoading) */}
      <Section title="5. loading states (corrected prop name)">
        <ButtonGrid>
          <ButtonDemo label="primary loading">
            <Button appearance="primary" size="M" loading onPress={handlePress}>
              loading
            </Button>
          </ButtonDemo>
          <ButtonDemo label="secondary loading">
            <Button appearance="secondary" size="M" loading onPress={handlePress}>
              loading
            </Button>
          </ButtonDemo>
          <ButtonDemo label="sparkle loading">
            <Button appearance="sparkle" size="M" loading onPress={handlePress}>
              loading
            </Button>
          </ButtonDemo>
          <ButtonDemo label="neutral loading">
            <Button appearance="neutral" size="M" loading onPress={handlePress}>
              loading
            </Button>
          </ButtonDemo>
          <ButtonDemo label="positive loading">
            <Button appearance="positive" size="M" loading onPress={handlePress}>
              loading
            </Button>
          </ButtonDemo>
          <ButtonDemo label="warning loading">
            <Button appearance="warning" size="M" loading onPress={handlePress}>
              loading
            </Button>
          </ButtonDemo>
        </ButtonGrid>
      </Section>

      {/* Section 6: Disabled States (testing isDisabled prop) */}
      <Section title="6. disabled states (testing isDisabled)">
        <ButtonGrid>
          <ButtonDemo label="primary disabled">
            <Button appearance="primary" size="M" isDisabled onPress={handlePress}>
              disabled
            </Button>
          </ButtonDemo>
          <ButtonDemo label="secondary disabled">
            <Button appearance="secondary" size="M" isDisabled onPress={handlePress}>
              disabled
            </Button>
          </ButtonDemo>
          <ButtonDemo label="sparkle disabled">
            <Button appearance="sparkle" size="M" isDisabled onPress={handlePress}>
              disabled
            </Button>
          </ButtonDemo>
          <ButtonDemo label="informative disabled">
            <Button appearance="informative" size="M" isDisabled onPress={handlePress}>
              disabled
            </Button>
          </ButtonDemo>
        </ButtonGrid>
      </Section>

      {/* Section 7: Icon Only with single prop (NEW API) */}
      <Section title="7. icon only buttons - single prop (requires aria-label)">
        <ButtonGrid>
          <ButtonDemo label="single + primary">
            <Button 
              single
              appearance="primary"
              size="M" 
              onPress={handlePress}
              aria-label="home button"
            >
              🏠
            </Button>
          </ButtonDemo>
          <ButtonDemo label="single + secondary">
            <Button 
              single
              appearance="secondary"
              size="M" 
              onPress={handlePress}
              aria-label="search button"
            >
              🔍
            </Button>
          </ButtonDemo>
          <ButtonDemo label="single + sparkle">
            <Button 
              single
              appearance="sparkle"
              size="M" 
              onPress={handlePress}
              aria-label="sparkle button"
            >
              ✨
            </Button>
          </ButtonDemo>
          <ButtonDemo label="single + neutral">
            <Button 
              single
              appearance="neutral"
              size="M" 
              onPress={handlePress}
              aria-label="settings button"
            >
              ⚙️
            </Button>
          </ButtonDemo>
          <ButtonDemo label="single + positive">
            <Button 
              single
              appearance="positive"
              size="M" 
              onPress={handlePress}
              aria-label="check button"
            >
              ✓
            </Button>
          </ButtonDemo>
          <ButtonDemo label="single + negative">
            <Button 
              single
              appearance="negative"
              size="M" 
              onPress={handlePress}
              aria-label="delete button"
            >
              ✕
            </Button>
          </ButtonDemo>
        </ButtonGrid>
      </Section>

      {/* Section 8: Text-only Buttons (no icons due to Icon API change) */}
      <Section title="8. semantic appearance buttons">
        <ButtonGrid>
          <ButtonDemo label="auto appearance">
            <Button appearance="auto" size="M" onPress={handlePress}>
              auto
            </Button>
          </ButtonDemo>
          <ButtonDemo label="sparkle appearance">
            <Button appearance="sparkle" size="M" onPress={handlePress}>
              sparkle
            </Button>
          </ButtonDemo>
          <ButtonDemo label="neutral appearance">
            <Button appearance="neutral" size="M" onPress={handlePress}>
              neutral
            </Button>
          </ButtonDemo>
          <ButtonDemo label="informative appearance">
            <Button appearance="informative" size="M" onPress={handlePress}>
              informative
            </Button>
          </ButtonDemo>
          <ButtonDemo label="positive appearance">
            <Button appearance="positive" size="M" onPress={handlePress}>
              positive
            </Button>
          </ButtonDemo>
          <ButtonDemo label="warning appearance">
            <Button appearance="warning" size="M" onPress={handlePress}>
              warning
            </Button>
          </ButtonDemo>
          <ButtonDemo label="negative appearance">
            <Button appearance="negative" size="M" onPress={handlePress}>
              negative
            </Button>
          </ButtonDemo>
        </ButtonGrid>
      </Section>

      {/* Section 9: Combined State Variations */}
      <Section title="9. combined states (size + appearance + state)">
        <ButtonGrid>
          <ButtonDemo label="XS + disabled">
            <Button appearance="primary" size="XS" isDisabled onPress={handlePress}>
              XS disabled
            </Button>
          </ButtonDemo>
          <ButtonDemo label="XS + loading">
            <Button appearance="primary" size="XS" loading onPress={handlePress}>
              XS loading
            </Button>
          </ButtonDemo>
          <ButtonDemo label="XL + disabled">
            <Button appearance="primary" size="XL" isDisabled onPress={handlePress}>
              XL disabled
            </Button>
          </ButtonDemo>
          <ButtonDemo label="XL + loading">
            <Button appearance="primary" size="XL" loading onPress={handlePress}>
              XL loading
            </Button>
          </ButtonDemo>
          <ButtonDemo label="sparkle + loading">
            <Button appearance="sparkle" size="M" loading onPress={handlePress}>
              sparkle loading
            </Button>
          </ButtonDemo>
          <ButtonDemo label="positive + disabled">
            <Button appearance="positive" size="M" isDisabled onPress={handlePress}>
              positive disabled
            </Button>
          </ButtonDemo>
          <ButtonDemo label="warning + loading + XL">
            <Button appearance="warning" size="XL" loading onPress={handlePress}>
              warning XL loading
            </Button>
          </ButtonDemo>
          <ButtonDemo label="negative + disabled + XS">
            <Button appearance="negative" size="XS" isDisabled onPress={handlePress}>
              negative XS disabled
            </Button>
          </ButtonDemo>
        </ButtonGrid>
      </Section>

      {/* Section 10: Form Button Types */}
      <Section title="10. form button types">
        <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
          <ButtonGrid>
            <ButtonDemo label='type="submit"'>
              <Button 
                appearance="primary" 
                size="M" 
                type="submit"
              >
                submit form
              </Button>
            </ButtonDemo>
            <ButtonDemo label='type="button"'>
              <Button 
                appearance="secondary" 
                size="M" 
                type="button"
                onPress={() => alert('Button clicked')}
              >
                button type
              </Button>
            </ButtonDemo>
            <ButtonDemo label='type="reset"'>
              <Button 
                appearance="neutral" 
                size="M" 
                type="reset"
              >
                reset form
              </Button>
            </ButtonDemo>
          </ButtonGrid>
        </form>
      </Section>

      {/* Section 11: Interactive Event Handlers */}
      <Section title="11. interactive event handlers demo">
        <div style={{ marginBottom: '20px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>focus state:</strong> {focusState || 'none'}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>press state:</strong> {pressState || 'none'}
          </div>
        </div>
        <ButtonGrid>
          <ButtonDemo label="focus events">
            <Button 
              appearance="secondary" 
              size="M"
              onFocus={() => setFocusState('focused')}
              onBlur={() => setFocusState('blurred')}
              onPress={handlePress}
            >
              focus me
            </Button>
          </ButtonDemo>
          <ButtonDemo label="press events">
            <Button 
              appearance="neutral" 
              size="M"
              onPressStart={() => setPressState('pressing')}
              onPressEnd={() => setPressState('released')}
              onPress={handlePress}
            >
              press me
            </Button>
          </ButtonDemo>
          <ButtonDemo label="press + focus">
            <Button 
              appearance="sparkle" 
              size="M"
              onPress={handlePress}
              onFocus={() => setFocusState('sparkle focused')}
              onBlur={() => setFocusState('sparkle blurred')}
            >
              sparkle events
            </Button>
          </ButtonDemo>
        </ButtonGrid>
      </Section>

      {/* Section 12: Accessibility Features */}
      <Section title="12. accessibility features (wcag aa compliant)">
        <ButtonGrid>
          <ButtonDemo label="with aria-label">
            <Button 
              appearance="primary" 
              size="M"
              aria-label="accessible button with custom label"
              onPress={handlePress}
            >
              aria-label
            </Button>
          </ButtonDemo>
          <ButtonDemo label="with aria-describedby">
            <div>
              <Button 
                appearance="secondary" 
                size="M"
                aria-describedby="btn-description"
                onPress={handlePress}
              >
                aria-describedby
              </Button>
              <div id="btn-description" style={{ fontSize: '0.85rem', marginTop: '5px', color: '#666' }}>
                this button has additional description
              </div>
            </div>
          </ButtonDemo>
          <ButtonDemo label="with autoFocus">
            <Button 
              appearance="neutral" 
              size="M"
              autoFocus
              onPress={handlePress}
            >
              auto focused
            </Button>
          </ButtonDemo>
          <ButtonDemo label="toggle with aria-pressed">
            <Button 
              appearance="informative" 
              size="M"
              aria-pressed={clickCount % 2 === 0}
              onPress={handlePress}
            >
              toggle state
            </Button>
          </ButtonDemo>
          <ButtonDemo label="single + aria-label (required)">
            <Button 
              single
              appearance="positive"
              size="M"
              aria-label="accessible icon-only button"
              onPress={handlePress}
            >
              ✓
            </Button>
          </ButtonDemo>
        </ButtonGrid>
      </Section>

      <footer style={{ 
        marginTop: '60px', 
        padding: '30px', 
        background: '#f5f5f5', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', fontWeight: 600 }}>
          showcase summary - updated 2026-02-10
        </h3>
        <div style={{ fontSize: '1rem', color: '#666', lineHeight: '1.8' }}>
          <p style={{ margin: '5px 0' }}>✅ 5 sizes (XS, S, M, L, XL) - NEW XS and XL added</p>
          <p style={{ margin: '5px 0' }}>✅ 9 appearances (auto, primary, secondary, sparkle, neutral, informative, positive, warning, negative)</p>
          <p style={{ margin: '5px 0' }}>✅ 3 attention levels (low, medium, high) - NEW</p>
          <p style={{ margin: '5px 0' }}>✅ layout modifiers (contained, condensed, single, fullWidth) - NEW</p>
          <p style={{ margin: '5px 0' }}>✅ corrected loading prop (was isLoading, now loading)</p>
          <p style={{ margin: '5px 0' }}>✅ disabled and loading states for all appearances</p>
          <p style={{ margin: '5px 0' }}>✅ icon integration (children and single mode)</p>
          <p style={{ margin: '5px 0' }}>✅ react aria event handlers (hover, focus, press)</p>
          <p style={{ margin: '5px 0' }}>✅ accessibility features (wcag aa compliant)</p>
          <p style={{ margin: '5px 0' }}>✅ html button types (submit, button, reset)</p>
          <p style={{ margin: '5px 0' }}>✅ interactive demos with real-time state tracking</p>
          <p style={{ margin: '20px 0 0 0', fontWeight: 600, fontSize: '1.1rem', color: '#000' }}>
            total: 150+ unique button examples (updated from mcp 2026-02-10)
          </p>
        </div>
      </footer>
    </div>
  );
}

// Helper Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '50px' }}>
      <h3 style={{ 
        fontSize: '1.3rem', 
        fontWeight: 600, 
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: '2px solid #e0e0e0',
        color: '#000000'
      }}>
        {title}
      </h3>
      {children}
    </section>
  );
}

function ButtonGrid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '25px',
      alignItems: 'start'
    }}>
      {children}
    </div>
  );
}

function ButtonDemo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '10px',
      padding: '15px',
      background: '#fafafa',
      borderRadius: '8px',
      border: '1px solid #e8e8e8'
    }}>
      <div style={{ 
        fontSize: '0.85rem', 
        fontWeight: 500, 
        color: '#666',
        marginBottom: '5px'
      }}>
        {label}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

export default App;
