// ADMIN API (/admin)

//api
import { api } from "../http"
//types
import type { Article } from "@/types/article.types"
import type { ArticlePreview } from "@/types/article-preview.type"
import type { ArticleFilters } from "@/types/article-filter.types"

export const articlesAdminApi = {
   getAll() {
      return api.get<Article[]>('/articles/admin/all')
   },
   getMy() {
      return api.get<Article[]>('/articles/admin/my')
   },
   searchAdminArticles(filters: ArticleFilters) {
      return api.get<ArticlePreview[]>("/articles/admin", {
         params: filters
      })
   }
}