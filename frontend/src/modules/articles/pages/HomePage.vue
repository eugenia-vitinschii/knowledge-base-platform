<template>
   <div class="muk-page">
      <div class="muk-container">
         <div class="muk-page__wrapper">
            <div class="muk-page__header">
               <muk-text type="muk-heading">Articles Page</muk-text>
            </div>
            <div class="muk-page__content">
               <div class="filter-wrapper">
                  <articles-public-filter :filter="filters" :count="totalItems" @update:filter="onFilterChange" />
               </div>
               <Transition name="fade" mode="out-in">
                  <div class="muk-section" v-if="isLoading" key="loading">
                     <article-list-item-skeleton v-for="n in 6" :key="n" />
                  </div>
                  <div class="muk-page__info" v-else-if="error" key="error">
                     <muk-error-state title="Oops! Something went wrong..."
                        description="Failed to load articles. It might be a temporary connection issue. Please check your internet or try refreshing the page.">
                        <template name="action">
                           <muk-button @click="handleRetry">Try Again</muk-button>
                        </template>
                     </muk-error-state>
                  </div>
                  <div class="muk-section" v-else-if="hasArticles" key="articles">
                     <article-list-item v-for="article in articles" :key="article.slug" :article="article" />
                  </div>
                  <div class="muk-page__info" v-else key="empty">
                     <muk-empty-state :variant="'search'" :title="'No results found'"
                        :description="'Try adjusting your filters or search terms to find what you\'re looking for'" />
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
/* VUE  & ROUTER */
import { watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

/* COMPONNETS */
import { useMukToast, MukPagination, MukEmptyState, MukText, MukErrorState, MukButton } from 'modular-ui-kit-vue'
import ArticleListItem from '../components/ArticleListItem.vue';
import ArticleListItemSkeleton from '@/shared/ui/skeletons/ArticleListItemSkeleton.vue';
import ArticlesPublicFilter from '../components/ArticlesPublicFilter.vue';

/* Pinia */
import { useArticlesPublicStore } from '../store/article.public.store';
import { useArticleFilter } from "@/modules/articles/composables/useArticleFilters"

/* TYPES */
import type { ArticlePublicFilters, ArticleQueryParams } from '../types/index';


/* === ROUTER, STORES & COMPOSABLES === */
const route = useRoute()
const router = useRouter()

const articlePublicStore = useArticlesPublicStore()
const { mapQueryToParams } = useArticleFilter()

/* === STATE COMPUTED === */
/* UI render flow */
const isLoading = computed(() => articlePublicStore.isLoading)
const error = computed(() => articlePublicStore.error)
const hasArticles = computed(() => articlePublicStore.list.length > 0)

const articles = computed(() => articlePublicStore.list)
const filters = computed(() => articlePublicStore.filters)
/* pagination computed */
const currentPage = computed(() => articlePublicStore.meta?.page ?? 1)
const totalPages = computed(() => articlePublicStore.meta?.pages ?? 1)
const totalItems = computed(() => articlePublicStore.meta?.total ?? 1)

/* === HELPERS === */
async function loadArticles() {
   const params = mapQueryToParams(route.query)

   articlePublicStore.filters = extractFilters(params)
   await articlePublicStore.searchArticles(params)
}
function extractFilters(params: ArticleQueryParams): ArticlePublicFilters {
   const { page, limit, ...filters } = params
   return filters
}
/* remove empty values from URL */
function cleanQuery(params: ArticleQueryParams) {
   const query: any = {}

   Object.entries(params).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) {
         query[key] = value
      }
   })
   return query
}
/* === WATCHERS & LIFECYCLE=== */
/* sync URL => store, fetch filtered articles */
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
/* pagination  click*/
function onPageChange(page: number) {
   const params = mapQueryToParams(route.query)

   router.push({
      path: '/articles',
      query: cleanQuery({
         ...params,
         page
      })
   })
}
/*update URL query when filters change */
function onFilterChange(newFilters: ArticlePublicFilters) {
   const params = mapQueryToParams(route.query)

   router.push({
      path: '/articles',
      query: cleanQuery({
         ...params,
         ...newFilters,
         page: 1,
         limit: 10
      })
   })
}

</script>