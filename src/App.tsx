"use client";
import React, { useState, useEffect } from "react";

// ---------------------------------------------
// One-page personal website for Jules Collenne
// Tech: React + Tailwind CSS
// - Left static column (photo, bio, socials)
// - Right scrollable content with sections:
//   Hero/Presentation, News, Publications (with Show more), Projects, Teaching
// - Mobile: sidebar collapses to top; content stacks
// - Dark mode friendly (uses system preference)
// ---------------------------------------------

// ---- Replace these with your real links/data ----
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/JulesCollenne" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jules-collenne/" },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=TQJRonQAAAAJ&hl=en" },
  { label: "ORCID", href: "https://orcid.org/0000-0002-7540-0610" },
  { label: "Stack Overflow", href: "https://stackoverflow.com/users/12384070/sashimid%C3%A9licieux" }, // adjust if needed
  { label: "Email", href: "mailto:jules.collenne@gmail.com" }, // add if you want a public email
];

const NEWS = [
  { date: "2024-12-01", text: "Officially earned my PhD in AI applied to medicine!" },
  { date: "2024-06-01", text: "Our work was accepted for presentation at ICIP 2024." },
  { date: "2024-05-01", text: "Served as reviewer for MICCAI 2024 and BMVC 2024." },
  { date: "2023-10-01", text: "Presented at the MLMI Workshop at MICCAI 2023." },
  { date: "2023-10-15", text: "Attended ICCV 2023." },
  { date: "2022-03-01", text: "Contributed to the SHAP library (pull request)." },
];

const PUBLICATIONS = [
  {
    title:
      "ReSet: A Residual Set-Transformer approach to tackle the ugly-duckling sign in melanoma detection",
    venue: "IEEE ICIP",
    year: 2024,
    authors: "J. Collenne, R. Iguernaissi, S. Dubuisson, D. Merad",
    links: [
      { label: "Project", href: "https://github.com/JulesCollenne/ReSeT" },
    ],
  },
  {
    title:
      "Automated melanoma detection. An algorithm inspired from human intelligence characterizing disordered pattern of melanocytic lesions improving a convolutional neural network.",
    venue: "Journal of the American Academy of Dermatology (JAAD)",
    year: 2024,
    authors:
      "J. Monnier, A.C. Foahom Gouabou, M. Serdi, J. Collenne, R. Iguernaissi, M.-A. Richard, C. Gaudy-Marqueste, J.-L. Damoiseaux, J.-J. Grob, D. Merad",
    links: [
      { label: "DOI", href: "https://doi.org/10.1016/j.jaad.2024.02.063" },
    ],
  },
  {
    title:
      "Fusion between an Algorithm Based on the Characterization of Melanocytic Lesions Asymmetry with an Ensemble of Convolutional Neural Networks for Melanoma Detection",
    venue: "Journal of Investigative Dermatology (JID)",
    year: 2024,
    authors:
      "J. Collenne, J. Monnier, R. Iguernaissi, M. Nawaf, M.-A. Richard, J.-J. Grob, C. Gaudy-Marqueste, S. Dubuisson, D. Merad",
    links: [
      { label: "DOI", href: "https://doi.org/10.1016/j.jid.2023.09.289" },
    ],
  },
  {
    title:
      "Enhancing Anomaly Detection in Melanoma Diagnosis Through Self-Supervised Training and Lesion Comparison",
    venue: "MLMI (MICCAI Workshop)",
    year: 2023,
    authors: "J. Collenne, R. Iguernaissi, S. Dubuisson, D. Merad",
    links: [
      { label: "Springer", href: "https://link.springer.com/chapter/10.1007/978-3-031-45676-3_16" },
    ],
  },
  {
    title:
      "Computer Aided Diagnosis of Melanoma Using Deep Neural Networks and Game Theory: Application on Dermoscopic Images of Skin Lesions",
    venue: "International Journal of Molecular Sciences (IJMS)",
    year: 2022,
    authors:
      "A.C. Foahom Gouabou, J. Collenne, J. Monnier, R. Iguernaissi, J.-L. Damoiseaux, A. Moudafi, D. Merad",
    links: [
      { label: "MDPI", href: "https://www.mdpi.com/1937126" },
    ],
  },
];


