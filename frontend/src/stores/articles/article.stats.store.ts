//article stats store

import { defineStore } from "pinia";
import { ref } from "vue";
import { articlesApi } from "@/api/articles.api";

/* TYPES  & PAYLOAD */
import type { ArticleStatsOverview } from "@/types/stats";

/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";

export const useArticlesStatsStore = defineStore("articleStats", () => {
   const stats = ref<ArticleStatsOverview | null>(null)
   const { request } = useApiRequest()

   async function fetchOverview() {
      if (stats.value) return stats.value

      const data = await request<ArticleStatsOverview>(() =>
         articlesApi.stats.fetchStats().then(r => r.data),
         "Failed to load your stats"
      )

      if (data) {
         stats.value = data
      }
      return data
   }
   return { stats, fetchOverview }
})