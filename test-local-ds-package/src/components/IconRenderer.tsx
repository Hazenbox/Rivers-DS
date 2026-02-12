import { useDynamicIcon } from '@marcelinodzn/ds-react/icons';
import { useEffect, useState } from 'react';

interface IconRendererProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Simple placeholder icon for loading/error states
function PlaceholderIcon({ size = 24 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21,15 16,10 5,21" />
    </svg>
  );
}

export function IconRenderer({ name, size = 24, className, style }: IconRendererProps) {
  const { icon: IconComponent, loading, error } = useDynamicIcon(name);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (error) {
      setHasError(true);
      console.warn(`Failed to load icon: ${name}`, error);
    }
  }, [error, name]);

  if (loading) {
    return <PlaceholderIcon size={size} />;
  }

  if (hasError || !IconComponent) {
    return <PlaceholderIcon size={size} />;
  }

  try {
    return (
      <IconComponent 
        width={size}
        height={size}
        className={className}
        style={style}
      />
    );
  } catch (err) {
    console.error(`Error rendering icon ${name}:`, err);
    return <PlaceholderIcon size={size} />;
  }
}

export default IconRenderer;
