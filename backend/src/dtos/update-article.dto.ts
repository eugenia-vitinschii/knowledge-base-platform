///update article dto

import { ArcticleType, ArticleCategory, ArticleDifficulty } from "../common/enums/article.enums"

export interface UpdateArticleDto {
   title?: string
   content?: string
   difficulty?: ArticleDifficulty
   tags?: string[]
   category?: ArticleCategory
   subcategory?: string
   type?: ArcticleType
}