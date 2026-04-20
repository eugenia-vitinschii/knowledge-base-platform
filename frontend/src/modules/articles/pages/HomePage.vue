<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <h1 class="heading">HOME </h1>
            </div>
            <div class="page__content">
               <div class="filter-wrapper">
                  <articles-public-filter :filter="articlePublicStore.filters" :count="totalItems"
                     @update:filter="onFilterChange" />
               </div>
               <div class="article-list" v-if="articlePublicStore.list.length">
                  <article-list-item v-for="article in articlePublicStore.list" :key="article.slug"
                     :article="article" />
               </div>

               <div class="page__info" v-else>
                  <p class="body-text">No results!</p>
               </div>
               <div class="pagination-wrapper">
                  <base-pagination :page="currentPage" :total-pages="totalPages" @change="onPageChange" />
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* VUE */
import { watch, computed } from 'vue';

/* COMPONNETS */
import ArticleListItem from '../components/ArticleListItem.vue';
import ArticlesPublicFilter from '../components/ArticlesPublicFilter.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
/*Pinia */
import { useArticlesPublicStore } from '../store/article.public.store';
import { useArticleFilter } from "@/modules/articles/composables/useArticleFilters"

/* TYPES */
import type { ArticlePublicFilters, ArticleQueryParams } from '../types/index';

/* ROUTE */
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const articlePublicStore = useArticlesPublicStore()

const route = useRoute()
const router = useRouter()

const { mapQueryToParams } = useArticleFilter()

/* Pagination */
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

const currentPage = computed(() => articlePublicStore.meta?.page ?? 1)
const totalPages = computed(() => articlePublicStore.meta?.pages ?? 1)
const totalItems = computed(() => articlePublicStore.meta?.total ?? 1)

function extractFilters(params: ArticleQueryParams): ArticlePublicFilters {
   const { page, limit, ...filters } = params
   return filters
}


/*remove empty values from URL */
function cleanQuery(params: ArticleQueryParams) {
   const query: any = {}

   Object.entries(params).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) {
         query[key] = value
      }
   })
   return query
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
/* sync URL => store, fetch filtered articles*/
watch(
   () => route.query,
   async (query) => {
      const params = mapQueryToParams(query)

      articlePublicStore.filters = extractFilters(params)
      await articlePublicStore.searchArticles(params)
   },
   { immediate: true }
)
</script>