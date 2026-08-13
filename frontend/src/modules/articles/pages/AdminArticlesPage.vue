<template>
   <div class="muk-page">
      <div class="muk-container">
         <div class="muk-page__wrapper">
            <div class="muk-page__header">
               <muk-text as='h1' type="muk-heading">Admin Articles Page</muk-text>
            </div>
            <div class="muk-page__content">
               <div class="filter-wrapper">
                  <article-admin-filter :filter="filters" :count="totalItems" @update:filter="onFilterChange" />
               </div>
               <Transition name="fade" mode="out-in">
                  <div class="muk-section__item" v-if="isLoading" key="loading">
                     <table-skeleton :rows="9" :buttons="3" :columns="5" />
                  </div>
                  <div class="muk-section__item" v-else-if="error" key="error">
                     <muk-error-state title="Oops! Something went wrong..."
                        description="Failed to load articles. It might be a temporary connection issue. Please check your internet or try refreshing the page.">
                        <template #action>
                           <muk-button @click="handleRetry">Try Again</muk-button>
                        </template>
                     </muk-error-state>
                  </div>
                  <div class="muk-section__item muk-table-wrapper" v-else-if="hasArticles" key="articles">
                     <articles-table :items="articles" :can-edit-status="isAdmin" :is-loading="isLoading"
                        :status-loading-id="statusLoadingId" @save-status="handleSaveStatus" @edit="handleEdit"
                        @preview="handlePreview" @delete="handleDelete" />
                  </div>
                  <div class="muk-section__item" v-else key="empty">
                     <muk-empty-state v-if="!hasFilters" :variant="'accent'"
                        :title="`${auth.user?.name}, write your first article!`"
                        description="'It looks like you haven\'t created anything yet. Time to share some knowledge!'">
                        <template #action>
                           <muk-text as="router-link" :to="'/admin/articles/create'">Create article</muk-text>
                        </template>
                     </muk-empty-state>
                     <muk-empty-state v-else variant="search" title="No results found"
                        description="'Try adjusting your filters or search terms to find what youre looking for'" />
                  </div>
               </Transition>
            </div>
            <div class="muk-page__footer" v-if="hasArticles && !isLoading">
               <muk-pagination :page="currentPage" :total-pages="totalPages" @change="onPageChange" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* VUE & ROUTER */
import { computed, watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

/* STORE & COMPOSABLES */
import { useAuthStore } from '@/stores/auth/auth.store';
import { useArticlesCrudStore } from '../store/article.crud.store';
import { useArticlesAdminStore } from "../store/article.admin.store"

/* COMPOSABLES  */
import { useMukToast, MukPagination, MukEmptyState, MukText, MukErrorState, MukButton } from 'modular-ui-kit-vue'
import { useArticleAdminFilter } from '@/modules/articles/composables/useAdminArticleFilter';

/* COMPONENTS */
import ArticlesTable from '../components/ArticlesTable.vue';
import ArticleAdminFilter from '../components/ArticleAdminFilter.vue';
import TableSkeleton from '@/shared/ui/skeletons/TableSkeleton.vue';

/* ENUMS & TYPES */
import { ArticleStatus } from '@/shared/enums/article.enum';
import type { ArticleAdminFilters, ArticleAdminQueryParams } from '../types/index';

/* === VUE & ROUTER  === */
const router = useRouter();
const route = useRoute()
const auth = useAuthStore();
const articlesCrudStore = useArticlesCrudStore();
const articlesAdminStore = useArticlesAdminStore();

/* === COMPOSABLES  === */
const { addToast } = useMukToast()
const { mapQueryToParams } = useArticleAdminFilter()

/* === STATE COMPUTED === */
/* UI render flow*/
const isLoading = computed(() => articlesAdminStore.isLoading)
const error = computed(() => articlesAdminStore.error)

const articles = computed(() => articlesAdminStore.list)
const filters = computed(() => articlesAdminStore.filters)

/* check role & fetch data */
const isAdmin = computed(() => auth.user?.role === 'admin')
const hasFilters = computed(() => hasActiveFilter(articlesAdminStore.filters))
const hasArticles = computed(() => articlesAdminStore.list.length > 0
)
/* pagination info */
const currentPage = computed(() => articlesAdminStore.meta?.page ?? 1)
const totalPages = computed(() => articlesAdminStore.meta?.pages ?? 1)
const totalItems = computed(() => articlesAdminStore.meta?.total ?? 1)

const statusLoadingId = ref<string | null>(null)

/* === HELPERS === */
function hasActiveFilter(filters: ArticleAdminFilters): boolean {
   return Object.values(filters).some(Boolean)
}

function extractFilters(params: ArticleAdminQueryParams): ArticleAdminFilters {
   const { page, limit, ...filters } = params
   return filters
}

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
async function loadArticles() {
   const params = mapQueryToParams(route.query)

   articlesAdminStore.filters = extractFilters(params)
   await articlesAdminStore.searchArticles(params)
}

/* === WATCHERS & LIFECYCLE=== */
/* sync URL /store, fetch filtered */
watch(
   () => route.query,
   async () => {
      await loadArticles()
   },
   { immediate: true }
)

/* === EVENT HANDLERS === */
/* retry action  */
async function handleRetry() {
   await loadArticles()
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

/* Save Status */
const handleSaveStatus = async ({ id, status }: { id: string, status: ArticleStatus }) => {
   statusLoadingId.value = id

   const updated = await articlesCrudStore.updateStatus(id, { status })

   if (updated) {
      const index = articlesAdminStore.list.findIndex((a) => a.id === id)
      if (index !== -1) {
         articlesAdminStore.list[index].status = updated.status
      }
      addToast("Status updated successfully", 'success')
   }

   statusLoadingId.value = null

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
   await loadArticles()
   addToast("Article has been deleted", 'success')
}

</script>
