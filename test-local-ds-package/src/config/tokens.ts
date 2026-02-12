export interface Token {
  name: string;
  value: string;
  cssVariable?: string;
  description?: string;
}

export interface TokenCategory {
  name: string;
  description: string;
  tokens: Token[];
}

export interface TokenGroup {
  name: string;
  description: string;
  categories: TokenCategory[];
}

// Color Tokens
export const colorTokens: TokenGroup = {
  name: 'Colors',
  description: 'Color tokens for consistent theming across the design system.',
  categories: [
    {
      name: 'Primary',
      description: 'Primary brand colors',
      tokens: [
        { name: 'primary/50', value: '#eef2ff', cssVariable: '--color-primary-50', description: 'lightest primary' },
        { name: 'primary/100', value: '#e0e7ff', cssVariable: '--color-primary-100', description: 'very light primary' },
        { name: 'primary/200', value: '#c7d2fe', cssVariable: '--color-primary-200', description: 'light primary' },
        { name: 'primary/300', value: '#a5b4fc', cssVariable: '--color-primary-300', description: 'soft primary' },
        { name: 'primary/400', value: '#818cf8', cssVariable: '--color-primary-400', description: 'medium primary' },
        { name: 'primary/500', value: '#6366f1', cssVariable: '--color-primary-500', description: 'base primary' },
        { name: 'primary/600', value: '#4f46e5', cssVariable: '--color-primary-600', description: 'strong primary' },
        { name: 'primary/700', value: '#4338ca', cssVariable: '--color-primary-700', description: 'dark primary' },
        { name: 'primary/800', value: '#3730a3', cssVariable: '--color-primary-800', description: 'darker primary' },
        { name: 'primary/900', value: '#312e81', cssVariable: '--color-primary-900', description: 'darkest primary' },
      ],
    },
    {
      name: 'Secondary',
      description: 'Secondary accent colors',
      tokens: [
        { name: 'secondary/50', value: '#f0fdf4', cssVariable: '--color-secondary-50', description: 'lightest secondary' },
        { name: 'secondary/100', value: '#dcfce7', cssVariable: '--color-secondary-100', description: 'very light secondary' },
        { name: 'secondary/200', value: '#bbf7d0', cssVariable: '--color-secondary-200', description: 'light secondary' },
        { name: 'secondary/300', value: '#86efac', cssVariable: '--color-secondary-300', description: 'soft secondary' },
        { name: 'secondary/400', value: '#4ade80', cssVariable: '--color-secondary-400', description: 'medium secondary' },
        { name: 'secondary/500', value: '#22c55e', cssVariable: '--color-secondary-500', description: 'base secondary' },
        { name: 'secondary/600', value: '#16a34a', cssVariable: '--color-secondary-600', description: 'strong secondary' },
        { name: 'secondary/700', value: '#15803d', cssVariable: '--color-secondary-700', description: 'dark secondary' },
        { name: 'secondary/800', value: '#166534', cssVariable: '--color-secondary-800', description: 'darker secondary' },
        { name: 'secondary/900', value: '#14532d', cssVariable: '--color-secondary-900', description: 'darkest secondary' },
      ],
    },
    {
      name: 'Neutral',
      description: 'Neutral grayscale colors',
      tokens: [
        { name: 'neutral/50', value: '#fafafa', cssVariable: '--color-neutral-50', description: 'lightest neutral' },
        { name: 'neutral/100', value: '#f4f4f5', cssVariable: '--color-neutral-100', description: 'very light neutral' },
        { name: 'neutral/200', value: '#e4e4e7', cssVariable: '--color-neutral-200', description: 'light neutral' },
        { name: 'neutral/300', value: '#d4d4d8', cssVariable: '--color-neutral-300', description: 'soft neutral' },
        { name: 'neutral/400', value: '#a1a1aa', cssVariable: '--color-neutral-400', description: 'medium neutral' },
        { name: 'neutral/500', value: '#71717a', cssVariable: '--color-neutral-500', description: 'base neutral' },
        { name: 'neutral/600', value: '#52525b', cssVariable: '--color-neutral-600', description: 'strong neutral' },
        { name: 'neutral/700', value: '#3f3f46', cssVariable: '--color-neutral-700', description: 'dark neutral' },
        { name: 'neutral/800', value: '#27272a', cssVariable: '--color-neutral-800', description: 'darker neutral' },
        { name: 'neutral/900', value: '#18181b', cssVariable: '--color-neutral-900', description: 'darkest neutral' },
      ],
    },
    {
      name: 'Semantic',
      description: 'Semantic colors for states and feedback',
      tokens: [
        { name: 'success/500', value: '#22c55e', cssVariable: '--color-success', description: 'success state' },
        { name: 'success/100', value: '#dcfce7', cssVariable: '--color-success-light', description: 'success background' },
        { name: 'warning/500', value: '#f59e0b', cssVariable: '--color-warning', description: 'warning state' },
        { name: 'warning/100', value: '#fef3c7', cssVariable: '--color-warning-light', description: 'warning background' },
        { name: 'error/500', value: '#ef4444', cssVariable: '--color-error', description: 'error state' },
        { name: 'error/100', value: '#fee2e2', cssVariable: '--color-error-light', description: 'error background' },
        { name: 'info/500', value: '#3b82f6', cssVariable: '--color-info', description: 'info state' },
        { name: 'info/100', value: '#dbeafe', cssVariable: '--color-info-light', description: 'info background' },
      ],
    },
    {
      name: 'Text',
      description: 'Text color tokens',
      tokens: [
        { name: 'Text/High', value: 'rgba(0,0,0,0.87)', cssVariable: '--color-text-high', description: 'high emphasis text' },
        { name: 'Text/Medium', value: 'rgba(0,0,0,0.60)', cssVariable: '--color-text-medium', description: 'medium emphasis text' },
        { name: 'Text/Low', value: 'rgba(0,0,0,0.38)', cssVariable: '--color-text-low', description: 'low emphasis text' },
        { name: 'Text/Inverse/High', value: 'rgba(255,255,255,0.87)', cssVariable: '--color-text-inverse-high', description: 'inverse high emphasis' },
        { name: 'Text/Inverse/Medium', value: 'rgba(255,255,255,0.60)', cssVariable: '--color-text-inverse-medium', description: 'inverse medium emphasis' },
        { name: 'Text/Inverse/Low', value: 'rgba(255,255,255,0.38)', cssVariable: '--color-text-inverse-low', description: 'inverse low emphasis' },
      ],
    },
    {
      name: 'Stroke',
      description: 'Border and stroke colors',
      tokens: [
        { name: 'Stroke/High', value: 'rgba(0,0,0,0.24)', cssVariable: '--color-stroke-high', description: 'high emphasis stroke' },
        { name: 'Stroke/Medium', value: 'rgba(0,0,0,0.12)', cssVariable: '--color-stroke-medium', description: 'medium emphasis stroke' },
        { name: 'Stroke/Low', value: 'rgba(0,0,0,0.06)', cssVariable: '--color-stroke-low', description: 'low emphasis stroke' },
      ],
    },
  ],
};

