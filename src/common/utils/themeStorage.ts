import type { ThemeMode } from "../types";

const THEME_KEY = "themeMode";

export const themeStorage = {
  get(): ThemeMode {
    try {
      const theme = localStorage.getItem(THEME_KEY);
      return theme === "dark" || theme === "light" ? theme : "light";
    } catch {
      return "light";
    }
  },
  set(theme: ThemeMode) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (err) {
      console.warn("Failed to save theme to localStorage", err);
    }
  },
};
