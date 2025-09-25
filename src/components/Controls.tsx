// src/components/Controls.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLangThemeCtx } from "../ctx/LangThemeContext";
import { saveLang } from "../i18n";
import { toggleTheme } from "../theme";

export default function Controls() {
  const ctx = useLangThemeCtx();
  if (!ctx) return null;
  const { lang, setLang, theme, setTheme } = ctx;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // handle base path (e.g., GitHub Pages)
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  const stripBase = (p: string) =>
    p.startsWith(base) ? p.slice(base.length - (base.endsWith("/") ? 1 : 0)) : p;

  const p = stripBase(pathname);
  const isBlog = p === "/blog" || p.startsWith("/blog/");

  const pill =
    "flex items-center gap-2 rounded-full border backdrop-blur shadow-sm " +
    "px-2.5 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm " +
    "border-neutral-300 bg-white/90 text-neutral-900 hover:bg-white " +
    "dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-100 dark:hover:bg-neutral-900";

  return (
    <div className="fixed z-[9999] flex gap-1.5 sm:gap-2 bottom-3 right-3 sm:bottom-auto sm:top-4 sm:right-4
                    pr-[max(0px,env(safe-area-inset-right))] pb-[max(0px,env(safe-area-inset-bottom))]">
      {/* Blog/Home pill (dynamic) */}
      <button
        type="button"
        onClick={() => navigate(isBlog ? "/" : "/blog")}
        className={pill}
        aria-label={isBlog ? "Go to home" : "Open blog"}
        title={isBlog ? "Home" : "Blog"}
      >
        {isBlog ? "🏠 Home" : "📝 Blog"}
      </button>

      {/* Lang pill */}
      <button
        type="button"
        aria-label="Toggle language"
        onClick={() => {
          const next = lang === "en" ? "fr" : "en";
          setLang(next as typeof lang);
          saveLang(next as typeof lang);
        }}
        className={pill}
      >
        <span className="tabular-nums font-medium">{lang === "en" ? "EN" : "FR"}</span>
        <span className="text-neutral-400">|</span>
        <span>{lang === "en" ? "FR" : "EN"}</span>
      </button>

      {/* Theme pill */}
      <button
        type="button"
        aria-label="Toggle color theme"
        aria-pressed={theme === "dark"}
        onClick={() => setTheme(toggleTheme())}
        className={pill}
      >
        <span className="font-medium">{theme === "dark" ? "🌙" : "☀️"}</span>
      </button>
    </div>
  );
}

