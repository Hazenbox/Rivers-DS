import { ComponentMeta } from '../../config/components';
import LivePreview from './LivePreview';
import { Text, Card, CardBody } from '@marcelinodzn/ds-react';

interface VariantGalleryProps {
  component: ComponentMeta;
}

function VariantGallery({ component }: VariantGalleryProps) {
  // Find all variant props (enum type props that define visual variations)
  const variantProps = component.props.filter(prop => 
    prop.type === 'enum' && 
    prop.options && 
    prop.options.length > 0 &&
    (prop.name.toLowerCase().includes('size') ||
     prop.name.toLowerCase().includes('appearance') ||
     prop.name.toLowerCase().includes('attention') ||
     prop.name.toLowerCase().includes('variant') ||
     prop.name.toLowerCase().includes('emphasis') ||
     prop.name.toLowerCase().includes('state'))
  );

  if (variantProps.length === 0) {
    return null;
  }

  // Get base props for the component
  const baseProps: Record<string, unknown> = {};
  component.props.forEach(prop => {
    if (prop.defaultValue !== undefined) {
      baseProps[prop.name] = prop.defaultValue;
    }
  });

  // Determine default children based on component type
  const getDefaultChildren = () => {
    if (component.name === 'Button') return 'Button';
    if (component.name === 'Badge') return 'Badge';
    if (component.name === 'Chip') return 'Chip';
    if (component.name === 'Text') return 'Sample text content';
    if (component.name === 'Display') return 'Display text';
    if (component.name === 'Headline') return 'Headline text';
    if (component.name === 'Title') return 'Title text';
    if (component.name === 'Label') return 'Label text';
    return component.name;
  };

  const defaultChildren = getDefaultChildren();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '0' }}>all variants</h2>

      {/* Individual variant prop displays */}
      {variantProps.map(variantProp => (
        <div key={variantProp.name}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', textTransform: 'capitalize' }}>
            {variantProp.name}
          </h3>
          <Text style={{ marginBottom: '16px', display: 'block' }}>{variantProp.description}</Text>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
            gap: '16px' 
          }}>
            {variantProp.options?.map(option => {
              const props = { 
                ...baseProps, 
                [variantProp.name]: option 
              };
              
              return (
                <Card key={option}>
                  <CardBody>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      gap: '12px',
                      padding: '16px'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        minHeight: '60px',
                        width: '100%'
                      }}>
                        <LivePreview 
                          componentName={component.name} 
                          props={props}
                        >
                          {defaultChildren}
                        </LivePreview>
                      </div>
                      <Text style={{ fontSize: '12px', textAlign: 'center' }}>
                        {option}
                      </Text>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* Matrix view for size × appearance/variant combinations */}
      {variantProps.length >= 2 && (() => {
        // Find size and appearance/variant props
        const sizeProp = variantProps.find(p => 
          p.name.toLowerCase().includes('size')
        );
        const appearanceProp = variantProps.find(p => 
          p.name.toLowerCase().includes('appearance') || 
          p.name.toLowerCase().includes('variant')
        );

        if (!sizeProp || !appearanceProp || !sizeProp.options || !appearanceProp.options) {
          return null;
        }

        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
              {sizeProp.name} × {appearanceProp.name} Matrix
            </h3>
            <Text style={{ marginBottom: '16px', display: 'block' }}>
              All combinations of {sizeProp.name.toLowerCase()} and {appearanceProp.name.toLowerCase()}
            </Text>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                minWidth: '600px'
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e4e8' }}>
                    <th style={{ 
                      padding: '12px', 
                      textAlign: 'left',
                      fontWeight: 600,
                      position: 'sticky',
                      left: 0,
                      backgroundColor: '#fff'
                    }}>
                      Size / {appearanceProp.name}
                    </th>
                    {appearanceProp.options.map(appearance => (
                      <th key={appearance} style={{ 
                        padding: '12px', 
                        textAlign: 'center',
                        fontWeight: 600
                      }}>
                        {appearance}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeProp.options.map(size => (
                    <tr key={size} style={{ borderBottom: '1px solid #e2e4e8' }}>
                      <td style={{ 
                        padding: '12px',
                        fontWeight: 600,
                        position: 'sticky',
                        left: 0,
                        backgroundColor: '#fff'
                      }}>
                        {size}
                      </td>
                      {appearanceProp.options?.map(appearance => {
                        const props = {
                          ...baseProps,
                          [sizeProp.name]: size,
                          [appearanceProp.name]: appearance
                        };

                        return (
                          <td key={`${size}-${appearance}`} style={{ 
                            padding: '12px',
                            textAlign: 'center'
                          }}>
                            <div style={{ 
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minHeight: '40px'
                            }}>
                              <LivePreview 
                                componentName={component.name} 
                                props={props}
                              >
                                {defaultChildren}
                              </LivePreview>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}

      {/* State variations if component has boolean state props */}
      {(() => {
        const stateProps = component.props.filter(prop =>
          prop.type === 'boolean' &&
          (prop.name.toLowerCase().includes('disabled') ||
           prop.name.toLowerCase().includes('loading') ||
           prop.name.toLowerCase().includes('selected') ||
           prop.name.toLowerCase().includes('checked'))
        );

        if (stateProps.length === 0) {
          return null;
        }

        return (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
              State Variations
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
              gap: '16px' 
            }}>
              {/* Default state */}
              <Card>
                <CardBody>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: '12px',
                    padding: '16px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      minHeight: '60px',
                      width: '100%'
                    }}>
                      <LivePreview 
                        componentName={component.name} 
                        props={baseProps}
                      >
                        {defaultChildren}
                      </LivePreview>
                    </div>
                    <Text style={{ fontSize: '12px', textAlign: 'center' }}>
                      default
                    </Text>
                  </div>
                </CardBody>
              </Card>

              {/* Each state variation */}
              {stateProps.map(stateProp => (
                <Card key={stateProp.name}>
                  <CardBody>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      gap: '12px',
                      padding: '16px'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        minHeight: '60px',
                        width: '100%'
                      }}>
                        <LivePreview 
                          componentName={component.name} 
                          props={{ ...baseProps, [stateProp.name]: true }}
                        >
                          {defaultChildren}
                        </LivePreview>
                      </div>
                      <Text style={{ fontSize: '12px', textAlign: 'center' }}>
                        {stateProp.name}
                      </Text>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default VariantGallery;
