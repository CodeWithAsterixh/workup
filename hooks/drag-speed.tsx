"use client";
import React, { createContext, useContext, useState } from "react";

// Context to manage global drag speed
export type DragSpeedContextType = {
  dragSpeed: number;
  setDragSpeed: React.Dispatch<React.SetStateAction<number>>;
};
const DragSpeedContext = createContext<DragSpeedContextType | null>(null);

export function DragSpeedProvider({ children }: { children: React.ReactNode }) {
  const [dragSpeed, setDragSpeed] = useState(1);
  return (
    <DragSpeedContext.Provider value={{ dragSpeed, setDragSpeed }}>
      {children}
    </DragSpeedContext.Provider>
  );
}

export function useDragSpeed() {
  const ctx = useContext(DragSpeedContext);
  if (!ctx) throw new Error("useDragSpeed must be used within DragSpeedProvider");
  return ctx;
}