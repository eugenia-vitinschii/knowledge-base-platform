<template>
   <div>
      <page-header title="Admin Articles Page" />
      <filter-bar :show-reset="isFilterActive" @reset="onReset">
         <template #chips v-if="activeFilters.length">
            <TransitionGroup name="fade">
               <div class="filter-chip" v-for="[key, value] in activeFilters" :key="key">
                  <muk-text as="span">{{ key }} : {{ value }}</muk-text>
                  <muk-icon-button @click="removeFilter(key)" size="sm" variant="danger">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path
                           d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
                     </svg>
                  </muk-icon-button>
               </div>
            </TransitionGroup>
         </template>
         <template #search>
            <muk-input v-model="localSearch.search" type="search" placeholder="🔍 search article" />
         </template>
         <template #filters>
            <muk-select v-model="localSearch.category" :options="categoryOption" />
            <muk-select v-model="localSearch.difficulty" :options="difficultyOption" />
            <muk-select v-model="localSearch.type" :options="typesOption" />
            <muk-select v-model="localSearch.status" :options="statusOption" />
         </template>
      </filter-bar>
      <data-wrapper :loading="isFetching" :error="!!fetchError" :items="articles">
         <template #skeleton>
            <data-table-skeleton :rows="9" :buttons="3" :columns="5" />
         </template>
         <template #error>
            <muk-error-state title="Oops! Something went wrong..."
               description="Failed to load articles. It might be a temporary connection issue. Please check your internet or try refreshing the page.">
               <template #action>
                  <muk-button @click="handleRetry">Try Again</muk-button>
               </template>
            </muk-error-state>
         </template>
         <template #empty>
            <muk-empty-state v-if="!hasFilters" :variant="'accent'"
               :title="`${auth.user?.name}, write your first article!`"
               description="'It looks like you haven\'t created anything yet. Time to share some knowledge!'">
               <template #action>
                  <muk-text as="router-link" :to="'/admin/articles/create'">Create article</muk-text>
               </template>
            </muk-empty-state>
            <muk-empty-state v-else variant="search" title="No results found"
               description="'Try adjusting your filters or search terms to find what youre looking for'" />
         </template>
         <data-table :items="articles" :columns="columns" pagination>
            <template #cell-status="{ item }">
               <article-status-cell :article-id="item.id" :status="item.status" :can-edit="isAdmin"
                  @save-status="handleSaveStatus" />
            </template>
            <template #cell-actions="{ item }">
               <div class="muk-table__actions">
                  <muk-icon-button variant="primary" @click="handleEdit(item.id)"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path
                           d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                     </svg></muk-icon-button>
                  <muk-icon-button variant="secondary" @click="handlePreview(item.id)"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path
                           d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-480H200v480Zm133.5-124.5Q269-369 240-440q29-71 93.5-115.5T480-600q82 0 146.5 44.5T720-440q-29 71-93.5 115.5T480-280q-82 0-146.5-44.5Zm248.5-42q46-26.5 72-73.5-26-47-72-73.5T480-540q-56 0-102 26.5T306-440q26 47 72 73.5T480-340q56 0 102-26.5ZM480-440Zm42.5 42.5Q540-415 540-440t-17.5-42.5Q505-500 480-500t-42.5 17.5Q420-465 420-440t17.5 42.5Q455-380 480-380t42.5-17.5Z" />
                     </svg></muk-icon-button>
                  <muk-icon-button variant="danger" :disabled="!isAdmin" @click="handleDelete(item.id)"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path
                           d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
                     </svg></muk-icon-button>
               </div>
            </template>
            <template v-if="hasArticles && !isLoading" #pagination>
               <muk-pagination :page="currentPage" :total-pages="totalPages" @change="onPageChange" />
            </template>
         </data-table>
      </data-wrapper>
   </div>
</template>

<script setup lang="ts">
/* VUE & ROUTER */
import { computed, watch, ref, reactive, Transition } from 'vue';
import { useRouter, useRoute } from 'vue-router';

/* STORE & COMPOSABLES */
import { useAuthStore } from '@/stores/auth/auth.store';
import { useArticlesCrudStore } from '../store/article.crud.store';
import { useArticlesAdminStore } from "../store/article.admin.store"

/* COMPOSABLES  */
import { useMukToast } from 'modular-ui-kit-vue'
import { useArticleAdminFilter } from '@/modules/articles/composables/useAdminArticleFilter';

/* COMPONENTS */
import { MukButton, MukText, MukPagination, MukEmptyState, MukErrorState, MukIconButton, MukSelect, MukInput } from 'modular-ui-kit-vue';
import { PageHeader, DataWrapper, DataTableSkeleton, DataTable, FilterBar } from 'vue-saas-kit';
import ArticleStatusCell from '../components/ArticleStatusCell.vue';

/* ENUMS & TYPES */
import type { ArticleAdminFilters, ArticleAdminQueryParams } from '../types/index';
import { ArticleDifficulty, ArcticleType, ArticleCategory, ArticleStatus } from '@/shared/enums/article.enum';

