import { designCard } from "@/types/designs";
import { produce } from "immer";
import { create } from "zustand";
import { DesignState, DesignStateActions } from "./types";

export const useEditorStore = create<DesignState & DesignStateActions>(
  (set, get) => ({
    availableDesigns: [],
    currentDesign: null,

    // actions
    setCurrentDesign: (config) => {
      set(produce<DesignState>((draft) => {
        draft.currentDesign = config;
      }));
    },
    updateCurrentDesign: (config) => {
      set(produce<DesignState>((draft) => {
        if (draft.currentDesign) {
          if (typeof config === "function") {
            config(draft.currentDesign)
          } else {
            draft.currentDesign = {
              ...draft.currentDesign,
              ...config,
            };
          }
        }
      }));
    },
    clearCurrentDesign: () => set({ currentDesign: null }),
    addDesign: (design) => {
      set((state) => ({
        availableDesigns: [...state.availableDesigns, design],
      }));
    },
    removeDesign: (id) => {
      set((state) => ({
        availableDesigns: state.availableDesigns.filter((d) => d.id !== id),
      }));
    },
    updateDesign: (id, updater) => {
      set(
        produce<DesignState>((draft) => {
          function walk(designs: designCard[]): boolean {
            for (const des of designs) {
              if (des.id === id) {
                updater(des);
                return true; // stop once we've applied the update
              }
            }
            return false;
          }

          walk(draft.availableDesigns)

        })
      );
    },
    setAvailableDesigns: (designs) => set({ availableDesigns: designs }),
    clearAvailableDesigns: () => set({ availableDesigns: [] }),
  })
);
