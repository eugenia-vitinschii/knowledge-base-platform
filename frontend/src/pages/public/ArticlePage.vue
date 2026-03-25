<template>
   <div class="page">
      <div class="container">
         <div class="page__header">
            <h1 class="heading">Article Page</h1>
         </div>
         <div class="page__wrapper" v-if="articles.currentPreview">
            <article-preview :article="articles.currentPreview" :show-admin-controls=false />
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
import { useArticlesPublicStore } from '@/stores/articles/article.public.store';
import { useRoute } from 'vue-router';
import { watch } from 'vue'

/* Variables */
const articles = useArticlesPublicStore()
const route = useRoute()


async function loadArticle(slug: string) {

   const key = `viewed-${slug}`

   if (!sessionStorage.getItem(key)) {
      await articles.incrementViews(slug)
      sessionStorage.setItem(key, 'true')
   }
   await articles.fetchBySlug(slug)

}

watch(
   () => route.params.slug,
   async (slug) => {
      if (!slug) return

      await loadArticle(slug as string)
   },
   { immediate: true }
)
</script>
