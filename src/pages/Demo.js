"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLangThemeCtx } from "../hooks/useLangTheme";
import { Link } from "react-router-dom";
import BackgroundNet from "../BackgroundNet";
import LatentSpaceDemo from "./LatentSpaceDemo";
export default function DemoPage() {
    const { lang, theme } = useLangThemeCtx();
    const DEMOS = [
        {
            title: "GuessTheMovie",
            desc: {
                en: "Emoji-based movie guessing web game.",
                fr: "Jeu web où l’on devine un film à partir d’emojis.",
            },
            media: "/demos/guessthemovie.gif",
            url: "https://www.guessthemovie.eu",
        },
        {
            title: "SJ-MAE Visual Reconstructions",
            desc: {
                en: "Visualization of masked-image pretraining and jigsaw reconstructions.",
                fr: "Visualisation du pré-entraînement masqué et des reconstructions Jigsaw.",
            },
            media: "/demos/sjmae_recon.png",
            url: "https://github.com/JulesCollenne/SJ-MAE",
        },
        {
            title: "Lesion Latent Space (MLMI 2023)",
            desc: {
                en: "2D projection of lesion embeddings showing anomaly detection results.",
                fr: "Projection 2D des embeddings de lésions illustrant la détection d’anomalies.",
            },
            component: _jsx(LatentSpaceDemo, {}),
        },
    ];
    return (_jsxs("div", { className: `relative min-h-screen overflow-hidden ${theme === "dark"
            ? "bg-neutral-950 text-neutral-100"
            : "bg-white text-neutral-900"}`, children: [_jsx(BackgroundNet, { density: 0.00005, connectDist: 140, maxSpeed: 0.035, dotSize: 1.6, dark: theme === "dark" }), _jsxs("main", { className: "relative z-10 max-w-4xl mx-auto px-4 py-12", children: [_jsx("h1", { className: "text-3xl font-semibold text-center", children: lang === "fr" ? "Démos interactives" : "Interactive Demos" }), _jsx("p", { className: "mt-3 text-center text-sm text-neutral-600 dark:text-neutral-400", children: lang === "fr"
                            ? "Aperçu visuel et interactif de mes projets récents."
                            : "Visual and interactive previews of my recent projects." }), _jsx("div", { className: "mt-10 grid gap-8 md:grid-cols-2", children: DEMOS.map((d) => d.component ? (
                        // Inline interactive demo
                        _jsx("div", { className: "rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-md transition", children: _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "font-semibold", children: d.title }), _jsx("p", { className: "mt-1 mb-4 text-sm text-neutral-600 dark:text-neutral-400", children: d.desc[lang] }), d.component] }) }, d.title)) : (
                        // Regular clickable demo card
                        _jsxs("a", { href: d.url, target: "_blank", rel: "noreferrer noopener", className: "group block rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-lg transition", children: [_jsx("img", { src: d.media, alt: d.title, className: "w-full h-48 object-cover group-hover:scale-[1.03] transition-transform duration-300" }), _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "font-semibold", children: d.title }), _jsx("p", { className: "mt-1 text-sm text-neutral-600 dark:text-neutral-400", children: d.desc[lang] })] })] }, d.title))) }), _jsx("div", { className: "mt-12 text-center", children: _jsxs(Link, { to: "/", className: "text-sm underline underline-offset-4 hover:no-underline text-neutral-500", children: ["\u2190 ", lang === "fr" ? "Retour à l’accueil" : "Back to home"] }) })] })] }));
}