/* === VUE & ROUTER  === */
const router = useRouter();
const route = useRoute()
const auth = useAuthStore();
const articlesCrudStore = useArticlesCrudStore();
const articlesAdminStore = useArticlesAdminStore();

/* === COMPOSABLES  === */
const { addToast } = useMukToast()
const { mapQueryToParams } = useArticleAdminFilter()

/* ==============================  FILTER BAR  ===========================*/
//init local state
const localSearch = reactive<ArticleAdminFilters>({
   search: articlesAdminStore.filters.search ?? '',
   category: articlesAdminStore.filters.category ?? '',
   difficulty: articlesAdminStore.filters.difficulty ?? '',
   type: articlesAdminStore.filters.type ?? '',
   status: articlesAdminStore.filters.status ?? ''
})

/* HELPERS */
const isFilterActive = computed(() => {
   return Object.values(localSearch).some(Boolean)
})

const activeFilters = computed(() => {
   return (Object.entries(localSearch) as [keyof ArticleAdminFilters, any][]).filter(([_, val]) => Boolean(val))
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

//form watcher
watch(
   localSearch,
   (newFilters) => {
      const cleaned = cleanQuery(newFilters) as ArticleAdminFilters
      articlesAdminStore.searchArticles(cleaned)
   },
   { deep: true }
)

const removeFilter = (key: keyof ArticleAdminFilters) => {
   localSearch[key] = ''
}


const onReset = () => {
   (Object.keys(localSearch) as (keyof ArticleAdminFilters)[]).forEach((key) => {
      localSearch[key] = ''
   })
}

/* === OPTIONS === */
const typesOption = [
   { label: "All types", value: "" },
   { label: "Article", value: ArcticleType.ARTICLE },
   { label: "Documentation", value: ArcticleType.DOCUMENTATION },
   { label: "Guide", value: ArcticleType.GUIDE },
   { label: "Reference", value: ArcticleType.REFERENCE },
]
const difficultyOption = [
   { label: "All difficulty", value: "" },
   { label: 'Advanced', value: ArticleDifficulty.ADVANCED },
   { label: 'Begginer', value: ArticleDifficulty.BEGINNER },
   { label: 'Inermediate', value: ArticleDifficulty.INTERMEDIATE },
]
const categoryOption = [
   { label: "All categories", value: "" },
   { label: 'Backend Basis', value: ArticleCategory.BACKEND_BASIS },
   { label: 'Forms Validations', value: ArticleCategory.FORMS_VALIDATIONS },
   { label: 'HTML & CSS', value: ArticleCategory.HTML_CSS },
   { label: 'Javascript', value: ArticleCategory.JAVASCRIPT },
   { label: 'Pinia', value: ArticleCategory.PINIA },
   { label: 'Typescript', value: ArticleCategory.TYPESCRIPT },
   { label: 'Vue js', value: ArticleCategory.VUE },
   { label: 'Zod', value: ArticleCategory.ZOD },

]
const statusOption = [
   { label: "All Statuses", value: "" },
   { label: 'Draft', value: ArticleStatus.DRAFT },
   { label: 'Published', value: ArticleStatus.PUBLISHED },
   { label: 'Review', value: ArticleStatus.REVIEW },
]
/*======================================== */
/* DATA TABLE  */
const columns = [
   { key: 'title', label: 'Title' },
   { key: 'status', label: 'Status' },
   { key: 'type', label: 'Type' },
   { key: 'category', label: 'Category' },
   { key: 'actions', label: 'Actions' }
]

/* === STATE COMPUTED === */
/* UI render flow*/
const isLoading = computed(() => articlesAdminStore.isLoading)
//data wrapper 
const isFetching = computed(() => articlesAdminStore.isLoading)
const fetchError = computed(() => articlesAdminStore.error)

const articles = computed(() => articlesAdminStore.list)

/* check role & fetch data */
const isAdmin = computed(() => auth.user?.role === 'admin')
const hasFilters = computed(() => hasActiveFilter(articlesAdminStore.filters))
const hasArticles = computed(() => articlesAdminStore.list.length > 0
)
/* pagination info */
const currentPage = computed(() => articlesAdminStore.meta?.page ?? 1)
const totalPages = computed(() => articlesAdminStore.meta?.pages ?? 1)

const statusLoadingId = ref<string | null>(null)

/* DATA TABLE  */
/* status options */
/* === HELPERS === */
function hasActiveFilter(filters: ArticleAdminFilters): boolean {
   return Object.values(filters).some(Boolean)
}

function extractFilters(params: ArticleAdminQueryParams): ArticleAdminFilters {
   const { page, limit, ...filters } = params
   return filters
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


/* Save Status */
const handleSaveStatus = async ({ id, status }: { id: string, status: ArticleStatus }) => {
   statusLoadingId.value = id

   const updated = await articlesCrudStore.updateStatus(id, { status })

   if (updated) {
      const targetArticle = articlesAdminStore.list.find((a) => a.id === id)

      if (targetArticle) {
         targetArticle.status = updated.status
         addToast("Status updated successfully", 'success')
      }
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
