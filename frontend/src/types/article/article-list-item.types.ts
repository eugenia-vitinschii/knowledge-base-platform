// List Item type (/public)

import type { ArcticleType, ArticleCategory, ArticleDifficulty } from "@/shared/enums/article.enum";

export interface ArticleListItem {
   title: string;
   slug: string;
   updatedAt: string;
   type: ArcticleType;
   category: ArticleCategory;
   difficulty: ArticleDifficulty;
}