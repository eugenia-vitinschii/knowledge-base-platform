<template>
   <div class="article-search">
      <div class="article-search__wrapper">
         <muk-input v-model="localSearch.search" type="search" placeholder="🔍 search article" />
      </div>
      <div class="article-search__info" v-if="activeSearch.length">
         <muk-text>Result(s): {{ count }}</muk-text>
         <muk-button @click="onReset" variant="danger" v-if="activeSearch.length">
            reset
         </muk-button>
      </div>
   </div>
</template>

<script setup lang="ts">
/* VUE */
import { reactive, watch, computed } from 'vue';

/* COMPONENTS */
import { MukInput, MukButton, MukText } from 'modular-ui-kit-vue';

/* TYPES */
import type { ArticlePublicSearch } from "../types/index";

/* PROPS  & EMITS */
const props = defineProps<{
   search: ArticlePublicSearch,
   count: number
}>()

const emit = defineEmits<{
   (e: 'update:search', value: ArticlePublicSearch): void
}>()

//local copy
const localSearch = reactive({ ...props.search })

const activeSearch = computed(() => {
   return Object.entries(props.search).filter(([_, value]) => value !== '' && value !== undefined)
})

/* remove search data */
function onReset() {
   emit('update:search', { search: '' })
}
/* update search(props.search from URL, localSearch from UI) */
watch(
   localSearch,
   (val) => {
      emit('update:search', { ...val })
   },
   { deep: true }
)

watch(
   () => props.search,
   (newVal) => {
      Object.assign(localSearch, newVal)
   },
   { immediate: true }
)

</script>