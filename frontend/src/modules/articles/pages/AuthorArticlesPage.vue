<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <h1 class="heading">Articles by {{ profile.profile?.name }}</h1>
            </div>
            <div class="page__content">
               <div class="filter-wrapper">
                  <article-search :search="search" :count="totalItems" @update:search="onSearchChange" />
               </div>
               <Transition name="fade" mode="out-in">
                  <div class="article-list" v-if="isLoading" key="loading">
                     <article-list-item-skeleton v-for="n in 6" :key="n" />
                  </div>
                  <div class="page__info" v-else-if="error" key="error">
                     <error-state title="Oops! Something went wrong..."
                        description="Failed to load articles. It might be a temporary connection issue. Please check your internet or try refreshing the page."
                        buttonText="Try Again" @retry="handleRetry" />
                  </div>
                  <div class="article-list" v-else-if="hasArticles" key="articles">
                     <article-list-item v-for="article in articles.list" :key="article.slug" :article="article" />
                  </div>
                  <div class="page__info" v-else key="empty">
                     <empty-state :variant="'search'" :title="'No results found'"
                        :description="'This author hasn\'t published any articles yet'" />
                  </div>
               </Transition>
            </div>
            <div class="page__footer" v-if="hasArticles && !isLoading">
               <base-pagination :page="currentPage" :total-pages="totalPages" @change="onPageChange" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* VUE & ROUTER */
import { watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
/* COMPONENTS */
import ArticleListItem from '../components/ArticleListItem.vue';
import ArticleListItemSkeleton from '@/shared/ui/skeletons/ArticleListItemSkeleton.vue';
import EmptyState from '@/shared/ui/feedback/EmptyState.vue';
import ErrorState from "@/shared/ui/feedback/ErrorState.vue"
import ArticleSearch from '../components/ArticleSearch.vue';
import BasePagination from '@/shared/ui/navigation/BasePagination.vue';

/* STORES  */
import { useArticlesPublicStore } from '../store/article.public.store';
import { useProfileStore } from '@/modules/profile/store/profile.store';
import { useArticleSearch } from "@/modules/articles/composables/useArticleSearch"

/** TYPES */
import type { ArticleSearchParams, ArticlePublicSearch } from "../types/index"

/* === ROUTER & STORES === */
const articles = useArticlesPublicStore()
const profile = useProfileStore()
const route = useRoute()
const { mapQueryToParams } = useArticleSearch()
const router = useRouter()
/* === STATE COMPUTED === */
const userId = computed(() => String(route.params.id || ''))
const search = computed(() => articles.search)
/* UI render flow*/
const hasArticles = computed(() => articles.list.length > 0)
const isLoading = computed(() => articles.isLoading)
const error = computed(() => articles.error)


/* pagination computed */
const currentPage = computed(() => articles.meta?.page ?? 1)
const totalPages = computed(() => articles.meta?.pages ?? 1)
const totalItems = computed(() => articles.meta?.total ?? 1)


/* HELPERS */
async function loadArticles(id: string) {
   const params = mapQueryToParams(route.query)
   articles.search = extractFilters(params)

   await Promise.all([
      articles.fetchByAuthor(String(id), params),
      profile.fetchProfile(String(id))
   ])
}

function extractFilters(params: ArticleSearchParams): ArticlePublicSearch {
   const { page, limit, ...search } = params
   return search
}

/* remove empty values from URL */
function cleanQuery(params: ArticleSearchParams) {
   const query: any = {}

   Object.entries(params).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) {
         query[key] = value
      }
   })
   return query
}
/* === WATCHERS & LIFECYCLE=== */
/* sync URL => store, fetch searched articles */
watch(
   () => route.query,
   async () => {
      await loadArticles(userId.value)
   },
   { immediate: true }
)
/* === EVENT HANDLERS === */
/* retry action  */
async function handleRetry() {
   if (!userId.value) return

   await loadArticles(userId.value)
}
/* pagination  click*/
function onPageChange(page: number) {
   const params = mapQueryToParams(route.query)

   router.push({
      path: '/articles/users/' + userId.value,
      query: cleanQuery({
         ...params,
         page
      })
   })
}
/*update URL query when search change */
function onSearchChange(newSearch: ArticlePublicSearch) {
   const params = mapQueryToParams(route.query)

   router.push({
      path: '/articles/users/' + userId.value,
      query: cleanQuery({
         ...params,
         ...newSearch,
         page: 1,
         limit: 10
      })
   })
}


</script>
