<template>
   <form class="article-form" @submit.prevent="emitSubmit">
      <div class="muk-section__item">
         <muk-text as="h1" type="muk-subheading">Meta</muk-text>
         <div class="article-form__section--items">
            <muk-input v-model="localForm.title" type="text" placeholder="title" label="*Article title"
               :error="errors.title" @update:model-value="validateField('title')" />
            <muk-select v-model="localForm.type" :options="typesOption" label="*Article types" />
            <muk-select v-model="localForm.difficulty" :options="difficultyOption" label="*Article difficulty" />
            <muk-select v-model="localForm.category" :options="categoryOption" label="*Article category" />
            <muk-input v-model="localForm.subcategory" type="text" placeholder="subcategory"
               label="Article subcategory" />
            <muk-input v-model="localForm.tags" type="text" placeholder="tags" label="Article tags" />
         </div>
      </div>
      <div class="muk-section__item">
         <muk-text type="muk-subheading">Content</muk-text>
         <div class="article-form__section--items">
            <markdown-editor v-model="localForm.content" :error="errors.content"
               @update:model-value="validateField('content')" />
         </div>
      </div>
      <div class="muk-section__item" v-if="canEditStatus">
         <muk-text type="muk-subheading">Admin Controls</muk-text>
         <muk-select v-model="localForm.status" :options="statusOptions" label="Article status" />
         <div class="muk-section__actions">
            <muk-button :loading="isStatusLoading" :disabled="!isStatusDirty || isStatusLoading" type="button"
               variant="warning" @click="emit('save-status', localForm.status)">save status</muk-button>
         </div>

      </div>
      <div class="muk-section__item">
         <muk-text type="muk-subheading">{{ isEdit ? "Update" : "Create" }} article</muk-text>
         <div class="muk-section__actions">
            <muk-button variant="secondary" @click="$router.push('/')">back</muk-button>
            <muk-button type="submit" variant="primary" :loading="isSubmitting" :disabled="isSubmitting" :size="'md'">
               {{ isEdit ? "update" : "create" }}
            </muk-button>
         </div>
      </div>
      <br>
   </form>
</template>

<script setup lang="ts">
/* VUE */
import { watch, reactive, computed } from 'vue';

/* COMPOSABLE */

/* COMPONENTS */
import { useMukToast } from 'modular-ui-kit-vue'
import { MukText, MukInput, MukSelect, MukButton } from 'modular-ui-kit-vue'
import MarkdownEditor from '@/shared/ui/form/MarkdownEditor.vue';

/* TYPES & ENUMS */
import { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from '@/shared/enums/article.enum';
import type { CreateArticlePayload, UpdateArticlePayload } from '../types/index';

/* VALIDATION */
import type { ArticleFormData } from '../validation/articles.schema';
import { articleSchema } from '../validation/articles.schema';

/* MAPPERS */
import { mapFormToUpdatePayload } from '../utils/map-form-to-update';
import { mapFormToCreatePayload } from '../utils/map-form-to-create';

const { addToast } = useMukToast()

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

      addToast("Please fix form errors", "danger")
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
