/* COMMETS STORE */

import { defineStore } from "pinia";
import { ref } from "vue";

/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";

/* TYPES  */
import type { Comment, CreateCommentPayload } from "../types";

import { commentsApi } from "../api/comment.api";

export const useComentsStore = defineStore("commemts", () => {

   const comments = ref<Comment[]>([])
   const isLoading = ref(false)

   const { request } = useApiRequest()

   /* FETCH COMMPENTS */
   async function fetchByArticle(articleId: string) {
      isLoading.value = true

      const data = await request(() =>
         commentsApi.fetchComments(articleId).then(r => r.data), 'Failed to fetch comments'
      )

      if (data) {
         comments.value = data
      }

      isLoading.value = false
      return data
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
      comments, isLoading, fetchByArticle, create
   }

})