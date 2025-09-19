// src/i18n.ts
export type Lang = "en" | "fr";

const STORAGE_KEY = "site.lang";

export const detectLang = (): Lang => {
  const saved = (localStorage.getItem(STORAGE_KEY) || "").toLowerCase();
  if (saved === "fr" || saved === "en") return saved as Lang;
  // navigator preference
  const nav = navigator.languages?.[0] || navigator.language || "en";
  return nav.toLowerCase().startsWith("fr") ? "fr" : "en";
};

export const saveLang = (lang: Lang) => localStorage.setItem(STORAGE_KEY, lang);

export const dict = {
  en: {
    role_full: "PhD – AI Researcher and Freelance",
    role_short: "AI Researcher",
    tagline:
      "I build self-supervised learning systems for vision, apply AI to medicine, explore multi-task pretraining, and prototype optimization tools.",
    nav_about: "About",
    nav_news: "News",
    nav_pubs: "Publications",
    nav_projects: "Projects",
    nav_teaching: "Teaching",
    on_the_web: "On the web",
    about_h2: "Jules Collenne, PhD – AI Researcher and Freelance",
    about_p1:
      "Hey there! I’m Jules Collenne, and I hold a PhD in Artificial Intelligence applied to medicine.",
    about_p2:
      "My research focuses on machine learning for computer-aided diagnosis, interpretability, and unsupervised visual representation learning.",
    about_p3:
      "I also take on consulting projects to design and integrate ML pipelines into production systems and research prototypes.",
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
    role_full: "PhD – Chercheur IA et Freelance",
    role_short: "Chercheur IA",
    tagline:
      "Je conçois des systèmes d’apprentissage auto-supervisé pour la vision, j’applique l’IA à la médecine, j’explore le pré-entraînement multi-tâches et je prototype des outils d’optimisation.",
    nav_about: "À propos",
    nav_news: "Actualités",
    nav_pubs: "Publications",
    nav_projects: "Projets",
    nav_teaching: "Enseignement",
    on_the_web: "Sur le web",
    about_h2: "Jules Collenne, PhD – Chercheur IA et Freelance",
    about_p1:
      "Salut ! Je suis Jules Collenne, titulaire d’un doctorat en Intelligence Artificielle appliquée à la médecine.",
    about_p2:
      "Mes recherches portent sur l’apprentissage automatique pour l’aide au diagnostic, l’interprétabilité, et l’apprentissage non supervisé de représentations visuelles.",
    about_p3:
      "Je réalise aussi des missions de conseil pour concevoir et intégrer des pipelines ML en production et dans des prototypes de recherche.",
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
} as const;

export const t = (lang: Lang, key: keyof typeof dict["en"]) =>
  (dict as any)[lang][key] as string;

