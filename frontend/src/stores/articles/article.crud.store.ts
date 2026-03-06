//article crud store (/admin)

import { defineStore } from "pinia";
import { ref } from "vue";
import { articlesApi } from "@/api/articles.api";

import type { Article } from "@/types/article.types";

import type { CreateArticlePayload } from "@/types/create-article.payload"
import type { UpdateArticlePayload } from "@/types/update-article.payload";
import type { UpdateArticleStatusPayload } from "@/types/update-article-status.payload";


export const useArticlesCrudStore = defineStore("articlesCrud", () => {
   const currentArticle = ref<Article | null>(null);
   const list = ref<Article[]>([])
   const isLoading = ref(false);
   const error = ref<string | null>(null)
   /* === HELPERS === */
   function setError(message: string | null) {
      error.value = message;
   }
   /* === CREATE ARTICLE === */
   async function create(payload: CreateArticlePayload) {
      try {
         isLoading.value = true;
         setError(null);

         const res = await articlesApi.crud.create(payload)
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

         const res = await articlesApi.crud.update(id, payload)
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

         const res = await articlesApi.crud.updateStatus(id, payload)
         currentArticle.value = res.data;

         return res.data
      } catch (e: any) {
         setError(e?.response?.data?.message || "Failed to update article status");
         return null;
      } finally {
         isLoading.value = false
      }
   }
   /* === DELETE ARTICLE === */
   async function remove(id: string) {
      try {
         isLoading.value = true;
         setError(null);

         await articlesApi.crud.delete(id);

         list.value = list.value.filter((a) => a.id !== id)

         return true
      } catch (e: any) {
         setError(e?.response?.data?.message || "Failed to delete article");
         return false;
      } finally {
         isLoading.value = false
      }
   }
   return { create, update, updateStatus, remove }
})