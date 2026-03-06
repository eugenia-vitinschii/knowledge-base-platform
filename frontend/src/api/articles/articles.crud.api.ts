// CRUD LOGIC (/admin)

//api
import { api } from "../http"
//type
import type { Article } from "@/types/article.types"
//payload
import type { CreateArticlePayload } from "@/types/create-article.payload"
import type { UpdateArticlePayload } from "@/types/update-article.payload"
import type { UpdateArticleStatusPayload } from "@/types/update-article-status.payload"


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
   getById(id: string) {
      return api.get<Article>(`/articles/${id}`)
   },
   delete(id: string) {
      return api.delete(`/articles/${id}`);
   },
}