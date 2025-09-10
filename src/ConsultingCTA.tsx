"use client";
import { useEffect, useRef, useState } from "react";

const EMAIL = "jules.collenne@gmail.com";

export default function ConsultingCTA() {
  const subject = "Consulting in ML / AI";
  const body = `Hi Jules,

I'm interested in ML/AI consulting. Briefly:
- Company / project:
- Problem / goals:
- Timeline & budget:

Thanks!`;

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      // Fallback
      prompt("Copy this email:", EMAIL);
      setCopied(true);
    }
    // Reset the message after 1s
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <a
        href={mailto}
        className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
      >
        Need consulting in ML? Contact me
      </a>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium
                     bg-[#eeeeee] text-black hover:bg-emerald-700
                     dark:bg-[#1a1a1a] dark:text-white dark:hover:bg-emerald-400/90
                     shadow-sm transition-colors
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2
                     dark:focus-visible:ring-offset-neutral-900"
          aria-label="Copy my email address"
        >
          Copy my email
        </button>

        <span
          role="status"
          aria-live="polite"
          className={`text-xs text-black-600 dark:text-white-400 transition-opacity ${
            copied ? "opacity-100" : "opacity-0"
          }`}
        >
          Email copied
        </span>
      </div>
    </div>
  );
}

