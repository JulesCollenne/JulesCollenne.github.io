export const LANG_KEY = "lang";
export const isLang = (x) => x === "en" || x === "fr";
export const detectLang = () => {
    try {
        const saved = localStorage.getItem(LANG_KEY);
        if (isLang(saved))
            return saved;
    }
    catch { }
    const nav = (typeof navigator !== "undefined" ? navigator.language : "en").toLowerCase();
    return nav.startsWith("fr") ? "fr" : "en";
};
export const saveLang = (l) => {
    try {
        localStorage.setItem(LANG_KEY, l);
    }
    catch { }
};