// Spacing Tokens
export const spacingTokens: TokenGroup = {
  name: 'Spacing',
  description: 'Spacing tokens for consistent layout and rhythm.',
  categories: [
    {
      name: 'Base Scale',
      description: 'Core spacing scale',
      tokens: [
        { name: 'Spacing/0', value: '0px', cssVariable: '--spacing-0', description: 'no spacing' },
        { name: 'Spacing/1', value: '4px', cssVariable: '--spacing-1', description: 'extra small' },
        { name: 'Spacing/2', value: '8px', cssVariable: '--spacing-2', description: 'small' },
        { name: 'Spacing/3', value: '12px', cssVariable: '--spacing-3', description: 'small-medium' },
        { name: 'Spacing/4', value: '16px', cssVariable: '--spacing-4', description: 'medium' },
        { name: 'Spacing/5', value: '20px', cssVariable: '--spacing-5', description: 'medium-large' },
        { name: 'Spacing/6', value: '24px', cssVariable: '--spacing-6', description: 'large' },
        { name: 'Spacing/7', value: '28px', cssVariable: '--spacing-7', description: 'large+' },
        { name: 'Spacing/8', value: '32px', cssVariable: '--spacing-8', description: 'extra large' },
        { name: 'Spacing/10', value: '40px', cssVariable: '--spacing-10', description: 'xxl' },
        { name: 'Spacing/12', value: '48px', cssVariable: '--spacing-12', description: '3xl' },
        { name: 'Spacing/16', value: '64px', cssVariable: '--spacing-16', description: '4xl' },
        { name: 'Spacing/20', value: '80px', cssVariable: '--spacing-20', description: '5xl' },
        { name: 'Spacing/24', value: '96px', cssVariable: '--spacing-24', description: '6xl' },
      ],
    },
    {
      name: 'Semantic Spacing',
      description: 'Named semantic spacing tokens',
      tokens: [
        { name: 'Spacing/xxs', value: '4px', cssVariable: '--spacing-xxs', description: 'extra extra small' },
        { name: 'Spacing/xs', value: '8px', cssVariable: '--spacing-xs', description: 'extra small' },
        { name: 'Spacing/sm', value: '12px', cssVariable: '--spacing-sm', description: 'small' },
        { name: 'Spacing/md', value: '16px', cssVariable: '--spacing-md', description: 'medium' },
        { name: 'Spacing/lg', value: '24px', cssVariable: '--spacing-lg', description: 'large' },
        { name: 'Spacing/xl', value: '32px', cssVariable: '--spacing-xl', description: 'extra large' },
        { name: 'Spacing/2xl', value: '48px', cssVariable: '--spacing-2xl', description: '2x extra large' },
        { name: 'Spacing/3xl', value: '64px', cssVariable: '--spacing-3xl', description: '3x extra large' },
      ],
    },
    {
      name: 'Compact Density',
      description: 'Compact spacing scale for dense UIs',
      tokens: [
        { name: 'Compact/1', value: '2px', cssVariable: '--spacing-compact-1', description: 'compact xs' },
        { name: 'Compact/2', value: '4px', cssVariable: '--spacing-compact-2', description: 'compact sm' },
        { name: 'Compact/3', value: '6px', cssVariable: '--spacing-compact-3', description: 'compact md' },
        { name: 'Compact/4', value: '8px', cssVariable: '--spacing-compact-4', description: 'compact lg' },
        { name: 'Compact/6', value: '12px', cssVariable: '--spacing-compact-6', description: 'compact xl' },
      ],
    },
    {
      name: 'Open Density',
      description: 'Open spacing scale for spacious UIs',
      tokens: [
        { name: 'Open/1', value: '8px', cssVariable: '--spacing-open-1', description: 'open xs' },
        { name: 'Open/2', value: '16px', cssVariable: '--spacing-open-2', description: 'open sm' },
        { name: 'Open/3', value: '24px', cssVariable: '--spacing-open-3', description: 'open md' },
        { name: 'Open/4', value: '32px', cssVariable: '--spacing-open-4', description: 'open lg' },
        { name: 'Open/6', value: '48px', cssVariable: '--spacing-open-6', description: 'open xl' },
      ],
    },
  ],
};

