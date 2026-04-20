//article admin store (/admin)

import { defineStore } from "pinia";
import { ref } from "vue";
import { articlesApi } from "@/modules/articles/api/articles.api";

/* TYPES */
import type { Article, ArticleAdminFilters, ArticleAdminQueryParams } from "../types/index";


/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";

export const useArticlesAdminStore = defineStore("articlesAdmin", () => {
   const currentArticle = ref<Article | null>(null);
   const list = ref<Article[]>([])
   const filters = ref<ArticleAdminFilters>({
      search: '',
      type: "",
      difficulty: "",
      category: "",
      status: "",
   })

   const meta = ref<{ page: number; pages: number; total: number } | null>(null)

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
   /* === GET  FILTERED === */
   async function searchArticles(payload?: ArticleAdminQueryParams) {

      const data = await request(() =>
         articlesApi.admin.searchAdminArticles(payload ?? filters.value).then(r => r.data),
         "Failed to fetch filtered articles"
      )
      if (data) {
         list.value = data.data
         meta.value = data.meta
      }
      return data
   }
   return { fetchById, fetchMy, fetchAll, list, currentArticle, searchArticles, filters, meta }
})