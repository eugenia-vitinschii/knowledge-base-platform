<template>
   <div class="article-filter">
      <div class="article-filter__active" v-if="activeFilters.length">
         <div class="filter-chip" v-for="[key, value] in activeFilters" :key="key">
            <muk-text as="span">{{ key }} : {{ value }}</muk-text>
            <muk-icon-button @click="removeFilter(key)">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path
                     d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
               </svg>
            </muk-icon-button>
         </div>
      </div>
      <div class="article-filter__info" v-if="activeFilters.length">
         <muk-text>Result(s): {{ count }}</muk-text>
         <muk-button @click="onReset" variant="danger" v-if="activeFilters.length"> reset</muk-button>
      </div>
      <div class="article-filter__filter">
         <muk-input v-model="localSearch.search" type="search" placeholder="🔍 search article" />
         <muk-select v-model="localSearch.category" :options="categoryOption" />
         <muk-select v-model="localSearch.difficulty" :options="difficultyOption" />
         <muk-select v-model="localSearch.type" :options="typesOption" />
         <muk-select v-model="localSearch.status" :options="statusOption" />
      </div>
   </div>
</template>

<script setup lang="ts">
/* VUE */
import { reactive, watch, computed } from 'vue';

/* COMPONENTS */
import { MukText, MukInput, MukSelect, MukIconButton, MukButton } from 'modular-ui-kit-vue'

/* ENUMS & TYPES */
import { ArticleDifficulty, ArcticleType, ArticleCategory, ArticleStatus } from '@/shared/enums/article.enum';
import type { ArticleAdminFilters } from "../types/index";

/* === PROPS & EMITS === */
const props = defineProps<{
   filter: ArticleAdminFilters,
   count: number
}>()

const emit = defineEmits<{
   (e: "update:filter", value: ArticleAdminFilters): void
}>()

/* === STATE COMPUTED === */
const localSearch = reactive({ ...props.filter })

/* Active filters */
const activeFilters = computed(() => {
   return Object.entries(props.filter).filter(([_, value]) => value !== '' && value !== undefined)
})

/* === EVENT HANDLERS === */
/* Remove one filter*/
function removeFilter(key: string) {
   const updated = {
      ...props.filter,
      [key]: ''
   }
   emit('update:filter', updated)
}
/* Remove all filters */
function onReset() {
   emit('update:filter', {
      search: "",
      category: "",
      difficulty: '',
      type: '',
      status: ''
   })
}
/* === WATCHERS & LIFECYCLE=== */
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

/* === OPTIONS === */
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
