<template>
   <div class="article-filter">
      <div class="article-filter__active" v-if="activeFilters.length">
         <div class="filter-chip" v-for="[key, value] in activeFilters" :key="key">
            <span class="body-text">{{ key }} : {{ value }}</span>
            <button class="filter-chip__button" @click="removeFilter(key)">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path
                     d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
               </svg>
            </button>
         </div>
      </div>
      <div class="article-filter__info" v-if="activeFilters.length">
         <p class="body-text">Result(s): {{ count }}</p>
         <ui-button @click="onReset" type="button" variant="danger" v-if="activeFilters.length"> reset</ui-button>
      </div>
      <div class="article-filter__filter">
         <ui-input v-model="localSearch.search" type="search" placeholder="🔍 search article" />
         <ui-select v-model="localSearch.category" :options="categoryOption" />
         <ui-select v-model="localSearch.difficulty" :options="difficultyOption" />
         <ui-select v-model="localSearch.type" :options="typesOption" />
         <ui-select v-model="localSearch.status" :options="statusOption" />
      </div>

   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import UiInput from '../ui/form/UiInput.vue';
import UiSelect from '../ui/form/UiSelect.vue';
import UiButton from '../ui/UiButton.vue';

/* ENUMS & TYPES */
import { ArticleDifficulty, ArcticleType, ArticleCategory, ArticleStatus } from '@/shared/enums/article.enum';
import type { ArticleAdminFilters } from "@/types/article";

import { reactive, watch, computed } from 'vue';

/* PROPS */
const props = defineProps<{
   filter: ArticleAdminFilters,
   count: number
}>()

const localSearch = reactive({ ...props.filter })

/* EMIT */
const emit = defineEmits<{
   (e: "update:filter", value: ArticleAdminFilters): void
}>()

/* Active Filters */
const activeFilters = computed(() => {
   return Object.entries(props.filter).filter(([_, value]) => value !== '' && value !== undefined)
})

/* Remove one filter*/
function removeFilter(key: string) {
   const updated = {
      ...props.filter,
      [key]: ''
   }
   emit('update:filter', updated)
}
/* REMOVE ALL */
function onReset() {
   emit('update:filter', {
      search: "",
      category: "",
      difficulty: '',
      type: '',
      status: ''
   })
}

/* update filters (props.filter from URL, localSearch from UI) */
watch(
   localSearch,
   (val) => {
      emit('update:filter', { ...val })
   },
   { deep: true }
)

watch(
   () => props.filter,
   (newVal) => {
      Object.assign(localSearch, newVal)
   },
   { immediate: true }
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
const statusOption = [
   { label: "All Statuses", value: "" },
   { label: 'Draft', value: ArticleStatus.DRAFT },
   { label: 'Published', value: ArticleStatus.PUBLISHED },
   { label: 'Review', value: ArticleStatus.REVIEW },
]
</script>
