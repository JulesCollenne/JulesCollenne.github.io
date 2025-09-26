import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import { posts } from "./registry";

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = useMemo(() => posts.find(p => p.slug === slug), [slug]);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <p>Post not found. <Link to="/blog" className="underline">Back to blog</Link></p>
      </div>
    );
  }

  const { Component } = post;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
    <div className="mt-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 bg-black/40 backdrop-blur hover:bg-white/10 text-sm no-underline"
        >
          ← All posts
        </Link>
      </div>
      <br/>
      <h1 className="mb-2">{post.title}</h1>
      <div className="text-sm opacity-70 mb-6">{post.date}</div>

      <div
  className="
    text-base
    [&_a]:text-base [&_a]:leading-6
    [&_button]:text-base [&_button]:leading-6
    [&_h1]:!text-3xl [&_h1]:!leading-9 [&_h1]:!font-semibold [&_h1]:mt-10 [&_h1]:mb-4
    [&_h2]:!text-2xl [&_h2]:!leading-8 [&_h2]:!font-semibold [&_h2]:mt-8  [&_h2]:mb-3
    [&_h3]:!text-xl  [&_h3]:!leading-7 [&_h3]:!font-semibold [&_h3]:mt-6  [&_h3]:mb-2
    [&_p]:my-4 [&_p]:leading-7
    [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6
    [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6
    [&_li]:my-1
    [&_img]:my-4 [&_img]:rounded-xl [&_img]:max-w-full
    [&_pre]:my-4 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-auto
    [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-white/20 [&_blockquote]:pl-4 [&_blockquote]:italic
    [&_hr]:my-8
  "
>
        <MDXProvider components={{}}>
          <Component />
        </MDXProvider>
      </div>

      <div className="mt-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 bg-black/40 backdrop-blur hover:bg-white/10 text-sm no-underline"
        >
          ← All posts
        </Link>
      </div>
    </article>
  );
}
