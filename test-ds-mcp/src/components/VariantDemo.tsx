import { Text } from '@marcelinodzn/ds-react';

interface VariantDemoProps {
  label: string;
  code?: string;
  children: React.ReactNode;
}

export function VariantDemo({ label, code, children }: VariantDemoProps) {
  return (
    <div className="variant-demo">
      <Text size="S" weight="medium" color="medium">
        {label}
      </Text>
      <div className="variant-demo-content">
        {children}
      </div>
      {code && (
        <Text size="XS" color="low" as="code">
          {code}
        </Text>
      )}
    </div>
  );
}
