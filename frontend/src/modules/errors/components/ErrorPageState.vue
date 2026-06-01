<template>
   <div class="error-page">
      <div class="error-page__content">
         <h1 class="heading">{{ code }}</h1>
         <h2 class="subheading">{{ title }}</h2>
         <p class="body-text">{{ description }}</p>
      </div>
      <div class="error-page__actions" v-if="buttonText">
         <ui-button @click="onAction">
            {{ buttonText }}
         </ui-button>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import UiButton from '@/components/ui/UiButton.vue';

/* === PROPS & EMITS === */
const props = defineProps<{
   code: string | number,
   title: string,
   description: string
   buttonText?: string
}>()

const emit = defineEmits<{
   (e: 'action'): void
}>()

function onAction() {
   emit('action')
}
</script>
