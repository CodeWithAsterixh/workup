import { Slot } from "@/types";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface KeyboardContextType {
  values: string[];
  setValues: (key:string[])=>void;
  addValue: (val: string) => void;
  removeValue: (val: string) => void;
  id:string
}

const KeyboardContext = createContext<KeyboardContextType | undefined>(undefined);

export const useKeyboard = () => {
  const ctx = useContext(KeyboardContext);
  if (!ctx) throw new Error("useStringArrayContext must be used within StringArrayProvider");
  return ctx;
};

export const KeyboardProvider = ({ children,id }: { id:string } & Slot) => {
  const [values, setValues] = useState<string[]>([]);

  const addValue = (val: string) => setValues((prev) => [...prev, val]);
  const removeValue = (val: string) => setValues((prev) => prev.filter((v) => v !== val));
  const handleSetValue = (val: string[]) => {
    setValues(val)
  };


  
  return (
    <KeyboardContext.Provider value={{ values, setValues:handleSetValue, addValue, removeValue, id }}>
      {children}
    </KeyboardContext.Provider>
  );
};