// Typography Tokens
export const typographyTokens: TokenGroup = {
  name: 'Typography',
  description: 'Typography tokens for consistent text styling.',
  categories: [
    {
      name: 'Font Family',
      description: 'Font family definitions',
      tokens: [
        { name: 'Font/Primary', value: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", cssVariable: '--font-primary', description: 'primary font' },
        { name: 'Font/Mono', value: "'SF Mono', 'Fira Code', 'Consolas', monospace", cssVariable: '--font-mono', description: 'monospace font' },
      ],
    },
    {
      name: 'Font Size',
      description: 'Font size scale',
      tokens: [
        { name: 'Text/xs', value: '12px', cssVariable: '--text-xs', description: 'extra small text' },
        { name: 'Text/sm', value: '14px', cssVariable: '--text-sm', description: 'small text' },
        { name: 'Text/md', value: '16px', cssVariable: '--text-md', description: 'medium text (base)' },
        { name: 'Text/lg', value: '18px', cssVariable: '--text-lg', description: 'large text' },
        { name: 'Text/xl', value: '20px', cssVariable: '--text-xl', description: 'extra large text' },
        { name: 'Text/2xl', value: '24px', cssVariable: '--text-2xl', description: '2x large text' },
        { name: 'Text/3xl', value: '30px', cssVariable: '--text-3xl', description: '3x large text' },
        { name: 'Text/4xl', value: '36px', cssVariable: '--text-4xl', description: '4x large text' },
        { name: 'Text/5xl', value: '48px', cssVariable: '--text-5xl', description: '5x large text' },
        { name: 'Text/6xl', value: '60px', cssVariable: '--text-6xl', description: '6x large text' },
      ],
    },
    {
      name: 'Font Weight',
      description: 'Font weight scale',
      tokens: [
        { name: 'Weight/Regular', value: '400', cssVariable: '--font-regular', description: 'regular weight' },
        { name: 'Weight/Medium', value: '500', cssVariable: '--font-medium', description: 'medium weight' },
        { name: 'Weight/Semibold', value: '600', cssVariable: '--font-semibold', description: 'semibold weight' },
        { name: 'Weight/Bold', value: '700', cssVariable: '--font-bold', description: 'bold weight' },
      ],
    },
    {
      name: 'Line Height',
      description: 'Line height scale',
      tokens: [
        { name: 'Leading/Tight', value: '1.25', cssVariable: '--leading-tight', description: 'tight line height' },
        { name: 'Leading/Snug', value: '1.375', cssVariable: '--leading-snug', description: 'snug line height' },
        { name: 'Leading/Normal', value: '1.5', cssVariable: '--leading-normal', description: 'normal line height' },
        { name: 'Leading/Relaxed', value: '1.625', cssVariable: '--leading-relaxed', description: 'relaxed line height' },
        { name: 'Leading/Loose', value: '2', cssVariable: '--leading-loose', description: 'loose line height' },
      ],
    },
    {
      name: 'Letter Spacing',
      description: 'Letter spacing scale',
      tokens: [
        { name: 'Tracking/Tighter', value: '-0.05em', cssVariable: '--tracking-tighter', description: 'tighter tracking' },
        { name: 'Tracking/Tight', value: '-0.025em', cssVariable: '--tracking-tight', description: 'tight tracking' },
        { name: 'Tracking/Normal', value: '0', cssVariable: '--tracking-normal', description: 'normal tracking' },
        { name: 'Tracking/Wide', value: '0.025em', cssVariable: '--tracking-wide', description: 'wide tracking' },
        { name: 'Tracking/Wider', value: '0.05em', cssVariable: '--tracking-wider', description: 'wider tracking' },
      ],
    },
  ],
};

// Shape Tokens
export const shapeTokens: TokenGroup = {
  name: 'Shape',
  description: 'Border radius and shape tokens.',
  categories: [
    {
      name: 'Border Radius',
      description: 'Border radius scale',
      tokens: [
        { name: 'Radius/none', value: '0px', cssVariable: '--radius-none', description: 'no rounding' },
        { name: 'Radius/xs', value: '2px', cssVariable: '--radius-xs', description: 'extra small radius' },
        { name: 'Radius/sm', value: '4px', cssVariable: '--radius-sm', description: 'small radius' },
        { name: 'Radius/md', value: '6px', cssVariable: '--radius-md', description: 'medium radius' },
        { name: 'Radius/lg', value: '8px', cssVariable: '--radius-lg', description: 'large radius' },
        { name: 'Radius/xl', value: '12px', cssVariable: '--radius-xl', description: 'extra large radius' },
        { name: 'Radius/2xl', value: '16px', cssVariable: '--radius-2xl', description: '2x large radius' },
        { name: 'Radius/3xl', value: '24px', cssVariable: '--radius-3xl', description: '3x large radius' },
        { name: 'Radius/full', value: '9999px', cssVariable: '--radius-full', description: 'full/pill radius' },
      ],
    },
  ],
};

// Motion Tokens
export const motionTokens: TokenGroup = {
  name: 'Motion',
  description: 'Animation and transition tokens.',
  categories: [
    {
      name: 'Duration',
      description: 'Animation duration scale',
      tokens: [
        { name: 'Duration/instant', value: '0ms', cssVariable: '--duration-instant', description: 'instant' },
        { name: 'Duration/fastest', value: '50ms', cssVariable: '--duration-fastest', description: 'fastest' },
        { name: 'Duration/faster', value: '100ms', cssVariable: '--duration-faster', description: 'faster' },
        { name: 'Duration/fast', value: '150ms', cssVariable: '--duration-fast', description: 'fast' },
        { name: 'Duration/normal', value: '200ms', cssVariable: '--duration-normal', description: 'normal' },
        { name: 'Duration/slow', value: '300ms', cssVariable: '--duration-slow', description: 'slow' },
        { name: 'Duration/slower', value: '400ms', cssVariable: '--duration-slower', description: 'slower' },
        { name: 'Duration/slowest', value: '500ms', cssVariable: '--duration-slowest', description: 'slowest' },
      ],
    },
    {
      name: 'Easing',
      description: 'Animation easing functions',
      tokens: [
        { name: 'Easing/linear', value: 'linear', cssVariable: '--ease-linear', description: 'linear easing' },
        { name: 'Easing/ease', value: 'ease', cssVariable: '--ease-default', description: 'default ease' },
        { name: 'Easing/ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)', cssVariable: '--ease-in', description: 'ease in' },
        { name: 'Easing/ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)', cssVariable: '--ease-out', description: 'ease out' },
        { name: 'Easing/ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)', cssVariable: '--ease-in-out', description: 'ease in-out' },
        { name: 'Easing/spring', value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', cssVariable: '--ease-spring', description: 'spring bounce' },
      ],
    },
  ],
};

// Surface Tokens
export const surfaceTokens: TokenGroup = {
  name: 'Surface',
  description: 'Surface elevation and background tokens.',
  categories: [
    {
      name: 'Elevation',
      description: 'Surface elevation levels',
      tokens: [
        { name: 'Surface/Ghost', value: 'transparent', cssVariable: '--surface-ghost', description: 'transparent surface' },
        { name: 'Surface/Subtle', value: 'rgba(0,0,0,0.02)', cssVariable: '--surface-subtle', description: 'subtle surface' },
        { name: 'Surface/Minimal', value: 'rgba(0,0,0,0.04)', cssVariable: '--surface-minimal', description: 'minimal surface' },
        { name: 'Surface/Moderate', value: 'rgba(0,0,0,0.06)', cssVariable: '--surface-moderate', description: 'moderate surface' },
        { name: 'Surface/Elevated', value: 'rgba(0,0,0,0.08)', cssVariable: '--surface-elevated', description: 'elevated surface' },
        { name: 'Surface/Overlay', value: 'rgba(0,0,0,0.12)', cssVariable: '--surface-overlay', description: 'overlay surface' },
      ],
    },
    {
      name: 'Shadow',
      description: 'Box shadow elevation',
      tokens: [
        { name: 'Shadow/sm', value: '0 1px 2px 0 rgba(0,0,0,0.05)', cssVariable: '--shadow-sm', description: 'small shadow' },
        { name: 'Shadow/md', value: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)', cssVariable: '--shadow-md', description: 'medium shadow' },
        { name: 'Shadow/lg', value: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)', cssVariable: '--shadow-lg', description: 'large shadow' },
        { name: 'Shadow/xl', value: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', cssVariable: '--shadow-xl', description: 'extra large shadow' },
        { name: 'Shadow/2xl', value: '0 25px 50px -12px rgba(0,0,0,0.25)', cssVariable: '--shadow-2xl', description: '2x large shadow' },
      ],
    },
  ],
};

// All token groups
export const allTokenGroups: TokenGroup[] = [
  colorTokens,
  spacingTokens,
  typographyTokens,
  shapeTokens,
  motionTokens,
  surfaceTokens,
];

export const getTokenGroupByName = (name: string): TokenGroup | undefined => {
  return allTokenGroups.find(g => g.name.toLowerCase() === name.toLowerCase());
};
