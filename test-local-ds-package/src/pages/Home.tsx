import { Link } from 'react-router-dom';
import { components, componentCategories } from '../config/components';
import { allTokenGroups } from '../config/tokens';
import { icons, iconCategories } from '../config/icons';
import './Home.css';

function Home() {
  const componentCount = components.length;
  const tokenCount = allTokenGroups.reduce((acc, group) => 
    acc + group.categories.reduce((catAcc, cat) => catAcc + cat.tokens.length, 0), 0
  );
  const iconCount = icons.length;

  const stats = [
    { label: 'components', value: componentCount, path: '/components', color: '#6366f1' },
    { label: 'tokens', value: tokenCount, path: '/tokens', color: '#22c55e' },
    { label: 'icons', value: `${iconCount}+`, path: '/icons', color: '#f59e0b' },
  ];

  const quickLinks = [
    { category: 'Form', items: ['Button', 'Input', 'Select', 'Checkbox'] },
    { category: 'Navigation', items: ['Tabs', 'Breadcrumbs', 'Menu', 'Link'] },
    { category: 'Feedback', items: ['Modal', 'Tooltip', 'ProgressBar', 'Badge'] },
    { category: 'Layout', items: ['Card', 'Table', 'GridList', 'Separator'] },
  ];

  return (
    <div className="home">
      <section className="home-hero">
        <h1 className="home-title">jio design system</h1>
        <p className="home-subtitle">
          A comprehensive collection of components, tokens, and icons for building consistent user interfaces.
        </p>
        <div className="home-actions">
          <Link to="/components" className="home-btn home-btn-primary">
            browse components
          </Link>
          <a 
            href="https://www.npmjs.com/package/@marcelinodzn/ds-react" 
            target="_blank" 
            rel="noopener noreferrer"
            className="home-btn home-btn-secondary"
          >
            npm install
          </a>
        </div>
      </section>

      <section className="home-stats">
        {stats.map(stat => (
          <Link key={stat.label} to={stat.path} className="home-stat-card">
            <span className="home-stat-value" style={{ color: stat.color }}>
              {stat.value}
            </span>
            <span className="home-stat-label">{stat.label}</span>
          </Link>
        ))}
      </section>

      <section className="home-section">
        <h2 className="home-section-title">quick start</h2>
        <div className="home-code-block">
          <div className="home-code-header">
            <span>installation</span>
            <button 
              className="home-code-copy"
              onClick={() => navigator.clipboard.writeText('npm install @marcelinodzn/ds-react @marcelinodzn/ds-tokens')}
            >
              copy
            </button>
          </div>
          <pre className="home-code">
            <code>npm install @marcelinodzn/ds-react @marcelinodzn/ds-tokens</code>
          </pre>
        </div>
        <div className="home-code-block">
          <div className="home-code-header">
            <span>usage</span>
            <button 
              className="home-code-copy"
              onClick={() => navigator.clipboard.writeText(`import { Button } from '@marcelinodzn/ds-react';\n\nfunction App() {\n  return <Button>click me</Button>;\n}`)}
            >
              copy
            </button>
          </div>
          <pre className="home-code">
            <code>{`import { Button } from '@marcelinodzn/ds-react';

function App() {
  return <Button>click me</Button>;
}`}</code>
          </pre>
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-section-title">component categories</h2>
        <div className="home-categories">
          {componentCategories.map(category => {
            const count = components.filter(c => c.category === category).length;
            return (
              <Link 
                key={category} 
                to={`/components?category=${encodeURIComponent(category)}`}
                className="home-category-card"
              >
                <span className="home-category-name">{category.toLowerCase()}</span>
                <span className="home-category-count">{count}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-section-title">popular components</h2>
        <div className="home-quick-links">
          {quickLinks.map(group => (
            <div key={group.category} className="home-quick-group">
              <h3 className="home-quick-group-title">{group.category.toLowerCase()}</h3>
              <ul className="home-quick-list">
                {group.items.map(item => (
                  <li key={item}>
                    <Link to={`/components/${item.toLowerCase()}`} className="home-quick-link">
                      {item.toLowerCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-section-title">design tokens</h2>
        <div className="home-tokens-preview">
          {allTokenGroups.slice(0, 4).map(group => (
            <Link key={group.name} to={`/tokens/${group.name.toLowerCase()}`} className="home-token-card">
              <span className="home-token-name">{group.name.toLowerCase()}</span>
              <span className="home-token-desc">{group.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-section-title">icon library</h2>
        <p className="home-section-desc">
          Over 1,600 icons organized in categories for easy discovery.
        </p>
        <div className="home-icon-categories">
          {iconCategories.map(category => (
            <Link 
              key={category} 
              to={`/icons/${encodeURIComponent(category)}`}
              className="home-icon-category"
            >
              {category.toLowerCase()}
            </Link>
          ))}
        </div>
        <Link to="/icons" className="home-view-all">
          view all icons
        </Link>
      </section>
    </div>
  );
}

export default Home;
