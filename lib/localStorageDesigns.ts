import { designCard } from "@/types/designs";

export const loadAll = (STORAGE_KEY = ""): designCard[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

// Write back to localStorage
export const persistAll = (cards: designCard[], STORAGE_KEY: string = "") =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
