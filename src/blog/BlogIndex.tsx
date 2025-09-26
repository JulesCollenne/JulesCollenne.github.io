import { Link } from "react-router-dom";
import { posts } from "./registry";

function fmt(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Blog</h1>

      <ul className="mt-8 space-y-6">
        {sorted.map((p) => (
          <li key={p.slug}>
            <article className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
              {p.cover && (
                <Link to={`/blog/${p.slug}`}>
                  <img
                    src={p.cover}
                    alt=""
                    className="w-full rounded-xl mb-4"
                    loading="lazy"
                  />
                </Link>
              )}

              <header className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-medium">
                  <Link
                    to={`/blog/${p.slug}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {p.title}
                  </Link>
                </h2>
                <time className="text-sm text-neutral-500">{fmt(p.date)}</time>
              </header>

              {p.summary && (
                <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                  {p.summary}
                </p>
              )}

              {p.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-500">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border px-2 py-0.5 dark:border-neutral-700"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          </li>
        ))}
      </ul>

      {/* Back home button at the very bottom */}
      <div className="mt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 bg-black/40 backdrop-blur hover:bg-white/10 text-sm"
        >
          ← Home
        </Link>
      </div>
    </main>
  );
}
