import { Text } from '@marcelinodzn/ds-react';
import { TokenCard } from '../components/TokenCard';
import { useTokens } from '../hooks/useTokens';

export function TypographyTokens() {
  const { tokens, loading } = useTokens('typography');
  
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
          typography tokens
        </Text>
        
        <Text as="div">
          <Text as="h2" size="XL" weight="high">
            font sizes
          </Text>
          <Text as="div">
            {tokens.sizes?.map((token) => (
              <Text as="div" key={token.name}>
                <Text as="div">
                  <TokenCard
                    name={token.name}
                    value={token.value}
                    category={token.category}
                  />
                  <Text size="M" weight="medium">
                    sample text at this size
                  </Text>
                </Text>
              </Text>
            ))}
          </Text>
        </Text>
        
        <Text as="div">
          <Text as="h2" size="XL" weight="high">
            font weights
          </Text>
          <Text as="div">
            {tokens.weights?.map((token) => (
              <Text as="div" key={token.name}>
                <Text as="div">
                  <TokenCard
                    name={token.name}
                    value={token.value}
                    category={token.category}
                  />
                  <Text size="M" weight={token.name.includes('Low') ? 'low' : token.name.includes('High') ? 'high' : 'medium'}>
                    sample text at this weight
                  </Text>
                </Text>
              </Text>
            ))}
          </Text>
        </Text>
      </Text>
    </Text>
  );
}
