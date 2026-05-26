<template>
   <form class="article-form" @submit.prevent="emitSubmit">
      <div class="article-form__section">
         <p class="subheading">Meta</p>
         <div class="article-form__section--items">
            <ui-input v-model="localForm.title" type="text" placeholder="title" label="*Article title"
               :error="errors.title" @update:model-value="validateField('title')" />
            <ui-select v-model="localForm.type" :options="typesOption" label="*Article types" />
            <ui-select v-model="localForm.difficulty" :options="difficultyOption" label="*Article difficulty" />
            <ui-select v-model="localForm.category" :options="categoryOption" label="*Article category" />
            <ui-input v-model="localForm.subcategory" type="text" placeholder="subcategory"
               label="Article subcategory" />
            <ui-input v-model="localForm.tags" type="text" placeholder="tags" label="Article tags" />
         </div>
      </div>
      <div class="article-form__section">
         <p class="subheading">Content</p>
         <div class="article-form__section--items">
            <markdown-editor v-model="localForm.content" :error="errors.content"
               @update:model-value="validateField('content')" />
         </div>
      </div>
      <div class="article-form__section" v-if="canEditStatus">
         <p class="subheading">Admin Controls</p>
         <div class="article-form__section--items">
            <ui-select v-model="localForm.status" :options="statusOptions" label="Article status" />
            <ui-button :loading="isStatusLoading" :disabled="!isStatusDirty || isStatusLoading" type="button"
               variant="danger" @click="emit('save-status', localForm.status)">save
               status</ui-button>
         </div>
      </div>
      <p class="subheading">{{ isEdit ? "Update" : "Create" }} article</p>
      <div class="article-form__actions">
         <router-link to="/" class="btn btn--secondary btn--lg"> back </router-link>
         <ui-button type="submit" variant="primary" :loading="isSubmitting" :disabled="isSubmitting" :size="'md'">
            {{ isEdit ? "update" : "create" }}
         </ui-button>
      </div>
      <br>
   </form>
</template>

<script setup lang="ts">
/* VUE */
import { watch, reactive, computed } from 'vue';

/* COMPOSABLE */
import { useToast } from '@/shared/composables/useToast';

/* COMPONENTS */
import UiInput from '@/components/ui/form/UiInput.vue';
import UiSelect from '@/components/ui/form/UiSelect.vue';
import MarkdownEditor from '@/components/markdown/MarkdownEditor.vue';
import UiButton from '@/components/ui/UiButton.vue';

/* TYPES & ENUMS */
import { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from '@/shared/enums/article.enum';
import type { CreateArticlePayload, UpdateArticlePayload } from '../types/index';

/* VALIDATION */
import type { ArticleFormData } from '../validation/articles.schema';
import { articleSchema } from '../validation/articles.schema';

/* MAPPERS */
import { mapFormToUpdatePayload } from '../utils/map-form-to-update';
import { mapFormToCreatePayload } from '../utils/map-form-to-create';

const toast = useToast()

/* === PROPS ===  */
const props = defineProps<{
   modelValue: ArticleFormData
   isEdit?: boolean
   canEditStatus?: boolean
   isSubmitting?: boolean,
   isStatusLoading?: boolean,
   originalStatus?: ArticleStatus
}>()

/* ===  EMITЫ  === */
const emit = defineEmits<{
   (e: "update:modelValue", value: ArticleFormData): void
   (e: "submit", payload: CreateArticlePayload | UpdateArticlePayload): void
   (e: "save-status", newStatus: ArticleStatus): void
}>()

/* === VARIABLES === */
const errors = reactive<Partial<Record<keyof ArticleFormData, string>>>({})
const localForm = reactive<ArticleFormData>({ ...props.modelValue })
const isStatusDirty = computed(() => localForm.status !== props.originalStatus)

/* === WATCH === */
watch(
   () => props.modelValue,
   (val) => Object.assign(localForm, val),
   { deep: true, immediate: true }
)
/* update Local FORM */
watch(
   localForm,
   (val) => emit("update:modelValue", { ...val }),
   { deep: true }
)

/* === METHODS  === */
function validateField(field: keyof ArticleFormData) {
   const result = articleSchema.safeParse(localForm)
   const issue = result.success ? undefined : result.error.issues.find(i => i.path[0] === field)

   if (issue) {
      errors[field] = issue.message
   } else {
      delete errors[field]
   }
}
function emitSubmit() {
   const result = articleSchema.safeParse(localForm)

   if (!result.success) {
      result.error.issues.forEach(issue => {
         const key = issue.path[0] as keyof ArticleFormData
         errors[key] = issue.message
      })

      toast.error("Please fix form errors")
      return
   }

   const payload = props.isEdit ? mapFormToUpdatePayload(localForm) : mapFormToCreatePayload(localForm)

   emit("submit", payload);
}

/* OPTIONS */
const typesOption = [
   { label: "Article", value: ArcticleType.ARTICLE },
   { label: "Documentation", value: ArcticleType.DOCUMENTATION },
   { label: "Guide", value: ArcticleType.GUIDE },
   { label: "Reference", value: ArcticleType.REFERENCE },
]
const difficultyOption = [
   { label: 'Advanced', value: ArticleDifficulty.ADVANCED },
   { label: 'Begginer', value: ArticleDifficulty.BEGINNER },
   { label: 'Inermediate', value: ArticleDifficulty.INTERMEDIATE },
]
const categoryOption = [
   { label: 'Backend Basis', value: ArticleCategory.BACKEND_BASIS },
   { label: 'Forms Validations', value: ArticleCategory.FORMS_VALIDATIONS },
   { label: 'HTML & CSS', value: ArticleCategory.HTML_CSS },
   { label: 'Javascript', value: ArticleCategory.JAVASCRIPT },
   { label: 'Pinia', value: ArticleCategory.PINIA },
   { label: 'Typescript', value: ArticleCategory.TYPESCRIPT },
   { label: 'Vue js', value: ArticleCategory.VUE },
   { label: 'Zod', value: ArticleCategory.ZOD },

]
const statusOptions = [
   { label: 'Draft', value: ArticleStatus.DRAFT },
   { label: 'Published', value: ArticleStatus.PUBLISHED },
   { label: 'Review', value: ArticleStatus.REVIEW },
]
</script>
