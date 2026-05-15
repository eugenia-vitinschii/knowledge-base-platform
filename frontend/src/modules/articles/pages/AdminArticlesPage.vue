<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <h1 class="heading">Admin Articles Page</h1>
            </div>
            <div class="filter-wrapper">
               <article-admin-filter :filter="articlesAdminStore.filters" :count="totalItems"
                  @update:filter="onFilterChange" />
            </div>
            <div class="page__content articles-table-wrapper" v-if="hasArticles">
               <articles-table :items="articlesAdminStore.list" :can-edit-status="isAdmin"
                  @save-status="handleSaveStatus" @edit="handleEdit" @preview="handlePreview" @delete="handleDelete" />
            </div>
            <div class="page__info" v-else>
               <empty-state v-if="!hasFilters" :variant="'accent'"
                  :title="`${auth.user?.name}, write your first article!`"
                  :description="'It looks like you haven\'t created anything yet. Time to share some knowledge!'">
                  <template #action>
                     <router-link class="body-text" :to="'/admin/articles/create'">Create article</router-link>
                  </template>
               </empty-state>
               <empty-state v-else :variant="'search'" :title="'No results found'"
                  :description="'Try adjusting your filters or search terms to find what youre looking for'" />
            </div>
            <div class="pagination-wrapper" v-if="hasArticles">
               <base-pagination :page="currentPage" :total-pages="totalPages" @change="onPageChange" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ArticlesTable from '../components/ArticlesTable.vue';
import ArticleAdminFilter from '../components/ArticleAdminFilter.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
import EmptyState from '@/shared/feedback/EmptyState.vue';

/* VUE & Router*/
import { computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

/*  PINIA  */
import { useAuthStore } from '@/stores/auth/auth.store';
import { useArticlesCrudStore } from '../store/article.crud.store';
import { useArticlesAdminStore } from "../store/article.admin.store"

/* ENUMS  & COMPOSABLE*/
import { ArticleStatus } from '@/shared/enums/article.enum';
import { useToast } from '@/shared/composables/useToast';
import { useArticleAdminFilter } from '@/modules/articles/composables/useAdminArticleFilter';

/*TYOES */
import type { ArticleAdminFilters, ArticleAdminQueryParams } from '../types/index';


/* PINIA  variables */
const auth = useAuthStore();
const articlesCrudStore = useArticlesCrudStore();
const articlesAdminStore = useArticlesAdminStore();
const toast = useToast()

const { mapQueryToParams } = useArticleAdminFilter()

/*router  variables */
const router = useRouter();
const route = useRoute()

/* check role & fetch data */
const isAdmin = computed(() => auth.user?.role === 'admin')

/* PAGINATION */
const currentPage = computed(() => articlesAdminStore.meta?.page ?? 1)
const totalPages = computed(() => articlesAdminStore.meta?.pages ?? 1)
const totalItems = computed(() => articlesAdminStore.meta?.total ?? 1)

function extractFilters(params: ArticleAdminQueryParams): ArticleAdminFilters {
   const { page, limit, ...filters } = params
   return filters
}

function onPageChange(page: number) {
   const params = mapQueryToParams(route.query)

   router.push({
      path: '/admin/articles',
      query: cleanQuery({
         ...params,
         page
      })
   })
}
/* empty state */
function hasActiveFilter(filters: ArticleAdminFilters): boolean {
   return Object.values(filters).some(Boolean)
}
const hasFilters = computed(() => {
   return hasActiveFilter(articlesAdminStore.filters)
})
const hasArticles = computed(() => {
   return articlesAdminStore.list.length > 0
})

/* remove empty values from URL */
function cleanQuery(filters: ArticleAdminQueryParams) {
   const query: any = {}

   Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) {
         query[key] = value
      }
   })

   return query
}
/* update URL when filters change */
function onFilterChange(newFilters: ArticleAdminFilters) {
   const params = mapQueryToParams(route.query)

   router.push({
      path: '/admin/articles',
      query: cleanQuery({
         ...params,
         ...newFilters,
         page: 1,
         limit: 10
      })
   })
}

/* sync URL /store, fetch filtered */
watch(
   () => route.query,
   async (query) => {
      const params = mapQueryToParams(query)

      articlesAdminStore.filters = extractFilters(params)

      await articlesAdminStore.searchArticles(params)

   },
   { immediate: true }
)

/* Save Status */
const handleSaveStatus = async ({ id, status }: { id: string, status: ArticleStatus }) => {
   await articlesCrudStore.updateStatus(id, { status })

   const article = articlesCrudStore.list.find((a) => a.id === id)
   if (article) {
      article.status = status
   }
   toast.success("Status updated successfully")
}

/* TABLE ACTIONS (EDIT, PREVIEW, DELETE)*/
const handleEdit = (id: string) => {
   router.push(`/admin/articles/${id}/edit`)
}

const handlePreview = (id: string) => {
   router.push(`/admin/articles/${id}/preview`)
}

const handleDelete = async (id: string) => {
   const confirmed = confirm('Delete this article?')
   if (!confirmed) return

   await articlesCrudStore.remove(id)
   articlesAdminStore.list = articlesAdminStore.list.filter(a => a.id !== id)
   toast.info("Article has been deleted")
}

</script>
