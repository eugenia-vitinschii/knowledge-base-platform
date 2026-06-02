// PUBLIC API (/public)

//api
import type { ArticleQueryParams, ArticleSearchParams } from "../types/article-query-params.types"

import { api } from "@/api/http"

//types
import type { ArticleListItem, ArticlePreview } from "@/modules/articles/types"
import type { PaginatedResponse } from "@/shared/types/pagination.types"

export const articlesPublicApi = {

   /* GET BY SLUG */
   getBySlug(slug: string) {
      return api.get<ArticlePreview>(`/articles/public/${slug}`)
   },

   /* GET BY AUTHOR */
   getByAuthor(id: string, params: ArticleSearchParams) {
      return api.get<PaginatedResponse<ArticleListItem>>(`/articles/public/user/${id}`, { params })
   },

   /* INCREMENT VIEWS */
   incrementViews(slug: string) {
      return api.patch(`/articles/public/${slug}/views`)
   },

   /* SEARCH FILTER (PUBLISHED) */
   searchArticles(params: ArticleQueryParams) {
      return api.get<PaginatedResponse<ArticleListItem>>("/articles/public/search", { params })
   },

}