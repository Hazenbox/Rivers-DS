import { Text } from '@marcelinodzn/ds-react';

interface TokenCardProps {
  name: string;
  value: string;
  category: string;
}

export function TokenCard({ name, value, category }: TokenCardProps) {
  return (
    <Text as="div">
      <Text as="div">
        <Text size="M" weight="high">
          {name}
        </Text>
        <Text size="S" weight="medium" color="medium">
          {category}
        </Text>
        <Text size="XS" weight="low" color="low">
          {value}
        </Text>
      </Text>
    </Text>
  );
}
