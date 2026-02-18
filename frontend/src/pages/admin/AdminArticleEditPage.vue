<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <p class="heading">Update Article: {{ form.title }}</p>
            </div>
            <div class="page__content">
               <article-form v-model="form" :is-edit=true :canEditStatus="canEditStatus" :isStatusDirty="isStatusDirty"
                  @save-status="saveStatus" @submit="onSubmit" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ArticleForm from '@/components/ui/ArticleForm.vue';

/* TYPES & ENUMS */
import { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from '@/shared/enums/article.enum';
import type { ArticleFormModel } from '@/types/article-form.types';

/* VUE & PINIA */
import { onMounted, reactive, computed, ref } from 'vue';
import { useArticlesStore } from '@/stores/articles/article.store';
import { useAuthStore } from '@/stores/auth/auth.store';
import { useRoute, useRouter } from 'vue-router';
import type { UpdateArticlePayload } from '@/types/update-article.payload';

/* Variables */
const route = useRoute()
const router = useRouter()

const articleStore = useArticlesStore()
const auth = useAuthStore()

const canEditStatus = computed(() => auth.user?.role === 'admin')

/* form */
const form = reactive<ArticleFormModel>({
   title: '',
   content: '',
   tags: '',
   subcategory: "",
   difficulty: ArticleDifficulty.BEGINNER,
   category: ArticleCategory.BACKEND_BASIS,
   type: ArcticleType.ARTICLE,
   status: ArticleStatus.DRAFT,
})

/* tag parser */
function parseTags(input: string): string[] {
   return Array.from(
      new Set(
         input.split(/[,\s]+/).map(t => t.trim()).filter(Boolean).map((t) => t.toLocaleLowerCase())
      )
   )
}

const originalStatus = ref<ArticleStatus>(ArticleStatus.DRAFT)

/* load article */
onMounted(async () => {
   const id = route.params.id as string

   const article = await articleStore.fetchById(id)
   if (!article) return

   form.title = article.title;
   form.content = article.content;
   form.tags = article.tags.join(",");
   form.subcategory = article.subcategory || '';
   form.difficulty = article.difficulty;
   form.category = article.category;
   form.type = article.type;

   originalStatus.value = article.status
})

const isStatusDirty = computed(() => {
   return canEditStatus.value && form.status !== originalStatus.value
})

async function saveStatus() {

   if (!canEditStatus.value) return
   const id = route.params.id as string

   const updated = await articleStore.updateStatus(id, {
      status: form.status
   })

   if (!updated) return

   originalStatus.value = updated.status
   form.status = updated.status

}

async function onSubmit() {
   console.log("SUBMIT CALLED")

   const id = route.params.id as string

   const payload: UpdateArticlePayload = {
      title: form.title,
      content: form.content,
      tags: parseTags(form.tags),
      subcategory: form.subcategory || undefined,
      difficulty: form.difficulty,
      category: form.category,
      type: form.type,
   }

   const updated = await articleStore.update(id, payload)
   if (!updated) return

   router.push(`/`)
}

</script>
