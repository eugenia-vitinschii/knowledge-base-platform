<template>
   <button class="btn" :class="[`btn--${variant}`, `btn--${size}`, { 'is-loading': loading }]"
      :disabled="disabled || loading" :type="type">
      <span v-if="loading" class="btn__spinner"></span>
      <span class="btn__content" v-if="!loading">
         <slot></slot>
      </span>
   </button>
</template>

<script setup lang="ts">
/* BUTTON TYPES */
type ButtonVariant = "primary" | "secundary" | "danger" | "ghost"
type ButtonSize = "sm" | "md" | "lg"
type ButtonType = "button" | "submit" | "reset"

/* PROPS INTERFACE*/
interface Props {
   variant?: ButtonVariant
   size?: ButtonSize
   type?: ButtonType
   loading?: boolean
   disabled?: boolean
}
/* DEFAULT BUTTON Props */
withDefaults(defineProps<Props>(), {
   variant: "primary",
   type: "button",
   size: "lg",
   loading: false,
   disabled: false
})
</script>
