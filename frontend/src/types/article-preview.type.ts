//types/article preview type

import type { ArticleCategory, ArticleDifficulty, ArticleStatus, ArcticleType } from "@/shared/enums/article.enum";

export interface ArticlePreview {
   id: string;
   title: string;
   slug?: string;
   content: string;
   difficulty: ArticleDifficulty;
   tags?: string[];
   category: ArticleCategory;
   subcategory?: string;
   type: ArcticleType;
   status: ArticleStatus;
   updatedAt: string;
}