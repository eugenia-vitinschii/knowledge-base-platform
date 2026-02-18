//stores/article/article store

import { defineStore } from "pinia";
import { ref } from "vue";
import type { Article } from "@/types/article.types";
import type { CreateArticlePayload } from "@/types/create-article.payload"
import type { UpdateArticlePayload } from "@/types/update-article.payload";
import type { UpdateArticleStatusPayload } from "@/types/update-article-status.payload";
import { articlesApi } from "@/api/articles.api";

export const useArticlesStore = defineStore("articles", () => {
   const currentArticle = ref<Article | null>(null);

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

         const res = await articlesApi.getById(id);
         currentArticle.value = res.data;

         return res.data
      } catch (e: any) {
         setError(e?.response?.data?.message || "Failed to fetch article");
         return null;
      } finally {
         isLoading.value = false
      }
   }

   /* === CREATE ARTICLE === */
   async function create(payload: CreateArticlePayload) {
      try {
         isLoading.value = true;
         setError(null);

         const res = await articlesApi.create(payload)
         currentArticle.value = res.data;

         return res.data
      } catch (e: any) {
         setError(e?.response?.data?.message || "Failed to create article");
         return null;
      } finally {
         isLoading.value = false
      }
   }

   /* === UPDATE ARTICLE === */
   async function update(id: string, payload: UpdateArticlePayload) {
      try {
         isLoading.value = true;
         setError(null);

         const res = await articlesApi.update(id, payload)
         currentArticle.value = res.data;

         return res.data
      } catch (e: any) {
         setError(e?.response?.data?.message || "Failed to update article");
         return null;
      } finally {
         isLoading.value = false
      }
   }
   /* === UPDATE ARTICLE  STATUS === */
   async function updateStatus(id: string, payload: UpdateArticleStatusPayload) {
      try {
         isLoading.value = true;
         setError(null);

         const res = await articlesApi.updateStatus(id, payload)
         currentArticle.value = res.data;

         return res.data
      } catch (e: any) {
         setError(e?.response?.data?.message || "Failed to update article status");
         return null;
      } finally {
         isLoading.value = false
      }
   }

   /* === RESET === */
   function resetCurrent() {
      currentArticle.value = null
      error.value = null
   }


   return { currentArticle, isLoading, error, fetchById, create, update, updateStatus, resetCurrent }
})

