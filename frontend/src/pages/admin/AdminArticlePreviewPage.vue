<template>
   <div class="page">
      <div class="container">
         <div class="page__header">
            <h1 class="heading">Article Preview</h1>
         </div>
         <div class="page__wrapper" v-if="articles.currentArticle">
            <article-preview :article="articles.currentArticle" :show-admin-controls=true @edit="handleEdit"
               @delete="handleDelete" />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ArticlePreview from '@/components/article/ArticlePreview.vue';

/* VUE  & PINIA*/
import { useArticlesStore } from '@/stores/articles/article.store';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

/* Variables */
const articles = useArticlesStore()
const route = useRoute()
const router = useRouter();

/* fetch article (id)*/
onMounted(async () => {
   const id = route.params.id as string

   if (!id) return
   await articles.fetchById(id)
})

/* EDIT */
const handleEdit = (id: string) => {
   router.push(`/admin/articles/${id}/edit`)
}

/* DELETE */
const handleDelete = async (id: string) => {
   const confirmed = confirm('Delete this article?')
   if (!confirmed) return

   await articles.remove(id)
   articles.list = articles.list.filter(a => a.id !== id)
   router.push(`/admin/articles`)
}
</script>
