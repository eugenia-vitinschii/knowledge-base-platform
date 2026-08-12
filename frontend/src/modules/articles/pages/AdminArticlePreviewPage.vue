<template>
   <div class="muk-page">
      <div class="muk-container">
         <div class="muk-page__wrapper">
            <div class="muk-page__header">
               <muk-text as="h1" type="muk-heading">Article Preview</muk-text>
            </div>
            <div class="muk-page__content">
               <Transition name="fade" mode="out-in">
                  <div class="muk-section__item" v-if="articleIsLoading" key="loading">
                     <article-preview-skeleton />
                  </div>
                  <div class="muk-section__item" v-else-if="error" key="error">
                     <muk-error-state title="Oops! Something went wrong..."
                        description="Failed to load article. It might be a temporary connection issue. Please check your internet or try refreshing the page.">
                        <template #action>
                           <muk-button @click="handleRetry">Try Again</muk-button>
                        </template>
                     </muk-error-state>
                  </div>
                  <div class="muk-section__item" v-else-if="article" key="content">
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
import { MukText, MukErrorState, MukButton } from 'modular-ui-kit-vue';
import ArticlePreview from '../components/ArticlePreview.vue';
import ArticlePreviewSkeleton from '@/shared/ui/skeletons/ArticlePreviewSkeleton.vue';

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
