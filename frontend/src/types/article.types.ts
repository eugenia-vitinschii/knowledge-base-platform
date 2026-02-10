//types/article types

import type { ArticleCategory, ArticleDifficulty, ArticleStatus, ArcticleType } from "@/shared/enums/article.enum";

export interface Article {
   id: string;
   title: string;
   slug: string;
   content: string;
   difficulty: ArticleDifficulty;
   tags: string[];
   category: ArticleCategory;
   subcategory?: string;
   type: ArcticleType;
   status: ArticleStatus;
   author: string;
   createdAt: string;
   updatedAt: string;
}