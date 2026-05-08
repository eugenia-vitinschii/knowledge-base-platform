<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <h1 class="heading">Articles by {{ profile.profile?.name }}</h1>
            <div class="page__content">
               <article-list-item v-for="article in articles.list" :key="article.slug" :article="article" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ArticleListItem from '../components/ArticleListItem.vue';

import { watch } from 'vue';

/* STORES  */
import { useArticlesPublicStore } from '../store/article.public.store';
import { useProfileStore } from '@/modules/profile/store/profile.store';

const articles = useArticlesPublicStore()
const profile = useProfileStore()

import { useRoute } from 'vue-router';
const route = useRoute()

/* FETCH ARTICLES  */
watch(
   () => route.params.id,
   async (id) => {
      if (!id) return

      await Promise.all([
         articles.fetchByAuthor(String(id)),
         profile.fetchProfile(String(id))
      ])
   },
   { immediate: true }
)
</script>
