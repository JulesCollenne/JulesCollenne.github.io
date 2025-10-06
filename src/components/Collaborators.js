"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ---------------------------------------------
// Constants (easy to update)
// ---------------------------------------------
const COLLABORATORS = [
    {
        name: "Aix-Marseille Université",
        img: "/collab/amu.png",
        url: "https://www.univ-amu.fr/",
    },
    {
        name: "Laboratoire Informatique & Systèmes",
        img: "/collab/lis.png",
        url: "https://www.lis-lab.fr/",
    },
    {
        name: "AP-HM (Hôpital de la Timone)",
        img: "/collab/aphm.png",
        url: "https://www.ap-hm.fr/",
    },
];
// Fiverr testimonials (public, safe to cite)
const TESTIMONIALS = {
    en: [
        {
            name: "a2daniels 🇺🇸",
            role: "Fiverr Client (Machine Learning)",
            stars: 5,
            text: "This seller was amazing! He delivered on content that most other professionals deemed impossible to do, and he did it at a fraction of the cost and time. He's the only seller I'll be purchasing from now on.",
        },
        {
            name: "daviddunand 🇫🇷",
            role: "Repeat Fiverr Client (Machine Learning)",
            stars: 5,
            text: "Wonderful work, everything explained clearly and simply, and a code perfectly working, i'm 100% satisfied !",
        },
    ],
    fr: [
        {
            name: "a2daniels 🇺🇸",
            role: "Client Fiverr (Machine Learning)",
            stars: 5,
            text: "Excellent prestation ! Jules a réalisé un travail que d’autres jugeaient impossible, et cela rapidement et à un coût très abordable. Le seul vendeur à qui je ferai désormais appel.",
        },
        {
            name: "daviddunand 🇫🇷",
            role: "Client Fiverr récurrent (Machine Learning)",
            stars: 5,
            text: "Magnifique travail, tout expliqué clairement et simplement, et un code fonctionnant parfaitement, je suis satisfait à 100% !",
        },
    ],
};
// ---------------------------------------------
// Component
// ---------------------------------------------
export default function Collaborators({ lang }) {
    const testimonials = TESTIMONIALS[lang] ?? TESTIMONIALS.en;
    return (_jsxs("section", { id: "collaborators", className: "scroll-mt-24", children: [_jsx("h2", { className: "text-xl font-semibold text-center", children: lang === "fr"
                    ? "Collaborations & Témoignages"
                    : "Collaborations & Testimonials" }), _jsx("p", { className: "mt-2 text-sm text-neutral-600 dark:text-neutral-400 text-center", children: lang === "fr"
                    ? "Collaborations en recherche et projets d’intelligence artificielle appliquée à la médecine."
                    : "Research collaborations and applied AI projects in medicine." }), _jsx("div", { className: "mt-6 flex flex-wrap justify-center gap-6 sm:gap-10", children: COLLABORATORS.map((c) => (_jsx("a", { href: c.url, target: "_blank", rel: "noreferrer noopener", className: "transition-transform hover:scale-105", children: _jsx("img", { src: c.img, alt: c.name, className: "h-10 sm:h-14 object-contain grayscale hover:grayscale-0 transition duration-300", loading: "lazy", decoding: "async" }) }, c.name))) }), _jsx("br", {}), _jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-2 text-sm text-neutral-700 dark:text-neutral-300", children: testimonials.map((t) => (_jsxs("blockquote", { className: "rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800", children: [_jsx("div", { className: "mb-1 text-amber-500 text-xs", children: "⭐".repeat(t.stars) }), _jsxs("p", { className: "italic", children: ["\u201C", t.text, "\u201D"] }), _jsxs("footer", { className: "mt-2 text-sm text-neutral-500", children: ["\u2014 ", t.name, ", ", t.role] })] }, t.name))) }), _jsxs("p", { className: "mt-6 text-center text-xs text-neutral-500", children: [lang === "fr"
                        ? "Avis extraits de ma page publique Fiverr."
                        : "Reviews extracted from my public Fiverr page.", " ", _jsx("a", { href: "https://www.fiverr.com/s/o8ZNge8", target: "_blank", rel: "noreferrer noopener", className: "underline hover:no-underline", children: "Fiverr.com" })] })] }));
}
