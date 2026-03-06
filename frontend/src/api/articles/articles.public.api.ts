// PUBLIC API (/public)

//api
import { api } from "../http"
//types
import type { ArticlePreview } from "@/types/article-preview.type"
import type { ArticleFilters } from "@/types/article-filter.types"

export const articlesPublicApi = {
   getBySlug(slug: string) {
      return api.get<ArticlePreview>(`/articles/public/${slug}`)
   },
   searchArticles(filters: ArticleFilters) {
      return api.get<ArticlePreview[]>("/articles/public/filter", {
         params: filters
      })
   },
}