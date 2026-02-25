<template>
   <form class="article-form" @submit.prevent="emitSubmit">
      <div class="article-form__section">
         <p class="subheading">Meta</p>
         <div class="article-form__section--items">
            <ui-input v-model="localForm.title" type="text" placeholder="title" label="*Article title" />
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
            <markdown-editor v-model="localForm.content" />
         </div>
      </div>
      <div class="article-form__section" v-if="canEditStatus">
         <p class="subheading">Admin Controls</p>
         <div class="article-form__section--items">
            <ui-select v-model="localForm.status" :options="statusOptions" label="Article status" />
            <ui-button type="button" variant="danger" @click="emit('save-status')">save
               status</ui-button>
         </div>
      </div>
      <p class="subheading">{{ isEdit ? "Update" : "Create" }} article</p>
      <div class="article-form__actions">
         <router-link to="/" class="btn btn--secondary btn--lg"> back </router-link>
         <ui-button type="submit" variant="primary" :loading="isLoading" :size="'md'">
            {{ isEdit ? "update" : "create" }}
         </ui-button>
      </div>
      <br>
   </form>
</template>

<script setup lang="ts">

/* COMPONENTS */
import UiInput from '@/components/ui/form/UiInput.vue';
import UiSelect from '@/components/ui/form/UiSelect.vue';
import MarkdownEditor from '../markdown/MarkdownEditor.vue';
import UiButton from '@/components/ui/UiButton.vue';

/* VUE */
import { watch, reactive } from 'vue';
import { ArcticleType, ArticleCategory, ArticleDifficulty, ArticleStatus } from '@/shared/enums/article.enum';
import type { ArticleFormModel } from '@/types/article-form.types';

/* PROPS */
const props = defineProps<{
   modelValue: ArticleFormModel
   isEdit?: boolean
   canEditStatus?: boolean
   isLoading?: boolean,
   isStatusDirty?: boolean
}>()

/* EMIT */
const emit = defineEmits<{
   (e: "update:modelValue", value: ArticleFormModel): void
   (e: "submit"): void
   (e: "save-status"): void
}>()

/* Local FORM */
const localForm = reactive({ ...props.modelValue })

/* update Local FORM */
watch(
   () => props.modelValue,
   (val) => Object.assign(localForm, val),
   { deep: true }
)
/* update Local FORM */
watch(
   localForm,
   (val) => emit("update:modelValue", { ...val }),
   { deep: true }
)
/* submit */
function emitSubmit() {
   emit("submit");
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
