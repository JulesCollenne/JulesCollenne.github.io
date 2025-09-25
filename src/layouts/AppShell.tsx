// src/layouts/AppShell.tsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Controls from "../components/Controls";
import { useLangTheme } from "../hooks/useLangTheme";
import { LangThemeContext } from "../ctx/LangThemeContext";
import BackgroundNet from "../BackgroundNet";

export default function AppShell() {
  const { lang, setLang, theme, setTheme } = useLangTheme();
  const { pathname } = useLocation();

  // BG: home “plein”, index blog “subtil”, articles off
  const isHome = pathname === "/";
  const isBlogIndex = pathname === "/blog";
  const showBg = isHome || isBlogIndex;
  const bg = isHome
    ? { density: 0.00005, connectDist: 140, dotSize: 1.6, maxSpeed: 0.035 }
    : { density: 0.000028, connectDist: 120, dotSize: 1.35, maxSpeed: 0.028 };

  const [motionOK, setMotionOK] = React.useState(true);
  React.useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionOK(!m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);

  return (
    <LangThemeContext.Provider value={{ lang, setLang, theme, setTheme }}>
      {motionOK && showBg && (
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <BackgroundNet {...bg} dark={theme === "dark"} />
          {isBlogIndex && <div className="absolute inset-0 bg-white/20 dark:bg-black/15" />}
        </div>
      )}

      {/* Controls lit le contexte tout seul */}
      <Controls />

      {/* Toutes les pages sont sous le Provider → re-render sur setLang */}
      <Outlet />
    </LangThemeContext.Provider>
  );
}

