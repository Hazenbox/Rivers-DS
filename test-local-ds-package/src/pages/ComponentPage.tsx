import { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { components, componentCategories, getComponentByName, getComponentsByCategory, ComponentMeta } from '../config/components';
import ComponentDemo from '../components/ComponentViewer/ComponentDemo';
import './ComponentPage.css';

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
    <div className="component-page">
      <div className="component-page-header">
        <h1 className="component-page-title">
          {categoryFilter ? `${categoryFilter.toLowerCase()} components` : 'all components'}
        </h1>
        <p className="component-page-desc">
          {categoryFilter 
            ? `Browse ${filteredComponents.length} ${categoryFilter.toLowerCase()} components.`
            : `Browse all ${components.length} components in the design system.`
          }
        </p>
      </div>

      <div className="component-page-controls">
        <div className="component-search-wrapper">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="search components..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="component-search-input"
          />
        </div>
        <div className="component-category-filters">
          <Link 
            to="/components" 
            className={`component-category-btn ${!categoryFilter ? 'active' : ''}`}
          >
            all
          </Link>
          {componentCategories.map(category => (
            <Link
              key={category}
              to={`/components?category=${encodeURIComponent(category)}`}
              className={`component-category-btn ${categoryFilter === category ? 'active' : ''}`}
            >
              {category.toLowerCase()}
            </Link>
          ))}
        </div>
      </div>

      {filteredComponents.length === 0 ? (
        <div className="component-empty">
          <p>no components found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="component-groups">
          {Object.entries(groupedComponents).map(([category, comps]) => (
            <div key={category} className="component-group">
              <h2 className="component-group-title">{category.toLowerCase()}</h2>
              <div className="component-grid">
                {comps.map(comp => (
                  <Link 
                    key={comp.name} 
                    to={`/components/${comp.name.toLowerCase()}`}
                    className="component-card"
                  >
                    <div className="component-card-header">
                      <span className="component-card-name">{comp.name.toLowerCase()}</span>
                      <span className="component-card-category">{comp.category.toLowerCase()}</span>
                    </div>
                    <p className="component-card-desc">{comp.description}</p>
                    <div className="component-card-meta">
                      <span>{comp.props.length} props</span>
                      <span>{comp.examples.length} examples</span>
                    </div>
                  </Link>
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
