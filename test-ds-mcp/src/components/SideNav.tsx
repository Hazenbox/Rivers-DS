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
        <Text size="S" weight="medium" color="medium">
          components
        </Text>
        <Link to="/button">
          <Button 
            appearance={isActive('/button') ? 'primary' : 'neutral'}
            fullWidth
            size="M"
          >
            button
          </Button>
        </Link>
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
