<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <h1 class="heading">Update Article: {{ form.title }}</h1>
            </div>
            <div class="page__content">
               <article-form v-model="form" is-edit :can-edit-status="canEditStatus" :original-status="originalStatus"
                  :is-submitting="isLoading && !isStatusAction" :is-status-loading="isLoading && isStatusAction"
                  @save-status="saveStatus" @submit="onSubmit" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* VUE & ROUTER */
import { reactive, computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/* STORE & COMPOSABLE */
import { useArticlesCrudStore } from '../store/article.crud.store';
import { useArticlesAdminStore } from '../store/article.admin.store';
import { useAuthStore } from '@/stores/auth/auth.store';
import { useToast } from '@/shared/composables/useToast';

/* COMPONENTS */
import ArticleForm from '../components/ArticleForm.vue';

/* TYPES & ENUMS */
import { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from '@/shared/enums/article.enum';
import type { ArticleFormData } from '../validation/articles.schema';

/* MAPPERS */
import { mapArticleToForm } from '../utils/map-article-to-form';
import { mapFormToUpdatePayload } from '../utils/map-form-to-update';

/* === ROUTER & STORES === */
const route = useRoute()
const router = useRouter()
const articleCrudStore = useArticlesCrudStore()
const auth = useAuthStore()
const articleAdminStore = useArticlesAdminStore()
const toast = useToast()

/* === STATE COMPUTED === */
const isLoading = computed(() => articleCrudStore.isLoading)
const articleId = computed(() => String(route.params.id || ''))
const canEditStatus = computed(() => auth.user?.role === 'admin')

const isStatusAction = ref(false)
const originalStatus = ref<ArticleStatus>(ArticleStatus.DRAFT)

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

/* WATCH & LIFECYCLE */
watch(articleId, async (newId) => {
   if (!newId) return

   const article = await articleAdminStore.fetchById(newId)
   if (!article) return

   originalStatus.value = article.status

   Object.assign(form, mapArticleToForm(article))
}, { immediate: true }
)

/* === EVENT HANDLERS === */
/* save status [role: admin] */
async function saveStatus(newStatus: ArticleStatus) {
   if (!canEditStatus.value) return
   isStatusAction.value = true

   const updated = await articleCrudStore.updateStatus(articleId.value, {
      status: newStatus
   })

   if (updated) {
      originalStatus.value = updated.status
      form.status = updated.status
      toast.success("Status has been updated")
   }
}

/* update article (exception: status) */
async function onSubmit() {
   isStatusAction.value = false
   const updated = await articleCrudStore.update(articleId.value, mapFormToUpdatePayload(form))

   if (!updated) return toast.error("Article wasn't updated")

   toast.success("Article has been updated")
   router.push(`/admin/articles`)
}

</script>
