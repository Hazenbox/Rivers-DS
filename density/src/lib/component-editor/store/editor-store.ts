/**
 * COMPONENT EDITOR STORE
 * 
 * Zustand store for managing the component editor state.
 * Includes undo/redo, custom tokens, component overrides, and impact tracking.
 */

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type {
  TokenReference,
  CustomToken,
  TokenCategory,
  ComponentUsage,
  InteractionState,
  TokenResolutionContext,
} from "../types";
import { analyzeTokenChange } from "../resolver";

// ============================================
// STATE TYPES
// ============================================

export interface EditorState {
  // Selection state
  selectedComponent: string | null;
  selectedVariant: string | null;
  selectedSize: string | null;
  selectedSlot: string | null;
  selectedState: InteractionState;
  
  // Resolution context
  context: TokenResolutionContext;
  
  // Custom tokens created by user
  customTokens: Record<string, CustomToken>;
  
  // Component token overrides
  componentOverrides: Record<string, Record<string, TokenReference>>;
  
  // History for undo/redo
  history: HistoryEntry[];
  historyIndex: number;
  
  // UI state
  isPreviewing: boolean;
  previewVariants: boolean;
  showImpactAnalysis: boolean;
  expandedSlots: string[];
  
  // Sync state
  lastSavedAt: string | null;
  hasUnsavedChanges: boolean;
}

export interface HistoryEntry {
  timestamp: string;
  action: HistoryAction;
  previousState: Partial<EditorState>;
  description: string;
}

export type HistoryAction =
  | { type: "SET_OVERRIDE"; component: string; key: string; token: TokenReference }
  | { type: "REMOVE_OVERRIDE"; component: string; key: string }
  | { type: "CREATE_TOKEN"; token: CustomToken }
  | { type: "UPDATE_TOKEN"; id: string; updates: Partial<CustomToken> }
  | { type: "DELETE_TOKEN"; id: string }
  | { type: "APPLY_SLOT_PRESET"; component: string; slotId: string };

// ============================================
// ACTIONS
// ============================================

export interface EditorActions {
  // Selection
  selectComponent: (name: string | null) => void;
  selectVariant: (variant: string | null) => void;
  selectSize: (size: string | null) => void;
  selectSlot: (slot: string | null) => void;
  selectState: (state: InteractionState) => void;
  
  // Context
  setTheme: (theme: "light" | "dark") => void;
  setDensity: (density: "compact" | "default" | "spacious") => void;
  setColorPreset: (preset: string) => void;
  setNeutralScale: (scale: string) => void;
  
  // Token overrides
  setTokenOverride: (component: string, key: string, token: TokenReference) => void;
  removeTokenOverride: (component: string, key: string) => void;
  clearComponentOverrides: (component: string) => void;
  
  // Custom tokens
  createCustomToken: (token: Omit<CustomToken, "id" | "createdAt" | "updatedAt" | "usedBy">) => string;
  updateCustomToken: (id: string, updates: Partial<CustomToken>) => void;
  deleteCustomToken: (id: string) => void;
  
  // Token usage tracking
  addTokenUsage: (tokenId: string, usage: ComponentUsage) => void;
  removeTokenUsage: (tokenId: string, usage: ComponentUsage) => void;
  
  // History
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
  
  // UI state
  togglePreview: () => void;
  togglePreviewVariants: () => void;
  toggleImpactAnalysis: () => void;
  toggleSlotExpanded: (slot: string) => void;
  
  // Persistence
  markSaved: () => void;
  resetToSaved: () => void;
  
  // Bulk operations
  importOverrides: (overrides: Record<string, Record<string, TokenReference>>) => void;
  importCustomTokens: (tokens: CustomToken[]) => void;
  exportState: () => ExportedState;
}

export interface ExportedState {
  customTokens: CustomToken[];
  componentOverrides: Record<string, Record<string, TokenReference>>;
  exportedAt: string;
  version: string;
}

// ============================================
// INITIAL STATE
// ============================================

const initialState: EditorState = {
  selectedComponent: null,
  selectedVariant: null,
  selectedSize: null,
  selectedSlot: null,
  selectedState: "default",
  
  context: {
    theme: "light",
    density: "default",
    colorPreset: "default",
    neutralScale: "slate",
  },
  
  customTokens: {},
  componentOverrides: {},
  
  history: [],
  historyIndex: -1,
  
  isPreviewing: true,
  previewVariants: false,
  showImpactAnalysis: false,
  expandedSlots: [],
  
  lastSavedAt: null,
  hasUnsavedChanges: false,
};

