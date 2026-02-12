import { useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ComponentMeta, PropDefinition } from '../../config/components';
import CodeSnippet from './CodeSnippet';
import LivePreview from './LivePreview';
import VariantGallery from './VariantGallery';
import { Text, Card, CardBody, Badge, Checkbox } from '@marcelinodzn/ds-react';

interface ComponentDemoProps {
  component: ComponentMeta;
}

function ComponentDemo({ component }: ComponentDemoProps) {
  const [propValues, setPropValues] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    component.props.forEach(prop => {
      if (prop.defaultValue !== undefined) {
        initial[prop.name] = prop.defaultValue;
      }
    });
    return initial;
  });

  const handlePropChange = (propName: string, value: unknown) => {
    setPropValues(prev => ({ ...prev, [propName]: value }));
  };

  const generatedCode = useMemo(() => {
    const propsString = Object.entries(propValues)
      .filter(([, value]) => value !== undefined && value !== '' && value !== false)
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : null;
        }
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .filter(Boolean)
      .join(' ');

    const hasChildren = component.props.some(p => p.name === 'children');
    const childrenValue = propValues.children || 'content';

    if (hasChildren && propsString) {
      return `<${component.name} ${propsString}>${childrenValue}</${component.name}>`;
    } else if (hasChildren) {
      return `<${component.name}>${childrenValue}</${component.name}>`;
    } else if (propsString) {
      return `<${component.name} ${propsString} />`;
    }
    return `<${component.name} />`;
  }, [component.name, propValues, component.props]);

  const importStatement = `import { ${component.name} } from '${component.importPath}';`;

  const renderPropInput = (prop: PropDefinition) => {
    const value = propValues[prop.name];

    switch (prop.type) {
      case 'boolean':
        return (
          <Checkbox 
            isSelected={!!value}
            onChange={checked => handlePropChange(prop.name, checked)}
            label={value ? 'true' : 'false'}
          />
        );

      case 'enum':
        return (
          <select
            value={String(value ?? '')}
            onChange={e => handlePropChange(prop.name, e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e4e8' }}
          >
            <option value="">select...</option>
            {prop.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case 'number':
      case 'string':
      case 'ReactNode':
        return (
          <input
            type={prop.type === 'number' ? 'number' : 'text'}
            value={String(value ?? '')}
            onChange={e => handlePropChange(prop.name, prop.type === 'number' ? Number(e.target.value) : e.target.value)}
            placeholder={prop.name === 'children' ? 'content' : `enter ${prop.name}...`}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e4e8', width: '100%' }}
          />
        );

      default:
        return <Text>{prop.type}</Text>;
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <RouterLink to="/components" style={{ textDecoration: 'none', color: '#6366f1' }}>
          <Text>components</Text>
        </RouterLink>
        <Text>/</Text>
        <Text>{component.name.toLowerCase()}</Text>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>{component.name.toLowerCase()}</h1>
          <Badge>{component.category.toLowerCase()}</Badge>
        </div>
        <Text>{component.description}</Text>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>import</h2>
        <CodeSnippet code={importStatement} />
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>playground</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
          <Card>
            <CardBody>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '24px' }}>
                  <LivePreview 
                    componentName={component.name} 
                    props={propValues}
                  >
                    {(propValues.children as string) || component.name}
                  </LivePreview>
                </div>
                <CodeSnippet code={generatedCode} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div style={{ padding: '20px', maxHeight: '500px', overflowY: 'auto' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>props</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {component.props.map(prop => (
                    <div key={prop.name} style={{ paddingBottom: '16px', borderBottom: '1px solid #e2e4e8' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <Text>{prop.name}{prop.required && '*'}</Text>
                        <Badge>{prop.type}</Badge>
                      </div>
                      {renderPropInput(prop)}
                      <Text style={{ fontSize: '12px', marginTop: '4px' }}>{prop.description}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>examples</h2>
        {component.examples.map((example) => (
          <div key={example.name} style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{example.name.toLowerCase()}</h3>
            <CodeSnippet code={example.code} />
            {example.description && <Text style={{ marginTop: '8px' }}>{example.description}</Text>}
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '48px' }}>
        <VariantGallery component={component} />
      </div>

      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>props reference</h2>
        <div style={{ marginTop: '16px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e4e8' }}>
                <th style={{ textAlign: 'left', padding: '12px', fontWeight: 600 }}>prop</th>
                <th style={{ textAlign: 'left', padding: '12px', fontWeight: 600 }}>type</th>
                <th style={{ textAlign: 'left', padding: '12px', fontWeight: 600 }}>default</th>
                <th style={{ textAlign: 'left', padding: '12px', fontWeight: 600 }}>description</th>
              </tr>
            </thead>
            <tbody>
              {component.props.map(prop => (
                <tr key={prop.name} style={{ borderBottom: '1px solid #e2e4e8' }}>
                  <td style={{ padding: '12px' }}>
                    <code>{prop.name}{prop.required && '*'}</code>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <code>{prop.type === 'enum' ? prop.options?.join(' | ') : prop.type}</code>
                  </td>
                  <td style={{ padding: '12px' }}>
                    {prop.defaultValue !== undefined ? <code>{String(prop.defaultValue)}</code> : <Text>-</Text>}
                  </td>
                  <td style={{ padding: '12px' }}>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ComponentDemo;
