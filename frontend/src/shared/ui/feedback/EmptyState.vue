<template>
   <div class="empty-state" :class="`empty-state--${variant}`">
      <div class="empty-state__text">
         <h3 class="subheading">{{ title }}</h3>
         <p class="body-text">{{ description }}</p>
      </div>
      <div class="empty-state__actions">
         <slot name="action"></slot>
      </div>
   </div>
</template>

<script setup lang="ts">
/* VARIANTS */
type Variant = 'default' | 'accent' | 'search'

withDefaults(
   defineProps<{
      title?: string
      description?: string
      variant?: Variant
   }>(),
   {
      variant: 'default'
   }
)

</script>
