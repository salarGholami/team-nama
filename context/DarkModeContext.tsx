"use client";

import { useLocalStorageState } from "@/hooks/useLocalStoragesTate";
import { createContext, useContext, useEffect, ReactNode } from "react";

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function DarkModeProvider({ children }: Props) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
    "theme",
    false
  );

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setIsDarkMode((prev) => prev);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("useDarkMode must be used inside DarkModeProvider");
  }

  return context;
}
