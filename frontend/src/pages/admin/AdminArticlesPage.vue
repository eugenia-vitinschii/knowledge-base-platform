<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <p class="heading">Articles Table ({{ articlesAdminStore.list?.length }}) </p>
            </div>
            <div class="filter-wrapper">
               <article-admin-filter :filter="articlesAdminStore.filters" :count="articlesAdminStore.list.length"
                  @update:filter="onFilterChange" />
            </div>
            <div class="page__content articles-table-wrapper" v-if="articlesAdminStore.list.length">
               <articles-table :items="articlesAdminStore.list" :can-edit-status="isAdmin"
                  @save-status="handleSaveStatus" @edit="handleEdit" @preview="handlePreview" @delete="handleDelete" />
            </div>
            <div class="page__info" v-if="articlesAdminStore.list.length === 0">
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
import ArticleAdminFilter from '@/components/article/ArticleAdminFilter.vue';

/* VUE & Router*/
import { computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

/*  PINIA  */
import { useAuthStore } from '@/stores/auth/auth.store';
import { useArticlesCrudStore } from '@/stores/articles/article.crud.store';
import { useArticlesAdminStore } from "@/stores/articles/article.admin.store"

/* ENUMS  & COMPOSABLE*/
import { ArticleStatus } from '@/shared/enums/article.enum';
import { useToast } from '@/shared/composables/useToast';
import { useArticleAdminFilter } from '@/shared/composables/useAdminArticleFilter';

/*TYOES */
import type { ArticleAdminFilters } from '@/types/article';

/* PINIA  variables */
const auth = useAuthStore();
const articlesCrudStore = useArticlesCrudStore();
const articlesAdminStore = useArticlesAdminStore();


const { mapQueryToFilters } = useArticleAdminFilter()
/*router  variables */
const router = useRouter();
const route = useRoute()
const toast = useToast()

/* check role & fetch data */
const isAdmin = computed(() => auth.user?.role === 'admin')


/* remove empty values from URL */
function cleanQuery(filters: ArticleAdminFilters) {
   const query: any = {}

   Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) {
         query[key] = value
      }
   })

   return query
}
/* update URL when filters change */
function onFilterChange(newFilters: ArticleAdminFilters) {
   router.push({
      path: '/admin/articles',
      query: cleanQuery(newFilters)
   })
}

/* sync URL /store, fetch filtered */
watch(
   () => route.query,
   async (query) => {
      const filters = mapQueryToFilters(query)
      articlesAdminStore.filters = filters

      await articlesAdminStore.searchArticles(filters)

   },
   { immediate: true }
)


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
