import { Outlet, useLocation } from "react-router-dom";
import { LangThemeProvider } from "../ctx/LangThemeContext"; // ✅ same relative path
import BackgroundNet from "../BackgroundNet";
import Controls from "../components/Controls";

export default function AppShell() {
  return (
    <LangThemeProvider>
      <Chrome />
    </LangThemeProvider>
  );
}

function Chrome() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isBlogIndex = pathname === "/blog";
  const isBlog = pathname.startsWith("/blog");
  const isBlogPost = isBlog && !isBlogIndex;

  const showBg = isHome || isBlog;
  const bg = isHome
    ? { density: 0.00005, connectDist: 140, dotSize: 1.6, maxSpeed: 0.035 }
    : isBlogIndex
    ? { density: 0.000028, connectDist: 120, dotSize: 1.35, maxSpeed: 0.028 }
    : { density: 0.000028, connectDist: 120, dotSize: 1.35, maxSpeed: 0.028 };

  return (
    <div className="relative min-h-screen">
      {showBg && (
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <BackgroundNet {...bg} />
          {(isBlogIndex || isBlogPost) && (
            <div className="absolute inset-0 bg-white/10 dark:bg-black/20" />
          )}
        </div>
      )}

      {/* Floating controls LIVE UNDER THE PROVIDER */}
      <div className="fixed top-3 right-3 z-30 pointer-events-auto">
        <Controls />
      </div>

      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

