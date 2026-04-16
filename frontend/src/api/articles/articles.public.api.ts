// PUBLIC API (/public)

//api
import type { ArticleQueryParams } from "@/types/article/article-query-params.types"
import { api } from "../http"

//types
import type { ArticleListItem, ArticlePreview, PaginatedResponse } from "@/types/article"

export const articlesPublicApi = {

   /* GET BY SLUG */
   getBySlug(slug: string) {
      return api.get<ArticlePreview>(`/articles/public/${slug}`)
   },

   /* INCREMENT VIEWS */
   incrementViews(slug: string) {
      return api.patch(`/articles/public/${slug}/views`)
   },

   /* SEARCH FILTER (PUBLISHED) */
   searchArticles(params: ArticleQueryParams) {
      return api.get<PaginatedResponse<ArticleListItem>>("/articles/public/search", {
         params
      })
   },


}