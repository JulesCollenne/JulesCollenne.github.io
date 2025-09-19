// src/theme.ts
export type Theme = "light" | "dark";
const STORAGE_KEY = "site.theme";

/** Read current theme from the DOM (.dark on <html>) */
export function getThemeFromDOM(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** Apply theme to DOM + persist */
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
}

/** Toggle and return the new theme */
export function toggleTheme(): Theme {
  const next: Theme = getThemeFromDOM() === "dark" ? "light" : "dark";
  applyTheme(next);
  return next;
}

/** Initial theme = localStorage -> system -> light (used by inline script) */
export function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {}
  const systemDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  return systemDark ? "dark" : "light";
}

