<template>
   <div class="error-state">
      <div class="error-state__text">
         <h3 class="subheading">{{ title }}</h3>
         <p class="body-text">{{ description }}</p>
      </div>
      <div class="error-state__action" v-if="buttonText">
         <ui-button @click="$emit('retry')">
            {{ buttonText }}
         </ui-button>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import UiButton from '@/components/ui/UiButton.vue'

/* PROPS */
const props = withDefaults(
   defineProps<{
      title?: string
      description?: string
      buttonText?: string
   }>(),
   {
      title: "Oops! Something went wrong",
      description: 'Failed to fetch data. Please try again.',
   }
)
/* EMITS */
const emit = defineEmits<{
   (e: 'retry'): void
}>()

</script>
