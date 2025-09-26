import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BackgroundNet from "../BackgroundNet";
import Controls from "../components/Controls";

function Chrome() {
  const { pathname } = useLocation();

  const isHome = pathname === "/";
  const isBlogIndex = pathname === "/blog";
  const isBlog = pathname.startsWith("/blog");
  const isBlogPost = isBlog && !isBlogIndex;

  // Show BG on home + all blog pages (index + posts)
  const showBg = isHome || isBlog;

  // Tune intensity per page
  const bg = useMemo(() => {
    if (isHome) {
      return { density: 0.00005, connectDist: 140, dotSize: 1.6, maxSpeed: 0.035 };
    }
    if (isBlogIndex) {
      return { density: 0.000028, connectDist: 120, dotSize: 1.35, maxSpeed: 0.028 };
    }
    if (isBlogPost) {
      // slightly softer than index
      return { density: 0.000028, connectDist: 120, dotSize: 1.35, maxSpeed: 0.028 };
    }
    return null;
  }, [isHome, isBlogIndex, isBlogPost]);

  const [motionOK, setMotionOK] = useState(true);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionOK(!m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);

  return (
    <div className="relative min-h-screen">
      {motionOK && showBg && bg && (
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <BackgroundNet {...bg} />
          {(isBlogIndex || isBlogPost) && (
            // a gentle veil for readability over posts too
            <div className="absolute inset-0 bg-white/10 dark:bg-black/20" />
          )}
        </div>
      )}

      {/* Floating controls */}
      <div className="fixed top-3 right-3 z-30 pointer-events-auto">
        <Controls />
      </div>

      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

export default Chrome;

