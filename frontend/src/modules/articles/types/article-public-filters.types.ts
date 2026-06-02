//article filter type

import type { ArcticleType, ArticleCategory, ArticleDifficulty } from "@/shared/enums/article.enum";


export interface ArticlePublicSearch {
   search: string;
}

export interface ArticlePublicFilters extends ArticlePublicSearch {
   category: ArticleCategory | "";
   difficulty: ArticleDifficulty | "";
   type: ArcticleType | "";
   tag: string | "",
}