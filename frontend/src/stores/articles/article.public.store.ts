//article admin store (/admin)

import { defineStore } from "pinia";
import { ref } from "vue";
import { articlesApi } from "@/api/articles.api";

/* TYPES */
import type { ArticlePreview } from "@/types/article-preview.type";

/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";

export const useArticlesPublicStore = defineStore("articlePublic", () => {
   const currentPreview = ref<ArticlePreview | null>(null);

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
   return { fetchBySlug, currentPreview }

})
