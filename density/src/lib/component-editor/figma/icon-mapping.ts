/**
 * ICON MAPPING
 * 
 * Maps Figma icon symbol names (kebab-case) to Lucide React imports (PascalCase).
 * Figma icons are at: https://www.figma.com/design/0C5QAulitTyS0rVW1Qyzar/DS-Bridge-TEST?node-id=78-3451
 */

/**
 * Mapping from Figma Icon symbol name (kebab-case) to Lucide import (PascalCase)
 */
export const figmaToLucideMap: Record<string, string> = {
  // Navigation & Arrows
  "arrow-right": "ArrowRight",
  "arrow-left": "ArrowLeft",
  "arrow-up": "ArrowUp",
  "arrow-down": "ArrowDown",
  "chevron-right": "ChevronRight",
  "chevron-left": "ChevronLeft",
  "chevron-down": "ChevronDown",
  "chevron-up": "ChevronUp",
  "chevrons-right": "ChevronsRight",
  "chevrons-left": "ChevronsLeft",
  "chevrons-up": "ChevronsUp",
  "chevrons-down": "ChevronsDown",
  
  // Actions
  "plus": "Plus",
  "minus": "Minus",
  "x": "X",
  "check": "Check",
  "search": "Search",
  "filter": "Filter",
  "sort-asc": "SortAsc",
  "sort-desc": "SortDesc",
  
  // Common UI
  "menu": "Menu",
  "more-horizontal": "MoreHorizontal",
  "more-vertical": "MoreVertical",
  "settings": "Settings",
  "settings-2": "Settings2",
  "sliders-horizontal": "SlidersHorizontal",
  "sliders-vertical": "SlidersVertical",
  
  // User & Account
  "user": "User",
  "user-round": "UserRound",
  "user-plus": "UserPlus",
  "user-minus": "UserMinus",
  "user-check": "UserCheck",
  "user-x": "UserX",
  "users": "Users",
  "users-round": "UsersRound",
  
  // File & Document
  "file": "File",
  "file-text": "FileText",
  "file-plus": "FilePlus",
  "folder": "Folder",
  "folder-open": "FolderOpen",
  "copy": "Copy",
  "clipboard": "Clipboard",
  
  // Edit & Modify
  "edit": "Edit",
  "edit-2": "Edit2",
  "edit-3": "Edit3",
  "pencil": "Pencil",
  "pen": "Pen",
  "trash": "Trash",
  "trash-2": "Trash2",
  
  // Media & View
  "eye": "Eye",
  "eye-off": "EyeOff",
  "image": "Image",
  "video": "Video",
  "camera": "Camera",
  "play": "Play",
  "pause": "Pause",
  "stop": "Stop",
  
  // Communication
  "mail": "Mail",
  "message-square": "MessageSquare",
  "message-circle": "MessageCircle",
  "phone": "Phone",
  "bell": "Bell",
  "bell-off": "BellOff",
  
  // Data & Transfer
  "download": "Download",
  "upload": "Upload",
  "refresh-cw": "RefreshCw",
  "refresh-ccw": "RefreshCcw",
  "rotate-cw": "RotateCw",
  "rotate-ccw": "RotateCcw",
  
  // Links & External
  "external-link": "ExternalLink",
  "link": "Link",
  "link-2": "Link2",
  "unlink": "Unlink",
  "share": "Share",
  "share-2": "Share2",
  
  // Status & Feedback
  "info": "Info",
  "alert-circle": "AlertCircle",
  "alert-triangle": "AlertTriangle",
  "check-circle": "CheckCircle",
  "check-circle-2": "CheckCircle2",
  "x-circle": "XCircle",
  "help-circle": "HelpCircle",
  
  // Loading
  "loader": "Loader",
  "loader-2": "Loader2",
  "loader-circle": "LoaderCircle",
  
  // Layout
  "layout": "Layout",
  "layout-grid": "LayoutGrid",
  "layout-list": "LayoutList",
  "grid": "Grid",
  "list": "List",
  
  // Misc
  "home": "Home",
  "calendar": "Calendar",
  "clock": "Clock",
  "star": "Star",
  "heart": "Heart",
  "bookmark": "Bookmark",
  "tag": "Tag",
  "hash": "Hash",
  "at-sign": "AtSign",
  "globe": "Globe",
  "map-pin": "MapPin",
  "lock": "Lock",
  "unlock": "Unlock",
  "key": "Key",
  "log-in": "LogIn",
  "log-out": "LogOut",
  "power": "Power",
  "zap": "Zap",
  "sun": "Sun",
  "moon": "Moon",
};

/**
 * Convert Figma icon name to Lucide import name
 */
export function figmaIconToLucide(figmaName: string): string | undefined {
  return figmaToLucideMap[figmaName.toLowerCase()];
}

/**
 * Generate import statement for code generation
 */
export function generateIconImport(iconNames: string[]): string {
  const lucideNames = iconNames
    .map(name => figmaToLucideMap[name.toLowerCase()])
    .filter((name): name is string => Boolean(name));
  
  if (lucideNames.length === 0) return "";
  
  const uniqueNames = [...new Set(lucideNames)];
  return `import { ${uniqueNames.join(", ")} } from "lucide-react"`;
}

/**
 * Button size to icon size mapping
 * Since Figma icons are 24px base, code handles sizing via these Tailwind classes
 */
export const buttonSizeToIconSize: Record<string, string> = {
  "xs": "size-3",      // 12px
  "sm": "size-4",      // 16px
  "default": "size-4", // 16px
  "lg": "size-5",      // 20px
  "icon": "size-4",    // 16px
  "icon-xs": "size-3", // 12px
  "icon-sm": "size-4", // 16px
  "icon-lg": "size-5", // 20px
};

/**
 * Get icon size class for a button size
 */
export function getIconSizeForButton(buttonSize: string): string {
  return buttonSizeToIconSize[buttonSize] || "size-4";
}

/**
 * Convert kebab-case to PascalCase
 */
export function kebabToPascal(str: string): string {
  return str
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/**
 * Convert PascalCase to kebab-case
 */
export function pascalToKebab(str: string): string {
  return str
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
}
