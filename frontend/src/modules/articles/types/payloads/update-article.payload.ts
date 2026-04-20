//update article payload

import type { ArticleCategory, ArticleDifficulty, ArcticleType } from "@/shared/enums/article.enum";

export interface UpdateArticlePayload {
   title?: string;
   content?: string;
   difficulty?: ArticleDifficulty;
   tags?: string[];
   category?: ArticleCategory;
   subcategory?: string;
   type?: ArcticleType;
}