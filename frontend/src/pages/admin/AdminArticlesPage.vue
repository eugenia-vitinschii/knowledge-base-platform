<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <p class="heading">Articles Table </p>
            </div>
            <div class="page__content articles-table-wrapper">
               <articles-table :items="articles.list" :can-edit-status="isAdmin" @edit="handleEdit"
                  @preview="handlePreview" @delete="handleDelete" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ArticlesTable from '@/components/article/ArticlesTable.vue';

/* VUE & Router*/
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
/*  PINIA  r*/
import { useAuthStore } from '@/stores/auth/auth.store';
import { useArticlesStore } from '@/stores/articles/article.store';

/* variables */
const auth = useAuthStore();
const articles = useArticlesStore();
const router = useRouter();

const isAdmin = computed(() => auth.user?.role === 'admin')

onMounted(async () => {
   if (isAdmin.value) {
      await articles.fetchAll()
   } else {
      await articles.fetchMy();
   }
})
/* VUE & PINIA & Router*/
const handleEdit = (id: string) => {
   router.push(`/admin/articles/${id}/edit`)
}

const handlePreview = (id: string) => {
   router.push(`/admin/articles/${id}/preview`)
}

const handleDelete = async (id: string) => {
   const confirmed = confirm('Delete this article?')
   if (!confirmed) return

   await articles.remove(id)
   articles.list = articles.list.filter(a => a.id !== id)
}
</script>
<style lang="sass">
.test
   p
      margin-top: 10px
</style>
