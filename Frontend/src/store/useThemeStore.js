import { create } from "zustand";
import { Themes } from "../constants/themes";

export const UseThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "corporate",

  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme), set({ theme });
  },
}));
