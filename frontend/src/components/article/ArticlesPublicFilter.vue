<template>
   <div class="article-filter">
      <ui-input v-model="localSearch.search" type="search" placeholder="🔍 search article" />
      <ui-select v-model="localSearch.category" :options="categoryOption" />
      <ui-select v-model="localSearch.difficulty" :options="difficultyOption" />
      <ui-select v-model="localSearch.type" :options="typesOption" />
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import UiInput from '../ui/form/UiInput.vue';
import UiSelect from '../ui/form/UiSelect.vue';

/* DEBOUNCE */
import { useDebounceFn } from "@vueuse/core"

/* ENUMS & TYPES */
import { ArticleDifficulty, ArcticleType, ArticleCategory } from '@/shared/enums/article.enum';
import type { ArticlePublicFilters } from "@/types/article";

import { reactive, watch } from 'vue';

/* PROPS */
const props = defineProps<{
   filter: ArticlePublicFilters
}>()

const localSearch = reactive({ ...props.filter })

/* EMIT */
const emit = defineEmits<{
   (e: "update:filter", value: ArticlePublicFilters): void
}>()

const updateFilters = useDebounceFn(() => {
   emit("update:filter", { ...localSearch })
}, 400)

watch(localSearch,
   () => {
      updateFilters()
   },
   { deep: true }
)

/* OPTIONS */
const typesOption = [
   { label: "All types", value: "" },
   { label: "Article", value: ArcticleType.ARTICLE },
   { label: "Documentation", value: ArcticleType.DOCUMENTATION },
   { label: "Guide", value: ArcticleType.GUIDE },
   { label: "Reference", value: ArcticleType.REFERENCE },
]
const difficultyOption = [
   { label: "All difficulty", value: "" },
   { label: 'Advanced', value: ArticleDifficulty.ADVANCED },
   { label: 'Begginer', value: ArticleDifficulty.BEGINNER },
   { label: 'Inermediate', value: ArticleDifficulty.INTERMEDIATE },
]
const categoryOption = [
   { label: "All categories", value: "" },
   { label: 'Backend Basis', value: ArticleCategory.BACKEND_BASIS },
   { label: 'Forms Validations', value: ArticleCategory.FORMS_VALIDATIONS },
   { label: 'HTML & CSS', value: ArticleCategory.HTML_CSS },
   { label: 'Javascript', value: ArticleCategory.JAVASCRIPT },
   { label: 'Pinia', value: ArticleCategory.PINIA },
   { label: 'Typescript', value: ArticleCategory.TYPESCRIPT },
   { label: 'Vue js', value: ArticleCategory.VUE },
   { label: 'Zod', value: ArticleCategory.ZOD },

]
</script>
