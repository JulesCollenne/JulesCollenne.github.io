// src/hooks/useLangTheme.ts
import { useEffect, useState } from "react";
import { detectLang, saveLang, type Lang } from "../i18n";
import { getThemeFromDOM, getInitialTheme, applyTheme, type Theme } from "../theme";

export function useLangTheme() {
  const [lang, setLang] = useState<Lang>(() => detectLang());
  useEffect(() => { saveLang(lang); }, [lang]);

  // also react to Controls’ custom event
  useEffect(() => {
    const onLang = (e: Event) => {
      const next = (e as CustomEvent).detail as Lang;
      setLang(next);
    };
    window.addEventListener("lang:changed", onLang);
    return () => window.removeEventListener("lang:changed", onLang);
  }, []);

  const [theme, setTheme] = useState<Theme>(() => getThemeFromDOM());
  useEffect(() => {
    const initial = getInitialTheme();
    applyTheme(initial);
    setTheme(getThemeFromDOM());
  }, []);
  useEffect(() => {
    const obs = new MutationObserver(() => setTheme(getThemeFromDOM()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return { lang, setLang, theme, setTheme };
}

