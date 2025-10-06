const KEY = "theme";
export function getInitialTheme() {
    try {
        const t = localStorage.getItem(KEY);
        return t === "light" ? "light" : "dark"; // default = dark
    }
    catch {
        return "dark";
    }
}
export function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === "dark")
        root.classList.add("dark");
    else
        root.classList.remove("dark");
    try {
        localStorage.setItem(KEY, theme);
    }
    catch { }
}
export function toggleTheme() {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
    return next;
}
