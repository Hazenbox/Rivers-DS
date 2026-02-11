import { Text } from '@marcelinodzn/ds-react';
import { TokenCard } from '../components/TokenCard';
import { useTokens } from '../hooks/useTokens';

export function ColorTokens() {
  const { tokens, loading } = useTokens('colors');
  
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
          color tokens
        </Text>
        
        <Text as="div">
          <Text as="h2" size="XL" weight="high">
            text colors
          </Text>
          <Text as="div">
            {tokens.text?.map((token) => (
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
            surface colors
          </Text>
          <Text as="div">
            {tokens.surface?.map((token) => (
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
            stroke colors
          </Text>
          <Text as="div">
            {tokens.stroke?.map((token) => (
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
            semantic colors
          </Text>
          <Text as="div">
            {tokens.semantic?.map((token) => (
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
