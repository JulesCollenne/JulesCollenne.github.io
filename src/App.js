"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import ConsultingCTA from "./ConsultingCTA";
import Collaborators from "./components/Collaborators";
import { detectLang, t } from "./i18n";
import BackgroundNet from "./BackgroundNet";
import { getInitialTheme } from "./theme";
import { Link } from "react-router-dom";
import "./index.css";
import { useLangThemeCtx } from "./hooks/useLangTheme";
// ---------------------------------------------
// One-page personal website for Jules Collenne
// ---------------------------------------------
const SOCIALS = [
    { label: "GitHub", href: "https://github.com/JulesCollenne" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jules-collenne/" },
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=TQJRonQAAAAJ&hl=en" },
    { label: "ORCID", href: "https://orcid.org/0000-0002-7540-0610" },
    { label: "Stack Overflow", href: "https://stackoverflow.com/users/12384070/sashimid%C3%A9licieux" },
    { label: "Email", href: "mailto:julescollennepro@gmail.com" },
];
const NEWS = [
    { date: "2025-09-18", text: "GuessTheMovie is live!", url: "https://www.guessthemovie.eu/" },
    { date: "2025-09-01", text: "Launched my consulting company in AI & Data Science 🚀" },
    { date: "2025-07-23", text: "Submitted Sj-Mae: Unified Multi-Task Pretraining of Vision Transformers Via Masked, Jigsaw and Contrastive Objectives in Neurocomputing!", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5349677" },
    { date: "2024-12-01", text: "Officially earned my PhD in AI applied to medicine!" },
    { date: "2024-06-01", text: "Our work was accepted for presentation at ICIP 2024." },
    { date: "2024-05-01", text: "Served as reviewer for MICCAI 2024 and BMVC 2024." },
    { date: "2023-10-01", text: "Presented at the MLMI Workshop at MICCAI 2023." },
    { date: "2023-10-15", text: "Attended ICCV 2023." },
    { date: "2022-03-01", text: "Contributed to the SHAP library (pull request)." },
];
const PUBLICATIONS = [
    {
        id: "reset-icip-2024",
        title: "ReSet: A Residual Set-Transformer approach to tackle the ugly-duckling sign in melanoma detection",
        venue: "IEEE ICIP",
        year: 2024,
        authors: "J. Collenne, R. Iguernaissi, S. Dubuisson, D. Merad",
        links: [{ label: "Project", href: "https://github.com/JulesCollenne/ReSeT" }],
    },
    {
        id: "jaad-2024",
        title: "Automated melanoma detection. An algorithm inspired from human intelligence characterizing disordered pattern of melanocytic lesions improving a convolutional neural network.",
        venue: "JAAD",
        year: 2024,
        authors: "J. Monnier, A.C. Foahom Gouabou, M. Serdi, J. Collenne, R. Iguernaissi, M.-A. Richard, C. Gaudy-Marqueste, J.-L. Damoiseaux, J.-J. Grob, D. Merad",
        links: [{ label: "DOI", href: "https://doi.org/10.1016/j.jaad.2024.02.063" }],
    },
    {
        id: "jid-2024",
        title: "Fusion between an Algorithm Based on the Characterization of Melanocytic Lesions Asymmetry with an Ensemble of Convolutional Neural Networks for Melanoma Detection",
        venue: "JID",
        year: 2024,
        authors: "J. Collenne, J. Monnier, R. Iguernaissi, M. Nawaf, M.-A. Richard, J.-J. Grob, C. Gaudy-Marqueste, S. Dubuisson, D. Merad",
        links: [{ label: "DOI", href: "https://doi.org/10.1016/j.jid.2023.09.289" }],
    },
    {
        id: "mlmi-2023",
        title: "Enhancing Anomaly Detection in Melanoma Diagnosis Through Self-Supervised Training and Lesion Comparison",
        venue: "MLMI (MICCAI Workshop)",
        year: 2023,
        authors: "J. Collenne, R. Iguernaissi, S. Dubuisson, D. Merad",
        links: [{ label: "Springer", href: "https://link.springer.com/chapter/10.1007/978-3-031-45676-3_16" }],
    },
    {
        id: "ijms-2022",
        title: "Computer Aided Diagnosis of Melanoma Using Deep Neural Networks and Game Theory: Application on Dermoscopic Images of Skin Lesions",
        venue: "IJMS",
        year: 2022,
        authors: "A.C. Foahom Gouabou, J. Collenne, J. Monnier, R. Iguernaissi, J.-L. Damoiseaux, A. Moudafi, D. Merad",
        links: [{ label: "MDPI", href: "https://www.mdpi.com/1937126" }],
    },
];
const PROJECTS = [
    {
        field: { en: "Machine Learning & AI", fr: "Apprentissage automatique & IA" },
        projects: [
            {
                title: "SJ-MAE",
                blurb: {
                    en: "Multi-task ViT pretraining combining masked reconstruction, jigsaw, and contrastive objectives.",
                    fr: "Pré-entraînement ViT multi-tâches combinant reconstruction masquée, puzzle « jigsaw » et objectifs contrastifs.",
                },
                tags: ["Vision Transformers", "SSL"],
                link: "https://github.com/JulesCollenne/SJ-MAE",
            },
            {
                title: "Melanoma Detection (PhD)",
                blurb: {
                    en: "End-to-end computer-aided diagnosis for dermoscopy: asymmetry cues, lesion comparison, and self-supervised pretraining to improve melanoma detection and interpretability.",
                    fr: "Aide au diagnostic de bout en bout en dermoscopie : asymétries, comparaison de lésions et pré-entraînement auto-supervisé pour améliorer la détection du mélanome et l’interprétabilité.",
                },
                tags: ["Medical AI", "Dermatology", "CAD"],
                link: "https://scholar.google.com/citations?user=TQJRonQAAAAJ&hl=en",
                relatedPubIds: ["reset-icip-2024", "jaad-2024", "jid-2024", "mlmi-2023", "ijms-2022"],
                logo: "/logos/lesion.png",
            },
        ],
    },
    {
        field: { en: "Games & Interactive Projects", fr: "Jeux & projets interactifs" },
        projects: [
            {
                title: "Guess the Movie (Web)",
                blurb: {
                    en: "A web game where players guess a movie based on a list of emojis.",
                    fr: "Un jeu web où l’on devine un film à partir d’une liste d’emojis.",
                },
                tags: ["Web", "Game"],
                link: "https://www.guessthemovie.eu/",
                logo: "/logos/guessthemovie.ico",
            },
            {
                title: "NoRiz",
                blurb: {
                    en: "A Pac-Man–style maze action game written in Java. Control NoRiz, a sad sushi on a quest to recover lost rice while dodging hungry cats.",
                    fr: "Un jeu d’action labyrinthe façon Pac-Man en Java. Incarnez NoRiz, un sushi triste en quête de riz perdu tout en évitant des chats affamés.",
                },
                tags: ["Java", "Game Dev"],
                link: "https://github.com/JulesCollenne/NoRiz",
                logo: "/logos/noriz.png",
            },
            {
                title: "GBZMRacing",
                blurb: {
                    en: "“GaBuZoMeu Racing”: an immersive racing game in C with GTK+, featuring a custom-made engine to create and play your own car races.",
                    fr: "« GaBuZoMeu Racing » : un jeu de course immersif en C avec GTK+, incluant un moteur maison pour créer et jouer vos propres circuits.",
                },
                tags: ["C", "Game Dev", "GTK+"],
                link: "https://github.com/JulesCollenne/GBZMRacing",
                logo: "/logos/gbzm.png",
            },
        ],
    },
    {
        field: { en: "Applications & Tools", fr: "Applications & outils" },
        projects: [
            {
                title: "FoodNow",
                blurb: {
                    en: "Android food-recommendation app built with Java, PHP, and MySQL. Features recipe search based on the fridge, favorites, and chef’s daily tips.",
                    fr: "Application Android de recommandation culinaire (Java, PHP, MySQL). Recherche de recettes selon le frigo, favoris et astuces du chef.",
                },
                tags: ["Android", "Java", "Full-stack"],
                link: "https://github.com/JulesCollenne/FoodNow",
                logo: "/logos/sashimi.png",
            },
        ],
    },
];
const TEACHING = [
    {
        division: { en: "Licence Informatique — Aix-Marseille Université", fr: "Licence Informatique — Aix-Marseille Université" },
        years: "2024–2025",
        courses: [
            {
                course: { en: "Intro to Computer Science", fr: "Introduction à l’informatique" },
                role: { en: "Lecturer / TA", fr: "Enseignant / Tuteur" },
                details: {
                    en: "Introductory lectures and practicals for first-year students: fundamentals of computer science, programming basics, and digital systems.",
                    fr: "Cours et TD/TP introductifs pour les étudiants de première année : bases de l’informatique, introduction à la programmation et systèmes numériques.",
                },
            },
            {
                course: { en: "Programming (Python)", fr: "Programmation (Python)" },
                role: { en: "Lecturer / TA", fr: "Enseignant / Tuteur" },
                details: {
                    en: "Beginner and advanced Python: recursion, data structures (trees, lists), and algorithmic problem-solving.",
                    fr: "Cours de Python (débutant et avancé) : récursivité, structures de données (arbres, listes) et résolution d’énigmes algorithmiques.",
                },
            },
            {
                course: { en: "Systems Programming (C)", fr: "Programmation systèmes (C)" },
                role: { en: "Lecturer / TA", fr: "Enseignant / Tuteur" },
                details: {
                    en: "C programming for second-year students, focusing on pointers, memory management, and file I/O.",
                    fr: "Cours et TP de C pour les étudiants de deuxième année : pointeurs, gestion mémoire et entrées/sorties de fichiers.",
                },
            },
            {
                course: { en: "Discrete Structures", fr: "Structures discrètes" },
                role: { en: "TA", fr: "Tuteur" },
                details: {
                    en: "Exercises and labs on logic, sets, relations, graphs, and combinatorics.",
                    fr: "TD/TP de logique, ensembles, relations, graphes et combinatoire.",
                },
            },
            {
                course: { en: "Computer Architecture", fr: "Fonctionnement des ordinateurs" },
                role: { en: "TA", fr: "Tuteur" },
                details: {
                    en: "Fundamentals of computer architecture and assembly-level operations.",
                    fr: "Bases de l’architecture des ordinateurs et opérations de bas niveau.",
                },
            },
            {
                course: { en: "Relational Databases (SQL)", fr: "Bases de données relationnelles (SQL)" },
                role: { en: "Lecturer / TA", fr: "Enseignant / Tuteur" },
                details: {
                    en: "Relational database theory and SQL queries with MySQL.",
                    fr: "Cours et TP sur les bases de données relationnelles et le langage SQL avec MySQL.",
                },
            },
        ],
    },
    {
        division: { en: "IUT d’Aix-Marseille Université", fr: "IUT d’Aix-Marseille Université" },
        years: "2021–2024",
        courses: [
            {
                course: { en: "Databases (SQL)", fr: "Bases de données (SQL)" },
                role: { en: "TA", fr: "Tuteur" },
                details: {
                    en: "Database concepts and advanced SQL with MySQL and Oracle.",
                    fr: "Enseignement du SQL avancé avec MySQL et Oracle.",
                },
            },
            {
                course: { en: "Web Development", fr: "Développement web" },
                role: { en: "TA", fr: "Tuteur" },
                details: {
                    en: "Web development labs using HTML, CSS, and JavaScript.",
                    fr: "TP de développement web avec HTML, CSS et JavaScript.",
                },
            },
            {
                course: { en: "Professional Communication", fr: "Communication professionnelle" },
                role: { en: "TA", fr: "Tuteur" },
                details: {
                    en: "Workshops on technical and professional communication.",
                    fr: "Ateliers de communication technique et professionnelle.",
                },
            },
        ],
    },
];
function primaryLink(p) {
    if (!p.links?.length)
        return null;
    const preferred = p.links.find((l) => /doi\.org|springer\.com|mdpi\.com/i.test(l.href));
    return preferred ?? p.links[0];
}
function pubsByIds(ids) {
    const map = new Map(PUBLICATIONS.map((p) => [p.id, p]));
    return ids.map((id) => map.get(id)).filter(Boolean);
}
function slugify(s) {
    return s.toLowerCase().replace(/\W+/g, "-");
}
function initials(s) {
    return s
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("");
}
export default function OnePageSite() {
    const ctx = useLangThemeCtx();
    const lang = ctx?.lang ?? detectLang();
    //const setLang = ctx?.setLang ?? (() => {});
    const theme = ctx?.theme ?? getInitialTheme();
    //const setTheme = ctx?.setTheme ?? (() => {});
    const [newsCount, setNewsCount] = useState(5);
    const sortedNews = React.useMemo(() => [...NEWS].sort((a, b) => b.date.localeCompare(a.date)), []);
    const showMoreNews = () => setNewsCount((n) => Math.min(n + 5, sortedNews.length));
    const collapseNews = () => setNewsCount(5);
    const hasMoreNews = newsCount < sortedNews.length;
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//clustrmaps.com/globe.js?d=zyT_D9l9lZVUoIn2kwibM4SiArPSNyX605T1uE28GZo";
        script.id = "clstr_globe";
        script.async = true;
        const container = document.getElementById("clustrmap-container");
        if (container) {
            container.innerHTML = "";
            container.appendChild(script);
        }
    }, []);
    const [pubCount, setPubCount] = useState(3);
    const [openRelated, setOpenRelated] = useState({});
    const showMore = () => setPubCount((c) => Math.min(c + 3, PUBLICATIONS.length));
    const showLess = () => setPubCount(3);
    const fmt = (d) => new Date(d + "T00:00:00").toLocaleDateString(lang === "fr" ? "fr-FR" : undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    return (_jsxs("div", { className: "min-h-screen antialiased overflow-x-hidden\n                bg-white text-neutral-900\n                dark:bg-neutral-950 dark:text-neutral-100", children: [_jsx(BackgroundNet, { density: 0.00005, connectDist: 140, maxSpeed: 0.035, dotSize: 1.6, dark: theme === "dark" }), _jsx("div", { className: "relative z-10", children: _jsxs("div", { className: "flex w-full gap-8 px-4 py-8 sm:px-6 lg:px-8", children: [_jsx("aside", { className: "hidden w-80 shrink-0 lg:block", children: _jsxs("div", { className: "sticky top-6 flex h-[calc(100vh-3rem)] flex-col justify-between rounded-2xl border border-neutral-200 p-6 shadow-sm dark:border-neutral-800", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: "/profile.jpeg", alt: "Jules Collenne headshot", className: "h-30 w-30 rounded-2xl object-cover" }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold leading-tight", children: "Jules Collenne" }), _jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: t(lang, "role_full") })] })] }), _jsx("p", { className: "mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 break-words", children: t(lang, "tagline") }), _jsx("nav", { className: "mt-6 space-y-1 text-sm", children: [
                                                    { id: "about", label: t(lang, "nav_about") },
                                                    { id: "news", label: t(lang, "nav_news") },
                                                    { id: "publications", label: t(lang, "nav_pubs") },
                                                    { id: "projects", label: t(lang, "nav_projects") },
                                                    { id: "teaching", label: t(lang, "nav_teaching") },
                                                ].map((s) => (_jsx("a", { href: `#${s.id}`, className: "block rounded-lg px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-900", children: s.label }, s.id))) })] }), _jsx("div", { id: "clustrmap-container", className: "clustrmap mb-4", style: { width: "60px", height: "60px", overflow: "hidden" } }), _jsxs("div", { children: [_jsx("div", { className: "mb-2 text-xs uppercase tracking-wider text-neutral-500", children: t(lang, "on_the_web") }), _jsx("ul", { className: "space-y-2 text-sm", children: SOCIALS.map((s) => (_jsx("li", { children: _jsx("a", { href: s.href, className: "rounded-md underline-offset-4 hover:underline", target: "_blank", rel: "noreferrer noopener", children: s.label }) }, s.label))) })] })] }) }), _jsxs("main", { className: "flex-1 min-w-0", children: [_jsx("header", { className: "mb-6 lg:hidden", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: "/profile.jpeg", alt: "Jules Collenne headshot", className: "h-16 w-16 rounded-2xl object-cover" }), _jsxs("div", { className: "min-w-0", children: [_jsx("h1", { className: "text-2xl font-semibold break-words", children: "Jules Collenne" }), _jsx("p", { className: "text-sm text-neutral-600 dark:text-neutral-400 break-words", children: t(lang, "role_short") })] })] }) }), _jsxs("section", { id: "about", className: "scroll-mt-24", children: [_jsx("h2", { className: "text-2xl font-semibold break-words", children: t(lang, "about_h2") }), _jsxs("p", { className: "mt-3 leading-relaxed text-neutral-700 dark:text-neutral-300 break-words", children: [t(lang, "about_p1"), _jsx("br", {}), t(lang, "about_p2"), _jsx("br", {}), t(lang, "about_p3")] }), _jsx("div", { className: "mt-6 flex flex-wrap gap-2 text-xs text-neutral-600 dark:text-neutral-400", children: (lang === "fr"
                                                ? [
                                                    "Apprentissage auto-supervisé",
                                                    "PyTorch",
                                                    "TensorFlow",
                                                    "Deep learning médical",
                                                    "Analyse d’images dermatologiques",
                                                    "FastAPI",
                                                    "Next.js",
                                                    "SQL",
                                                    "GitHub",
                                                    "Docker",
                                                    "Pipeline de données",
                                                    "Déploiement IA",
                                                ]
                                                : [
                                                    "Self-supervised learning",
                                                    "PyTorch",
                                                    "TensorFlow",
                                                    "Medical AI",
                                                    "Dermatology imaging",
                                                    "FastAPI",
                                                    "Next.js",
                                                    "SQL",
                                                    "GitHub",
                                                    "Docker",
                                                    "Data pipelines",
                                                    "AI deployment",
                                                ]).map((kw) => (_jsx("span", { className: "rounded-full border border-neutral-300 px-2 py-1 dark:border-neutral-700", children: kw }, kw))) }), _jsx("br", {}), _jsx(ConsultingCTA, { lang: lang })] }), _jsx(Divider, {}), _jsx("div", { className: "mt-6 w-full", children: _jsx("ul", { className: "flex flex-wrap gap-3", children: [
                                            //{ name: lang === "fr" ? "🔧️ Démos" : "🔧️ Demos", href: "/demo" },
                                            { name: t(lang, "refs_title_guessthemovie"), href: "https://www.guessthemovie.eu" },
                                            { name: t(lang, "refs_title_ebooks"), href: "https://julesphere354.gumroad.com/" },
                                            { name: t(lang, "refs_title_fiverr"), href: "https://www.fiverr.com/s/o8ZNge8" },
                                            /*{
                                              name: t(lang, "refs_title_lessons"),
                                              href: "https://www.superprof.fr/diplome-doctorat-intelligence-artificielle-universite-aix-marseille-enseigne-programmation-python-java.html",
                                            },*/
                                        ].map((ref) => (_jsx("li", { className: "min-w-0 basis-[calc(50%-0.375rem)] sm:flex-[0_1_auto]", children: ref.href.startsWith("/") ? (_jsx(Link, { to: ref.href, className: "block w-full text-center rounded-lg px-4 py-2 text-sm font-medium\n                       bg-neutral-100 text-neutral-700 hover:bg-neutral-200\n                       dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700\n                       transition-colors truncate", title: ref.name, children: ref.name })) : (_jsx("a", { href: ref.href, target: "_blank", rel: "noopener noreferrer", className: "block w-full text-center rounded-lg px-4 py-2 text-sm font-medium\n                       bg-neutral-100 text-neutral-700 hover:bg-neutral-200\n                       dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700\n                       transition-colors truncate", title: ref.name, children: ref.name })) }, ref.href))) }) }), _jsx(Divider, {}), _jsxs("section", { id: "news", className: "scroll-mt-24", children: [_jsx(SectionTitle, { children: t(lang, "nav_news") }), _jsx("ul", { className: "mt-3 space-y-3", children: sortedNews.slice(0, newsCount).map((n) => (_jsxs("li", { className: "flex gap-3", children: [_jsx("span", { className: "mt-0.5 shrink-0 text-xs tabular-nums text-neutral-500 w-24", children: fmt(n.date) }), _jsxs("p", { className: "leading-relaxed flex-1 min-w-0 break-words", children: [n.text, n.url && (_jsxs(_Fragment, { children: [" ", _jsx("a", { href: n.url, target: "_blank", rel: "noopener noreferrer", className: "text-sm text-blue-600 underline hover:no-underline dark:text-blue-400", children: "(link)" })] }))] })] }, n.date))) }), _jsxs("div", { className: "mt-3 flex gap-4 text-sm", children: [hasMoreNews && (_jsx("span", { onClick: showMoreNews, className: "text-neutral-500 hover:text-neutral-700 hover:underline cursor-pointer", children: t(lang, "news_more") })), newsCount > 5 && (_jsx("span", { onClick: collapseNews, className: "text-neutral-500 hover:text-neutral-700 hover:underline cursor-pointer", children: t(lang, "news_less") }))] })] }), _jsx(Divider, {}), _jsxs("section", { id: "publications", className: "scroll-mt-24", children: [_jsx(SectionTitle, { children: t(lang, "nav_pubs") }), _jsx("div", { className: "mt-1", children: _jsx("a", { href: "https://scholar.google.com/citations?user=TQJRonQAAAAJ&hl=en", target: "_blank", rel: "noreferrer noopener", className: "inline-flex items-center gap-1 rounded-lg border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700 underline-offset-4 hover:bg-neutral-50 hover:underline dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900", children: t(lang, "pubs_view_all") }) }), _jsx("ul", { className: "mt-4 space-y-6", children: PUBLICATIONS.slice(0, pubCount).map((p, i) => (_jsxs("li", { className: "rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800", children: [_jsx("div", { className: "text-base font-medium break-words", children: p.title }), _jsxs("div", { className: "mt-1 text-sm text-neutral-600 dark:text-neutral-400 break-words", children: [p.authors, " \u00B7 ", p.venue, " \u00B7 ", p.year] }), p.links?.length ? (_jsx("div", { className: "mt-2 flex flex-wrap gap-3 text-sm", children: p.links.map((l) => (_jsx("a", { href: l.href, className: "rounded-md underline-offset-4 hover:underline", target: "_blank", rel: "noreferrer noopener", children: l.label }, l.label))) })) : null] }, i))) }), _jsxs("div", { className: "mt-3 flex gap-4 text-sm", children: [pubCount < PUBLICATIONS.length && (_jsx("span", { onClick: showMore, className: "text-neutral-500 hover:text-neutral-700 hover:underline cursor-pointer", children: t(lang, "news_more") || (lang === "fr" ? "Voir plus" : "Show more") })), pubCount > 3 && (_jsx("span", { onClick: showLess, className: "text-neutral-500 hover:text-neutral-700 hover:underline cursor-pointer", children: t(lang, "news_less") || (lang === "fr" ? "Voir moins" : "Show less") }))] })] }), _jsx(Divider, {}), _jsxs("section", { id: "projects", className: "scroll-mt-24", children: [_jsx(SectionTitle, { children: t(lang, "nav_projects") }), _jsx("div", { className: "mt-4 space-y-8", children: PROJECTS.map((group) => (_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-neutral-800 dark:text-neutral-200", children: group.field[lang] }), _jsx("div", { className: "mt-3 grid gap-4 md:grid-cols-2", children: group.projects.map((pr) => {
                                                            const hasRelated = Array.isArray(pr.relatedPubIds) &&
                                                                pr.relatedPubIds.length > 0;
                                                            const panelId = `related-${slugify(pr.title)}`;
                                                            const isOpen = !!openRelated[pr.title];
                                                            return (_jsxs("article", { className: "rounded-2xl border border-neutral-200 p-4 shadow-sm transition hover:shadow-md dark:border-neutral-800", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h3", { className: "font-medium break-words", children: pr.title }), _jsx("p", { className: "mt-1 text-sm text-neutral-700 dark:text-neutral-300 break-words", children: typeof pr.blurb === "string" ? pr.blurb : pr.blurb[lang] }), pr.tags?.length ? (_jsx("div", { className: "mt-2 flex flex-wrap gap-2 text-xs text-neutral-500", children: pr.tags.map((t) => (_jsx("span", { className: "rounded-full border border-neutral-300 px-2 py-0.5 dark:border-neutral-700", children: t }, t))) })) : null, _jsx("div", { className: "mt-3", children: _jsx("a", { href: pr.link, className: "text-sm underline underline-offset-4 hover:no-underline", target: "_blank", rel: "noreferrer noopener", children: t(lang, "learn_more") }) })] }), _jsx("a", { href: pr.link, target: "_blank", rel: "noreferrer noopener", className: "shrink-0", "aria-label": `${pr.title} logo`, children: "logo" in pr && pr.logo ? (_jsx("img", { src: pr.logo, alt: `${pr.title} logo`, className: "h-12 w-12 md:h-16 md:w-16 rounded-xl object-contain bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-2", loading: "lazy", decoding: "async" })) : (_jsx("div", { className: "h-12 w-12 md:h-16 md:w-16 rounded-xl grid place-items-center bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-600 dark:text-neutral-300", children: initials(pr.title) })) })] }), hasRelated ? (_jsxs("div", { className: "mt-3", children: [_jsxs("button", { onClick: () => setOpenRelated((s) => ({ ...s, [pr.title]: !s[pr.title] })), "aria-expanded": isOpen, "aria-controls": panelId, className: "inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-1.5 text-sm shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900", children: [_jsx("span", { children: isOpen ? t(lang, "related_hide") : t(lang, "related_show") }), _jsx("svg", { className: `h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`, viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: _jsx("path", { fillRule: "evenodd", d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z", clipRule: "evenodd" }) })] }), _jsx("div", { id: panelId, className: `overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`, children: _jsxs("div", { className: "mt-3 rounded-xl border border-neutral-200 p-3 text-sm dark:border-neutral-800", children: [_jsx("div", { className: "mb-2 font-medium", children: "Related papers" }), _jsx("ul", { className: "space-y-1", children: pubsByIds(pr.relatedPubIds).map((p) => {
                                                                                                const pl = primaryLink(p);
                                                                                                return (_jsx("li", { className: "break-words", children: pl ? (_jsxs("a", { href: pl.href, className: "underline underline-offset-4 hover:no-underline", target: "_blank", rel: "noreferrer noopener", children: [p.title, " \u00B7 ", p.venue, " ", p.year] })) : (_jsxs("span", { children: [p.title, " \u00B7 ", p.venue, " ", p.year] })) }, p.id));
                                                                                            }) })] }) })] })) : null] }, pr.title));
                                                        }) })] }, group.field.en))) })] }), _jsx(Divider, {}), _jsxs("section", { id: "teaching", className: "scroll-mt-24", children: [_jsx(SectionTitle, { children: t(lang, "nav_teaching") }), _jsx("div", { className: "mt-4 space-y-8", children: TEACHING.map((group) => {
                                                const [visibleCount, setVisibleCount] = React.useState(3);
                                                const hasMore = group.courses.length > visibleCount;
                                                return (_jsxs("div", { children: [_jsxs("h2", { className: "text-lg font-semibold text-neutral-800 dark:text-neutral-200", children: [group.division[lang], _jsx("span", { className: "text-sm text-neutral-500 ml-2", children: group.years })] }), _jsx("ul", { className: "mt-3 space-y-4", children: group.courses.slice(0, visibleCount).map((tch) => (_jsxs("li", { className: "rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800", children: [_jsx("div", { className: "flex flex-wrap items-baseline justify-between gap-2 min-w-0", children: _jsx("h3", { className: "font-medium break-words", children: tch.course[lang] }) }), _jsx("div", { className: "mt-1 text-sm text-neutral-600 dark:text-neutral-400 break-words", children: tch.role[lang] }), _jsx("p", { className: "mt-2 text-sm text-neutral-700 dark:text-neutral-300 break-words", children: tch.details[lang] })] }, tch.course.en))) }), _jsxs("div", { className: "mt-3 flex gap-4 text-sm", children: [hasMore && (_jsx("span", { onClick: () => setVisibleCount(group.courses.length), className: "text-neutral-500 hover:text-neutral-700 hover:underline cursor-pointer", children: t(lang, "news_more") ||
                                                                        (lang === "fr" ? "Voir plus" : "Show more") })), visibleCount > 3 && (_jsx("span", { onClick: () => setVisibleCount(3), className: "text-neutral-500 hover:text-neutral-700 hover:underline cursor-pointer", children: t(lang, "news_less") ||
                                                                        (lang === "fr" ? "Voir moins" : "Show less") }))] })] }, group.division.en));
                                            }) })] }), _jsx(Divider, {}), _jsx(Collaborators, { lang: lang }), _jsxs("footer", { className: "my-12 text-center text-xs text-neutral-500", children: ["\u00A9 ", new Date().getFullYear(), " Jules Collenne. ", t(lang, "footer_rights")] })] })] }) })] }));
}
function SectionTitle({ children }) {
    return _jsx("h2", { className: "text-xl font-semibold", children: children });
}
function Divider() {
    return _jsx("hr", { className: "my-8 border-neutral-200 dark:border-neutral-800" });
}
