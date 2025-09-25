import { useParams, Link } from "react-router-dom";
import { posts } from "../blog/posts";

function fmt(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("fr-FR",
    { year: "numeric", month: "short", day: "numeric" });
}

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const p = posts.find(x => x.slug === slug);

  if (!p) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Article introuvable</h1>
        <Link to="/blog" className="underline underline-offset-4 hover:no-underline">← All posts</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <header>
          <h1 className="mb-1">{p.title}</h1>
          <div className="text-sm text-neutral-500">
            <time dateTime={p.date}>{fmt(p.date)}</time>
            {p.tags?.length ? <> · {p.tags.map(t=>`#${t}`).join(" ")}</> : null}
          </div>
        </header>
        <div className="mt-6">{p.content}</div>
        <footer className="mt-10">
          <Link to="/blog" className="text-sm underline underline-offset-4 hover:no-underline">
            ← All posts
          </Link>
        </footer>
      </article>
    </main>
  );
}

