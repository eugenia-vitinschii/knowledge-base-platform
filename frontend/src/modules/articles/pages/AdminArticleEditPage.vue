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
import ArticleForm from '../components/ArticleForm.vue';

/* TYPES & ENUMS */
import { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from '@/shared/enums/article.enum';
import type { ArticleFormData } from '../validation/articles.schema';
import { mapArticleToForm } from '../utils/map-article-to-form';
/* VUE & ROUTER*/
import { onMounted, reactive, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/* PINIA */
import { useArticlesCrudStore } from '../store/article.crud.store';
import { useArticlesAdminStore } from '../store/article.admin.store';
import { useAuthStore } from '@/stores/auth/auth.store';
import { useToast } from '@/shared/composables/useToast';
import { mapFormToUpdatePayload } from '../utils/map-form-to-update';

/* Router Variables */
const route = useRoute()
const router = useRouter()

/* PINIA Variables */
const articleCrudStore = useArticlesCrudStore()
const auth = useAuthStore()
const articleAdminStore = useArticlesAdminStore()
const toast = useToast()

const canEditStatus = computed(() => auth.user?.role === 'admin')

const articleId = computed(() => String(route.params.id || ''))
/* form */
const form = reactive<ArticleFormData>({
   title: '',
   content: '',
   tags: '',
   subcategory: "",
   difficulty: ArticleDifficulty.BEGINNER,
   category: ArticleCategory.BACKEND_BASIS,
   type: ArcticleType.ARTICLE,
   status: ArticleStatus.DRAFT,
})



const originalStatus = ref<ArticleStatus>(ArticleStatus.DRAFT)

/* load article */
onMounted(async () => {
   const article = await articleAdminStore.fetchById(articleId.value)
   if (!article) return

   Object.assign(form, mapArticleToForm(article))

   originalStatus.value = article.status
})

const isStatusDirty = computed(() => {
   return canEditStatus.value && form.status !== originalStatus.value
})

/* SAVE STATUS (admin) */
async function saveStatus() {

   if (!canEditStatus.value) return

   const updated = await articleCrudStore.updateStatus(articleId.value, {
      status: form.status
   })

   if (!updated) return

   originalStatus.value = updated.status
   form.status = updated.status
   toast.success("Status has been updated")

}

/* UPDATE LOGIC (exception: status) */
async function onSubmit() {

   const updated = await articleCrudStore.update(articleId.value, mapFormToUpdatePayload(form))

   if (!updated) return toast.error("Article wasn't updated")

   toast.success("Article has been updated")

   router.push(`/admin/articles`)
}

</script>