const PROJECTS = [
  {
    title: "Guess the Movie (Web)",
    blurb: "A web game where players guess a movie based on a list of emojis.",
    tags: ["Web", "Game"],
    link: "https://www.guessthemovie.eu/",
  },
  {
    title: "SJ-MAE",
    blurb:
      "Multi-task ViT pretraining combining masked reconstruction, jigsaw, and contrastive objectives.",
    tags: ["Vision Transformers", "SSL"],
    link: "https://github.com/JulesCollenne/SJ-MAE",
  },
];

const TEACHING = [
  {
    course: "Intro to Programming (Python)",
    role: "Lecturer / TA",
    years: "2023–2025",
    details:
      "TD/TP on recursion, trees, algorithmic puzzles; bonus TP: Gomoku with AI.",
  },
  {
    course: "Systems Programming (C)",
    role: "TA",
    years: "2024–2025",
    details:
      "TPs on memory, file processing (TextUtil), and MagickWand image compositing.",
  },
];

export default function OnePageSite() {

useEffect(() => {
  const script = document.createElement("script");
  script.src =
    "//clustrmaps.com/globe.js?d=zyT_D9l9lZVUoIn2kwibM4SiArPSNyX605T1uE28GZo";
  script.id = "clstr_globe";
  script.async = true;

  const container = document.getElementById("clustrmap-container");
  if (container) {
    container.innerHTML = ""; // clear if already mounted
    container.appendChild(script);
  }
}, []);


  const [pubCount, setPubCount] = useState(2); // default visible publications
  const showMore = () => setPubCount((c) => Math.min(c + 3, PUBLICATIONS.length));
  const showLess = () => setPubCount(2);

  // Utility for date formatting
  const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
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
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">PhD AI Researcher</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                I build self-supervised learning systems for vision, apply AI to medecine, explore multi‑task pretraining, and prototype optimization tools.
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
              <div>
                <h1 className="text-2xl font-semibold">Jules Collenne</h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">AI Researcher</p>
              </div>
            </div>
          </header>

          {/* About / Presentation */}
          <section id="about" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold">Jules Collenne, PhD – AI Researcher</h2>
            <p className="mt-3 leading-relaxed text-neutral-700 dark:text-neutral-300">
              Hey there! My name is Jules Collenne, and I hold a PhD in Artificial Intelligence 🖥️ Applied to Medicine 🩺. My research focuses on computer-aided diagnosis, interpretability of machine learning models, and, in a more general and theoretical manner, unsupervised visual representation learning.

🤗 I’m actively seeking an Arxiv endorsement! 📚🔍 Please feel free to contact me via email.
            </p>
          </section>

          <Divider />

          {/* News */}
          <section id="news" className="scroll-mt-24">
            <SectionTitle>News</SectionTitle>
            <ul className="mt-3 space-y-3">
              {NEWS.map((n) => (
                <li key={n.date} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-xs tabular-nums text-neutral-500 w-24">
                    {fmt(n.date)}
                  </span>
                  <p className="leading-relaxed">{n.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <Divider />

          {/* Publications with Show More */}
          <section id="publications" className="scroll-mt-24">
            <SectionTitle>Publications</SectionTitle>
            <ul className="mt-4 space-y-6">
              {PUBLICATIONS.slice(0, pubCount).map((p, i) => (
                <li key={i} className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
                  <div className="text-base font-medium">{p.title}</div>
                  <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
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
                <button onClick={showMore} className="rounded-xl border border-neutral-300 px-4 py-2 text-sm shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900">
                  Show more
                </button>
              ) : null}
              {pubCount > 2 ? (
                <button onClick={showLess} className="rounded-xl border border-neutral-300 px-4 py-2 text-sm shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900">
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
              {PROJECTS.map((pr) => (
                <article key={pr.title} className="rounded-2xl border border-neutral-200 p-4 shadow-sm transition hover:shadow-md dark:border-neutral-800">
                  <h3 className="font-medium">{pr.title}</h3>
                  <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{pr.blurb}</p>
                  {pr.tags?.length ? (
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-500">
                      {pr.tags.map((t) => (
                        <span key={t} className="rounded-full border border-neutral-300 px-2 py-0.5 dark:border-neutral-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
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
                </article>
              ))}
            </div>
          </section>

          <Divider />

          {/* Teaching */}
          <section id="teaching" className="scroll-mt-24">
            <SectionTitle>Teaching</SectionTitle>
            <ul className="mt-4 space-y-4">
              {TEACHING.map((t) => (
                <li key={t.course} className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-medium">{t.course}</h3>
                    <div className="text-xs text-neutral-500">{t.years}</div>
                  </div>
                  <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{t.role}</div>
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{t.details}</p>
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

