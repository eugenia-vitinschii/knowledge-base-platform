//article admin store (/admin)

import { defineStore } from "pinia";
import { ref } from "vue";
import { articlesApi } from "@/modules/articles/api/articles.api";

/* TYPES */
import type { ArticlePreview, ArticleListItem, ArticlePublicFilters, ArticleQueryParams } from "../types/index";

/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";

export const useArticlesPublicStore = defineStore("articlePublic", () => {
   const currentPreview = ref<ArticlePreview | null>(null);

   const filters = ref<ArticlePublicFilters>({
      search: '',
      type: "",
      difficulty: "",
      category: "",
      tag: ''
   })


   const meta = ref<{ page: number; pages: number; total: number } | null>(null)

   const list = ref<ArticleListItem[]>([])

   const { request } = useApiRequest()

   /* === GET ARTICLE BY SLUG === */
   async function fetchBySlug(slug: string) {

      const data = await request(() =>
         articlesApi.public.getBySlug(slug).then(r => r.data),
         "Failed to fetch article by slug"
      )
      if (data) {
         currentPreview.value = data
      }

      return data
   }
   /* === GET  FILTERED ARTICLES=== */
   async function searchArticles(payload: ArticleQueryParams) {

      const data = await request(() =>
         articlesApi.public.searchArticles(payload).then(r => r.data),
         "Failed to fetch filtered articles"
      )
      if (data) {
         list.value = data.data
         meta.value = data.meta
      }
      return data
   }
   /*=== VIEWS==== */
   async function incrementViews(slug: string) {

      return request(() =>
         articlesApi.public.incrementViews(slug).then(r => r.data),
         "Failed to increment views"
      )
   }


   return { fetchBySlug, currentPreview, searchArticles, list, filters, incrementViews, meta }
})
