<template>
   <div class="page">
      <div class="container">
         <div class="page__header">
            <h1 class="heading">Article Preview</h1>
         </div>
         <div class="page__wrapper" v-if="aticlesAdminStore.currentArticle">
            <article-preview :article="aticlesAdminStore.currentArticle" :show-admin-controls=true @edit="handleEdit"
               @delete="handleDelete" />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ArticlePreview from '../components/ArticlePreview.vue';

/* PINIA */
import { useArticlesCrudStore } from '../store/article.crud.store';
import { useArticlesAdminStore } from '../store/article.admin.store';

/* VUE  & ROUTER */
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

import { useToast } from '@/shared/composables/useToast';

/* PINIA  Variables */
const articlesCrudStore = useArticlesCrudStore()
const aticlesAdminStore = useArticlesAdminStore()

/* Variables */
const route = useRoute()
const router = useRouter();
const toast = useToast()

/* FETCH ARTICLES (BY ID)  */
onMounted(async () => {
   const id = route.params.id as string

   if (!id) return

   await aticlesAdminStore.fetchById(id)
   toast.info("You are viewing a preview")
})

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
</script>
