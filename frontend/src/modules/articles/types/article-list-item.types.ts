// List Item type (/public)

import type { ArcticleType, ArticleCategory, ArticleDifficulty } from "@/shared/enums/article.enum";
import type { ArticleAuthor } from "./article-preview.types";

export interface ArticleListItem {
   id: string;
   title: string;
   slug: string;
   updatedAt: string;
   type: ArcticleType;
   category: ArticleCategory;
   difficulty: ArticleDifficulty;
   author: ArticleAuthor
}