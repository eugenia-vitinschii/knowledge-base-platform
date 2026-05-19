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
                  <div class="article-preview__wrapper" v-else-if="article" key="content">
                     <article-preview :article="article" :show-admin-controls=true @edit="handleEdit"
                        @delete="handleDelete" />
                  </div>
               </Transition>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ArticlePreview from '../components/ArticlePreview.vue';
import ArticlePreviewSkeleton from '@/shared/ui/ArticlePreviewSkeleton.vue';

/* PINIA */
import { useArticlesCrudStore } from '../store/article.crud.store';
import { useArticlesAdminStore } from '../store/article.admin.store';

/* VUE  & ROUTER */
import { useRoute, useRouter } from 'vue-router';
import { computed, watch } from 'vue';

import { useToast } from '@/shared/composables/useToast';

/* PINIA  Variables */
const articlesCrudStore = useArticlesCrudStore()
const aticlesAdminStore = useArticlesAdminStore()

/* Variables */
const route = useRoute()
const router = useRouter();
const toast = useToast()

/* UI render flow*/
const articleIsLoading = computed(() => aticlesAdminStore.isLoading)
const article = computed(() => aticlesAdminStore.currentArticle)


async function loadArticle(id: string) {
   await aticlesAdminStore.fetchById(id)
}
/* EDIT */
const handleEdit = (id: string) => {
   router.push(`/admin/articles/${id}/edit`)
}

/* DELETE */
const handleDelete = async (id: string) => {
   const confirmed = confirm('Delete this article?')
   if (!confirmed) return

   await articlesCrudStore.remove(id)

   aticlesAdminStore.list = aticlesAdminStore.list.filter(a => a.id !== id)
   toast.info("Article has been deleted")
   router.push(`/admin/articles`)
}

watch(
   () => route.params.id,
   async (id) => {
      if (!id) return

      await loadArticle(id as string)
      toast.info("You are viewing a preview")
   },
   { immediate: true }
)

</script>
