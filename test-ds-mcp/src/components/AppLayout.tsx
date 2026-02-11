import { useState } from 'react';
import { Button, Text } from '@marcelinodzn/ds-react';
import { Outlet } from 'react-router-dom';
import { SideNav } from './SideNav';

export function AppLayout() {
  const [navOpen, setNavOpen] = useState(true);
  
  return (
    <Text as="div">
      <Text as="div">
        <Text as="div">
          <Text as="div">
            <Text as="div">
              <Button 
                single 
                appearance="neutral"
                size="M"
                onPress={() => setNavOpen(!navOpen)}
                aria-label="toggle navigation"
              >
                {navOpen ? '✕' : '☰'}
              </Button>
            </Text>
            <Text as="div">
              <Text as="div">
                {navOpen && <SideNav />}
                <Text as="div">
                  <Outlet />
                </Text>
              </Text>
            </Text>
          </Text>
        </Text>
      </Text>
    </Text>
  );
}
