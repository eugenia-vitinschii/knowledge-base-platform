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
import ArticleForm from '@/components/article/ArticleForm.vue';

/* TYPES & ENUMS */
import { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from '@/shared/enums/article.enum';
import type { ArticleFormModel } from '@/types/article-form.types';

/* VUE & PINIA */
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import { useArticlesStore } from '@/stores/articles/article.store';

import type { CreateArticlePayload } from '@/types/create-article.payload';
import { useToast } from '@/shared/composables/useToast';

const articleStore = useArticlesStore()
const router = useRouter()

const toast = useToast()

/* from data */
const form = reactive<ArticleFormModel>({
   title: '',
   content: '',
   tags: '',
   subcategory: '',
   difficulty: ArticleDifficulty.BEGINNER,
   category: ArticleCategory.BACKEND_BASIS,
   type: ArcticleType.ARTICLE,
   status: ArticleStatus.DRAFT,
})

/* parse tags  */
function parseTags(input: string): string[] {
   return Array.from(
      new Set(
         input.split(/[,\s]+/).map(t => t.trim()).filter(Boolean).map((t) => t.toLocaleLowerCase())
      )
   )
}

/* submit */
async function onSubmit() {
   const payload: CreateArticlePayload = {
      title: form.title,
      content: form.content,
      tags: parseTags(form.tags),
      subcategory: form.subcategory || undefined,
      difficulty: form.difficulty,
      category: form.category,
      type: form.type,
   }
   await articleStore.create(payload)

   toast.success("Article has been created")
   router.push(`/admin/articles`)

}
</script>
