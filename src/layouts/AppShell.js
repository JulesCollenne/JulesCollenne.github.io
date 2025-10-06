import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useLocation } from "react-router-dom";
import { LangThemeProvider } from "../ctx/LangThemeContext";
import BackgroundNet from "../BackgroundNet";
import Controls from "../components/Controls";
import ScrollTop from "../components/ScrollTop";
export default function AppShell() {
    return (_jsx(LangThemeProvider, { children: _jsx(Chrome, {}) }));
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
    return (_jsxs("div", { className: "relative min-h-screen", children: [showBg && (_jsxs("div", { className: "fixed inset-0 -z-10 pointer-events-none", children: [_jsx(BackgroundNet, { ...bg }), (isBlogIndex || isBlogPost) && (_jsx("div", { className: "absolute inset-0 bg-white/10 dark:bg-black/20" }))] })), _jsxs("div", { className: "fixed top-3 right-3 z-30 pointer-events-auto", children: [_jsx(Controls, {}), _jsx(ScrollTop, {})] }), _jsx("main", { className: "relative z-10", children: _jsx(Outlet, {}) })] }));
}
