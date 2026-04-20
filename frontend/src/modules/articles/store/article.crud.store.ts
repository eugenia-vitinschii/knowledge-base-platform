//article crud store (admin)

import { defineStore } from "pinia";
import { ref } from "vue";
import { articlesApi } from "@/modules/articles/api/articles.api";

/* TYPES  & PAYLOAD */
import type { Article, CreateArticlePayload, UpdateArticlePayload, UpdateArticleStatusPayload } from "../types/index";

/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";

export const useArticlesCrudStore = defineStore("articlesCrud", () => {
   const currentArticle = ref<Article | null>(null);
   const list = ref<Article[]>([])

   const { request } = useApiRequest()

   /* === CREATE ARTICLE === */
   async function create(payload: CreateArticlePayload) {

      const data = await request(() =>
         articlesApi.crud.create(payload).then(r => r.data),
         "Failed to create new article"
      )

      if (data) {
         currentArticle.value = data
      }

      return data
   }

   /* === UPDATE ARTICLE === */
   async function update(id: string, payload: UpdateArticlePayload) {

      const data = await request(() =>
         articlesApi.crud.update(id, payload).then(r => r.data),
         "Failed to update article"
      )
      if (data) {
         currentArticle.value = data
      }
      return data
   }
   /* === UPDATE ARTICLE  STATUS === */
   async function updateStatus(id: string, payload: UpdateArticleStatusPayload) {

      const data = await request(() =>
         articlesApi.crud.updateStatus(id, payload).then(r => r.data),
         "Failed to update article status"
      )

      if (data) {
         currentArticle.value = data
      }
      return data
   }
   /* === DELETE ARTICLE === */
   async function remove(id: string) {
      const data = await request(() =>
         articlesApi.crud.delete(id),
         "Failed to delete article"
      )

      if (!data) return false
      list.value = list.value.filter((a) => a.id !== id)

      return true
   }
   return { create, update, updateStatus, remove, currentArticle, list }
})