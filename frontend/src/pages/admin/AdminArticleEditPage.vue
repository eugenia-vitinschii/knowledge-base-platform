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
import ArticleForm from '@/components/article/ArticleForm.vue';

/* TYPES & ENUMS */
import { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from '@/shared/enums/article.enum';
import type { ArticleFormModel } from '@/types/article-form.types';
import type { UpdateArticlePayload } from '@/types/update-article.payload';

/* VUE & ROUTER*/
import { onMounted, reactive, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/* PINIA */
import { useArticlesCrudStore } from '@/stores/articles/article.crud.store';
import { useArticlesAdminStore } from '@/stores/articles/article.admin.store';
import { useAuthStore } from '@/stores/auth/auth.store';
import { useToast } from '@/shared/composables/useToast';

/* Router Variables */
const route = useRoute()
const router = useRouter()

/* PINIA Variables */
const articleCrudStore = useArticlesCrudStore()
const auth = useAuthStore()
const articleAdminStore = useArticlesAdminStore()
const toast = useToast()

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

   const article = await articleAdminStore.fetchById(id)
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

/* SAVE STATUS (admin) */
async function saveStatus() {

   if (!canEditStatus.value) return
   const id = route.params.id as string

   const updated = await articleCrudStore.updateStatus(id, {
      status: form.status
   })

   if (!updated) return

   originalStatus.value = updated.status
   form.status = updated.status
   toast.success("Status has been updated")

}

/* UPDATE LOGIC (exception: status) */
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

   const updated = await articleCrudStore.update(id, payload)
   if (!updated) return toast.error("Article wasn't updated")
   toast.success("Article has been updated")
   router.push(`/admin/articles`)
}

</script>
