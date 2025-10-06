export type Lang = "en" | "fr";
export declare const LANG_KEY = "lang";
export declare const isLang: (x: unknown) => x is Lang;
export declare const detectLang: () => Lang;
export declare const saveLang: (l: Lang) => void;
