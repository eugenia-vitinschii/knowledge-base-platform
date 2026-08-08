<template>
   <div class="article-filter">
      <div class="article-filter__active" v-if="activeFilters.length">
         <div class="filter-chip" v-for="[key, value] in activeFilters" :key="key">
            <muk-text as="span">{{ key }} : {{ value }}</muk-text>
            <muk-icon-button class="filter-chip__button" @click="removeFilter(key)">
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
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import { MukIconButton, MukButton, MukSelect, MukInput, MukText } from 'modular-ui-kit-vue';

/* ENUMS & TYPES */
import { ArticleDifficulty, ArcticleType, ArticleCategory } from '@/shared/enums/article.enum';
import type { ArticlePublicFilters } from "../types/index";

import { reactive, watch, computed } from 'vue';

/* PROPS */
const props = defineProps<{
   filter: ArticlePublicFilters,
   count: number
}>()

const localSearch = reactive({ ...props.filter })

/* EMIT */
const emit = defineEmits<{
   (e: "update:filter", value: ArticlePublicFilters): void
}>()

/*ACTIVE FILTERS */
const activeFilters = computed(() => {
   return Object.entries(props.filter).filter(([_, value]) => value !== '' && value !== undefined)
})

/* REMOVE ONE FILTER */
function removeFilter(key: string) {
   const updated = {
      ...props.filter,
      [key]: ""
   }
   emit('update:filter', updated)
}

/* REMOVE ALL FILTERS */
function onReset() {
   emit('update:filter', {
      search: '',
      category: "",
      difficulty: "",
      type: "",
      tag: ''
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
</script>
