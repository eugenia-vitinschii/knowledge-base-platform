<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <h1 class="heading">Articles by {{ profile.profile?.name }}</h1>
            </div>
            <div class="page__content">
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
            <div class="page__footer"></div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* VUE & ROUTER */
import { watch, computed } from 'vue';
import { useRoute } from 'vue-router';

/* COMPONENTS */
import ArticleListItem from '../components/ArticleListItem.vue';
import ArticleListItemSkeleton from '@/shared/ui/ArticleListItemSkeleton.vue';
import EmptyState from '@/shared/feedback/EmptyState.vue';
import ErrorState from "@/shared/feedback/ErrorState.vue"

/* STORES  */
import { useArticlesPublicStore } from '../store/article.public.store';
import { useProfileStore } from '@/modules/profile/store/profile.store';

/* === ROUTER & STORES === */
const articles = useArticlesPublicStore()
const profile = useProfileStore()
const route = useRoute()

/* === STATE COMPUTED === */
const userId = computed(() => String(route.params.id || ''))

/* UI render flow*/
const hasArticles = computed(() => articles.list.length > 0)
const isLoading = computed(() => articles.isLoading)
const error = computed(() => articles.error)

/* HELPERS */
async function loadPageData(id: string) {
   await Promise.all([
      articles.fetchByAuthor(String(id)),
      profile.fetchProfile(String(id))
   ])
}
/* retry action  */
async function handleRetry() {
   if (!userId.value) return

   await loadPageData(userId.value)
}
/* === WATCHERS === */
watch(
   () => route.params.id,
   async (id) => {
      if (!id) return

      await loadPageData(String(id))
   },
   { immediate: true }
)
</script>
