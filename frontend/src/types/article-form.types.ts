//article from types

import type { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from "@/shared/enums/article.enum";

export type ArticleFormModel = {
   title: string;
   content: string;
   type: ArcticleType;
   difficulty: ArticleDifficulty;
   category: ArticleCategory;
   subcategory: string;
   tags: string;
   status: ArticleStatus;
}