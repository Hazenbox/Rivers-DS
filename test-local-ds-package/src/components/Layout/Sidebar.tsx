import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { componentCategories } from '../../config/components';
import { allTokenGroups } from '../../config/tokens';
import { iconCategories } from '../../config/icons';
import { Button, Text } from '@marcelinodzn/ds-react';

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
      <aside style={{
        position: 'fixed',
        top: '60px',
        left: 0,
        bottom: 0,
        width: '280px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e4e8',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        overflowY: 'auto',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease'
      }}>
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          <NavLink 
            to="/" 
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 12px',
              marginBottom: '8px',
              textDecoration: 'none',
              borderRadius: '8px',
              backgroundColor: isActive ? '#eef2ff' : 'transparent',
              color: isActive ? '#6366f1' : '#4a4a68'
            })}
            onClick={() => window.innerWidth < 768 && onClose()}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 6L8 2L14 6V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 14V9H10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <Text>home</Text>
          </NavLink>

          {navSections.map(section => (
            <div key={section.title} style={{ marginBottom: '4px' }}>
              <Button
                contained={false}
                onPress={() => toggleSection(section.title)}
                style={{ width: '100%', justifyContent: 'space-between', textTransform: 'uppercase', fontSize: '13px', fontWeight: 600 }}
              >
                <Text>{section.title}</Text>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{
                  transform: expandedSections.includes(section.title) ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
              {expandedSections.includes(section.title) && (
                <div style={{ padding: '4px 0 8px 0' }}>
                  {section.items.map(item => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      style={() => ({
                        display: 'block',
                        padding: '8px 12px 8px 24px',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        backgroundColor: isActiveLink(item.path) ? '#eef2ff' : 'transparent',
                        color: isActiveLink(item.path) ? '#6366f1' : '#4a4a68'
                      })}
                      onClick={() => window.innerWidth < 768 && onClose()}
                    >
                      <Text>{item.name}</Text>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid #e2e4e8' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>@marcelinodzn/ds-react</Text>
            <Text>latest</Text>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40,
            display: window.innerWidth < 768 ? 'block' : 'none'
          }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Sidebar;