// ============================================
// STORE CREATION
// ============================================

export const useEditorStore = create<EditorState & EditorActions>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,
        
        // Selection actions
        selectComponent: (name) => set((state) => {
          state.selectedComponent = name;
          state.selectedVariant = null;
          state.selectedSize = null;
          state.selectedSlot = null;
        }),
        
        selectVariant: (variant) => set((state) => {
          state.selectedVariant = variant;
        }),
        
        selectSize: (size) => set((state) => {
          state.selectedSize = size;
        }),
        
        selectSlot: (slot) => set((state) => {
          state.selectedSlot = slot;
        }),
        
        selectState: (interactionState) => set((state) => {
          state.selectedState = interactionState;
        }),
        
        // Context actions
        setTheme: (theme) => set((state) => {
          state.context.theme = theme;
        }),
        
        setDensity: (density) => set((state) => {
          state.context.density = density;
        }),
        
        setColorPreset: (preset) => set((state) => {
          state.context.colorPreset = preset;
        }),
        
        setNeutralScale: (scale) => set((state) => {
          state.context.neutralScale = scale;
        }),
        
        // Token override actions
        setTokenOverride: (component, key, token) => set((state) => {
          // Record history
          const previousValue = state.componentOverrides[component]?.[key];
          addHistory(state, {
            type: "SET_OVERRIDE",
            component,
            key,
            token,
          }, `Set ${key} override on ${component}`);
          
          // Apply override
          if (!state.componentOverrides[component]) {
            state.componentOverrides[component] = {};
          }
          state.componentOverrides[component][key] = token;
          state.hasUnsavedChanges = true;
        }),
        
        removeTokenOverride: (component, key) => set((state) => {
          if (state.componentOverrides[component]?.[key]) {
            addHistory(state, {
              type: "REMOVE_OVERRIDE",
              component,
              key,
            }, `Remove ${key} override from ${component}`);
            
            delete state.componentOverrides[component][key];
            state.hasUnsavedChanges = true;
          }
        }),
        
        clearComponentOverrides: (component) => set((state) => {
          if (state.componentOverrides[component]) {
            delete state.componentOverrides[component];
            state.hasUnsavedChanges = true;
          }
        }),
        
        // Custom token actions
        createCustomToken: (tokenData) => {
          const id = generateTokenId(tokenData.name);
          const now = new Date().toISOString();
          
          set((state) => {
            const token: CustomToken = {
              ...tokenData,
              id,
              createdAt: now,
              updatedAt: now,
              usedBy: [],
            };
            
            addHistory(state, {
              type: "CREATE_TOKEN",
              token,
            }, `Create custom token "${token.name}"`);
            
            state.customTokens[id] = token;
            state.hasUnsavedChanges = true;
          });
          
          return id;
        },
        
        updateCustomToken: (id, updates) => set((state) => {
          if (state.customTokens[id]) {
            addHistory(state, {
              type: "UPDATE_TOKEN",
              id,
              updates,
            }, `Update custom token "${state.customTokens[id].name}"`);
            
            Object.assign(state.customTokens[id], updates, {
              updatedAt: new Date().toISOString(),
            });
            state.hasUnsavedChanges = true;
          }
        }),
        
        deleteCustomToken: (id) => set((state) => {
          if (state.customTokens[id]) {
            addHistory(state, {
              type: "DELETE_TOKEN",
              id,
            }, `Delete custom token "${state.customTokens[id].name}"`);
            
            delete state.customTokens[id];
            state.hasUnsavedChanges = true;
          }
        }),
        
        // Token usage tracking
        addTokenUsage: (tokenId, usage) => set((state) => {
          if (state.customTokens[tokenId]) {
            const usedBy = state.customTokens[tokenId].usedBy;
            const exists = usedBy.some(
              u => u.componentName === usage.componentName &&
                   u.slot === usage.slot &&
                   u.property === usage.property
            );
            if (!exists) {
              state.customTokens[tokenId].usedBy.push(usage);
            }
          }
        }),
        
        removeTokenUsage: (tokenId, usage) => set((state) => {
          if (state.customTokens[tokenId]) {
            state.customTokens[tokenId].usedBy = state.customTokens[tokenId].usedBy.filter(
              u => !(u.componentName === usage.componentName &&
                     u.slot === usage.slot &&
                     u.property === usage.property)
            );
          }
        }),
        
        // History actions
        undo: () => set((state) => {
          if (state.historyIndex >= 0) {
            const entry = state.history[state.historyIndex];
            // Restore previous state
            Object.assign(state, entry.previousState);
            state.historyIndex -= 1;
          }
        }),
        
        redo: () => set((state) => {
          if (state.historyIndex < state.history.length - 1) {
            state.historyIndex += 1;
            // Re-apply the action (would need action handlers)
            // For simplicity, we store full snapshots
          }
        }),
        
        clearHistory: () => set((state) => {
          state.history = [];
          state.historyIndex = -1;
        }),
        
        // UI state actions
        togglePreview: () => set((state) => {
          state.isPreviewing = !state.isPreviewing;
        }),
        
        togglePreviewVariants: () => set((state) => {
          state.previewVariants = !state.previewVariants;
        }),
        
        toggleImpactAnalysis: () => set((state) => {
          state.showImpactAnalysis = !state.showImpactAnalysis;
        }),
        
        toggleSlotExpanded: (slot) => set((state) => {
          const index = state.expandedSlots.indexOf(slot);
          if (index === -1) {
            state.expandedSlots.push(slot);
          } else {
            state.expandedSlots.splice(index, 1);
          }
        }),
        
        // Persistence actions
        markSaved: () => set((state) => {
          state.lastSavedAt = new Date().toISOString();
          state.hasUnsavedChanges = false;
        }),
        
        resetToSaved: () => set((state) => {
          // Would need to reload from persistence
          state.hasUnsavedChanges = false;
        }),
        
        // Bulk operations
        importOverrides: (overrides) => set((state) => {
          state.componentOverrides = overrides;
          state.hasUnsavedChanges = true;
        }),
        
        importCustomTokens: (tokens) => set((state) => {
          for (const token of tokens) {
            state.customTokens[token.id] = token;
          }
          state.hasUnsavedChanges = true;
        }),
        
        exportState: () => {
          const state = get();
          return {
            customTokens: Object.values(state.customTokens),
            componentOverrides: state.componentOverrides,
            exportedAt: new Date().toISOString(),
            version: "1.0.0",
          };
        },
      })),
      {
        name: "component-editor-storage",
        partialize: (state) => ({
          customTokens: state.customTokens,
          componentOverrides: state.componentOverrides,
          context: state.context,
        }),
      }
    ),
    { name: "ComponentEditorStore" }
  )
);

