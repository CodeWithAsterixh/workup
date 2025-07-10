"use client";

import {
  CardConfig,
  ElementConfig,
} from "@/components/models/CardRenderer/types";
import { Slot } from "@/types";
import React, { useState } from "react";

interface CardConfigContext {
  cardConfig?: CardConfig;
  setCardConfig: React.Dispatch<React.SetStateAction<CardConfig | undefined>>;
  selected?: ElementConfig;
  setSelected:React.Dispatch<React.SetStateAction<ElementConfig | undefined>>
  selectedFace?: "front"|"back";
  setSelectedFace:React.Dispatch<React.SetStateAction<"front"|"back">>
}
const CardConfigContext = React.createContext<CardConfigContext | null>(null);

export default function useCardConfig() {
  const context = React.useContext(CardConfigContext);
  if (!context) {
    throw new Error("useCardConfig must be used within a ThemeProvider.");
  }

  return context as CardConfigContext;
}

export function CardConfigProvider({ children }: Slot) {
  const [cardConfig, setCardConfig] = useState<CardConfig | undefined>(
    undefined
  );
  const [selected, setSelected] = useState<ElementConfig|undefined>()
  const [selectedFace, setSelectedFace] = useState<"front"|"back">("front")
  return (
    <CardConfigContext.Provider value={{ setCardConfig, cardConfig,selected, setSelected,selectedFace, setSelectedFace }}>
      {children}
    </CardConfigContext.Provider>
  );
}
