import { ArticleStatus } from "@/common/enums/article.enums.js";
import { z } from "zod"

export const UpdateArticleStatusDto = z.object({
   status: z.nativeEnum(ArticleStatus),
})
