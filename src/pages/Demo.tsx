"use client";
import React from "react";
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
      component: <LatentSpaceDemo />,
    },
  ];

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${
        theme === "dark"
          ? "bg-neutral-950 text-neutral-100"
          : "bg-white text-neutral-900"
      }`}
    >
      {/* Background */}
      <BackgroundNet
        density={0.00005}
        connectDist={140}
        maxSpeed={0.035}
        dotSize={1.6}
        dark={theme === "dark"}
      />

      {/* Foreground */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold text-center">
          {lang === "fr" ? "Démos interactives" : "Interactive Demos"}
        </h1>
        <p className="mt-3 text-center text-sm text-neutral-600 dark:text-neutral-400">
          {lang === "fr"
            ? "Aperçu visuel et interactif de mes projets récents."
            : "Visual and interactive previews of my recent projects."}
        </p>

        {/* Demos grid */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {DEMOS.map((d) =>
            d.component ? (
              // Inline interactive demo
              <div
                key={d.title}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="p-4">
                  <h2 className="font-semibold">{d.title}</h2>
                  <p className="mt-1 mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                    {d.desc[lang]}
                  </p>
                  {d.component}
                </div>
              </div>
            ) : (
              // Regular clickable demo card
              <a
                key={d.title}
                href={d.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group block rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={d.media}
                  alt={d.title}
                  className="w-full h-48 object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div className="p-4">
                  <h2 className="font-semibold">{d.title}</h2>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {d.desc[lang]}
                  </p>
                </div>
              </a>
            )
          )}
        </div>

        {/* Back to home */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="text-sm underline underline-offset-4 hover:no-underline text-neutral-500"
          >
            ← {lang === "fr" ? "Retour à l’accueil" : "Back to home"}
          </Link>
        </div>
      </main>
    </div>
  );
}

