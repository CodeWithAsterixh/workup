import { designCard } from "@/types/designs";

export interface DesignState {
    currentDesign: designCard | null;
    availableDesigns: designCard[];
}

export interface DesignStateActions {
    // Actions to manipulate the current design state
    setCurrentDesign: (config:designCard|null)=>void;
    updateCurrentDesign: (config:Partial<designCard> | ((prev: designCard) => Partial<designCard>))=>void;
    clearCurrentDesign: () => void;
    // Actions to manipulate the available designs
    addDesign: (design: designCard) => void;
    removeDesign: (id: string) => void;
    updateDesign: (id: string, updater: (el: designCard) => void) => void
    setAvailableDesigns: (designs: designCard[]) => void;
    clearAvailableDesigns: () => void;
}