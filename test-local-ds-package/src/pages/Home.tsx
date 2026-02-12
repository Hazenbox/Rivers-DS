import { Link as RouterLink } from 'react-router-dom';
import { components, componentCategories } from '../config/components';
import { allTokenGroups } from '../config/tokens';
import { icons, iconCategories } from '../config/icons';
import { Text, Button, Badge, Card, CardBody } from '@marcelinodzn/ds-react';

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
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <section style={{ textAlign: 'center', padding: '48px 0 64px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px' }}>jio design system</h1>
        <Text>A comprehensive collection of components, tokens, and icons for building consistent user interfaces.</Text>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '32px' }}>
          <RouterLink to="/components" style={{ textDecoration: 'none' }}>
            <Button appearance="primary">browse components</Button>
          </RouterLink>
          <a href="https://www.npmjs.com/package/@marcelinodzn/ds-react" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button>npm install</Button>
          </a>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '64px' }}>
        {stats.map(stat => (
          <RouterLink key={stat.label} to={stat.path} style={{ textDecoration: 'none' }}>
            <Card>
              <CardBody>
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <h2 style={{ fontSize: '36px', fontWeight: 700, color: stat.color, marginBottom: '8px', margin: 0 }}>{stat.value}</h2>
                  <Text>{stat.label}</Text>
                </div>
              </CardBody>
            </Card>
          </RouterLink>
        ))}
      </section>

      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '20px' }}>quick start</h2>
        <Card style={{ marginBottom: '16px' }}>
          <CardBody>
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Text>installation</Text>
                <Button size="S" onPress={() => navigator.clipboard.writeText('npm install @marcelinodzn/ds-react @marcelinodzn/ds-tokens')}>
                  copy
                </Button>
              </div>
              <pre style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '6px', overflow: 'auto', margin: 0 }}>
                <code>npm install @marcelinodzn/ds-react @marcelinodzn/ds-tokens</code>
              </pre>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Text>usage</Text>
                <Button size="S" onPress={() => navigator.clipboard.writeText(`import { Button } from '@marcelinodzn/ds-react';\n\nfunction App() {\n  return <Button>click me</Button>;\n}`)}>
                  copy
                </Button>
              </div>
              <pre style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '6px', overflow: 'auto', margin: 0 }}>
                <code>{`import { Button } from '@marcelinodzn/ds-react';

function App() {
  return <Button>click me</Button>;
}`}</code>
              </pre>
            </div>
          </CardBody>
        </Card>
      </section>

      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '20px' }}>component categories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
          {componentCategories.map(category => {
            const count = components.filter(c => c.category === category).length;
            return (
              <RouterLink 
                key={category} 
                to={`/components?category=${encodeURIComponent(category)}`}
                style={{ textDecoration: 'none' }}
              >
                <Card>
                  <CardBody>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
                      <Text>{category.toLowerCase()}</Text>
                      <Badge>{count}</Badge>
                    </div>
                  </CardBody>
                </Card>
              </RouterLink>
            );
          })}
        </div>
      </section>

      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '20px' }}>popular components</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
          {quickLinks.map(group => (
            <div key={group.category}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>{group.category.toLowerCase()}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {group.items.map(item => (
                  <RouterLink key={item} to={`/components/${item.toLowerCase()}`} style={{ textDecoration: 'none', color: '#6366f1' }}>
                    <Text>{item.toLowerCase()}</Text>
                  </RouterLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '20px' }}>design tokens</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
          {allTokenGroups.slice(0, 4).map(group => (
            <RouterLink key={group.name} to={`/tokens/${group.name.toLowerCase()}`} style={{ textDecoration: 'none' }}>
              <Card>
                <CardBody>
                  <div style={{ padding: '8px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{group.name.toLowerCase()}</h4>
                    <Text>{group.description}</Text>
                  </div>
                </CardBody>
              </Card>
            </RouterLink>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '12px' }}>icon library</h2>
        <Text>Over 1,600 icons organized in categories for easy discovery.</Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px', marginBottom: '16px' }}>
          {iconCategories.map(category => (
            <RouterLink 
              key={category} 
              to={`/icons/${encodeURIComponent(category)}`}
              style={{ textDecoration: 'none' }}
            >
              <Badge>{category.toLowerCase()}</Badge>
            </RouterLink>
          ))}
        </div>
        <RouterLink to="/icons" style={{ textDecoration: 'none', color: '#6366f1' }}>
          <Text>view all icons</Text>
        </RouterLink>
      </section>
    </div>
  );
}

export default Home;
