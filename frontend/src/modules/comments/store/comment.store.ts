/* COMMETS STORE */

import { defineStore } from "pinia";
import { ref } from "vue";

/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";

/* TYPES  */
import type { Comment, CreateCommentPayload } from "../types";

import { commentsApi } from "../api/comment.api";
import { delay } from "@/shared/lib/delay"

export const useComentsStore = defineStore("commemts", () => {

   const comments = ref<Comment[]>([])
   const isLoading = ref(false)
   const error = ref<string | null>(null)
   const DEBUG_API_FAIL = ref(false)
   const { request } = useApiRequest()

   /* FETCH COMMPENTS */
   async function fetchByArticle(articleId: string) {
      isLoading.value = true
      error.value = null
      try {
         if (import.meta.env.DEV) {
            await delay(800)
         }
         // if (import.meta.env.DEV && DEBUG_API_FAIL) {
         //    throw new Error('Mock error')
         // }
         const data = await request(() =>
            commentsApi.fetchComments(articleId).then(r => r.data), 'Failed to fetch comments'
         )
         if (!data) {
            error.value = "Failed to fetch comments"
            return
         }

         comments.value = data
         return data
      } catch (err) {
         error.value = "Failed to fetch comments"
      } finally {
         isLoading.value = false
      }

   }

   /* CREATE COMMPENT */
   async function create(articleId: string, payload: CreateCommentPayload) {
      const data = await request(() =>
         commentsApi.create(articleId, payload).then(r => r.data), 'Failed to create comment'
      )

      if (data) {
         comments.value.unshift(data)
      }
      return data
   }

   return {
      comments, isLoading, fetchByArticle, create, error
   }

})