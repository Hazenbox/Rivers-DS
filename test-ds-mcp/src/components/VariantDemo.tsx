import { Text } from '@marcelinodzn/ds-react';

interface VariantDemoProps {
  label: string;
  children: React.ReactNode;
}

export function VariantDemo({ label, children }: VariantDemoProps) {
  return (
    <div className="variant-demo">
      <div className="variant-demo-content">
        {children}
      </div>
      <Text size="2XS" color="low" align="center">
        {label}
      </Text>
    </div>
  );
}
