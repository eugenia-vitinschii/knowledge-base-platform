//article  public filters dto

import { z } from "zod"
import { ArcticleType, ArticleCategory, ArticleDifficulty } from "@/common/enums/article.enums.js"

export const ArticlePublicSearchDto = z.object({
   search: z.string().optional(),
})


export const ArticlePublicFilterDto = z.object({
   ...ArticlePublicSearchDto.shape,
   category: z.nativeEnum(ArticleCategory).optional(),
   type: z.nativeEnum(ArcticleType).optional(),
   difficulty: z.nativeEnum(ArticleDifficulty).optional(),
   tag: z.string().optional()
})