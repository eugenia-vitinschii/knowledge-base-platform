// ADMIN API (/admin)

//api
import { api } from "@/api/http"
//types
import type { Article, ArticleAdminQueryParams, PaginatedResponse } from "../types/index"

export const articlesAdminApi = {
   /* GET BY ID */
   getById(id: string) {
      return api.get<Article>(`/articles/admin/${id}`)
   },
   /* GET ALL ARTICLES */
   getAll() {
      return api.get<Article[]>('/articles/admin')
   },
   /* GET MY ARTICLES  */
   getMy() {
      return api.get<Article[]>('/articles/admin/my')
   },
   /* SEARCH & FILTER ARTICLES ADMIN */
   searchAdminArticles(filters: ArticleAdminQueryParams) {
      return api.get<PaginatedResponse<Article>>("/articles/admin/search", {
         params: filters
      })
   }
}