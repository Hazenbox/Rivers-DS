import { Text } from '@marcelinodzn/ds-react';
import { TokenCard } from '../components/TokenCard';
import { useTokens } from '../hooks/useTokens';

export function ColorTokens() {
  const { tokens, loading } = useTokens('colors');
  
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
        color tokens
      </Text>
      
      <div className="section">
        <Text as="h2" size="XL" weight="high">
          text colors
        </Text>
        <div className="token-grid">
          {tokens.text?.map((token) => (
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
          surface colors
        </Text>
        <div className="token-grid">
          {tokens.surface?.map((token) => (
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
          stroke colors
        </Text>
        <div className="token-grid">
          {tokens.stroke?.map((token) => (
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
          semantic colors
        </Text>
        <div className="token-grid">
          {tokens.semantic?.map((token) => (
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
