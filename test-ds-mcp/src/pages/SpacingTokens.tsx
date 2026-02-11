import { Text } from '@marcelinodzn/ds-react';
import { TokenCard } from '../components/TokenCard';
import { useTokens } from '../hooks/useTokens';

export function SpacingTokens() {
  const { tokens, loading } = useTokens('spacing');
  
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
        spacing tokens
      </Text>
      
      <div className="section">
        <Text as="h2" size="XL" weight="high">
          spacing scale
        </Text>
        <div className="token-grid">
          {tokens.scale?.map((token) => (
            <TokenCard
              key={token.name}
              name={token.name}
              value={token.value}
              category={token.category}
            />
          ))}
        </div>
      </div>
      
      <div className="section">
        <Text as="h2" size="XL" weight="high">
          density variants
        </Text>
        <div className="token-grid">
          {tokens.density?.map((token) => (
            <TokenCard
              key={token.name}
              name={token.name}
              value={token.value}
              category={token.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
