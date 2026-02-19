//article table types

import type { ArcticleType, ArticleCategory, ArticleStatus } from "@/shared/enums/article.enum";

export interface ArticleTableRow {
   id: string;
   title: string;
   status: ArticleStatus;
   category: ArticleCategory;
   type: ArcticleType;
   updatedAt?: string;
   authorId?: string
}