// src/ctx/LangThemeContext.tsx
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { applyTheme, getInitialTheme } from "../theme"; // use "@/theme" if alias set
import { detectLang } from "../types/lang";
export const LangThemeContext = createContext(null);
export function LangThemeProvider({ children }) {
    const [theme, setThemeState] = useState("dark");
    const [lang, setLang] = useState("en");
    useEffect(() => {
        // init theme + lang once
        const t = getInitialTheme();
        setThemeState(t);
        applyTheme(t);
        setLang(detectLang());
    }, []);
    const setTheme = (t) => { setThemeState(t); applyTheme(t); };
    const value = useMemo(() => ({ theme, setTheme, lang, setLang }), [theme, lang]);
    return _jsx(LangThemeContext.Provider, { value: value, children: children });
}
