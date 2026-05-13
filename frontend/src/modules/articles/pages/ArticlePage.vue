<template>
   <div class="page">
      <div class="container">
         <div class="page__header">
            <h1 class="heading">Article Page</h1>
         </div>
         <div class="page__wrapper" v-if="articlesStore.currentPreview">
            <article-preview :article="articlesStore.currentPreview" :show-admin-controls=false />
            <comment-list :comments="commentsStore.comments" />
            <comment-form @submit="onSubmit" />
         </div>
         <div v-else>
            <p class="body-text">Article not found</p>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* VUE & ROUTER*/
import { useRoute } from 'vue-router';
import { watch, computed } from 'vue'

/* STORES */
import { useArticlesPublicStore } from '../store/article.public.store';
import { useComentsStore } from '@/modules/comments/store/comment.store';
import { useToast } from '@/shared/composables/useToast';

/* COMPONENTS */
import ArticlePreview from '../components/ArticlePreview.vue';
import CommentForm from '@/modules/comments/components/CommentForm.vue';
import CommentList from '@/modules/comments/components/CommentList.vue';

import type { CreateCommentPayload } from '@/modules/comments/types';

/* Variables */
const toast = useToast()
const route = useRoute()

const articlesStore = useArticlesPublicStore()
const commentsStore = useComentsStore()

const articleId = computed(() => articlesStore.currentPreview?.id || '')

async function loadArticle(slug: string) {

   const key = `viewed-${slug}`

   if (!sessionStorage.getItem(key)) {
      await articlesStore.incrementViews(slug)
      sessionStorage.setItem(key, 'true')
   }
   await articlesStore.fetchBySlug(slug)

   if (articlesStore.currentPreview?.id) {
      await commentsStore.fetchByArticle(articlesStore.currentPreview.id)
   }

}


/* submit */
async function onSubmit(payload: CreateCommentPayload) {

   const comment = await commentsStore.create(articleId.value, payload)

   if (!comment) return toast.error("Comment wasn't created")

   toast.success("Comment was created")
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
