<template>
   <div class="article-search">
      <div class="article-search__wrapper">
         <ui-input v-model="localSearch.search" type="search" placeholder="🔍 search article" />
      </div>
      <div class="article-search__info" v-if="activeSearch.length">
         <p class="body-text">Result(s): {{ count }}</p>
         <ui-button @click="onReset" type="button" variant="danger" v-if="activeSearch.length">
            reset
         </ui-button>
      </div>
   </div>

</template>

<script setup lang="ts">
/* VUE */
import { reactive, watch, computed } from 'vue';

/* COMPONENTS */
import UiInput from '@/shared/ui/form/UiInput.vue';
import UiButton from '@/shared/ui/buttons/UiButton.vue';

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