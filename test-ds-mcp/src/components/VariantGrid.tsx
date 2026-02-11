interface VariantGridProps {
  columns?: 2 | 3 | 4;
  children: React.ReactNode;
}

export function VariantGrid({ columns = 3, children }: VariantGridProps) {
  return (
    <div className="variant-grid" data-columns={columns}>
      {children}
    </div>
  );
}
