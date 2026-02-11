import { Text, Button } from '@marcelinodzn/ds-react';
import { Link, useLocation } from 'react-router-dom';

export function SideNav() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <Text as="div">
      <Text as="div">
        <Text as="h1" size="XL" weight="high">
          jio design system
        </Text>
        
        <Text as="div">
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
        </Text>
        
        <Text as="div">
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
        </Text>
      </Text>
    </Text>
  );
}
