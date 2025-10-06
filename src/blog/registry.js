const modules = import.meta.glob("./*.md{x,}", { eager: true });
// derive posts from files + frontmatter
export const posts = Object.entries(modules).map(([path, mod]) => {
    const fm = mod.frontmatter || {};
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
