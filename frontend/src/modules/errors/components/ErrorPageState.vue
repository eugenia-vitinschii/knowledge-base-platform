<template>
   <div class="error-page">
      <div class="error-page__content">
         <muk-text as="h1" type="muk-heading">{{ code }}</muk-text>
         <muk-text as="h2" type="muk-subheading">{{ title }}</muk-text>
         <muk-text>{{ description }}</muk-text>
      </div>
      <div class="error-page__actions" v-if="buttonText">
         <muk-button @click="onAction">
            {{ buttonText }}
         </muk-button>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import { MukText, MukButton } from 'modular-ui-kit-vue';

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
