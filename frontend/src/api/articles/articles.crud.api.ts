// CRUD LOGIC (/admin)

//api
import { api } from "../http"
//type
import type { Article, CreateArticlePayload, UpdateArticlePayload, UpdateArticleStatusPayload } from "@/types/article"

export const articlesCrudApi = {
   create(payload: CreateArticlePayload) {
      return api.post<Article>('/articles', payload)
   },
   update(id: string, payload: UpdateArticlePayload) {
      return api.put<Article>(`/articles/${id}`, payload)
   },
   updateStatus(id: string, payload: UpdateArticleStatusPayload) {
      return api.patch<Article>(`/articles/${id}/status`, payload)
   },
   delete(id: string) {
      return api.delete(`/articles/${id}`);
   },
}