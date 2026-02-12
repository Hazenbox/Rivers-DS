import { useState, useMemo } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Fuse from 'fuse.js';
import { icons, iconCategories, getIconsByCategory, getIconImportPath, getIconUsageCode, IconMeta } from '../config/icons';
import { Text, SearchField, Badge, Button, Card, CardBody } from '@marcelinodzn/ds-react';

function IconsPage() {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<IconMeta | null>(null);
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>
          {decodedCategory ? `${decodedCategory.toLowerCase()} icons` : 'icon library'}
        </h1>
        <Text>
          {decodedCategory 
            ? `Browse ${filteredIcons.length} icons in the ${decodedCategory.toLowerCase()} category.`
            : `Browse all ${icons.length}+ icons in the design system. Click any icon for details and code.`
          }
        </Text>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
        <SearchField
          label="search"
          placeholder="search icons..."
          value={searchQuery}
          onChange={setSearchQuery}
          style={{ flex: 1, maxWidth: '400px' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Text>size:</Text>
          <Button size="S" appearance={iconSize === 16 ? 'primary' : undefined} onPress={() => setIconSize(16)}>16</Button>
          <Button size="S" appearance={iconSize === 24 ? 'primary' : undefined} onPress={() => setIconSize(24)}>24</Button>
          <Button size="S" appearance={iconSize === 32 ? 'primary' : undefined} onPress={() => setIconSize(32)}>32</Button>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <RouterLink to="/icons" style={{ textDecoration: 'none' }}>
          <Badge>all</Badge>
        </RouterLink>
        {iconCategories.map(cat => (
          <RouterLink
            key={cat}
            to={`/icons/${encodeURIComponent(cat)}`}
            style={{ textDecoration: 'none' }}
          >
            <Badge>{cat.toLowerCase()}</Badge>
          </RouterLink>
        ))}
      </div>

      {filteredIcons.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 20px' }}>
          <Text>no icons found matching "{searchQuery}"</Text>
          <Button onPress={() => setSearchQuery('')} style={{ marginTop: '16px' }}>
            clear search
          </Button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
          {filteredIcons.map(icon => (
            <Button key={icon.name} onPress={() => setSelectedIcon(icon)}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '8px' }}>
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
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21,15 16,10 5,21" />
                </svg>
                <Text style={{ fontSize: '11px', textAlign: 'center', wordBreak: 'break-word' }}>
                  {icon.name.toLowerCase()}
                </Text>
              </div>
            </Button>
          ))}
        </div>
      )}

      {selectedIcon && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          padding: '20px'
        }} onClick={() => setSelectedIcon(null)}>
          <div style={{ maxWidth: '600px', width: '100%' }} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <Card>
            <CardBody>
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', margin: '0 auto 24px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
                  <svg 
                    width={64} 
                    height={64} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21,15 16,10 5,21" />
                  </svg>
                </div>
                
                <h2 style={{ fontSize: '24px', fontWeight: 600, textAlign: 'center', marginBottom: '12px' }}>
                  {selectedIcon.name}
                </h2>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', marginBottom: '24px' }}>
                  {selectedIcon.keywords.map(keyword => (
                    <Badge key={keyword}>{keyword}</Badge>
                  ))}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>import</h3>
                  <Card>
                    <CardBody>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                        <code style={{ fontSize: '12px', flex: 1 }}>{getIconImportPath(selectedIcon.name)}</code>
                        <Button size="S" onPress={() => handleCopy(getIconImportPath(selectedIcon.name))}>
                          copy
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>usage</h3>
                  <Card>
                    <CardBody>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                        <code style={{ fontSize: '12px', flex: 1 }}>{getIconUsageCode(selectedIcon.name)}</code>
                        <Button size="S" onPress={() => handleCopy(getIconUsageCode(selectedIcon.name))}>
                          copy
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>sizes</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                    {[16, 20, 24, 32, 48].map(size => (
                      <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '8px', minWidth: '60px' }}>
                        <svg 
                          width={size} 
                          height={size} 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21,15 16,10 5,21" />
                        </svg>
                        <Text>{size}px</Text>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default IconsPage;
