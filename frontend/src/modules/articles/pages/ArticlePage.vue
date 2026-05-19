<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <h1 class="heading">Article Page</h1>
            </div>
            <div class="page__content">
               <Transition name="fade" mode="out-in">
                  <div class="article-preview__wrapper" v-if="articleIsLoading" key="loading">
                     <article-preview-skeleton />
                  </div>
                  <div class="article-preview__wrapper" v-else-if="article" key="content">
                     <article-preview :article="article" :show-admin-controls=false />
                  </div>
               </Transition>
               <Transition name="fade" mode="out-in">
                  <div class="comment-list__wrapper" v-if="commentsIsLoading" key="loading-comments">
                     <comment-list-skeleton v-for="n in 6" :key="n" />
                  </div>
                  <div class="comment-list__wrapper" v-else-if="article" key="content-comments">
                     <comment-list :comments="comments" />
                     <comment-form @submit="onSubmit" />
                  </div>
               </Transition>
            </div>
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
import ArticlePreviewSkeleton from '@/shared/ui/ArticlePreviewSkeleton.vue';
import CommentForm from '@/modules/comments/components/CommentForm.vue';
import CommentList from '@/modules/comments/components/CommentList.vue';
import CommentListSkeleton from '@/shared/ui/CommentListSkeleton.vue';


import type { CreateCommentPayload } from '@/modules/comments/types';

/* Variables */
const toast = useToast()
const route = useRoute()

const articlesStore = useArticlesPublicStore()
const commentsStore = useComentsStore()

/* UI render flow*/
const articleIsLoading = computed(() => articlesStore.isLoading)
const commentsIsLoading = computed(() => commentsStore.isLoading)
const article = computed(() => articlesStore.currentPreview)
const comments = computed(()=> commentsStore.comments)

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
