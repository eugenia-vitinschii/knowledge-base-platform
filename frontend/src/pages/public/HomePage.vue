<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <h1 class="heading">HOME</h1>
            </div>
            <div class="page__content">
               <div class="filter-wrapper">
                  <articles-public-filter v-model:filter="articlePublicStore.filters" />
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

/* COMPONNETS */
import ArticleListItem from '@/components/article/ArticleListItem.vue';
import ArticlesPublicFilter from '@/components/article/ArticlesPublicFilter.vue';

/*Pinia */
import { useArticlesPublicStore } from '@/stores/articles/article.public.store';
import { onMounted, watch } from 'vue';

const articlePublicStore = useArticlesPublicStore()

onMounted(() => {
   articlePublicStore.searchArticles()
})

watch(
   () => articlePublicStore.filters,
   () => { articlePublicStore.searchArticles(articlePublicStore.filters) },
   { deep: true }
)
</script>
