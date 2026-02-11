import { Text } from '@marcelinodzn/ds-react';

interface ShowcaseSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function ShowcaseSection({ title, description, children }: ShowcaseSectionProps) {
  return (
    <div className="section">
      <Text as="h3" size="L" weight="high">
        {title}
      </Text>
      {description && (
        <Text size="M" color="medium">
          {description}
        </Text>
      )}
      {children}
    </div>
  );
}
