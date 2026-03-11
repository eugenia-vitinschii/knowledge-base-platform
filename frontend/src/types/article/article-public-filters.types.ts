//article filter type

import type { ArcticleType, ArticleCategory, ArticleDifficulty } from "@/shared/enums/article.enum";

export interface ArticlePublicFilters {
   search: string;
   category: ArticleCategory | "";
   difficulty: ArticleDifficulty | "";
   type: ArcticleType | "";
}