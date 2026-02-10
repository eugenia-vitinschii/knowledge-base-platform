//create article payload

import type { ArticleCategory, ArticleDifficulty, ArcticleType } from "@/shared/enums/article.enum";

export interface CreateArticlePayload {
   title: string;
   content: string;
   difficulty: ArticleDifficulty;
   tags?: string[];
   category: ArticleCategory;
   subcategory?: string;
   type: ArcticleType;
}