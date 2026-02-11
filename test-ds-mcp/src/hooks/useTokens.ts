import { useState, useEffect } from 'react';

type TokenCategory = 'colors' | 'spacing' | 'typography';

interface Token {
  name: string;
  value: string;
  category: string;
}

interface TokenData {
  [key: string]: Token[];
}

export function useTokens(category: TokenCategory) {
  const [tokens, setTokens] = useState<TokenData>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const extractedTokens = extractTokensFromCategory(category);
    setTokens(extractedTokens);
    setLoading(false);
  }, [category]);
  
  return { tokens, loading };
}

function extractTokensFromCategory(category: TokenCategory): TokenData {
  switch (category) {
    case 'colors':
      return {
        text: [
          { name: 'Text/High', value: 'High contrast text', category: 'text' },
          { name: 'Text/Medium', value: 'Medium contrast text', category: 'text' },
          { name: 'Text/Low', value: 'Low contrast text', category: 'text' },
        ],
        surface: [
          { name: 'Surface/Bold', value: 'Bold surface', category: 'surface' },
          { name: 'Surface/Subtle', value: 'Subtle surface', category: 'surface' },
          { name: 'Surface/Minimal', value: 'Minimal surface', category: 'surface' },
        ],
        stroke: [
          { name: 'Stroke/High', value: 'High contrast stroke', category: 'stroke' },
          { name: 'Stroke/Medium', value: 'Medium contrast stroke', category: 'stroke' },
          { name: 'Stroke/Low', value: 'Low contrast stroke', category: 'stroke' },
        ],
        semantic: [
          { name: 'Primary/500', value: 'Primary color', category: 'semantic' },
          { name: 'Positive/500', value: 'Success color', category: 'semantic' },
          { name: 'Warning/500', value: 'Warning color', category: 'semantic' },
          { name: 'Negative/500', value: 'Error color', category: 'semantic' },
          { name: 'Informative/500', value: 'Info color', category: 'semantic' },
        ]
      };
    
    case 'spacing':
      return {
        scale: [
          { name: 'Spacing/2XS', value: '2px', category: 'spacing' },
          { name: 'Spacing/XS', value: '4px', category: 'spacing' },
          { name: 'Spacing/S', value: '8px', category: 'spacing' },
          { name: 'Spacing/M', value: '16px', category: 'spacing' },
          { name: 'Spacing/L', value: '24px', category: 'spacing' },
          { name: 'Spacing/XL', value: '32px', category: 'spacing' },
          { name: 'Spacing/2XL', value: '40px', category: 'spacing' },
        ],
        density: [
          { name: 'Density/Compact', value: 'Reduced spacing', category: 'density' },
          { name: 'Density/Default', value: 'Standard spacing', category: 'density' },
          { name: 'Density/Open', value: 'Increased spacing', category: 'density' },
        ]
      };
    
    case 'typography':
      return {
        sizes: [
          { name: 'Typography/2XS', value: '10px', category: 'font-size' },
          { name: 'Typography/XS', value: '12px', category: 'font-size' },
          { name: 'Typography/S', value: '14px', category: 'font-size' },
          { name: 'Typography/M', value: '16px', category: 'font-size' },
          { name: 'Typography/L', value: '18px', category: 'font-size' },
          { name: 'Typography/XL', value: '20px', category: 'font-size' },
          { name: 'Typography/2XL', value: '24px', category: 'font-size' },
        ],
        weights: [
          { name: 'Weight/Low', value: '400 (Regular)', category: 'font-weight' },
          { name: 'Weight/Medium', value: '500 (Medium)', category: 'font-weight' },
          { name: 'Weight/High', value: '700 (Bold)', category: 'font-weight' },
        ]
      };
    
    default:
      return {};
  }
}
