import { Text, Button } from '@marcelinodzn/ds-react';
import { Link } from 'react-router-dom';

export function ComponentsOverview() {
  return (
    <div className="vertical-stack">
      <div className="header">
        <Text as="h1" size="2XL" weight="high" align="center">
          jio design system components
        </Text>
        <Text as="h2" size="XL" weight="medium" color="medium" align="center">
          7 components · 1,000+ variants
        </Text>
      </div>

      {/* Statistics */}
      <div className="section">
        <Text as="h2" size="XL" weight="high">
          component categories
        </Text>
        <div className="variant-grid" data-columns="2">
          <div className="stat-card">
            <Text size="2XL" weight="high">3</Text>
            <Text size="M" weight="medium">form components</Text>
            <Text size="S" color="medium">button, input, textarea</Text>
          </div>
          <div className="stat-card">
            <Text size="2XL" weight="high">4</Text>
            <Text size="M" weight="medium">display components</Text>
            <Text size="S" color="medium">badge, avatar, card, divider</Text>
          </div>
        </div>
      </div>

      {/* Top Components by Variant Count */}
      <div className="section">
        <Text as="h2" size="XL" weight="high">
          most comprehensive showcases
        </Text>
        <div className="variant-grid" data-columns="3">
          <Link to="/card">
            <Button appearance="primary" fullWidth size="M">
              card · 300+ variants
            </Button>
          </Link>
          <Link to="/input">
            <Button appearance="primary" fullWidth size="M">
              input · 270+ variants
            </Button>
          </Link>
          <Link to="/button">
            <Button appearance="primary" fullWidth size="M">
              button · 150+ variants
            </Button>
          </Link>
          <Link to="/textarea">
            <Button appearance="primary" fullWidth size="M">
              textarea · 140+ variants
            </Button>
          </Link>
          <Link to="/badge">
            <Button appearance="primary" fullWidth size="M">
              badge · 135+ variants
            </Button>
          </Link>
          <Link to="/slider">
            <Button appearance="primary" fullWidth size="M">
              slider · 120+ variants
            </Button>
          </Link>
          <Link to="/tooltip">
            <Button appearance="primary" fullWidth size="M">
              tooltip · 96+ variants
            </Button>
          </Link>
          <Link to="/avatar">
            <Button appearance="primary" fullWidth size="M">
              avatar · 60+ variants
            </Button>
          </Link>
        </div>
      </div>

      {/* Form Components Section */}
      <div className="section">
        <Text as="h2" size="XL" weight="high">
          form components
        </Text>
        <div className="variant-grid" data-columns="3">
          <Link to="/button">
            <Button appearance="neutral" fullWidth size="M">button</Button>
          </Link>
          <Link to="/input">
            <Button appearance="neutral" fullWidth size="M">input</Button>
          </Link>
          <Link to="/textarea">
            <Button appearance="neutral" fullWidth size="M">textarea</Button>
          </Link>
        </div>
      </div>

      {/* Display Components Section */}
      <div className="section">
        <Text as="h2" size="XL" weight="high">
          display components
        </Text>
        <div className="variant-grid" data-columns="4">
          <Link to="/badge">
            <Button appearance="neutral" fullWidth size="M">badge</Button>
          </Link>
          <Link to="/avatar">
            <Button appearance="neutral" fullWidth size="M">avatar</Button>
          </Link>
          <Link to="/card">
            <Button appearance="neutral" fullWidth size="M">card</Button>
          </Link>
          <Link to="/divider">
            <Button appearance="neutral" fullWidth size="M">divider</Button>
          </Link>
        </div>
      </div>

      {/* Design Tokens */}
      <div className="section">
        <Text as="h2" size="XL" weight="high">
          design tokens
        </Text>
        <div className="variant-grid" data-columns="4">
          <Link to="/tokens">
            <Button appearance="secondary" fullWidth size="M">overview</Button>
          </Link>
          <Link to="/tokens/colors">
            <Button appearance="secondary" fullWidth size="M">colors</Button>
          </Link>
          <Link to="/tokens/spacing">
            <Button appearance="secondary" fullWidth size="M">spacing</Button>
          </Link>
          <Link to="/tokens/typography">
            <Button appearance="secondary" fullWidth size="M">typography</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
