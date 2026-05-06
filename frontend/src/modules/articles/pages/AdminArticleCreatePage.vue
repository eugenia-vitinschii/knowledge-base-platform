<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <p class="heading">Create Article Page</p>
            </div>
            <div class="page__content">
               <article-form v-model="form" @submit="onSubmit" :isEdit=false :is-loading=false :canEditStatus="false" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ArticleForm from '../components/ArticleForm.vue';

/* TYPES & ENUMS & PAYLOAD */
import { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from '@/shared/enums/article.enum';

/* VUE & PINIA & STORE */
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useArticlesCrudStore } from '../store/article.crud.store';


import { useToast } from '@/shared/composables/useToast';
import type { ArticleFormData } from '../validation/articles.schema';
import { mapFormToCreatePayload } from '../utils/map-form-to-create';

/* VARIBALES */
const articleCrudStore = useArticlesCrudStore()
const router = useRouter()
const toast = useToast()

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

/* submit */
async function onSubmit() {

   const updated = await articleCrudStore.create(mapFormToCreatePayload(form))

   if (!updated) return toast.error("Failed to create the article")

   toast.success("Article has been created")

   router.push(`/admin/articles`)

}
</script>
