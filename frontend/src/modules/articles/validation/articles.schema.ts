//article schema (create, update)

import { z } from "zod"

import { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from "@/shared/enums/article.enum";
import { contentField, titleField } from "@/shared/validation/articles.fields";

export const articleSchema = z.object({
   title: titleField,
   content: contentField,
   type: z.nativeEnum(ArcticleType),
   difficulty: z.nativeEnum(ArticleDifficulty),
   category: z.nativeEnum(ArticleCategory),
   tags: z.string().optional(),
   subcategory: z.string().optional()
})


export type ArticleFormData = z.infer<typeof articleSchema> & {
   status: ArticleStatus
}

