<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <h1 class="heading">HOME </h1>
            </div>
            <div class="page__content">
               <div class="filter-wrapper">
                  <articles-public-filter :filter="articlePublicStore.filters" :count="articlePublicStore.list.length"
                     @update:filter="onFilterChange" />
               </div>
               <div class="article-list" v-if="articlePublicStore.list.length">
                  <article-list-item v-for="article in articlePublicStore.list" :key="article.slug"
                     :article="article" />
               </div>
               <div class="page__info" v-else>
                  <p class="body-text">No results!</p>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* VUE */
import { watch } from 'vue';

/* COMPONNETS */
import ArticleListItem from '@/components/article/ArticleListItem.vue';
import ArticlesPublicFilter from '@/components/article/ArticlesPublicFilter.vue';

/*Pinia */
import { useArticlesPublicStore } from '@/stores/articles/article.public.store';
import { useArticleFilter } from "@/shared/composables/useArticleFilters"

/* TYPES */
import type { ArticlePublicFilters } from '@/types/article';

/* ROUTE */
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const articlePublicStore = useArticlesPublicStore()

const route = useRoute()
const router = useRouter()

const { mapQueryToFilters } = useArticleFilter()


/*remove empty values from URL */
function cleanQuery(filters: ArticlePublicFilters) {
   const query: any = {}

   Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) {
         query[key] = value
      }
   })
   return query
}
/*update URL query when filters change */
function onFilterChange(newFilters: ArticlePublicFilters) {
   router.push({
      path: '/articles',
      query: cleanQuery(newFilters)
   })
}
/* sync URL => store, fetch filtered articles*/
watch(
   () => route.query,
   async (query) => {
      const filters = mapQueryToFilters(query)
      articlePublicStore.filters = filters
      await articlePublicStore.searchArticles(filters)
   },
   { immediate: true }
)
</script>
