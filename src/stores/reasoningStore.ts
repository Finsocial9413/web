import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getAllStoredReasonings, saveMessageReasoning } from '../services/api';

// Type for our reasoning data
type ReasoningMap = Record<string, string>;

// Interface for our reasoning state
interface ReasoningState {
  // Core state
  reasonings: ReasoningMap;
  activeReasoningId: string | null;
  previousReasoningId: string | null;
  lastDisplayedReasoning: string | null;
  
  // Transition flags
  isTransitioning: boolean;
  
  // Actions
  setActiveReasoningId: (id: string | null) => void;
  updateReasoning: (id: string, reasoning: string) => void;
  getReasoning: (id: string) => string | null;
  getCurrentReasoning: () => string | null;
  createReasoningCallback: (id: string) => (reasoning: string) => void;
  clearTransitionFlag: () => void;
  syncFromStorage: () => void;
  addReasoning: (messageId: string, reasoning: string) => void;
  clearReasonings: () => void;
}

// Initialize with data from storage
const initialReasonings = getAllStoredReasonings();

// Create our store with persistence
export const useReasoningStore = create<ReasoningState>()(
  persist(
    (set, get) => ({
      // Initial state
      reasonings: initialReasonings,
      activeReasoningId: null,
      previousReasoningId: null,
      lastDisplayedReasoning: null,
      isTransitioning: false,
      
      // Set the active reasoning ID with transition management
      setActiveReasoningId: (id) => {
        const state = get();
        
        // If nothing's changing, do nothing
        if (id === state.activeReasoningId) return;
        
        // Save previous ID before changing
        const previousId = state.activeReasoningId;
        
        // If we had a previous reasoning, store it as the last displayed
        if (previousId) {
          const prevReasoning = state.getReasoning(previousId);
          
          // Start transition
          set({ 
            previousReasoningId: previousId,
            isTransitioning: true,
            lastDisplayedReasoning: prevReasoning || state.lastDisplayedReasoning
          });
        }
        
        // Set new active ID
        set({ activeReasoningId: id });
        
        // Check if we already have reasoning for the new ID
        if (id) {
          const newReasoning = state.getReasoning(id);
          if (newReasoning) {
            // If we have reasoning already, update last displayed
            set({ lastDisplayedReasoning: newReasoning });
            
            // Clear transition flag after a short delay
            setTimeout(() => get().clearTransitionFlag(), 100);
          }
        }
      },
      
      // Update reasoning with proper transition management
      updateReasoning: (id, reasoning) => {
        // If new reasoning is empty, do not update, so old reasoning remains visible
        if (!reasoning || !id) return;
        
        console.log(`Updating reasoning for ${id}: ${reasoning.substring(0, 20)}...`);
        
        const isForActiveId = id === get().activeReasoningId;
        
        set((state) => ({ 
          reasonings: { ...state.reasonings, [id]: reasoning },
          ...(isForActiveId ? { lastDisplayedReasoning: reasoning } : {})
        }));
        
        if (isForActiveId) {
          setTimeout(() => get().clearTransitionFlag(), 50);
        }
        
        saveMessageReasoning(id, reasoning);
      },
      
      // Get reasoning by ID (from all possible sources)
      getReasoning: (id) => {
        const { reasonings } = get();
        
        // First try the in-memory store
        if (reasonings[id]) {
          return reasonings[id];
        }
        
        // Then try external storage directly (useful for initial loads)
        try {
          const storedReasonings = getAllStoredReasonings();
          if (storedReasonings[id]) {
            // If found in storage but not in our state, update state
            set((state) => ({
              reasonings: { ...state.reasonings, [id]: storedReasonings[id] }
            }));
            return storedReasonings[id];
          }
        } catch (error) {
          console.error("Error retrieving reasoning from storage:", error);
        }
        
        // Not found
        return null;
      },
      
      // Get the current reasoning to display (with fallbacks)
      getCurrentReasoning: () => {
        const state = get();
        const { activeReasoningId, previousReasoningId, isTransitioning, lastDisplayedReasoning } = state;
        
        // Try to get reasoning for active ID
        if (activeReasoningId) {
          const activeReasoning = state.getReasoning(activeReasoningId);
          if (activeReasoning) return activeReasoning;
        }
        
        // If transitioning, show the last displayed reasoning
        if (isTransitioning && lastDisplayedReasoning) {
          return lastDisplayedReasoning;
        }
        
        // If we have a previous ID and are in transition, try to get that reasoning
        if (isTransitioning && previousReasoningId) {
          const prevReasoning = state.getReasoning(previousReasoningId);
          if (prevReasoning) return prevReasoning;
        }
        
        // Final fallback
        return lastDisplayedReasoning;
      },
      
      // Create a callback function for updating reasoning
      createReasoningCallback: (id) => {
        return (reasoning) => get().updateReasoning(id, reasoning);
      },
      
      // Clear the transition flag
      clearTransitionFlag: () => {
        set({ isTransitioning: false });
      },
      
      // Sync from external storage (useful for multi-tab scenarios)
      syncFromStorage: () => {
        try {
          const storedReasonings = getAllStoredReasonings();
          set((state) => ({ 
            reasonings: { ...state.reasonings, ...storedReasonings }
          }));
        } catch (error) {
          console.error("Error syncing reasonings from storage:", error);
        }
      },

      // Add a new reasoning message
      addReasoning: (messageId, reasoning) => 
        set(state => ({
          reasonings: { 
            ...state.reasonings, 
            [messageId]: reasoning 
          }
        })),

      // Clear all reasonings
      clearReasonings: () => set({ reasonings: {} }),
    }),
    {
      name: 'ai-reasoning-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
