// ADMIN API (/admin)

//api
import { api } from "../http"
//types
import type { Article, ArticlePublicFilters } from "@/types/article"

export const articlesAdminApi = {
   /* GET BY ID */
   getById(id: string) {
      return api.get<Article>(`/articles/admin/${id}`)
   },
   /* GET ALL ARTICLES */
   getAll() {
      return api.get<Article[]>('/articles/admin/all')
   },
   /* GET MY ARTICLES  */
   getMy() {
      return api.get<Article[]>('/articles/admin/my')
   },
   /* SEARCH & FILTER ARTICLES ADMIN */
   searchAdminArticles(filters: ArticlePublicFilters) {
      return api.get<Article[]>("/articles/admin", {
         params: filters
      })
   }
}