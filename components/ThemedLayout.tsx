"use client";
import useTheme, { ThemeProvider } from "@/hooks/useTheme";
import { Slot } from "@/types";
import { useEffect } from "react";

const ThemeHandler = ({ children }: Slot) => {
  const { theme } = useTheme();
  useEffect(() => {
    const html = document.querySelector("html");
    const isSystemDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
    html?.classList.remove("dark");
    switch (theme) {
      case "dark":
        html?.classList.add("dark");
        break;
      case "system":
        if (isSystemDark) html?.classList.add("dark");
        break;
      default:
        break;
    }
  }, [theme]);

  return children;
};
export const ThemedLayout = ({ children }: Slot) => {
  return (
    <ThemeProvider>
      <ThemeHandler>{children}</ThemeHandler>
    </ThemeProvider>
  );
};
