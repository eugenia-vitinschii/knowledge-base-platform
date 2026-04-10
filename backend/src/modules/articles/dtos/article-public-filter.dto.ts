//article  public filters dto

import { z } from "zod"
import { ArcticleType, ArticleCategory, ArticleDifficulty } from "@/common/enums/article.enums.js"

export const ArticlePublicFilterDto = z.object({
   search: z.string().optional(),
   category: z.nativeEnum(ArticleCategory).optional(),
   type: z.nativeEnum(ArcticleType).optional(),
   difficulty: z.nativeEnum(ArticleDifficulty).optional(),
   tag: z.string().optional()
})