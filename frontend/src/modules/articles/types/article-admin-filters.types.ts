//article admin filter type

import type { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from "@/shared/enums/article.enum";

export interface ArticleAdminFilters {
   search: string;
   category: ArticleCategory | "";
   difficulty: ArticleDifficulty | "";
   type: ArcticleType | "";
   status: ArticleStatus | "";
}