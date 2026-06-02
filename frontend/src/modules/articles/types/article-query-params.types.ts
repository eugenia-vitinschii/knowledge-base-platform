//query params

import type { ArticlePublicFilters, ArticlePublicSearch } from "./article-public-filters.types"
import type { QueryParams } from "@/shared/types/index"

export type ArticleQueryParams = QueryParams<ArticlePublicFilters>

export type ArticleSearchParams = QueryParams<ArticlePublicSearch>