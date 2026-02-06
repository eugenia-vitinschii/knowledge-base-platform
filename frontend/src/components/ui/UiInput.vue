<template>
   <div class="ui-field" :class="{ 'is-error': !!error, 'is-disabled': disabled }">
      <label class="ui-field__label">
         {{ label }}
      </label>
      <input class="ui-field__control" :type="type" :placeholder="placeholder" :disabled="disabled" :value="modelValue"
         @input="onInput">
      <p class="ui-field__error" v-if="error">{{ error }}</p>
      <p class="ui-field__hint" v-else-if="hint">{{ hint }}</p>
   </div>
</template>

<script setup lang="ts">
/* INPUT TYPE */
type InputType = "text" | "email" | "password" | "search"

/* PROPS */
defineProps<{
   modelValue: string
   label?: string
   placeholder?: string
   hint?: string
   error?: string
   disabled?: boolean
   type?: InputType
}>()

/* EMIT */
const emit = defineEmits<{
   (e: "update:modelValue", value: string): void
}>()

function onInput(e: Event) {
   const target = e.target as HTMLInputElement
   emit("update:modelValue", target.value)
}
</script>
