import { useState } from 'react';
import { Button } from '@marcelinodzn/ds-react';
import { Outlet } from 'react-router-dom';
import { SideNav } from './SideNav';

export function AppLayout() {
  const [navOpen, setNavOpen] = useState(true);
  
  return (
    <div className="app-layout">
      {navOpen && <SideNav />}
      <div className="main-content">
        <Button 
          single 
          appearance="neutral"
          size="M"
          onPress={() => setNavOpen(!navOpen)}
          aria-label="toggle navigation"
        >
          {navOpen ? '✕' : '☰'}
        </Button>
        <Outlet />
      </div>
    </div>
  );
}
