<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <h1 class="heading">Article Preview</h1>
            </div>
            <div class="page__content">
               <Transition name="fade" mode="out-in">
                  <div class="article-preview__wrapper" v-if="articleIsLoading" key="loading">
                     <article-preview-skeleton />
                  </div>
                  <div class="page__info" v-else-if="error" key="error">
                     <error-state title="Oops! Something went wrong..."
                        description="Failed to load article. It might be a temporary connection issue. Please check your internet or try refreshing the page."
                        buttonText="Try Again" @retry="handleRetry" />
                  </div>
                  <div class="article-preview__wrapper" v-else-if="article" key="content">
                     <article-preview :article="article" show-admin-controls @edit="handleEdit"
                        @delete="handleDelete" />
                  </div>
               </Transition>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* VUE  & ROUTER */
import { useRoute, useRouter } from 'vue-router';
import { computed, watch } from 'vue';

/* STORES & COMPOSABLES*/
import { useArticlesCrudStore } from '../store/article.crud.store';
import { useArticlesAdminStore } from '../store/article.admin.store';
import { useMukToast } from 'modular-ui-kit-vue'

/* COMPONENTS */
import ArticlePreview from '../components/ArticlePreview.vue';
import ArticlePreviewSkeleton from '@/shared/ui/skeletons/ArticlePreviewSkeleton.vue';
import ErrorState from '@/shared/ui/feedback/ErrorState.vue'

/* === STORES & ROUTER  === */
const route = useRoute()
const router = useRouter();
const articlesCrudStore = useArticlesCrudStore()
const articlesAdminStore = useArticlesAdminStore()
const { addToast } = useMukToast()

/* === STATE COMPUTED === */
/* UI render flow*/
const articleIsLoading = computed(() => articlesAdminStore.isLoading)
const article = computed(() => articlesAdminStore.currentArticle)
const error = computed(() => articlesAdminStore.error)

/* === HELPERS === */
async function loadArticle(id: string) {
   const data = await articlesAdminStore.fetchById(id)

   if (data) {
      addToast("You are viewing a preview", 'primary', 3000)
   }
}
/* === WATCHERS & LIFECYCLE=== */
watch(
   () => route.params.id,
   async (id) => {
      if (!id) return

      await loadArticle(id as string)
   },
   { immediate: true }
)

/* === EVENT HANDLERS === */
/* retry action */
async function handleRetry() {
   if (route.params.id) {
      await loadArticle(route.params.id as string)
   }
}
/* edit article */
const handleEdit = (id: string) => {
   router.push(`/admin/articles/${id}/edit`)
}
/* delete article */
const handleDelete = async (id: string) => {
   const confirmed = confirm('Delete this article?')
   if (!confirmed) return

   await articlesCrudStore.remove(id)

   addToast("Article has been deleted", 'primary', 3000)
   router.push(`/admin/articles`)
}

</script>
