//article admin store (/admin)

import { defineStore } from "pinia";
import { ref } from "vue";

import { articlesApi } from "@/modules/articles/api/articles.api";

/* TYPES */
import type { Article, ArticleAdminFilters, ArticleAdminQueryParams } from "../types/index";

/* COMPOSABLE  & LIBS */
import { useApiRequest } from "@/shared/composables/useApiRequest";
import { delay } from "@/shared/lib/delay"
import type { PagintionMeta } from "@/shared/types/pagination.types";

export const useArticlesAdminStore = defineStore("articlesAdmin", () => {
   const { request } = useApiRequest()

   /* === STATE === */
   const list = ref<Article[]>([])
   const currentArticle = ref<Article | null>(null);
   const meta = ref<PagintionMeta | null>(null)
   const filters = ref<ArticleAdminFilters>({
      search: '',
      type: "",
      difficulty: "",
      category: "",
      status: "",
   })

   /* === UI FLOW STATE === */
   const isLoading = ref(false)
   const error = ref<string | null>(null)

   /* === PORTFOLIO FEATURE === */
   const DEBUG_API_FAIL = ref(false)

   /* === ACTIONS === */

   /* === Get article (by id)  === */
   async function fetchById(id: string) {
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
            articlesApi.admin.getById(id).then(r => r.data),
            "Failed to fetch article by id"
         )
         if (data) {
            currentArticle.value = data
         }
         return data
      } catch (err) {
         error.value = "Failed to fetch article"
      } finally {
         isLoading.value = false
      }
   }
   /* === Get my articles (EDITOR) === */
   async function fetchMy() {
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
            articlesApi.admin.getMy().then(r => r.data),
            "Failed to load your articles"
         )

         if (data) {
            list.value = data
         }
         return data
      } catch (err) {
         error.value = "Failed to load your articles"
      } finally {
         isLoading.value = false
      }
   }
   /* === Search articles === */
   async function searchArticles(payload?: ArticleAdminQueryParams) {
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
            articlesApi.admin.searchAdminArticles(payload ?? filters.value).then(r => r.data),
            "Failed to fetch filtered articles"
         )

         if (data) {
            list.value = data.data
            meta.value = data.meta
         }
         return data
      } catch (err) {
         error.value = "Failed to fetch article(s)"
         meta.value = null
      } finally {
         isLoading.value = false
      }
   }
   return {
      //state
      list,
      currentArticle,
      filters,
      meta,
      isLoading,
      error,
      DEBUG_API_FAIL,
      //actions
      fetchById,
      fetchMy,
      searchArticles,
   }
})