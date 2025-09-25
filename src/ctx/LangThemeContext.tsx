import React from "react";
import type { Lang } from "../i18n";
import type { Theme } from "../theme";

export type LangThemeCtx = {
  lang: Lang; setLang: (l: Lang) => void;
  theme: Theme; setTheme: (t: Theme) => void;
};

export const LangThemeContext = React.createContext<LangThemeCtx | null>(null);
export const useLangThemeCtx = () => React.useContext(LangThemeContext);

