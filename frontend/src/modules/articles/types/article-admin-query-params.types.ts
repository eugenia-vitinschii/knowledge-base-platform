//query params
import type { ArticleAdminFilters } from "./article-admin-filters.types"

export type ArticleAdminQueryParams = ArticleAdminFilters & {
   page?: number
   limit?: number
   total?: number
}