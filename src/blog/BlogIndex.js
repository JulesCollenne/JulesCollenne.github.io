import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { posts } from "./registry";
function fmt(d) {
    return new Date(d + "T00:00:00").toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}
export default function BlogIndex() {
    const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
    return (_jsxs("main", { className: "mx-auto max-w-3xl px-4 py-10", children: [_jsx("h1", { className: "text-3xl font-semibold", children: "Blog" }), _jsx("ul", { className: "mt-8 space-y-6", children: sorted.map((p) => (_jsx("li", { children: _jsxs("article", { className: "rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800", children: [p.cover && (_jsx(Link, { to: `/blog/${p.slug}`, children: _jsx("img", { src: p.cover, alt: "", className: "w-full rounded-xl mb-4", loading: "lazy" }) })), _jsxs("header", { className: "flex items-baseline justify-between gap-4", children: [_jsx("h2", { className: "text-xl font-medium", children: _jsx(Link, { to: `/blog/${p.slug}`, className: "underline-offset-4 hover:underline", children: p.title }) }), _jsx("time", { className: "text-sm text-neutral-500", children: fmt(p.date) })] }), p.summary && (_jsx("p", { className: "mt-2 text-neutral-700 dark:text-neutral-300", children: p.summary })), p.tags?.length ? (_jsx("div", { className: "mt-3 flex flex-wrap gap-2 text-xs text-neutral-500", children: p.tags.map((t) => (_jsxs("span", { className: "rounded-full border px-2 py-0.5 dark:border-neutral-700", children: ["#", t] }, t))) })) : null] }) }, p.slug))) }), _jsx("div", { className: "mt-10", children: _jsx(Link, { to: "/", className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 bg-black/40 backdrop-blur hover:bg-white/10 text-sm", children: "\u2190 Home" }) })] }));
}
