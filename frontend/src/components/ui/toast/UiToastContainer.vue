<template>
   <div class="toast-container">
      <TransitionGroup name="toast">
         <ui-toast v-for="toast in store.toasts" :key="toast.id" :toast="toast" />
      </TransitionGroup>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import UiToast from './UiToast.vue';

/* PINIA*/
import { useToastStore } from '@/stores/ui/toast.store';

/* variables */
const store = useToastStore()
</script>
