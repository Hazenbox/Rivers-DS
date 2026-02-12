import { ICON_NAMES, IconCategories, IconsByCategory } from '@marcelinodzn/ds-react/icons';

export interface IconMeta {
  name: string;
  keywords: string[];
  category: string;
}

// Use the actual categories from the DS package
export const iconCategories = IconCategories;

export type IconCategory = typeof iconCategories[number];

// Helper function to generate keywords from icon name
function generateKeywords(iconName: string): string[] {
  // Remove 'Ic' prefix and split camelCase into words
  const nameWithoutPrefix = iconName.replace(/^Ic/, '');
  
  // Split by capital letters and convert to lowercase
  const words = nameWithoutPrefix
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .toLowerCase()
    .split(/\s+/);
  
  // Add the full name without prefix as well
  const fullName = nameWithoutPrefix.toLowerCase();
  
  // Combine unique keywords
  return Array.from(new Set([fullName, ...words]));
}

// Helper function to get category for an icon based on DS categorization
function getCategoryForIcon(iconName: string): string {
  // Check which category this icon belongs to in the DS
  for (const [category, iconList] of Object.entries(IconsByCategory)) {
    if ((iconList as string[]).includes(iconName)) {
      return category;
    }
  }
  
  // Default fallback category
  return iconCategories[0] || 'All';
}

// Generate icon metadata from actual DS icons
export const icons: IconMeta[] = ICON_NAMES.map(name => ({
  name,
  keywords: generateKeywords(name),
  category: getCategoryForIcon(name)
}));

export const getIconsByCategory = (category: IconCategory): IconMeta[] => {
  return icons.filter(icon => icon.category === category);
};

export const searchIcons = (query: string): IconMeta[] => {
  const lowerQuery = query.toLowerCase();
  return icons.filter(icon => 
    icon.name.toLowerCase().includes(lowerQuery) ||
    icon.keywords.some(kw => kw.includes(lowerQuery))
  );
};

export const getIconImportPath = (iconName: string): string => {
  return `import { DynamicIcon } from '@marcelinodzn/ds-react/icons';\n// or for direct import:\nimport { ${iconName} } from '@marcelinodzn/ds-react/icons';`;
};

export const getIconUsageCode = (iconName: string): string => {
  return `<DynamicIcon name="${iconName}" width={24} height={24} />`;
};
