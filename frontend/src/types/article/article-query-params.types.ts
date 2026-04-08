//query params
import type { ArticlePublicFilters } from "./article-public-filters.types"


export type ArticleQueryParams = ArticlePublicFilters & {
   page?: number
   limit?: number
   total?: number
}