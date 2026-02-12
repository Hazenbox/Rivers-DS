import { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link as RouterLink } from 'react-router-dom';
import { components, componentCategories, getComponentByName, getComponentsByCategory, ComponentMeta } from '../config/components';
import ComponentDemo from '../components/ComponentViewer/ComponentDemo';
import { Text, SearchField, Badge, Card, CardBody } from '@marcelinodzn/ds-react';

function ComponentPage() {
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const categoryFilter = searchParams.get('category');

  const selectedComponent = name ? getComponentByName(name) : null;

  const filteredComponents = useMemo(() => {
    let result = components;
    
    if (categoryFilter) {
      result = getComponentsByCategory(categoryFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [categoryFilter, searchQuery]);

  const groupedComponents = useMemo(() => {
    const groups: Record<string, ComponentMeta[]> = {};
    filteredComponents.forEach(comp => {
      if (!groups[comp.category]) {
        groups[comp.category] = [];
      }
      groups[comp.category].push(comp);
    });
    return groups;
  }, [filteredComponents]);

  if (selectedComponent) {
    return <ComponentDemo component={selectedComponent} />;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>
          {categoryFilter ? `${categoryFilter.toLowerCase()} components` : 'all components'}
        </h1>
        <Text>
          {categoryFilter 
            ? `Browse ${filteredComponents.length} ${categoryFilter.toLowerCase()} components.`
            : `Browse all ${components.length} components in the design system.`
          }
        </Text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        <SearchField 
          label="search"
          placeholder="search components..."
          value={searchQuery}
          onChange={setSearchQuery}
          style={{ maxWidth: '400px' }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <RouterLink to="/components" style={{ textDecoration: 'none' }}>
            <Badge>{!categoryFilter ? 'all' : 'all'}</Badge>
          </RouterLink>
          {componentCategories.map(category => (
            <RouterLink
              key={category}
              to={`/components?category=${encodeURIComponent(category)}`}
              style={{ textDecoration: 'none' }}
            >
              <Badge>{category.toLowerCase()}</Badge>
            </RouterLink>
          ))}
        </div>
      </div>

      {filteredComponents.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 20px' }}>
          <Text>no components found matching "{searchQuery}"</Text>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {Object.entries(groupedComponents).map(([category, comps]) => (
            <div key={category}>
              <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #e2e4e8' }}>
                {category.toLowerCase()}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {comps.map(comp => (
                  <RouterLink 
                    key={comp.name} 
                    to={`/components/${comp.name.toLowerCase()}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Card>
                      <CardBody>
                        <div style={{ padding: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <h4 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>{comp.name.toLowerCase()}</h4>
                            <Badge>{comp.category.toLowerCase()}</Badge>
                          </div>
                          <Text>{comp.description}</Text>
                          <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                            <Text>{comp.props.length} props</Text>
                            <Text>{comp.examples.length} examples</Text>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </RouterLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComponentPage;
