//article stats api

//api
import { api } from "@/api/http"

import type { ArticleStatsOverview, ArticleStatsSummary } from "@/modules/dashboard/types"

export const articlesStatsApi = {
   /* FETCH OVERVIEW */
   fetchOverview() {
      return api.get<ArticleStatsOverview>(`/articles/stats/overview`)
   },
   /* FETCH STATS */
   fetchSummary() {
      return api.get<ArticleStatsSummary>(`/articles/stats/summary`)
   }
}