//article crud store (admin)

import { defineStore } from "pinia";
import { ref } from "vue";
import { articlesApi } from "@/modules/articles/api/articles.api";

/* TYPES  & PAYLOAD */
import type { Article, CreateArticlePayload, UpdateArticlePayload, UpdateArticleStatusPayload } from "../types/index";

/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";

export const useArticlesCrudStore = defineStore("articlesCrud", () => {
   const { request } = useApiRequest()

   /* === STATE === */
   const currentArticle = ref<Article | null>(null);
   const list = ref<Article[]>([])

   /* === UI FLOW STATE === */
   const isLoading = ref(false)

   /* === ACTIONS === */
   /* === Create Article === */
   async function create(payload: CreateArticlePayload) {
      isLoading.value = true
      try {
         const data = await request(() =>
            articlesApi.crud.create(payload).then(r => r.data),
            "Failed to create new article"
         )
         if (data) {
            currentArticle.value = data
         }
         return data
      } catch (err) {
         return null
      } finally {
         isLoading.value = false
      }
   }

   /* === Update article === */
   async function update(id: string, payload: UpdateArticlePayload) {
      isLoading.value = true
      try {
         const data = await request(() =>
            articlesApi.crud.update(id, payload).then(r => r.data),
            "Failed to update article"
         )
         if (data) {
            currentArticle.value = data
         }
         return data
      } catch (err) {
         return null
      } finally {
         isLoading.value = false
      }
   }
   /* === Update article status [ADMIN ONLY] === */
   async function updateStatus(id: string, payload: UpdateArticleStatusPayload) {
      isLoading.value = true
      try {
         const data = await request(() =>
            articlesApi.crud.updateStatus(id, payload).then(r => r.data),
            "Failed to update article status"
         )

         if (data) {
            currentArticle.value = data
         }
         return data
      } catch (err) {
         return null
      } finally {
         isLoading.value = false
      }
   }
   /* === Delete article [ADMIN ONLY] === */
   async function remove(id: string) {
      isLoading.value = true
      try {
         const data = await request(() =>
            articlesApi.crud.delete(id),
            "Failed to delete article"
         )
         return !!data

         // if (!data) return false
         // list.value = list.value.filter((a) => a.id !== id)

         // return true
      } catch (err) {
         return null
      } finally {
         isLoading.value = false
      }
   }
   return {
      //state
      list,
      currentArticle,
      isLoading,
      //actions
      create,
      update,
      updateStatus,
      remove,
   }
})