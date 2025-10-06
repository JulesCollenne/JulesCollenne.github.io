import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export default function ScrollTop() {
    const [visible, setVisible] = useState(false);
    // Show button only after scrolling down a bit
    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    // Reuse “pill” style from Controls
    const pill = "inline-flex items-center gap-2 rounded-full border backdrop-blur shadow-sm " +
        "px-2.5 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm transition-all duration-300 " +
        "border-neutral-300 bg-white/90 text-neutral-900 hover:bg-white " +
        "dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-100 dark:hover:bg-neutral-900";
    if (!visible)
        return null;
    return (_jsxs("button", { type: "button", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }), className: `${pill} fixed bottom-16 right-4 z-[9998]`, "aria-label": "Scroll to top", title: "Scroll to top", children: ["\u2B06\uFE0F ", _jsx("span", { className: "hidden sm:inline", children: "Top" })] }));
}
