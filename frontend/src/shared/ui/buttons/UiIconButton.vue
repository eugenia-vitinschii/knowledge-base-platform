<template>
   <button class="icon-btn" :class="[`icon-btn--${variant}`, { 'is-loading': loading }]" :disabled="disabled"
      :type="type">
      <span class="icon-btn__content" v-if="!loading">
         <slot></slot>
      </span>
   </button>
</template>

<script setup lang="ts">
/* BUTTON TYPES */
type ButtonVariant = "primary" | "danger"
// type ButtonSize = "sm" | "md" | "lg"
type ButtonType = "button" | "submit"

/* PROPS INTERFACE*/
interface Props {
   variant?: ButtonVariant
   // size?: ButtonSize
   type?: ButtonType
   loading?: boolean
   disabled?: boolean
}
/* DEFAULT BUTTON Props */
withDefaults(defineProps<Props>(), {
   variant: "primary",
   type: "button",
   // size: "lg",
   loading: false,
   disabled: false
})
</script>
