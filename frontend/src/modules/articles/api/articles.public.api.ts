// PUBLIC API (/public)

//api
import type { ArticleQueryParams } from "../types/article-query-params.types"

import { api } from "@/api/http"

//types
import type { ArticleListItem, ArticlePreview, PaginatedResponse } from "@/modules/articles/types"

export const articlesPublicApi = {

   /* GET BY SLUG */
   getBySlug(slug: string) {
      return api.get<ArticlePreview>(`/articles/public/${slug}`)
   },

   /* GET BY AUTHOR */
   getByAuthor(id: string) {
      return api.get<ArticleListItem[]>(`/articles/public/user/${id}`)
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