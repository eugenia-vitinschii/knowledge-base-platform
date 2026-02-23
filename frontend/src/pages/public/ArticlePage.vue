<template>
   <div class="page">
      <div class="container">
         <div class="page__header">
            <h1 class="heading">Article Page</h1>
         </div>
         <div class="page__wrapper" v-if="articles.currentPreview">
            <article-preview :article="articles.currentPreview" />
         </div>
         <div v-else-if="articles.isLoading">
            <p class="body-text">Loading...</p>
         </div>
         <div v-else>
            <p class="body-text">Article not found</p>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ArticlePreview from '@/components/article/ArticlePreview.vue';

/* VUE  & PINIA & ROUTER*/
import { useArticlesStore } from '@/stores/articles/article.store';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue'


const articles = useArticlesStore()
const route = useRoute()


onMounted(async () => {
   const slug = route.params.slug as string

   if (!slug) return

   await articles.fetchBySlug(slug)
})
</script>
