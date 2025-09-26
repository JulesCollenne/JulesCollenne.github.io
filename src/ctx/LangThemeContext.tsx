// src/ctx/LangThemeContext.tsx
"use client";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { applyTheme, getInitialTheme, type Theme } from "../theme"; // use "@/theme" if alias set

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  lang: string;
  setLang: (l: string) => void;
};

export const LangThemeContext = createContext<Ctx | null>(null);

export function LangThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark"); // SSR-safe default
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const t = getInitialTheme();      // "dark" by default, ignores system
    setThemeState(t);
    applyTheme(t);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    applyTheme(t);
  };

  const value = useMemo(() => ({ theme, setTheme, lang, setLang }), [theme, lang]);
  return <LangThemeContext.Provider value={value}>{children}</LangThemeContext.Provider>;
}
