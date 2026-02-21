//articles api

import { api } from "./http"
import type { CreateArticlePayload } from "@/types/create-article.payload"
import type { Article } from "@/types/article.types"
import type { UpdateArticlePayload } from "@/types/update-article.payload"
import type { UpdateArticleStatusPayload } from "@/types/update-article-status.payload"
import type { ArticlePreview } from "@/types/article-preview.type"

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
   },
   getAll() {
      return api.get<Article[]>('/articles/admin/all')
   },
   getMy() {
      return api.get<Article[]>('/articles/admin/my')
   },
   delete(id: string) {
      return api.delete(`/articles/${id}`);
   },
   getBySlug(slug: string) {
      return api.get<ArticlePreview>(`/articles/public/${slug}`)
   }
}