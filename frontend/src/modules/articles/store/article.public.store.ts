//article admin store (/admin)

import { defineStore } from "pinia";
import { ref } from "vue";

import { articlesApi } from "@/modules/articles/api/articles.api";

/* TYPES */
import type { ArticlePreview, ArticleListItem, ArticlePublicFilters, ArticleQueryParams } from "../types/index";

/* COMPOSABLE & LIBS */
import { useApiRequest } from "@/shared/composables/useApiRequest";
import { delay } from "@/shared/lib/delay"

export const useArticlesPublicStore = defineStore("articlePublic", () => {
   const { request } = useApiRequest()

   /* === STATE === */
   const list = ref<ArticleListItem[]>([])
   const currentPreview = ref<ArticlePreview | null>(null);
   const meta = ref<{ page: number; pages: number; total: number } | null>(null)
   const filters = ref<ArticlePublicFilters>({
      search: '',
      type: "",
      difficulty: "",
      category: "",
      tag: ''
   })

   /* === UI FLOW STATE === */
   const isLoading = ref(false)
   const error = ref<string | null>(null)

   /* === PORTFOLIO FEATURE === */
   const DEBUG_API_FAIL = ref(false)

   /* === ACTIONS === */
   /* === Get article (by slug) === */
   async function fetchBySlug(slug: string) {
      isLoading.value = true
      error.value = null
      try {
         if (import.meta.env.DEV) {
            await delay(800)
         }
         if (import.meta.env.DEV && DEBUG_API_FAIL.value) {
            throw new Error('Mock error')
         }
         const data = await request(() =>
            articlesApi.public.getBySlug(slug).then(r => r.data),
            "Failed to fetch article by slug"
         )
         if (data) {
            currentPreview.value = data
         }
         return data
      } catch (err) {
         error.value = "Failed to fetch article"
      } finally {
         isLoading.value = false
      }

   }
   /*=== Get Articles (by author) === */
   async function fetchByAuthor(id: string) {
      isLoading.value = true
      error.value = null
      try {
         if (import.meta.env.DEV) {
            await delay(800)
         }
         if (import.meta.env.DEV && DEBUG_API_FAIL.value) {
            throw new Error('Mock error')
         }
         const data = await request(() =>
            articlesApi.public.getByAuthor(id).then(r => r.data),
            "Failed to fetch article by author"
         )
         if (data) {
            list.value = data
         }
         return data
      } catch (err) {
         error.value = "Failed to fetch articles"
      } finally {
         isLoading.value = false
      }
   }

   /* === Search articles === */
   async function searchArticles(payload: ArticleQueryParams) {
      isLoading.value = true
      error.value = null
      try {

         if (import.meta.env.DEV) {
            await delay(800)
         }
         if (import.meta.env.DEV && DEBUG_API_FAIL.value) {
            throw new Error('Mock error')
         }
         const data = await request(() =>
            articlesApi.public.searchArticles(payload).then(r => r.data),
            "Failed to fetch filtered articles"
         )

         if (data) {
            list.value = data.data
            meta.value = data.meta
         }
         return data
      } catch (err) {
         error.value = "Failed to fetch articles"
         meta.value = null
      } finally {
         isLoading.value = false
      }

   }
   /*=== Increment views==== */
   function incrementViews(slug: string) {
      return request(() =>
         articlesApi.public.incrementViews(slug).then(r => r.data),
         "Failed to increment views"
      )
   }

   return {
      //state
      list,
      currentPreview,
      filters,
      meta,
      isLoading,
      error,
      DEBUG_API_FAIL,
      //actions
      fetchBySlug,
      searchArticles,
      incrementViews,
      fetchByAuthor,
   }
})
