import { Text } from '@marcelinodzn/ds-react';
import { TokenCard } from '../components/TokenCard';
import { useTokens } from '../hooks/useTokens';

export function SpacingTokens() {
  const { tokens, loading } = useTokens('spacing');
  
  if (loading) {
    return (
      <Text as="div">
        <Text size="M" weight="medium">
          loading tokens...
        </Text>
      </Text>
    );
  }
  
  return (
    <Text as="div">
      <Text as="div">
        <Text as="h1" size="2XL" weight="high">
          spacing tokens
        </Text>
        
        <Text as="div">
          <Text as="h2" size="XL" weight="high">
            spacing scale
          </Text>
          <Text as="div">
            {tokens.scale?.map((token) => (
              <TokenCard
                key={token.name}
                name={token.name}
                value={token.value}
                category={token.category}
              />
            ))}
          </Text>
        </Text>
        
        <Text as="div">
          <Text as="h2" size="XL" weight="high">
            density variants
          </Text>
          <Text as="div">
            {tokens.density?.map((token) => (
              <TokenCard
                key={token.name}
                name={token.name}
                value={token.value}
                category={token.category}
              />
            ))}
          </Text>
        </Text>
      </Text>
    </Text>
  );
}
