//article stats api

//api
import { api } from "../http"

import type { ArticleStatsOverview } from "@/types/stats"

export const articlesStatsApi = {
   /* FETCH STATS */
   fetchStats() {
      return api.get<ArticleStatsOverview>(`/articles/stats/overview`)
   }
}