// ============================================
// HELPER FUNCTIONS
// ============================================

function generateTokenId(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const suffix = Math.random().toString(36).substring(2, 6);
  return `${base}-${suffix}`;
}

function addHistory(
  state: EditorState,
  action: HistoryAction,
  description: string
): void {
  // Truncate future history if we're not at the end
  if (state.historyIndex < state.history.length - 1) {
    state.history = state.history.slice(0, state.historyIndex + 1);
  }
  
  // Limit history size
  const maxHistory = 50;
  if (state.history.length >= maxHistory) {
    state.history = state.history.slice(-maxHistory + 1);
  }
  
  // Add new entry
  state.history.push({
    timestamp: new Date().toISOString(),
    action,
    previousState: extractRelevantState(state, action),
    description,
  });
  state.historyIndex = state.history.length - 1;
}

function extractRelevantState(
  state: EditorState,
  action: HistoryAction
): Partial<EditorState> {
  switch (action.type) {
    case "SET_OVERRIDE":
    case "REMOVE_OVERRIDE":
      return {
        componentOverrides: JSON.parse(JSON.stringify(state.componentOverrides)),
      };
    case "CREATE_TOKEN":
    case "UPDATE_TOKEN":
    case "DELETE_TOKEN":
      return {
        customTokens: JSON.parse(JSON.stringify(state.customTokens)),
      };
    default:
      return {};
  }
}

// ============================================
// SELECTORS
// ============================================

export const selectSelectedComponent = (state: EditorState) => state.selectedComponent;
export const selectContext = (state: EditorState) => state.context;
export const selectCustomTokens = (state: EditorState) => Object.values(state.customTokens);
export const selectCustomTokenById = (id: string) => (state: EditorState) => state.customTokens[id];
export const selectComponentOverrides = (component: string) => (state: EditorState) => 
  state.componentOverrides[component] || {};
export const selectHasUnsavedChanges = (state: EditorState) => state.hasUnsavedChanges;
export const selectCanUndo = (state: EditorState) => state.historyIndex >= 0;
export const selectCanRedo = (state: EditorState) => state.historyIndex < state.history.length - 1;
