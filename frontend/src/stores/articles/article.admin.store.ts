//article admin store (/admin)

import { defineStore } from "pinia";
import { ref } from "vue";
import { articlesApi } from "@/api/articles.api";

/* TYPES */
import type { Article } from "@/types/article.types";

/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";

export const useArticlesAdminStore = defineStore("articlesAdmin", () => {
   const currentArticle = ref<Article | null>(null);
   const list = ref<Article[]>([])

   const { request } = useApiRequest()

   /* === GET BY ID === */
   async function fetchById(id: string) {

      const data = await request(() =>
         articlesApi.admin.getById(id).then(r => r.data),
         "Failed to fetch article by id"
      )

      if (data) {
         currentArticle.value = data
      }
      return data
   }
   /* === GET MY ARTICLES (EDITOR) === */
   async function fetchMy() {

      const data = await request(() =>
         articlesApi.admin.getMy().then(r => r.data),
         "Failed to load your articles"
      )

      if (data) {
         list.value = data
      }
      return data
   }
   /* === GET ALL ARTICLES === */
   async function fetchAll() {

      const data = await request(() =>
         articlesApi.admin.getAll().then(r => r.data),
         "Failed to load articles"
      )
      if (data) {
         list.value = data
      }

      return data
   }

   return { fetchById, fetchMy, fetchAll, list, currentArticle }
})