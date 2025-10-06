export declare function useLangThemeCtx(): {
    theme: import("../theme").Theme;
    setTheme: (t: import("../theme").Theme) => void;
    lang: import("../types/lang").Lang;
    setLang: (l: import("../types/lang").Lang) => void;
};
export declare const useLangTheme: typeof useLangThemeCtx;
export default useLangTheme;
