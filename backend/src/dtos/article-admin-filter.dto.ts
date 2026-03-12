//article adminfilters dto

import { z } from "zod"
import { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from "../common/enums/article.enums"

export const ArticleAdminFilterDto = z.object({
   search: z.string().optional(),
   category: z.nativeEnum(ArticleCategory).optional(),
   type: z.nativeEnum(ArcticleType).optional(),
   difficulty: z.nativeEnum(ArticleDifficulty).optional(),
   status: z.nativeEnum(ArticleStatus).optional(),
})