//article admin store (/admin)

import { defineStore } from "pinia";
import { ref } from "vue";
import { articlesApi } from "@/api/articles.api";

import type { Article } from "@/types/article.types";

export const useArticlesAdminStore = defineStore("articlesAdmin", () => {
   const currentArticle = ref<Article | null>(null);
   const list = ref<Article[]>([])
   const isLoading = ref(false);
   const error = ref<string | null>(null)
   /* === HELPERS === */
   function setError(message: string | null) {
      error.value = message;
   }

   /* === GET BY ID === */
   async function fetchById(id: string) {
      try {
         isLoading.value = true;
         setError(null);

         const res = await articlesApi.admin.getById(id);
         currentArticle.value = res.data;

         return res.data;
      } catch (e: any) {
         setError(e?.response?.data?.message || "Failed to fetch article");
         return null;
      } finally {
         isLoading.value = false
      }
   }
   /* === GET MY ARTICLES (EDITOR) === */
   async function fetchMy() {
      try {
         isLoading.value = true;
         setError(null);

         const res = await articlesApi.admin.getMy();
         list.value = res.data

         return res.data;
      } catch (e: any) {
         setError(e?.response?.data?.message || "Failed to load your articles");
         return [];
      } finally {
         isLoading.value = false
      }
   }
   /* === GET ALL ARTICLES === */
   async function fetchAll() {
      try {
         isLoading.value = true;
         setError(null);

         const res = await articlesApi.admin.getAll();
         list.value = res.data;

         return res.data;

      } catch (error: any) {
         setError(error?.response?.data?.message || "Failed to load articles")
         return []
      } finally {
         isLoading.value = false
      }
   }

   return { fetchById, fetchMy, isLoading, fetchAll, list, error }
})