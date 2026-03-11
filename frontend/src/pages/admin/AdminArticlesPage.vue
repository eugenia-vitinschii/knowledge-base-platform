<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <p class="heading">Articles Table </p>
            </div>
            <div class="page__content articles-table-wrapper" v-if="articlesAdminStore.list.length">
               <articles-table :items="articlesAdminStore.list" :can-edit-status="isAdmin"
                  @save-status="handleSaveStatus" @edit="handleEdit" @preview="handlePreview" @delete="handleDelete" />
            </div>
            <div class="page__info" v-else>
               <p class="subheading">Hi {{ auth.user?.name }} ! Create your fisrt article!</p>
               <router-link to="/admin/articles/create" class="heading"> create article</router-link>
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
import { useArticlesCrudStore } from '@/stores/articles/article.crud.store';
import { useArticlesAdminStore } from "@/stores/articles/article.admin.store"

/* ENUMS  & COMPOSABLE*/
import { ArticleStatus } from '@/shared/enums/article.enum';
import { useToast } from '@/shared/composables/useToast';

/*PINIA  variables */
const auth = useAuthStore();
const articlesCrudStore = useArticlesCrudStore();
const articlesAdminStore = useArticlesAdminStore();

/*router  variables */
const router = useRouter();
const toast = useToast()

/* check role & fetch data */
const isAdmin = computed(() => auth.user?.role === 'admin')

onMounted(async () => {
   if (isAdmin.value) {
      await articlesAdminStore.fetchAll()
   } else {
      await articlesAdminStore.fetchMy();
   }
})

/* Save Status */
const handleSaveStatus = async ({ id, status }: { id: string, status: ArticleStatus }) => {
   await articlesCrudStore.updateStatus(id, { status })

   const article = articlesCrudStore.list.find((a) => a.id === id)
   if (article) {
      article.status = status
   }
   toast.success("Status updated successfully")
}

/* TABLE ACTIONS (EDIT, PREVIEW, DELETE)*/
const handleEdit = (id: string) => {
   router.push(`/admin/articles/${id}/edit`)
}

const handlePreview = (id: string) => {
   router.push(`/admin/articles/${id}/preview`)
}

const handleDelete = async (id: string) => {
   const confirmed = confirm('Delete this article?')
   if (!confirmed) return

   await articlesCrudStore.remove(id)
   articlesAdminStore.list = articlesAdminStore.list.filter(a => a.id !== id)
   toast.info("Article has been deleted")
}

</script>
