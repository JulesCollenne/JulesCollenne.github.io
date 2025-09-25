"use client";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "./i18n";

const EMAIL = "julescollennepro@gmail.com";

type CopyState = "idle" | "copied" | "error";

export default function ConsultingCTA({ lang = "en" as Lang }) {
  const text = {
    en: {
      cta: "Need consulting in ML? Contact me",
      copy: "Copy my email",
      copied: "Email copied",
      error: "Couldn’t copy. Use the button again or copy manually.",
      subject: "Consulting in ML / AI",
      body: `Hi Jules,

I'm interested in ML/AI consulting. Briefly:
- Company / project:
- Problem / goals:
- Timeline & budget:

Thanks!`,
    },
    fr: {
      cta: "Besoin de conseil en IA/ML ? Contactez-moi",
      copy: "Copier mon email",
      copied: "Email copié",
      error:
        "Copie impossible. Réessayez ou copiez l’adresse manuellement.",
      subject: "Consulting en IA / ML",
      body: `Bonjour Jules,

Je suis intéressé par une mission de consulting IA/ML. En bref :
- Entreprise / projet :
- Problème / objectifs :
- Délais & budget :

Merci !`,
    },
  }[lang];

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    text.subject
  )}&body=${encodeURIComponent(text.body)}`;

  const [copyState, setCopyState] = useState<CopyState>("idle");
  const timerRef = useRef<number | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyState("copied");
    } catch {
      // Fallback to prompt (some browsers/contexts)
      // eslint-disable-next-line no-alert
      prompt(lang === "fr" ? "Copiez cet email :" : "Copy this email:", EMAIL);
      setCopyState("copied");
    }
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopyState("idle"), 1200);
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
        {text.cta}
      </a>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium
                     bg-neutral-100 text-neutral-900 hover:bg-neutral-200
                     dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700
                     shadow-sm transition-colors
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2
                     dark:focus-visible:ring-offset-neutral-900"
          aria-label={lang === "fr" ? "Copier mon adresse e-mail" : "Copy my email address"}
        >
          {text.copy}
        </button>

        <span
          role="status"
          aria-live="polite"
          className={`text-xs text-neutral-600 dark:text-neutral-400 transition-opacity ${
            copyState === "copied" ? "opacity-100" : "opacity-0"
          }`}
        >
          {copyState === "copied" ? text.copied : "\u00A0"}
        </span>
      </div>
    </div>
  );
}

