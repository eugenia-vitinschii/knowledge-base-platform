//article filter type

import type { ArcticleType, ArticleCategory, ArticleDifficulty } from "@/shared/enums/article.enum";

export interface ArticleFilters {
   search?: string;
   category?: ArticleCategory;
   difficulty?: ArticleDifficulty;
   type?: ArcticleType;
}