import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ComponentMeta, PropDefinition } from '../../config/components';
import CodeSnippet from './CodeSnippet';
import './ComponentDemo.css';

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

  const [activeExample, setActiveExample] = useState(0);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderPropInput = (prop: PropDefinition) => {
    const value = propValues[prop.name];

    switch (prop.type) {
      case 'boolean':
        return (
          <label className="demo-prop-checkbox">
            <input
              type="checkbox"
              checked={!!value}
              onChange={e => handlePropChange(prop.name, e.target.checked)}
            />
            <span className="demo-prop-checkbox-label">{value ? 'true' : 'false'}</span>
          </label>
        );

      case 'enum':
        return (
          <select
            value={String(value ?? '')}
            onChange={e => handlePropChange(prop.name, e.target.value)}
            className="demo-prop-select"
          >
            <option value="">select...</option>
            {prop.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value as number ?? ''}
            onChange={e => handlePropChange(prop.name, e.target.value ? Number(e.target.value) : undefined)}
            className="demo-prop-input"
            placeholder="0"
          />
        );

      case 'string':
      case 'ReactNode':
        return (
          <input
            type="text"
            value={String(value ?? '')}
            onChange={e => handlePropChange(prop.name, e.target.value)}
            className="demo-prop-input"
            placeholder={prop.name === 'children' ? 'content' : `enter ${prop.name}...`}
          />
        );

      default:
        return (
          <span className="demo-prop-readonly">{prop.type}</span>
        );
    }
  };

  return (
    <div className="component-demo">
      <div className="demo-breadcrumb">
        <Link to="/components">components</Link>
        <span>/</span>
        <span>{component.name.toLowerCase()}</span>
      </div>

      <div className="demo-header">
        <div className="demo-title-row">
          <h1 className="demo-title">{component.name.toLowerCase()}</h1>
          <span className="demo-category">{component.category.toLowerCase()}</span>
        </div>
        <p className="demo-description">{component.description}</p>
      </div>

      <section className="demo-section">
        <h2 className="demo-section-title">import</h2>
        <CodeSnippet code={importStatement} onCopy={() => handleCopy(importStatement)} />
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">playground</h2>
        <div className="demo-playground">
          <div className="demo-preview">
            <div className="demo-preview-content">
              <div className="demo-preview-placeholder">
                component preview would render here with the actual component from @marcelinodzn/ds-react
              </div>
              <div className="demo-preview-code">
                <CodeSnippet code={generatedCode} onCopy={() => handleCopy(generatedCode)} />
              </div>
            </div>
          </div>
          <div className="demo-props-panel">
            <h3 className="demo-props-title">props</h3>
            <div className="demo-props-list">
              {component.props.map(prop => (
                <div key={prop.name} className="demo-prop-item">
                  <div className="demo-prop-header">
                    <span className="demo-prop-name">
                      {prop.name}
                      {prop.required && <span className="demo-prop-required">*</span>}
                    </span>
                    <span className="demo-prop-type">{prop.type}</span>
                  </div>
                  {renderPropInput(prop)}
                  <p className="demo-prop-desc">{prop.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">examples</h2>
        <div className="demo-examples">
          <div className="demo-examples-tabs">
            {component.examples.map((example, idx) => (
              <button
                key={example.name}
                className={`demo-example-tab ${idx === activeExample ? 'active' : ''}`}
                onClick={() => setActiveExample(idx)}
              >
                {example.name.toLowerCase()}
              </button>
            ))}
          </div>
          <div className="demo-example-content">
            <CodeSnippet 
              code={component.examples[activeExample]?.code || ''} 
              onCopy={() => handleCopy(component.examples[activeExample]?.code || '')}
            />
            {component.examples[activeExample]?.description && (
              <p className="demo-example-desc">{component.examples[activeExample].description}</p>
            )}
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">props reference</h2>
        <div className="demo-props-table-wrapper">
          <table className="demo-props-table">
            <thead>
              <tr>
                <th>prop</th>
                <th>type</th>
                <th>default</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              {component.props.map(prop => (
                <tr key={prop.name}>
                  <td>
                    <code className="demo-prop-code">
                      {prop.name}
                      {prop.required && <span className="demo-prop-required">*</span>}
                    </code>
                  </td>
                  <td>
                    <code className="demo-type-code">
                      {prop.type === 'enum' ? prop.options?.join(' | ') : prop.type}
                    </code>
                  </td>
                  <td>
                    {prop.defaultValue !== undefined ? (
                      <code className="demo-default-code">{String(prop.defaultValue)}</code>
                    ) : (
                      <span className="demo-no-default">-</span>
                    )}
                  </td>
                  <td>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {copied && (
        <div className="demo-toast">copied to clipboard</div>
      )}
    </div>
  );
}

export default ComponentDemo;
