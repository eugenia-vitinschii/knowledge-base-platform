<template>
   <div class="pagination">
      <button :disabled="page === 1" @click="$emit('change', page - 1)" class="pagination__button-svg">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
         </svg>
      </button>
      <button v-for="item in pages" :key="item + ''" :disabled="item === '...'" :class="{ active: item === page }"
         @click="typeof item === 'number' && $emit('change', item)" class="pagination__button-number">
         {{ item }}
      </button>
      <button :disabled="page === totalPages" @click="$emit('change', page + 1)" class="pagination__button-svg">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
         </svg>
      </button>
   </div>
</template>

<script setup lang="ts">
/* VUE  */
import { computed } from 'vue';

/* PROPS */
const props = defineProps<{
   page: number
   totalPages: number
}>()

/* EMITS */
const emit = defineEmits<{
   (e: 'change', page: number): void
}>()


/* PAGES */
const pages = computed(() => {
   const total = props.totalPages
   const current = props.page

   const delta = 2

   const range: (number | string)[] = []

   const left = Math.max(2, current - delta)
   const right = Math.min(total - 1, current + delta)

   range.push(1)

   if (left > 2) {
      range.push("...")
   }
   for (let i = left; i <= right; i++) {
      range.push(i)
   }

   if (right < total - 1) {
      range.push('...')
   }

   if (total > 1) {
      range.push(total)
   }

   return range
})

</script>
