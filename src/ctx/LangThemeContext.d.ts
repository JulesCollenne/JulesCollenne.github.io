import React from "react";
import { type Theme } from "../theme";
import { type Lang } from "../types/lang";
type Ctx = {
    theme: Theme;
    setTheme: (t: Theme) => void;
    lang: Lang;
    setLang: (l: Lang) => void;
};
export declare const LangThemeContext: React.Context<Ctx | null>;
export declare function LangThemeProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export {};
