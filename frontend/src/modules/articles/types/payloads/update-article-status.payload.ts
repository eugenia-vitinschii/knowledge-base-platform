//types/ update status (admin role)

import type { ArticleStatus } from "@/shared/enums/article.enum";

export interface UpdateArticleStatusPayload {
   status: ArticleStatus
}