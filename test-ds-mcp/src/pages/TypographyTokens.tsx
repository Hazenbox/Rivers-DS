import { Text } from '@marcelinodzn/ds-react';
import { TokenCard } from '../components/TokenCard';
import { useTokens } from '../hooks/useTokens';

export function TypographyTokens() {
  const { tokens, loading } = useTokens('typography');
  
  if (loading) {
    return (
      <div>
        <Text size="M" weight="medium">
          loading tokens...
        </Text>
      </div>
    );
  }
  
  return (
    <div className="vertical-stack">
      <Text as="h1" size="2XL" weight="high">
        typography tokens
      </Text>
      
      <div className="section">
        <Text as="h2" size="XL" weight="high">
          font sizes
        </Text>
        <div className="token-grid">
          {tokens.sizes?.map((token) => (
            <div key={token.name} className="vertical-stack">
              <TokenCard
                name={token.name}
                value={token.value}
                category={token.category}
              />
              <Text size="M" weight="medium">
                sample text at this size
              </Text>
            </div>
          ))}
        </div>
      </div>
      
      <div className="section">
        <Text as="h2" size="XL" weight="high">
          font weights
        </Text>
        <div className="token-grid">
          {tokens.weights?.map((token) => (
            <div key={token.name} className="vertical-stack">
              <TokenCard
                name={token.name}
                value={token.value}
                category={token.category}
              />
              <Text size="M" weight={token.name.includes('Low') ? 'low' : token.name.includes('High') ? 'high' : 'medium'}>
                sample text at this weight
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
