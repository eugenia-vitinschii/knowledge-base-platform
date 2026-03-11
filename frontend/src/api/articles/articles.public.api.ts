// PUBLIC API (/public)

//api
import { api } from "../http"

//types
import type { ArticlePublicFilters, ArticleListItem, ArticlePreview } from "@/types/article"

export const articlesPublicApi = {
   /* GET BY SLUG */
   getBySlug(slug: string) {
      return api.get<ArticlePreview>(`/articles/public/${slug}`)
   },
   /* SEARCH FILTER (PUBLISHED) */
   searchArticles(filters: ArticlePublicFilters) {
      return api.get<ArticleListItem[]>("/articles/public/filter", {
         params: filters
      })
   },
}