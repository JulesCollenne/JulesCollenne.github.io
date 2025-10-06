"use client";

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

export default function Collaborators({ lang }: { lang: "en" | "fr" }) {
  const testimonials = TESTIMONIALS[lang] ?? TESTIMONIALS.en;

  return (
    <section id="collaborators" className="scroll-mt-24">
      {/* Title */}
      <h2 className="text-xl font-semibold text-center">
        {lang === "fr"
          ? "Collaborations & Témoignages"
          : "Collaborations & Testimonials"}
      </h2>

      {/* Optional description */}
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 text-center">
        {lang === "fr"
          ? "Collaborations en recherche et projets d’intelligence artificielle appliquée à la médecine."
          : "Research collaborations and applied AI projects in medicine."}
      </p>

      {/* Logos */}
      <div className="mt-6 flex flex-wrap justify-center gap-6 sm:gap-10">
        {COLLABORATORS.map((c) => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-transform hover:scale-105"
          >
            <img
              src={c.img}
              alt={c.name}
              className="h-10 sm:h-14 object-contain grayscale hover:grayscale-0 transition duration-300"
              loading="lazy"
              decoding="async"
            />
          </a>
        ))}
      </div>
      
      <br/>

      {/* Testimonials */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 text-sm text-neutral-700 dark:text-neutral-300">
        {testimonials.map((t) => (
          <blockquote
            key={t.name}
            className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800"
          >
            {/* Stars */}
            <div className="mb-1 text-amber-500 text-xs">
              {"⭐".repeat(t.stars)}
            </div>

            {/* Text */}
            <p className="italic">“{t.text}”</p>

            {/* Footer */}
            <footer className="mt-2 text-sm text-neutral-500">
              — {t.name}, {t.role}
            </footer>
          </blockquote>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-center text-xs text-neutral-500">
        {lang === "fr"
          ? "Avis extraits de ma page publique Fiverr."
          : "Reviews extracted from my public Fiverr page."}{" "}
        <a
          href="https://www.fiverr.com/s/o8ZNge8"
          target="_blank"
          rel="noreferrer noopener"
          className="underline hover:no-underline"
        >
          Fiverr.com
        </a>
      </p>
    </section>
  );
}

