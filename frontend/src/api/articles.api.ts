//articles api

import { api } from "./http"
import type { CreateArticlePayload } from "@/types/create-article.payload"
import type { Article } from "@/types/article.types"

export const articlesApi = {
   create(payload: CreateArticlePayload) {
      return api.post<Article>('/articles', payload)
   },
   update(id: string, payload: Partial<CreateArticlePayload>) {
      return api.put<Article>(`/articke/${id}`, payload)
   },
   getById(id: string) {
      return api.get<Article>(`/article/${id}`)
   }
}