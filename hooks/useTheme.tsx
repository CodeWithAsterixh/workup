"use client"

import { Slot } from "@/types";
import React, { useState } from "react";

type theme = "dark" | "light" | "system"
interface ThemeContext {
  theme: theme;
  setTheme: React.Dispatch<React.SetStateAction<theme>>;
}
const ThemeContext = React.createContext<ThemeContext | null>(null);

export default function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }

  return context as ThemeContext;
}


export function ThemeProvider({ children }: Slot) {
  const [theme, setTheme] = useState<theme>("system")
  return (
    <ThemeContext.Provider value={{ setTheme, theme}}>
    {children}
  </ThemeContext.Provider>
  );
}

