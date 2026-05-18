//article admin store (/admin)

import { defineStore } from "pinia";
import { ref } from "vue";
import { articlesApi } from "@/modules/articles/api/articles.api";

/* TYPES */
import type { ArticlePreview, ArticleListItem, ArticlePublicFilters, ArticleQueryParams } from "../types/index";

/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";

import { delay } from "@/shared/lib/delay"
export const useArticlesPublicStore = defineStore("articlePublic", () => {
   const currentPreview = ref<ArticlePreview | null>(null);

   const filters = ref<ArticlePublicFilters>({
      search: '',
      type: "",
      difficulty: "",
      category: "",
      tag: ''
   })

   const isLoading = ref(false)

   const meta = ref<{ page: number; pages: number; total: number } | null>(null)

   const list = ref<ArticleListItem[]>([])

   const { request } = useApiRequest()

   /* === GET ARTICLE BY SLUG === */
   async function fetchBySlug(slug: string) {
      isLoading.value = true

      try {
         if (import.meta.env.DEV) {
            await delay(800)
         }
         const data = await request(() =>
            articlesApi.public.getBySlug(slug).then(r => r.data),
            "Failed to fetch article by slug"
         )
         if (data) {
            currentPreview.value = data
         }

         return data
      } finally {
         isLoading.value = false
      }

   }
   /*=== GET BY AUHTOR === */
   async function fetchByAuthor(id: string) {

      const data = await request(() =>
         articlesApi.public.getByAuthor(id).then(r => r.data),
         "Failed to fetch article by auhtor"
      )
      if (data) {
         list.value = data
      }

      return data
   }

   /* === GET  FILTERED ARTICLES=== */
   async function searchArticles(payload: ArticleQueryParams) {
      isLoading.value = true

      try {
         if (import.meta.env.DEV) {
            await delay(800)
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
      } finally {
         isLoading.value = false
      }

   }
   /*=== VIEWS==== */
   async function incrementViews(slug: string) {

      return request(() =>
         articlesApi.public.incrementViews(slug).then(r => r.data),
         "Failed to increment views"
      )
   }

   return { fetchBySlug, currentPreview, searchArticles, list, filters, incrementViews, meta, fetchByAuthor, isLoading }
})
