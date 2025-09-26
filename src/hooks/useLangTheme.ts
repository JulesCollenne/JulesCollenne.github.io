import { useContext } from "react";
import { LangThemeContext } from "../ctx/LangThemeContext"; // ✅ relative, not "@/..."
export function useLangThemeCtx() {
  const ctx = useContext(LangThemeContext);
  if (!ctx) throw new Error("useLangThemeCtx must be used within <LangThemeProvider>");
  return ctx;
}
export const useLangTheme = useLangThemeCtx;
export default useLangTheme;

