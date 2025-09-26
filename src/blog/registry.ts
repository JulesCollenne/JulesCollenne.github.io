// src/blog/registry.ts
import type { ComponentType } from "react";

export type PostMeta = {
  slug?: string;
  title: string;
  date: string;           // YYYY-MM-DD
  summary?: string;
  tags?: string[];
  cover?: string;         // optional public path like /blog/.../cover.jpg
};

export type PostModule = {
  default: ComponentType<any>;
  frontmatter: PostMeta;
};

const modules = import.meta.glob<PostModule>("./*.md{x,}", { eager: true });

export type PostItem = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  cover?: string;
  Component: ComponentType<any>;
};

// derive posts from files + frontmatter
export const posts: PostItem[] = Object.entries(modules).map(([path, mod]) => {
  const fm = mod.frontmatter || ({} as PostMeta);
  // derive slug from frontmatter or filename
  const derivedSlug = fm.slug ?? path.replace(/^\.\/|\.mdx?$/g, "");
  return {
    slug: derivedSlug,
    title: fm.title ?? derivedSlug,
    date: fm.date ?? "1970-01-01",
    summary: fm.summary,
    tags: fm.tags,
    cover: fm.cover,
    Component: mod.default,
  };
})
// sort newest first
.sort((a, b) => (a.date < b.date ? 1 : -1));

