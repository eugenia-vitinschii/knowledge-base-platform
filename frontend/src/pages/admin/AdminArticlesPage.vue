<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <p class="heading">Articles Table </p>
            </div>
            <div class="page__content articles-table-wrapper">
               <articles-table :items="articles.list" :can-edit-status="isAdmin" @save-status="handleSaveStatus"
                  @edit="handleEdit" @preview="handlePreview" @delete="handleDelete" />
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

/*  PINIA  */
import { useAuthStore } from '@/stores/auth/auth.store';
import { useArticlesStore } from '@/stores/articles/article.store';

/*  TYPES */
import { ArticleStatus } from '@/shared/enums/article.enum';

/* variables */
const auth = useAuthStore();
const articles = useArticlesStore();
const router = useRouter();

/* check role & fetch data */
const isAdmin = computed(() => auth.user?.role === 'admin')

onMounted(async () => {
   if (isAdmin.value) {
      await articles.fetchAll()
   } else {
      await articles.fetchMy();
   }
})

/* Save Status */
const handleSaveStatus = async ({ id, status }: { id: string, status: ArticleStatus }) => {
   await articles.updateStatus(id, { status })

   const article = articles.list.find((a) => a.id === id)
   if (article) {
      article.status = status
   }
}

/* Table actions */
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
