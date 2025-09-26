// src/hooks/useLangTheme.ts
"use client";
import { useContext } from "react";
// ✅ import the context from *ctx*, not from this file
import { LangThemeContext } from "../ctx/LangThemeContext"; // or "@/ctx/LangThemeContext" if alias is set

export function useLangThemeCtx() {
  const ctx = useContext(LangThemeContext);
  if (!ctx) throw new Error("useLangThemeCtx must be used within <LangThemeProvider>");
  return ctx;
}

// convenience alias
export const useLangTheme = useLangThemeCtx;
export default useLangTheme;
