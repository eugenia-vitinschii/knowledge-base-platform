/* COMMENT API */

import { api } from "@/shared/api/http"

/* TYPES */
import type { CreateCommentPayload, Comment } from "../types/index"

export const commentsApi = {
   /* CREATE COMMENT */
   create(articleId: string, payload: CreateCommentPayload) {
      return api.post<Comment>(`/articles/${articleId}/comments`, payload)
   },

   /* FETCH COMMENTS */
   fetchComments(articleId: string) {
      return api.get<Comment[]>(`/articles/${articleId}/comments`)
   }
}