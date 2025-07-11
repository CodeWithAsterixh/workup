import { Slot } from "@/types";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface KeyboardContextType {
  values: string[];
  setValues: (key:string[])=>void;
  enableDefault:boolean;
  setEnableDefault: (val: boolean) => void
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
  const [enableDefault, setEnableDefault] = useState<boolean>(false);

  const handleSetValue = (val: string[]) => {
    setValues(val)
  };
  const handleSetEnableDefault = (val: boolean) => {
    setEnableDefault(val)
  };


  
  return (
    <KeyboardContext.Provider value={{ values, setValues:handleSetValue, id, enableDefault, setEnableDefault:handleSetEnableDefault }}>
      {children}
    </KeyboardContext.Provider>
  );
};