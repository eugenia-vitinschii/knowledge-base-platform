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
                  <div class="page__info" v-else-if="articleError" key="article-error">
                     <error-state title="Oops! Something went wrong..."
                        description="Failed to load article. It might be a temporary connection issue. Please check your internet or try refreshing the page."
                        buttonText="Try Again" @retry="handleRetryArticle" />
                  </div>
                  <div class="article-preview__wrapper" v-else-if="article" key="content">
                     <article-preview :article="article" :show-admin-controls=false />
                  </div>
               </Transition>
               <Transition name="fade" mode="out-in">
                  <div class="comment-list__wrapper" v-if="commentsIsLoading" key="loading-comments">
                     <comment-list-skeleton v-for="n in 6" :key="n" />
                  </div>
                  <div class="page__info" v-else-if="commentsError" key="comment-error">
                     <error-state title="Oops! Something went wrong..."
                        description="Failed to load article comments. It might be a temporary connection issue. Please check your internet or try refreshing the page."
                        buttonText="Try Again" @retry="handleRetryComments" />
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

/* STORES  & COMPOSABLES*/
import { useArticlesPublicStore } from '../store/article.public.store';
import { useComentsStore } from '@/modules/comments/store/comment.store';
import { useToast } from '@/shared/composables/useToast';

/* COMPONENTS */
import ArticlePreview from '../components/ArticlePreview.vue';
import ErrorState from "@/shared/ui/feedback/ErrorState.vue"
import ArticlePreviewSkeleton from '@/shared/ui/skeletons/ArticlePreviewSkeleton.vue';
import CommentForm from '@/modules/comments/components/CommentForm.vue';
import CommentList from '@/modules/comments/components/CommentList.vue';
import CommentListSkeleton from '@/shared/ui/skeletons/CommentListSkeleton.vue';

/* === TYPES === */
import type { CreateCommentPayload } from '@/modules/comments/types';

/* === ROUTER & STORES === */
const toast = useToast()
const route = useRoute()
const articlesStore = useArticlesPublicStore()
const commentsStore = useComentsStore()

/* ===  STATE COMPUTED ===* /
/* UI render flow (article)*/
const articleIsLoading = computed(() => articlesStore.isLoading)
const articleError = computed(() => articlesStore.error)
const article = computed(() => articlesStore.currentPreview)
const articleId = computed(() => articlesStore.currentPreview?.id || '')
/* UI render flow (comments)*/
const commentsIsLoading = computed(() => commentsStore.isLoading)
const commentsError = computed(() => commentsStore.error)
const comments = computed(() => commentsStore.comments)

/* ===  HELPERS === */
async function loadArticle(slug: string) {

   const key = `viewed-${slug}`

   if (!sessionStorage.getItem(key)) {
      await articlesStore.incrementViews(slug)
      sessionStorage.setItem(key, 'true')
   }
   const result = await articlesStore.fetchBySlug(slug)

   if (result?.id) {
      await commentsStore.fetchByArticle(result.id)
   }
}

/* ===  WATCHERS & LIFECYCLE === */
watch(
   () => route.params.slug,
   async (slug) => {
      if (!slug) return

      await loadArticle(slug as string)
   },
   { immediate: true }
)

/* === EVENT  HANDLERS === */
async function handleRetryArticle() {
   const slug = route.params.slug
   if (slug) {
      await loadArticle(slug as string)
   }
}
async function handleRetryComments() {
   if (articleId.value) {
      await commentsStore.fetchByArticle(articleId.value)
   }
}

async function onSubmit(payload: CreateCommentPayload) {

   const comment = await commentsStore.create(articleId.value, payload)

   if (!comment) return toast.error("Comment wasn't created")

   toast.success("Comment was created")
}

</script>
