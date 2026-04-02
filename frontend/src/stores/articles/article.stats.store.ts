//article stats store

import { defineStore } from "pinia";
import { ref } from "vue";
import { articlesApi } from "@/api/articles.api";

/* TYPES  & PAYLOAD */
import type { ArticleStatsOverview, ArticleStatsSummary } from "@/types/stats";

/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";

export const useArticlesStatsStore = defineStore("articleStats", () => {
   const overview = ref<ArticleStatsOverview | null>(null)
   const summary = ref<ArticleStatsSummary | null>(null)

   const { request } = useApiRequest()

   async function fetchOverview() {
      if (overview.value) return overview.value

      const data = await request<ArticleStatsOverview>(() =>
         articlesApi.stats.fetchOverview().then(r => r.data),
         "Failed to load your stats"
      )

      if (data) {
         overview.value = data
      }
      return data
   }
   async function fetchSummary() {
      if (summary.value) return summary.value

      const data = await request<ArticleStatsSummary>(() =>
         articlesApi.stats.fetchSummary().then(r => r.data),
         "Failed to load summary"
      )

      if (data) {
         summary.value = data
      }
      return data
   }
   return { overview, fetchOverview, fetchSummary, summary }
})