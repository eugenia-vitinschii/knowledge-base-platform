///update article dto

import { ArcticleType, ArticleCategory, ArticleDifficulty } from "../common/enums/article.enums"
import { z } from "zod"

export const UpdateArticleDto = z.object({
   title: z.string().min(7).optional(),
   content: z.string().min(20).optional(),
   difficulty: z.nativeEnum(ArticleDifficulty).optional(),
   tags: z.array(z.string()).optional(),
   category: z.nativeEnum(ArticleCategory).optional(),
   subcategory: z.string().optional(),
   type: z.nativeEnum(ArcticleType).optional(),
})

