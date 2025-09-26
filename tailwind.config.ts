// tailwind.config.ts
import typography from "@tailwindcss/typography";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,md,mdx}"],
  theme: { extend: {} },
  plugins: [typography()],
};

