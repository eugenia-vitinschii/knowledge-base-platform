//stores/article/article store

import { defineStore } from "pinia";
import { ref } from "vue";
import type { Article } from "@/types/article.types";
import type { CreateArticlePayload } from "@/types/create-article.payload"
import type { UpdateArticlePayload } from "@/types/update-article.payload";
import type { UpdateArticleStatusPayload } from "@/types/update-article-status.payload";
import { articlesApi } from "@/api/articles.api";
import type { ArticlePreview } from "@/types/article-preview.type";

export const useArticlesStore = defineStore("articles", () => {
   const currentArticle = ref<Article | null>(null);
   const currentPreview = ref<ArticlePreview | null>(null);
   const list = ref<Article[]>([])
   const isLoading = ref(false);
   const error = ref<string | null>(null)

   /* === HELPERS === */
   function setError(message: string | null) {
      error.value = message;
   }
   /* === GET ALL ARTICLES === */
   async function fetchAll() {
      try {
         isLoading.value = true;
         setError(null);

         const res = await articlesApi.getAll();
         list.value = res.data;

         return res.data;

      } catch (error: any) {
         setError(error?.response?.data?.message || "Failed to load articles")
         return []
      } finally {
         isLoading.value = false
      }
   }
   /* === GET MY ARTICLES (EDITOR) === */
   async function fetchMy() {
      try {
         isLoading.value = true;
         setError(null);

         const res = await articlesApi.getMy();
         list.value = res.data

         return res.data;
      } catch (e: any) {
         setError(e?.response?.data?.message || "Failed to load your articles");
         return [];
      } finally {
         isLoading.value = false
      }
   }
   /* === GET BY ID === */
   async function fetchById(id: string) {
      try {
         isLoading.value = true;
         setError(null);

         const res = await articlesApi.getById(id);
         currentArticle.value = res.data;

         return res.data;
      } catch (e: any) {
         setError(e?.response?.data?.message || "Failed to fetch article");
         return null;
      } finally {
         isLoading.value = false
      }
   }
   /* === GET BY SLUG === */
   async function fetchBySlug(slug: string) {
      try {
         isLoading.value = true;
         setError(null);

         const res = await articlesApi.getBySlug(slug);
         currentPreview.value = res.data;

         return res.data;
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
   /* === DELETE ARTICLE === */
   async function remove(id: string) {
      try {
         isLoading.value = true;
         setError(null);

         await articlesApi.delete(id);

         list.value = list.value.filter((a) => a.id !== id)

         return true
      } catch (e: any) {
         setError(e?.response?.data?.message || "Failed to delete article");
         return false;
      } finally {
         isLoading.value = false
      }
   }

   return { currentArticle, isLoading, error, fetchById, create, update, updateStatus, resetCurrent, fetchAll, fetchMy, remove, list, fetchBySlug, currentPreview }
})

