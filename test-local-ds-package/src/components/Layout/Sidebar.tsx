import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { componentCategories } from '../../config/components';
import { allTokenGroups } from '../../config/tokens';
import { iconCategories } from '../../config/icons';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavSection {
  title: string;
  basePath: string;
  items: { name: string; path: string }[];
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['components', 'tokens', 'icons']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const navSections: NavSection[] = [
    {
      title: 'components',
      basePath: '/components',
      items: [
        { name: 'all components', path: '/components' },
        ...componentCategories.map(cat => ({
          name: cat.toLowerCase(),
          path: `/components?category=${encodeURIComponent(cat)}`,
        })),
      ],
    },
    {
      title: 'tokens',
      basePath: '/tokens',
      items: [
        { name: 'all tokens', path: '/tokens' },
        ...allTokenGroups.map(group => ({
          name: group.name.toLowerCase(),
          path: `/tokens/${group.name.toLowerCase()}`,
        })),
      ],
    },
    {
      title: 'icons',
      basePath: '/icons',
      items: [
        { name: 'all icons', path: '/icons' },
        ...iconCategories.map(cat => ({
          name: cat.toLowerCase(),
          path: `/icons/${encodeURIComponent(cat)}`,
        })),
      ],
    },
  ];

  const isActiveLink = (path: string) => {
    if (path === '/components' && location.pathname === '/components' && !location.search) {
      return true;
    }
    if (path === '/tokens' && location.pathname === '/tokens') {
      return true;
    }
    if (path === '/icons' && location.pathname === '/icons' && !location.search) {
      return true;
    }
    return location.pathname + location.search === path;
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `sidebar-home-link ${isActive ? 'active' : ''}`}
            onClick={() => window.innerWidth < 768 && onClose()}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 6L8 2L14 6V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 14V9H10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            home
          </NavLink>

          {navSections.map(section => (
            <div key={section.title} className="sidebar-section">
              <button
                className={`sidebar-section-header ${expandedSections.includes(section.title) ? 'expanded' : ''}`}
                onClick={() => toggleSection(section.title)}
              >
                <span>{section.title}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="sidebar-chevron">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {expandedSections.includes(section.title) && (
                <ul className="sidebar-section-items">
                  {section.items.map(item => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        className={() => `sidebar-link ${isActiveLink(item.path) ? 'active' : ''}`}
                        onClick={() => window.innerWidth < 768 && onClose()}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-info">
            <span>@marcelinodzn/ds-react</span>
            <span className="sidebar-version">latest</span>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Sidebar;
