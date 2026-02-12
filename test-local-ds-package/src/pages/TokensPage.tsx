import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allTokenGroups, getTokenGroupByName, TokenGroup, TokenCategory, Token } from '../config/tokens';
import './TokensPage.css';

function TokensPage() {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const selectedGroup = category ? getTokenGroupByName(category) : null;

  const handleCopyToken = (token: Token, type: 'name' | 'value' | 'css') => {
    let text = '';
    switch (type) {
      case 'name':
        text = token.name;
        break;
      case 'value':
        text = token.value;
        break;
      case 'css':
        text = token.cssVariable ? `var(${token.cssVariable})` : token.value;
        break;
    }
    navigator.clipboard.writeText(text);
    setCopiedToken(token.name);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const filteredGroups = useMemo(() => {
    if (!searchQuery) return selectedGroup ? [selectedGroup] : allTokenGroups;

    const query = searchQuery.toLowerCase();
    const groups: TokenGroup[] = [];

    (selectedGroup ? [selectedGroup] : allTokenGroups).forEach(group => {
      const filteredCategories: TokenCategory[] = [];
      
      group.categories.forEach(cat => {
        const filteredTokens = cat.tokens.filter(token =>
          token.name.toLowerCase().includes(query) ||
          token.value.toLowerCase().includes(query) ||
          (token.description && token.description.toLowerCase().includes(query))
        );
        
        if (filteredTokens.length > 0) {
          filteredCategories.push({ ...cat, tokens: filteredTokens });
        }
      });

      if (filteredCategories.length > 0) {
        groups.push({ ...group, categories: filteredCategories });
      }
    });

    return groups;
  }, [selectedGroup, searchQuery]);

  const totalTokens = useMemo(() => {
    return filteredGroups.reduce((acc, group) =>
      acc + group.categories.reduce((catAcc, cat) => catAcc + cat.tokens.length, 0), 0
    );
  }, [filteredGroups]);

  const renderTokenPreview = (token: Token, groupName: string) => {
    if (groupName === 'Colors') {
      return (
        <div 
          className="token-color-preview" 
          style={{ backgroundColor: token.value }}
          title={token.value}
        />
      );
    }
    
    if (groupName === 'Spacing') {
      const numericValue = parseInt(token.value);
      if (!isNaN(numericValue) && numericValue > 0 && numericValue <= 100) {
        return (
          <div className="token-spacing-preview">
            <div 
              className="token-spacing-bar" 
              style={{ width: `${Math.min(numericValue, 100)}px` }}
            />
          </div>
        );
      }
    }

    if (groupName === 'Typography') {
      if (token.name.includes('Text/') && !token.name.includes('Text/High') && !token.name.includes('Text/Medium') && !token.name.includes('Text/Low')) {
        return (
          <span 
            className="token-typography-preview" 
            style={{ fontSize: token.value }}
          >
            Aa
          </span>
        );
      }
      if (token.name.includes('Weight/')) {
        return (
          <span 
            className="token-typography-preview" 
            style={{ fontWeight: token.value }}
          >
            Aa
          </span>
        );
      }
    }

    if (groupName === 'Shape') {
      return (
        <div 
          className="token-shape-preview" 
          style={{ borderRadius: token.value }}
        />
      );
    }

    if (groupName === 'Surface' && token.name.includes('Shadow')) {
      return (
        <div 
          className="token-shadow-preview" 
          style={{ boxShadow: token.value }}
        />
      );
    }

    return null;
  };

  return (
    <div className="tokens-page">
      <div className="tokens-page-header">
        <h1 className="tokens-page-title">
          {selectedGroup ? `${selectedGroup.name.toLowerCase()} tokens` : 'design tokens'}
        </h1>
        <p className="tokens-page-desc">
          {selectedGroup 
            ? selectedGroup.description 
            : `Browse all ${totalTokens} design tokens organized by category.`
          }
        </p>
      </div>

      <div className="tokens-page-controls">
        <div className="tokens-search-wrapper">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="search tokens..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="tokens-search-input"
          />
        </div>
        <div className="tokens-category-filters">
          <Link 
            to="/tokens" 
            className={`tokens-category-btn ${!category ? 'active' : ''}`}
          >
            all
          </Link>
          {allTokenGroups.map(group => (
            <Link
              key={group.name}
              to={`/tokens/${group.name.toLowerCase()}`}
              className={`tokens-category-btn ${category === group.name.toLowerCase() ? 'active' : ''}`}
            >
              {group.name.toLowerCase()}
            </Link>
          ))}
        </div>
      </div>

      {filteredGroups.length === 0 ? (
        <div className="tokens-empty">
          <p>no tokens found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="tokens-groups">
          {filteredGroups.map(group => (
            <div key={group.name} className="tokens-group">
              {!selectedGroup && (
                <h2 className="tokens-group-title">{group.name.toLowerCase()}</h2>
              )}
              
              {group.categories.map(cat => (
                <div key={cat.name} className="tokens-category">
                  <h3 className="tokens-category-title">{cat.name.toLowerCase()}</h3>
                  <p className="tokens-category-desc">{cat.description}</p>
                  
                  <div className="tokens-grid">
                    {cat.tokens.map(token => (
                      <div key={token.name} className="token-card">
                        <div className="token-card-preview">
                          {renderTokenPreview(token, group.name)}
                        </div>
                        <div className="token-card-content">
                          <button 
                            className="token-card-name"
                            onClick={() => handleCopyToken(token, 'name')}
                            title="click to copy token name"
                          >
                            {token.name}
                            {copiedToken === token.name && (
                              <span className="token-copied">copied!</span>
                            )}
                          </button>
                          <div className="token-card-values">
                            <button 
                              className="token-value"
                              onClick={() => handleCopyToken(token, 'value')}
                              title="click to copy value"
                            >
                              {token.value}
                            </button>
                            {token.cssVariable && (
                              <button 
                                className="token-css-var"
                                onClick={() => handleCopyToken(token, 'css')}
                                title="click to copy css variable"
                              >
                                {token.cssVariable}
                              </button>
                            )}
                          </div>
                          {token.description && (
                            <p className="token-card-desc">{token.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {copiedToken && (
        <div className="tokens-toast">copied to clipboard</div>
      )}
    </div>
  );
}

export default TokensPage;
