//article admin store (/admin)

import { defineStore } from "pinia";
import { ref } from "vue";
import { articlesApi } from "@/api/articles.api";
import type { ArticlePreview } from "@/types/article-preview.type";

export const useArticlesPublicStore = defineStore("articlePublic", () => {
   const isLoading = ref(false);
   const error = ref<string | null>(null)
   const currentPreview = ref<ArticlePreview | null>(null);
   /* === HELPERS === */
   function setError(message: string | null) {
      error.value = message;
   }
   /* === GET BY SLUG === */
   async function fetchBySlug(slug: string) {
      try {
         isLoading.value = true;
         setError(null);

         const res = await articlesApi.public.getBySlug(slug);
         currentPreview.value = res.data;

         return res.data;
      } catch (e: any) {
         setError(e?.response?.data?.message || "Failed to fetch article");
         return null;
      } finally {
         isLoading.value = false
      }
   }
   return { fetchBySlug, isLoading, error, currentPreview }

})
