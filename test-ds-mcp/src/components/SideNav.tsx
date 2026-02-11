import { Text, Button } from '@marcelinodzn/ds-react';
import { Link, useLocation } from 'react-router-dom';

export function SideNav() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="side-nav">
      <Text as="h1" size="XL" weight="high">
        jio design system
      </Text>
      
      <div className="side-nav-section">
        <Text size="M" weight="high">
          components
        </Text>
        
        {/* Form Components */}
        <div className="side-nav-subsection">
          <Text size="XS" weight="medium" color="medium">
            form components (3)
          </Text>
          <Link to="/button">
            <Button appearance={isActive('/button') ? 'primary' : 'neutral'} fullWidth size="S">
              button
            </Button>
          </Link>
          <Link to="/input">
            <Button appearance={isActive('/input') ? 'primary' : 'neutral'} fullWidth size="S">
              input
            </Button>
          </Link>
          <Link to="/textarea">
            <Button appearance={isActive('/textarea') ? 'primary' : 'neutral'} fullWidth size="S">
              textarea
            </Button>
          </Link>
        </div>
        
        {/* Display Components */}
        <div className="side-nav-subsection">
          <Text size="XS" weight="medium" color="medium">
            display components (4)
          </Text>
          <Link to="/badge">
            <Button appearance={isActive('/badge') ? 'primary' : 'neutral'} fullWidth size="S">
              badge
            </Button>
          </Link>
          <Link to="/avatar">
            <Button appearance={isActive('/avatar') ? 'primary' : 'neutral'} fullWidth size="S">
              avatar
            </Button>
          </Link>
          <Link to="/card">
            <Button appearance={isActive('/card') ? 'primary' : 'neutral'} fullWidth size="S">
              card
            </Button>
          </Link>
          <Link to="/divider">
            <Button appearance={isActive('/divider') ? 'primary' : 'neutral'} fullWidth size="S">
              divider
            </Button>
          </Link>
        </div>
        
      </div>
      
      <div className="side-nav-section">
        <Text size="S" weight="medium" color="medium">
          design tokens
        </Text>
        <Link to="/tokens">
          <Button 
            appearance={isActive('/tokens') ? 'primary' : 'neutral'}
            fullWidth
            size="S"
          >
            overview
          </Button>
        </Link>
        <Link to="/tokens/colors">
          <Button 
            appearance={isActive('/tokens/colors') ? 'primary' : 'neutral'}
            fullWidth
            size="S"
          >
            colors
          </Button>
        </Link>
        <Link to="/tokens/spacing">
          <Button 
            appearance={isActive('/tokens/spacing') ? 'primary' : 'neutral'}
            fullWidth
            size="S"
          >
            spacing
          </Button>
        </Link>
        <Link to="/tokens/typography">
          <Button 
            appearance={isActive('/tokens/typography') ? 'primary' : 'neutral'}
            fullWidth
            size="S"
          >
            typography
          </Button>
        </Link>
      </div>
    </div>
  );
}
