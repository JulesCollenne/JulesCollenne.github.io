// src/blog/posts.tsx
import { type ReactNode } from "react";

export type Post = {
  slug: string;          // URL: /blog/:slug
  title: string;
  date: string;          // "YYYY-MM-DD"
  summary?: string;
  tags?: string[];
  content: ReactNode;    // JSX content
};

export const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Hello, world 👋",
    date: "2025-09-25",
    summary: "First post : why I'm making a blog.",
    tags: ["meta"],
    content: (
      <>
        <p>Welcome to my blog. AI, vision, prod ML…</p>
      </>
    ),
  },
  {
    slug: "sj-mae-notes",
    title: "SJ-MAE — Quick notes",
    date: "2025-09-20",
    summary: "Loss balancing, mask ratio, linprobe vs finetune.",
    tags: ["research","vision"],
    content: (
      <>
        <ul className="list-disc ml-6">
          <li>Loss balancing</li>
          <li>Mask ratio</li>
          <li>Linprobe vs finetune</li>
        </ul>
      </>
    ),
  },
];

