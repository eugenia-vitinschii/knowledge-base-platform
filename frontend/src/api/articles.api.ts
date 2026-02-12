//articles api

import { api } from "./http"
import type { CreateArticlePayload } from "@/types/create-article.payload"
import type { Article } from "@/types/article.types"
import type { UpdateArticlePayload } from "@/types/update-article.payload"
import type { UpdateArticleStatusPayload } from "@/types/update-article-status.payload"

export const articlesApi = {
   create(payload: CreateArticlePayload) {
      return api.post<Article>('/articles', payload)
   },
   update(id: string, payload: UpdateArticlePayload) {
      return api.put<Article>(`/articles/${id}`, payload)
   },
   updateStatus(id: string, payload: UpdateArticleStatusPayload) {
      return api.patch<Article>(`/articles/${id}/status`, payload)
   },
   getById(id: string) {
      return api.get<Article>(`/articles/${id}`)
   }
}