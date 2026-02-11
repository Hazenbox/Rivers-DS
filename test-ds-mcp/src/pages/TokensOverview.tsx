import { Text, Button } from '@marcelinodzn/ds-react';
import { Link } from 'react-router-dom';

export function TokensOverview() {
  return (
    <div className="vertical-stack">
      <Text as="h1" size="2XL" weight="high">
        design tokens
      </Text>
      
      <Text size="L" weight="medium" color="medium">
        explore all design tokens from the jio design system
      </Text>
      
      <div className="vertical-stack">
        <Text as="h2" size="XL" weight="high">
          token categories
        </Text>
        
        <div className="vertical-stack">
          <Link to="/tokens/colors">
            <Button appearance="primary" size="L" fullWidth>
              color tokens
            </Button>
          </Link>
          <Text size="S" weight="medium" color="medium">
            text, surface, stroke, and semantic color tokens
          </Text>
        </div>
        
        <div className="vertical-stack">
          <Link to="/tokens/spacing">
            <Button appearance="primary" size="L" fullWidth>
              spacing tokens
            </Button>
          </Link>
          <Text size="S" weight="medium" color="medium">
            spacing scale and density variants
          </Text>
        </div>
        
        <div className="vertical-stack">
          <Link to="/tokens/typography">
            <Button appearance="primary" size="L" fullWidth>
              typography tokens
            </Button>
          </Link>
          <Text size="S" weight="medium" color="medium">
            font sizes, weights, and line heights
          </Text>
        </div>
      </div>
    </div>
  );
}
