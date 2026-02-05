//stores/auth/auth.store.ts

import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "@/api/http";

interface UserData {
   id: string,
   name: string,
   email: string,
   role: "admin" | "viewer" | "editor"
}
export const useAuthStore = defineStore("auth", () => {
   const user = ref<UserData | null>(null);
   const token = ref<string | null>(null);

   /* === AUTO LOGIN === */
   const savedUser = localStorage.getItem('user');
   const savedToken = localStorage.getItem('token');

   if (savedUser) user.value = JSON.parse(savedUser)
   if (savedToken) token.value = savedToken

   /* === LOGIN === */
   async function login(credentials: { email: string, password: string }) {
      try {
         const res = await api.post("/auth/login", credentials);

         user.value = res.data.user;
         token.value = res.data.token;

         localStorage.setItem("user", JSON.stringify(res.data.user));
         localStorage.setItem("token", res.data.token);

         return true
      } catch (error) {
         return false
      }
   }

   /* === LOGOUT === */
   function logout() {
      user.value = null;
      token.value = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
   }

   /* === RETURN === */
   return { user, token, login, logout }
})