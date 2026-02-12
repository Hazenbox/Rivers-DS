import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import { icons, iconCategories, getIconsByCategory, getIconImportPath, getIconUsageCode, IconMeta } from '../config/icons';
import './IconsPage.css';

function IconsPage() {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<IconMeta | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [iconSize, setIconSize] = useState(24);

  const decodedCategory = category ? decodeURIComponent(category) : null;

  const fuse = useMemo(() => {
    return new Fuse(icons, {
      keys: ['name', 'keywords'],
      threshold: 0.3,
      includeScore: true,
    });
  }, []);

  const filteredIcons = useMemo(() => {
    let result = icons;

    if (decodedCategory) {
      result = getIconsByCategory(decodedCategory as typeof iconCategories[number]);
    }

    if (searchQuery) {
      const searchResults = fuse.search(searchQuery);
      const searchedNames = new Set(searchResults.map(r => r.item.name));
      result = result.filter(icon => searchedNames.has(icon.name));
    }

    return result;
  }, [decodedCategory, searchQuery, fuse]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleIconClick = (icon: IconMeta) => {
    setSelectedIcon(icon);
  };

  const closeIconDetail = () => {
    setSelectedIcon(null);
  };

  return (
    <div className="icons-page">
      <div className="icons-page-header">
        <h1 className="icons-page-title">
          {decodedCategory ? `${decodedCategory.toLowerCase()} icons` : 'icon library'}
        </h1>
        <p className="icons-page-desc">
          {decodedCategory 
            ? `Browse ${filteredIcons.length} icons in the ${decodedCategory.toLowerCase()} category.`
            : `Browse all ${icons.length}+ icons in the design system. Click any icon for details and code.`
          }
        </p>
      </div>

      <div className="icons-page-controls">
        <div className="icons-search-wrapper">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="search icons..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="icons-search-input"
          />
          {searchQuery && (
            <button 
              className="icons-search-clear"
              onClick={() => setSearchQuery('')}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M10 4L4 10M4 4L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        <div className="icons-size-control">
          <span className="icons-size-label">size:</span>
          <button 
            className={`icons-size-btn ${iconSize === 16 ? 'active' : ''}`}
            onClick={() => setIconSize(16)}
          >
            16
          </button>
          <button 
            className={`icons-size-btn ${iconSize === 24 ? 'active' : ''}`}
            onClick={() => setIconSize(24)}
          >
            24
          </button>
          <button 
            className={`icons-size-btn ${iconSize === 32 ? 'active' : ''}`}
            onClick={() => setIconSize(32)}
          >
            32
          </button>
        </div>
      </div>

      <div className="icons-category-filters">
        <Link 
          to="/icons" 
          className={`icons-category-btn ${!decodedCategory ? 'active' : ''}`}
        >
          all
        </Link>
        {iconCategories.map(cat => (
          <Link
            key={cat}
            to={`/icons/${encodeURIComponent(cat)}`}
            className={`icons-category-btn ${decodedCategory === cat ? 'active' : ''}`}
          >
            {cat.toLowerCase()}
          </Link>
        ))}
      </div>

      {filteredIcons.length === 0 ? (
        <div className="icons-empty">
          <p>no icons found matching "{searchQuery}"</p>
          <button onClick={() => setSearchQuery('')} className="icons-empty-btn">
            clear search
          </button>
        </div>
      ) : (
        <div className="icons-grid">
          {filteredIcons.map(icon => (
            <button
              key={icon.name}
              className={`icon-card ${selectedIcon?.name === icon.name ? 'selected' : ''}`}
              onClick={() => handleIconClick(icon)}
              title={icon.name}
            >
              <div className="icon-card-preview" style={{ fontSize: iconSize }}>
                <svg 
                  width={iconSize} 
                  height={iconSize} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Placeholder icon - in real app, render actual icon component */}
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21,15 16,10 5,21" />
                </svg>
              </div>
              <span className="icon-card-name">{icon.name.toLowerCase()}</span>
            </button>
          ))}
        </div>
      )}

      {selectedIcon && (
        <div className="icon-detail-overlay" onClick={closeIconDetail}>
          <div className="icon-detail-modal" onClick={e => e.stopPropagation()}>
            <button className="icon-detail-close" onClick={closeIconDetail}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="icon-detail-preview">
              <svg 
                width={64} 
                height={64} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21,15 16,10 5,21" />
              </svg>
            </div>

            <h2 className="icon-detail-name">{selectedIcon.name}</h2>
            
            <div className="icon-detail-keywords">
              {selectedIcon.keywords.map(keyword => (
                <span key={keyword} className="icon-detail-keyword">{keyword}</span>
              ))}
            </div>

            <div className="icon-detail-section">
              <h3 className="icon-detail-section-title">import</h3>
              <div className="icon-detail-code-block">
                <code>{getIconImportPath(selectedIcon.name)}</code>
                <button 
                  className="icon-detail-copy"
                  onClick={() => handleCopy(getIconImportPath(selectedIcon.name), 'import')}
                >
                  {copiedField === 'import' ? 'copied!' : 'copy'}
                </button>
              </div>
            </div>

            <div className="icon-detail-section">
              <h3 className="icon-detail-section-title">usage</h3>
              <div className="icon-detail-code-block">
                <code>{getIconUsageCode(selectedIcon.name)}</code>
                <button 
                  className="icon-detail-copy"
                  onClick={() => handleCopy(getIconUsageCode(selectedIcon.name), 'usage')}
                >
                  {copiedField === 'usage' ? 'copied!' : 'copy'}
                </button>
              </div>
            </div>

            <div className="icon-detail-sizes">
              <h3 className="icon-detail-section-title">sizes</h3>
              <div className="icon-detail-sizes-grid">
                {[16, 20, 24, 32, 48].map(size => (
                  <div key={size} className="icon-detail-size-item">
                    <svg 
                      width={size} 
                      height={size} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21,15 16,10 5,21" />
                    </svg>
                    <span>{size}px</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IconsPage;
