//store/theme/theme.store

import { defineStore } from "pinia";
import { ref } from "vue";

type Theme = "light" | "dark"

export const useThemeStore = defineStore("theme", () => {
   const theme = ref<Theme>("light")

   /* === APPLY THEME === */
   function applyTheme(value: Theme) {
      theme.value = value

      const root = document.documentElement

      root.classList.remove("theme-dark", "theme-light")
      root.classList.add(value === "dark" ? "theme-dark" : "theme-light")

      localStorage.setItem("theme", value)
   }

   /* === TOGGLE THEME === */
   function toogleTheme() {
      applyTheme(theme.value === 'dark' ? "light" : "dark")
   }

   /* === INIT THEME === */
   function initTheme() {
      const saved = localStorage.getItem("theme") as Theme | null

      applyTheme(saved === "dark" ? "dark" : "light")
   }
   /* === RETURN === */
   return { theme, toogleTheme, initTheme, applyTheme }
})