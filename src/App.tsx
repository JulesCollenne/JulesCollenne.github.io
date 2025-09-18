"use client";
import React, { useState, useEffect } from "react";
import ConsultingCTA from "./ConsultingCTA";

// ---------------------------------------------
// One-page personal website for Jules Collenne
// ---------------------------------------------

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/JulesCollenne" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jules-collenne/" },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=TQJRonQAAAAJ&hl=en" },
  { label: "ORCID", href: "https://orcid.org/0000-0002-7540-0610" },
  { label: "Stack Overflow", href: "https://stackoverflow.com/users/12384070/sashimid%C3%A9licieux" },
  { label: "Email", href: "mailto:jules.collenne@gmail.com" },
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
    title:
      "ReSet: A Residual Set-Transformer approach to tackle the ugly-duckling sign in melanoma detection",
    venue: "IEEE ICIP",
    year: 2024,
    authors: "J. Collenne, R. Iguernaissi, S. Dubuisson, D. Merad",
    links: [{ label: "Project", href: "https://github.com/JulesCollenne/ReSeT" }],
  },
  {
    id: "jaad-2024",
    title:
      "Automated melanoma detection. An algorithm inspired from human intelligence characterizing disordered pattern of melanocytic lesions improving a convolutional neural network.",
    venue: "JAAD",
    year: 2024,
    authors:
      "J. Monnier, A.C. Foahom Gouabou, M. Serdi, J. Collenne, R. Iguernaissi, M.-A. Richard, C. Gaudy-Marqueste, J.-L. Damoiseaux, J.-J. Grob, D. Merad",
    links: [{ label: "DOI", href: "https://doi.org/10.1016/j.jaad.2024.02.063" }],
  },
  {
    id: "jid-2024",
    title:
      "Fusion between an Algorithm Based on the Characterization of Melanocytic Lesions Asymmetry with an Ensemble of Convolutional Neural Networks for Melanoma Detection",
    venue: "JID",
    year: 2024,
    authors:
      "J. Collenne, J. Monnier, R. Iguernaissi, M. Nawaf, M.-A. Richard, J.-J. Grob, C. Gaudy-Marqueste, S. Dubuisson, D. Merad",
    links: [{ label: "DOI", href: "https://doi.org/10.1016/j.jid.2023.09.289" }],
  },
  {
    id: "mlmi-2023",
    title:
      "Enhancing Anomaly Detection in Melanoma Diagnosis Through Self-Supervised Training and Lesion Comparison",
    venue: "MLMI (MICCAI Workshop)",
    year: 2023,
    authors: "J. Collenne, R. Iguernaissi, S. Dubuisson, D. Merad",
    links: [{ label: "Springer", href: "https://link.springer.com/chapter/10.1007/978-3-031-45676-3_16" }],
  },
  {
    id: "ijms-2022",
    title:
      "Computer Aided Diagnosis of Melanoma Using Deep Neural Networks and Game Theory: Application on Dermoscopic Images of Skin Lesions",
    venue: "IJMS",
    year: 2022,
    authors:
      "A.C. Foahom Gouabou, J. Collenne, J. Monnier, R. Iguernaissi, J.-L. Damoiseaux, A. Moudafi, D. Merad",
    links: [{ label: "MDPI", href: "https://www.mdpi.com/1937126" }],
  },
];

const PROJECTS = [
  {
    title: "Guess the Movie (Web)",
    blurb: "A web game where players guess a movie based on a list of emojis.",
    tags: ["Web", "Game"],
    link: "https://www.guessthemovie.eu/",
    logo: "/logos/guessthemovie.ico",
  },
  {
    title: "SJ-MAE",
    blurb:
      "Multi-task ViT pretraining combining masked reconstruction, jigsaw, and contrastive objectives.",
    tags: ["Vision Transformers", "SSL"],
    link: "https://github.com/JulesCollenne/SJ-MAE",
  },
  {
    title: "Melanoma Detection (PhD)",
    blurb:
      "End-to-end computer-aided diagnosis for dermoscopy: asymmetry cues, lesion comparison, and self-supervised pretraining to improve melanoma detection and interpretability.",
    tags: ["Medical AI", "Dermatology", "CAD"],
    link: "https://scholar.google.com/citations?user=TQJRonQAAAAJ&hl=en",
    relatedPubIds: ["reset-icip-2024", "jaad-2024", "jid-2024", "mlmi-2023", "ijms-2022"],
    logo: "/logos/lesion.png",
  },
  {
    title: "NoRiz",
    blurb:
      "A Pac-Man–style maze action game written in Java. Control NoRiz, a sad sushi on a quest to recover lost rice while dodging hungry cats.",
    tags: ["Java", "Game Dev"],
    link: "https://github.com/JulesCollenne/NoRiz",
    logo: "/logos/noriz.png",
  },
  {
    title: "FoodNow",
    blurb:
      "Android food-recommendation app built with Java, PHP, and MySQL. Features recipe search based on the fridge, favorites, and chef’s daily tips.",
    tags: ["Android", "Java", "Full-stack"],
    link: "https://github.com/JulesCollenne/FoodNow",
    logo: "/logos/sashimi.png",
  },
  {
    title: "GBZMRacing",
    blurb:
      "“GaBuZoMeu Racing”: an immersive racing game in C with GTK+, featuring a custom-made engine to create and play your own car races.",
    tags: ["C", "Game Dev", "GTK+"],
    link: "https://github.com/JulesCollenne/GBZMRacing",
  },
];

