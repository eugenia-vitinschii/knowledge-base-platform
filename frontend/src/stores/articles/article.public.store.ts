//article admin store (/admin)

import { defineStore } from "pinia";
import { ref } from "vue";
import { articlesApi } from "@/api/articles.api";

/* TYPES */
import type { ArticlePreview, ArticleListItem, ArticlePublicFilters } from "@/types/article";

/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";

export const useArticlesPublicStore = defineStore("articlePublic", () => {
   const currentPreview = ref<ArticlePreview | null>(null);

   const filters = ref<ArticlePublicFilters>({
      search: '',
      type: "",
      difficulty: "",
      category: ""
   })
   const list = ref<ArticleListItem[]>([])

   const { request } = useApiRequest()

   /* === GET BY SLUG === */
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
   /* === GET  FILTERED === */
   async function searchArticles(payload?: ArticlePublicFilters) {

      const data = await request(() =>
         articlesApi.public.searchArticles(payload ?? filters.value).then(r => r.data),
         "Failed to fetch filtered articles"
      )
      if (data) {
         list.value = data
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


   return { fetchBySlug, currentPreview, searchArticles, list, filters, incrementViews }
})
