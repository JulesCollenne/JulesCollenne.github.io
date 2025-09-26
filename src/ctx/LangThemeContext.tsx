// src/ctx/LangThemeContext.tsx
"use client";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { applyTheme, getInitialTheme, type Theme } from "../theme"; // use "@/theme" if alias set

import { type Lang, detectLang } from "../types/lang";

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
};

export const LangThemeContext = createContext<Ctx | null>(null);

export function LangThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    // init theme + lang once
    const t = getInitialTheme();
    setThemeState(t);
    applyTheme(t);
    setLang(detectLang());
  }, []);

  const setTheme = (t: Theme) => { setThemeState(t); applyTheme(t); };

  const value = useMemo(() => ({ theme, setTheme, lang, setLang }), [theme, lang]);
  return <LangThemeContext.Provider value={value}>{children}</LangThemeContext.Provider>;
}
