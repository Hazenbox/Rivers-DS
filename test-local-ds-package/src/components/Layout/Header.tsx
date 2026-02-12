import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@marcelinodzn/ds-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

function Header({ theme, onToggleTheme, onToggleSidebar, sidebarOpen }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/components?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      borderBottom: '1px solid #e2e4e8',
      backgroundColor: '#ffffff',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button 
          contained={false}
          onPress={onToggleSidebar}
          aria-label={sidebarOpen ? 'close sidebar' : 'open sidebar'}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {sidebarOpen ? (
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            ) : (
              <>
                <path d="M3 5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </Button>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: 'white',
            fontWeight: 700,
            fontSize: '12px',
            borderRadius: '8px'
          }}>DS</div>
          <Text>component viewer</Text>
        </a>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }}>
        <Button 
          onPress={() => setSearchOpen(true)}
          style={{ width: '100%', maxWidth: '400px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <Text>search...</Text>
            <span style={{ marginLeft: 'auto', fontSize: '12px' }}>⌘K</span>
          </div>
        </Button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Button 
          contained={false}
          onPress={onToggleTheme}
          aria-label={`switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3V2M10 18V17M17 10H18M2 10H3M15.5 4.5L16.5 3.5M3.5 16.5L4.5 15.5M15.5 15.5L16.5 16.5M3.5 3.5L4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M17.5 11.5C17.5 15.366 14.366 18.5 10.5 18.5C6.634 18.5 3.5 15.366 3.5 11.5C3.5 7.634 6.634 4.5 10.5 4.5C10.834 4.5 11.16 4.526 11.48 4.574C10.282 5.802 9.5 7.516 9.5 9.5C9.5 13.366 12.634 16.5 16.5 16.5C16.838 16.5 17.172 16.474 17.5 16.426V11.5Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          )}
        </Button>
        <a href="https://www.npmjs.com/package/@marcelinodzn/ds-react" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <Text>npm</Text>
        </a>
      </div>

      {searchOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '100px',
          zIndex: 200
        }} onClick={() => setSearchOpen(false)}>
          <div style={{
            width: '100%',
            maxWidth: '560px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e4e8',
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden'
          }} onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSearch}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                borderBottom: '1px solid #e2e4e8'
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="search components, tokens, icons..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'none',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                <Text>esc</Text>
              </div>
            </form>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 20px',
              backgroundColor: '#f8f9fa',
              fontSize: '12px'
            }}>
              <Text>navigate with arrow keys</Text>
              <Text>press enter to search</Text>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
