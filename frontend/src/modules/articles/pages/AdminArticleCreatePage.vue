<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <h1 class="heading">Create Article Page</h1>
            </div>
            <div class="page__content">
               <article-form v-model="form" @submit="onSubmit" :isEdit=false :is-loading="isLoading"
                  :is-submitting="isLoading" :canEditStatus="false" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* VUE & ROUTER */
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

/* STORE & COMPOSABLE*/
import { useArticlesCrudStore } from '../store/article.crud.store';
import { useToast } from 'modular-ui-kit-vue'

/* COMPONENTS */
import ArticleForm from '../components/ArticleForm.vue';

/* SCHEMA & ENUMS */
import { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from '@/shared/enums/article.enum';
import type { ArticleFormData } from '../validation/articles.schema';

/* MAPPERS */
import { mapFormToCreatePayload } from '../utils/map-form-to-create';

/* === ROUTER & STORES === */
const articleCrudStore = useArticlesCrudStore()
const router = useRouter()
const { addToast } = useToast()

/* === STATE COMPUTED === */
const isLoading = computed(() => articleCrudStore.isLoading)

/* from data */
const form = reactive<ArticleFormData>({
   title: '',
   content: '',
   tags: '',
   subcategory: '',
   difficulty: ArticleDifficulty.BEGINNER,
   category: ArticleCategory.BACKEND_BASIS,
   type: ArcticleType.ARTICLE,
   status: ArticleStatus.DRAFT,
})

/* === EVENT HANDLERS === */
async function onSubmit() {

   const updated = await articleCrudStore.create(mapFormToCreatePayload(form))

   if (!updated) return addToast("Failed to create the article", 'danger', 3000)

   addToast("Article has been created", 'success', 3000)

   router.push(`/admin/articles`)

}
</script>
