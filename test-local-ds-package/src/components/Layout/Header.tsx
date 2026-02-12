import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

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
    <header className="header">
      <div className="header-left">
        <button 
          className="header-menu-btn" 
          onClick={onToggleSidebar}
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
        </button>
        <a href="/" className="header-logo">
          <span className="header-logo-icon">DS</span>
          <span className="header-logo-text">component viewer</span>
        </a>
      </div>

      <div className="header-center">
        <button 
          className="header-search-trigger"
          onClick={() => setSearchOpen(true)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>search...</span>
          <kbd>
            <span className="kbd-meta">⌘</span>K
          </kbd>
        </button>
      </div>

      <div className="header-right">
        <button 
          className="header-theme-btn"
          onClick={onToggleTheme}
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
        </button>
        <a 
          href="https://www.npmjs.com/package/@marcelinodzn/ds-react" 
          target="_blank" 
          rel="noopener noreferrer"
          className="header-link"
        >
          npm
        </a>
      </div>

      {searchOpen && (
        <div className="search-modal-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-modal" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSearch}>
              <div className="search-modal-input-wrapper">
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
                  className="search-modal-input"
                />
                <kbd className="search-modal-kbd">esc</kbd>
              </div>
            </form>
            <div className="search-modal-footer">
              <span>navigate with arrow keys</span>
              <span>press enter to search</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