const TEACHING = [
  {
    course: "Intro to Programming (Python)",
    role: "Lecturer / TA",
    years: "2023–2025",
    details:
      "Taught introductory and advanced Python, including recursion, trees, and algorithmic puzzles.",
  },
  {
    course: "Systems Programming (C)",
    role: "TA",
    years: "2024–2025",
    details:
      "Taught C programming, focusing on memory management and file processing.",
  },
  {
    course: "Databases (SQL)",
    role: "TA",
    years: "2022–2025",
    details:
      "Taught advanced SQL to 1st-, 2nd-, and 3rd-year students using MySQL and Oracle.",
  },
];

function primaryLink(p: (typeof PUBLICATIONS)[number]) {
  if (!p.links?.length) return null;
  const preferred = p.links.find((l) => /doi\.org|springer\.com|mdpi\.com/i.test(l.href));
  return preferred ?? p.links[0];
}

function pubsByIds(ids: string[]) {
  const map = new Map(PUBLICATIONS.map((p) => [p.id, p]));
  return ids.map((id) => map.get(id)).filter(Boolean) as typeof PUBLICATIONS;
}

function slugify(s: string) {
  return s.toLowerCase().replace(/\W+/g, "-");
}

function initials(s: string) {
  return s
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function OnePageSite() {
    const [newsCount, setNewsCount] = useState(5);
    const sortedNews = React.useMemo(
      () => [...NEWS].sort((a, b) => b.date.localeCompare(a.date)), // newest first
      []
    );
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

  const [pubCount, setPubCount] = useState(2);
  const [openRelated, setOpenRelated] = useState<Record<string, boolean>>({});

  const showMore = () => setPubCount((c) => Math.min(c + 3, PUBLICATIONS.length));
  const showLess = () => setPubCount(2);

  const fmt = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    // ⬇️ safety net against stray horizontal overflow
    <div className="min-h-screen antialiased overflow-x-hidden">
      {/* Layout wrapper */}
      <div className="flex w-full gap-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Left static column */}
        <aside className="hidden w-80 shrink-0 lg:block">
          <div className="sticky top-6 flex h-[calc(100vh-3rem)] flex-col justify-between rounded-2xl border border-neutral-200 p-6 shadow-sm dark:border-neutral-800">
            {/* Profile */}
            <div>
              <div className="flex items-center gap-4">
                <img
                  src="/profile.jpeg"
                  alt="Jules Collenne headshot"
                  className="h-30 w-30 rounded-2xl object-cover"
                />
                <div>
                  <h1 className="text-2xl font-semibold leading-tight">Jules Collenne</h1>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">PhD AI Researcher and Freelance</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 break-words">
                I build self-supervised learning systems for vision, apply AI to medecine, explore multi-task pretraining, and prototype optimization tools.
              </p>

              {/* Quick nav */}
              <nav className="mt-6 space-y-1 text-sm">
                {[
                  { id: "about", label: "About" },
                  { id: "news", label: "News" },
                  { id: "publications", label: "Publications" },
                  { id: "projects", label: "Projects" },
                  { id: "teaching", label: "Teaching" },
                ].map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block rounded-lg px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Clustrmap globe */}
            <div
              id="clustrmap-container"
              className="clustrmap mb-4"
              style={{ width: "60px", height: "60px", overflow: "hidden" }}
            />

            {/* Socials */}
            <div>
              <div className="mb-2 text-xs uppercase tracking-wider text-neutral-500">On the web</div>
              <ul className="space-y-2 text-sm">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="rounded-md underline-offset-4 hover:underline"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Right content column */}
        <main className="flex-1 min-w-0">
          {/* Mobile header */}
          <header className="mb-6 lg:hidden">
            <div className="flex items-center gap-4">
              <img
                src="/profile.jpeg"
                alt="Jules Collenne headshot"
                className="h-16 w-16 rounded-2xl object-cover"
              />
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold break-words">Jules Collenne</h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 break-words">AI Researcher</p>
              </div>
            </div>
          </header>

          {/* About / Presentation */}
          <section id="about" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold break-words">Jules Collenne, PhD – AI Researcher and Freelance</h2>
            <p className="mt-3 leading-relaxed text-neutral-700 dark:text-neutral-300 break-words">
              Hey there! I’m Jules Collenne, and I hold a PhD in Artificial Intelligence applied to medicine.
              <br />
              My research focuses on machine learning for computer-aided diagnosis, interpretability, and unsupervised visual representation learning.
              <br />
              I also take on consulting projects to design and integrate ML pipelines into production systems and research prototypes.
            </p>
            <br />
            {/* Consulting call-to-action */}
            <ConsultingCTA />
          </section>

          <Divider />

          {/* References slider (shrink on mobile) */}
<div className="mt-6 w-full">
  <ul
    className="
      flex flex-wrap gap-3
      /* if you still want horizontal scrolling on larger screens, uncomment next line */
      /* sm:flex-nowrap sm:overflow-x-auto sm:overscroll-x-contain */
    "
  >
    {[
      { name: "🎬 GuessTheMovie", href: "https://www.guessthemovie.eu" },
      { name: "📚 My e-Books", href: "https://julesphere354.gumroad.com/" },
      { name: "💼 Fiverr Page", href: "https://www.fiverr.com/s/o8ZNge8" },
      { name: "🎓 Private lessons", href: "https://www.superprof.fr/diplome-doctorat-intelligence-artificielle-universite-aix-marseille-enseigne-programmation-python-java.html" },
    ].map((ref) => (
      <li
        key={ref.href}
        className="min-w-0 basis-[calc(50%-0.375rem)] sm:flex-[0_1_auto]"
      >
        <a
          href={ref.href}
          target="_blank"
          rel="noopener noreferrer"
          className="
            block w-full text-center
            rounded-lg px-4 py-2 text-sm font-medium
            bg-neutral-100 text-neutral-700 hover:bg-neutral-200
            dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700
            transition-colors
            truncate
          "
          title={ref.name}
        >
          {ref.name}
        </a>
      </li>
    ))}
  </ul>
</div>


          <Divider />

          {/* News */}
          <section id="news" className="scroll-mt-24">
          <SectionTitle>News</SectionTitle>

          <ul className="mt-3 space-y-3">
            {sortedNews.slice(0, newsCount).map((n) => (
              <li key={n.date} className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-xs tabular-nums text-neutral-500 w-24">
                  {fmt(n.date)}
                </span>
                <p className="leading-relaxed flex-1 min-w-0 break-words">
  {n.text}
  {n.url && (
    <>
      {" "}
      <a
        href={n.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 underline hover:no-underline dark:text-blue-400"
      >
        (link)
      </a>
    </>
  )}
</p>

              </li>
            ))}
          </ul>

<div className="mt-3 flex gap-4 text-sm">
  {hasMoreNews && (
    <span
      onClick={showMoreNews}
      className="text-neutral-500 hover:text-neutral-700 hover:underline cursor-pointer"
    >
      See more →
    </span>
  )}
  {newsCount > 5 && (
    <span
      onClick={collapseNews}
      className="text-neutral-500 hover:text-neutral-700 hover:underline cursor-pointer"
    >
      ← See less
    </span>
  )}
</div>


        </section>

          <Divider />

          {/* Publications with Show More */}
          <section id="publications" className="scroll-mt-24">
            <SectionTitle>Publications</SectionTitle>

            <div className="mt-1">
              <a
                href="https://scholar.google.com/citations?user=TQJRonQAAAAJ&hl=en"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 rounded-lg border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700 underline-offset-4 hover:bg-neutral-50 hover:underline dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
              >
                View all on Google Scholar ↗
              </a>
            </div>

            <ul className="mt-4 space-y-6">
              {PUBLICATIONS.slice(0, pubCount).map((p, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800"
                >
                  <div className="text-base font-medium break-words">{p.title}</div>
                  <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 break-words">
                    {p.authors} · {p.venue} · {p.year}
                  </div>
                  {p.links?.length ? (
                    <div className="mt-2 flex flex-wrap gap-3 text-sm">
                      {p.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          className="rounded-md underline-offset-4 hover:underline"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex gap-3">
              {pubCount < PUBLICATIONS.length ? (
                <button
                  onClick={showMore}
                  className="rounded-xl border border-neutral-300 px-4 py-2 text-sm shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
                >
                  Show more
                </button>
              ) : null}
              {pubCount > 2 ? (
                <button
                  onClick={showLess}
                  className="rounded-xl border border-neutral-300 px-4 py-2 text-sm shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
                >
                  Show less
                </button>
              ) : null}
            </div>
          </section>

          <Divider />

          {/* Projects */}
          <section id="projects" className="scroll-mt-24">
            <SectionTitle>Projects</SectionTitle>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {PROJECTS.map((pr) => {
                const hasRelated = Array.isArray((pr as any).relatedPubIds) && (pr as any).relatedPubIds.length > 0;
                const panelId = `related-${slugify(pr.title)}`;
                const isOpen = !!openRelated[pr.title];
                return (
                  <article
                    key={pr.title}
                    className="rounded-2xl border border-neutral-200 p-4 shadow-sm transition hover:shadow-md dark:border-neutral-800"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: text */}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium break-words">{pr.title}</h3>
                        <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 break-words">{pr.blurb}</p>

                        {/* Tags */}
                        {pr.tags?.length ? (
                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-500">
                            {pr.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-neutral-300 px-2 py-0.5 dark:border-neutral-700"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        {/* Learn more link */}
                        <div className="mt-3">
                          <a
                            href={pr.link}
                            className="text-sm underline underline-offset-4 hover:no-underline"
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            Learn more →
                          </a>
                        </div>
                      </div>

                      {/* Right: logo */}
                      <a
                        href={pr.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="shrink-0"
                        aria-label={`${pr.title} logo`}
                      >
                        {pr.logo ? (
                          <img
                            src={pr.logo}
                            alt={`${pr.title} logo`}
                            className="h-12 w-12 md:h-16 md:w-16 rounded-xl object-contain bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-2"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl grid place-items-center bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                            {initials(pr.title)}
                          </div>
                        )}
                      </a>
                    </div>

                    {/* Toggle related papers */}
                    {hasRelated ? (
                      <div className="mt-3">
                        <button
                          onClick={() =>
                            setOpenRelated((s) => ({ ...s, [pr.title]: !s[pr.title] }))
                          }
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-1.5 text-sm shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
                        >
                          <span>{isOpen ? "Hide related papers" : "Show related papers"}</span>
                          <svg
                            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        <div
                          id={panelId}
                          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="mt-3 rounded-xl border border-neutral-200 p-3 text-sm dark:border-neutral-800">
                            <div className="mb-2 font-medium">Related papers</div>
                            <ul className="space-y-1">
                              {pubsByIds((pr as any).relatedPubIds).map((p) => {
                                const pl = primaryLink(p);
                                return (
                                  <li key={p.id} className="break-words">
                                    {pl ? (
                                      <a
                                        href={pl.href}
                                        className="underline underline-offset-4 hover:no-underline"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                      >
                                        {p.title} · {p.venue} {p.year}
                                      </a>
                                    ) : (
                                      <span>
                                        {p.title} · {p.venue} {p.year}
                                      </span>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>

          <Divider />

          {/* Teaching */}
          <section id="teaching" className="scroll-mt-24">
            <SectionTitle>Teaching</SectionTitle>
            <ul className="mt-4 space-y-4">
              {TEACHING.map((t) => (
                <li key={t.course} className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
                  {/* ⬇️ allow row to wrap safely */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2 min-w-0">
                    <h3 className="font-medium break-words">{t.course}</h3>
                    <div className="text-xs text-neutral-500">{t.years}</div>
                  </div>
                  <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 break-words">{t.role}</div>
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 break-words">{t.details}</p>
                </li>
              ))}
            </ul>
          </section>

          <footer className="my-12 text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} Jules Collenne. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

function Divider() {
  return <hr className="my-8 border-neutral-200 dark:border-neutral-800" />;
}

