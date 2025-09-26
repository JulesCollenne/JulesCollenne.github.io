// src/components/Controls.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { useLangThemeCtx } from "../hooks/useLangTheme";
import { type Lang, saveLang } from "../types/lang";

export default function Controls() {
  const { theme, setTheme, lang, setLang } = useLangThemeCtx();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Are we on the blog (index or a post)?
  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");

  // compact “pill” style (small text, subtle glass, works in dark/light)
  const pill =
    "inline-flex items-center gap-2 rounded-full border backdrop-blur shadow-sm " +
    "px-2.5 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm " +
    "border-neutral-300 bg-white/90 text-neutral-900 hover:bg-white " +
    "dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-100 dark:hover:bg-neutral-900";

  return (
    <div className="fixed z-[9999] flex gap-1.5 sm:gap-2 bottom-3 right-3 sm:bottom-auto sm:top-4 sm:right-4
                    pr-[max(0px,env(safe-area-inset-right))] pb-[max(0px,env(safe-area-inset-bottom))]">
      {/* Blog/Home toggle */}
      <button
        type="button"
        onClick={() => navigate(isBlog ? "/" : "/blog")}
        className={pill}
        aria-label={isBlog ? "Go to home" : "Open blog"}
        title={isBlog ? "Home" : "Blog"}
      >
        {isBlog ? "🏠 Home" : "📝 Blog"}
      </button>

      {/* Language toggle */}
      <button
        type="button"
        aria-label="Toggle language"
        onClick={() => {
          const next: Lang = lang === "en" ? "fr" : "en";
          setLang(next);
          saveLang(next);
        }}
        className={pill}
      >
        <span className="tabular-nums font-medium">{lang.toUpperCase()}</span>
        <span className="text-neutral-400">|</span>
        <span>{lang === "en" ? "FR" : "EN"}</span>
      </button>

      {/* Theme toggle */}
      <button
        type="button"
        aria-label="Toggle color theme"
        aria-pressed={theme === "dark"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={pill}
      >
        <span className="font-medium">{theme === "dark" ? "🌙" : "☀️"}</span>
      </button>
    </div>
  );
}

