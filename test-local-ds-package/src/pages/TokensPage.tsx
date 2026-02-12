import { useState, useMemo } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { allTokenGroups, getTokenGroupByName, TokenGroup, TokenCategory, Token } from '../config/tokens';
import { Text, SearchField, Badge, Card, CardBody, Button } from '@marcelinodzn/ds-react';

function TokensPage() {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  const selectedGroup = category ? getTokenGroupByName(category) : null;

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
  };

  const renderTokenPreview = (token: Token, groupName: string) => {
    if (groupName === 'Colors') {
      return (
        <div style={{ 
          width: '48px', 
          height: '48px', 
          backgroundColor: token.value,
          borderRadius: '8px',
          border: '1px solid #e2e4e8'
        }} />
      );
    }
    
    if (groupName === 'Spacing') {
      const numericValue = parseInt(token.value);
      if (!isNaN(numericValue) && numericValue > 0 && numericValue <= 100) {
        return (
          <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', backgroundColor: '#f8f9fa', borderRadius: '6px', padding: '4px' }}>
            <div style={{ height: '100%', width: `${Math.min(numericValue, 100)}px`, backgroundColor: '#6366f1', borderRadius: '4px', minWidth: '4px' }} />
          </div>
        );
      }
    }

    if (groupName === 'Typography' && token.name.includes('Text/')) {
      return <span style={{ fontSize: token.value }}>Aa</span>;
    }

    if (groupName === 'Shape') {
      return <div style={{ width: '48px', height: '48px', backgroundColor: '#6366f1', opacity: 0.3, borderRadius: token.value }} />;
    }

    return null;
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>
          {selectedGroup ? `${selectedGroup.name.toLowerCase()} tokens` : 'design tokens'}
        </h1>
        <Text>
          {selectedGroup 
            ? selectedGroup.description 
            : `Browse all ${totalTokens} design tokens organized by category.`
          }
        </Text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        <SearchField
          label="search"
          placeholder="search tokens..."
          value={searchQuery}
          onChange={setSearchQuery}
          style={{ maxWidth: '400px' }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <RouterLink to="/tokens" style={{ textDecoration: 'none' }}>
            <Badge>all</Badge>
          </RouterLink>
          {allTokenGroups.map(group => (
            <RouterLink
              key={group.name}
              to={`/tokens/${group.name.toLowerCase()}`}
              style={{ textDecoration: 'none' }}
            >
              <Badge>{group.name.toLowerCase()}</Badge>
            </RouterLink>
          ))}
        </div>
      </div>

      {filteredGroups.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 20px' }}>
          <Text>no tokens found matching "{searchQuery}"</Text>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {filteredGroups.map(group => (
            <div key={group.name}>
              {!selectedGroup && (
                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid #e2e4e8' }}>
                  {group.name.toLowerCase()}
                </h2>
              )}
              
              {group.categories.map(cat => (
                <div key={cat.name} style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>{cat.name.toLowerCase()}</h3>
                  <Text>{cat.description}</Text>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px', marginTop: '16px' }}>
                    {cat.tokens.map(token => (
                      <Card key={token.name}>
                        <CardBody>
                          <div style={{ display: 'flex', gap: '12px', padding: '8px' }}>
                            <div style={{ flexShrink: 0, width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {renderTokenPreview(token, group.name)}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <Button contained={false} size="S" onPress={() => handleCopyToken(token, 'name')}>
                                <Text>{token.name}</Text>
                              </Button>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                                <Button size="S" onPress={() => handleCopyToken(token, 'value')}>
                                  <code style={{ fontSize: '11px' }}>{token.value}</code>
                                </Button>
                                {token.cssVariable && (
                                  <Button size="S" onPress={() => handleCopyToken(token, 'css')}>
                                    <code style={{ fontSize: '11px' }}>{token.cssVariable}</code>
                                  </Button>
                                )}
                              </div>
                              {token.description && <Text style={{ fontSize: '12px', marginTop: '4px' }}>{token.description}</Text>}
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TokensPage;
