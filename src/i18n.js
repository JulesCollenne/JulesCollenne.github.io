const STORAGE_KEY = "site.lang";
export const detectLang = () => {
    const saved = (localStorage.getItem(STORAGE_KEY) || "").toLowerCase();
    if (saved === "fr" || saved === "en")
        return saved;
    // navigator preference
    const nav = navigator.languages?.[0] || navigator.language || "en";
    return nav.toLowerCase().startsWith("fr") ? "fr" : "en";
};
export const saveLang = (lang) => localStorage.setItem(STORAGE_KEY, lang);
export const dict = {
    en: {
        role_full: "PhD – AI Research & Development",
        role_short: "PhD - AI R&D",
        tagline: "I build applied AI self-supervised vision, medical imaging, and production ML systems.",
        nav_about: "About",
        nav_news: "News",
        nav_pubs: "Publications",
        nav_projects: "Projects",
        nav_teaching: "Teaching",
        on_the_web: "On the web",
        about_h2: "Jules Collenne, PhD – AI Research and Development",
        about_p1: "Hey there! I design new ML models, deploy them, and make pipelines more efficient with AI! ",
        about_p2: "My research focuses on machine learning for computer-aided diagnosis, interpretability, and unsupervised visual representation learning.",
        about_p3: "I also take on consulting projects to design and integrate ML pipelines into production systems and research prototypes.",
        refs_title_guessthemovie: "🎬 GuessTheMovie",
        refs_title_ebooks: "📚 My e-Books",
        refs_title_fiverr: "💼 Fiverr Page",
        refs_title_lessons: "🎓 Private lessons",
        news_more: "See more →",
        news_less: "← See less",
        pubs_view_all: "View all on Google Scholar ↗",
        btn_show_more: "Show more",
        btn_show_less: "Show less",
        learn_more: "Learn more →",
        related_show: "Show related papers",
        related_hide: "Hide related papers",
        footer_rights: "All rights reserved.",
    },
    fr: {
        role_full: "PhD – Recherche & Développement en IA",
        role_short: "PhD - R&D IA",
        tagline: "Je conçois de l’IA appliquée : vision auto-supervisée, imagerie médicale et systèmes ML en production.",
        nav_about: "À propos",
        nav_news: "Actualités",
        nav_pubs: "Publications",
        nav_projects: "Projets",
        nav_teaching: "Enseignement",
        on_the_web: "Sur le web",
        about_h2: "Jules Collenne, PhD – Recherche et Développement en IA",
        about_p1: "Je conçois de nouveaux modèles de ML, je les déploie et j’améliore l’efficacité des pipelines grâce à l’IA.",
        about_p2: "Mes recherches portent sur l’apprentissage automatique pour l’aide au diagnostic, l’interprétabilité et l’apprentissage non supervisé de représentations visuelles.",
        about_p3: "Je réalise aussi des missions de conseil pour concevoir et intégrer des pipelines ML en production et dans des prototypes de recherche.",
        refs_title_guessthemovie: "🎬 GuessTheMovie",
        refs_title_ebooks: "📚 Mes e-books",
        refs_title_fiverr: "💼 Profil Fiverr",
        refs_title_lessons: "🎓 Cours particuliers",
        news_more: "Voir plus →",
        news_less: "← Voir moins",
        pubs_view_all: "Tout voir sur Google Scholar ↗",
        btn_show_more: "Afficher plus",
        btn_show_less: "Afficher moins",
        learn_more: "En savoir plus →",
        related_show: "Afficher les articles liés",
        related_hide: "Masquer les articles liés",
        footer_rights: "Tous droits réservés.",
    },
};
export const t = (lang, key) => dict[lang][key];
