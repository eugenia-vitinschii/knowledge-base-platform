<template>
   <div class="toast" :class="`toast--${toast.type}`" @mouseenter="pause" @mouseleave="resume">
      <div class="toast__wrapper">
         <div class="toast__message">
            <p class="body-text"> {{ toast.message }}</p>
         </div>
         <button class="toast__close" @click="remove">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
               <path
                  d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
         </button>
      </div>
      <div class="toast__progress" :style="{ width: progress + '%' }"></div>
   </div>
</template>

<script setup lang="ts">
/* VUE & PINIA */
import { useToastStore, type Toast } from '@/stores/ui/toast.store';
import { ref, onMounted } from 'vue';
/* props */
const props = defineProps<{ toast: Toast }>()

/* variables */
const store = useToastStore()

const progress = ref(100)
let interval: number | null = null
let remaining = props.toast.duration
let startTime = Date.now()

/* remove */
function remove() {
   store.remove(props.toast.id)
}

/* tick */
function tick() {
   const elapsed = Date.now() - startTime
   progress.value = 100 - (elapsed / props.toast.duration) * 100

   if (elapsed >= remaining) {
      remove()
   }
}

/* pause */
function pause() {
   if (interval) clearInterval(interval)
   remaining -= Date.now() - startTime
}

/* resume */
function resume() {
   startTime = Date.now()
   interval = window.setInterval(tick, 16)
}
/* Hooks */
onMounted(() => {
   interval = window.setInterval(tick, 16)
})
</script>
