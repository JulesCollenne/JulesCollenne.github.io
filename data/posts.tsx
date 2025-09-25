import { ReactNode } from "react";

export type Post = {
  slug: string;          // URL: /blog/[slug]
  title: string;
  date: string;          // ISO: "2025-09-25"
  summary?: string;
  tags?: string[];
  content: ReactNode;    // du JSX simple, pas de lib en plus
};

export const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Hello, world 👋",
    date: "2025-09-25",
    summary: "Premier billet : pourquoi j’ajoute un blog.",
    tags: ["meta"],
    content: (
      <>
        <p>Bienvenue sur mon blog. Ici je parlerai IA, projets, et notes rapides.</p>
        <p>La stack: Next.js App Router, Tailwind, et du JSX pour commencer.</p>
      </>
    ),
  },
  {
    slug: "sj-mae-update",
    title: "SJ-MAE: petites notes d’implémentation",
    date: "2025-09-20",
    summary: "Notes d’ingénierie sur le pré-entraînement, ablations, et todo.",
    tags: ["research","vision"],
    content: (
      <>
        <p>Quelques points d’implémentation utiles…</p>
        <ul className="list-disc ml-6">
          <li>Loss balancing</li>
          <li>Mask ratio</li>
          <li>Linprobe vs finetune</li>
        </ul>
      </>
    ),
  },
];

