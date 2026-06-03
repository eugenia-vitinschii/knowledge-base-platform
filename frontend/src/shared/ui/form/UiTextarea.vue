<template>
   <div class="textarea" :class="{ 'has-error': error, 'is-disabled': disabled }">
      <label class="textarea__label" v-if="label" :for="id">
         {{ label }}
      </label>
      <textarea class="textarea__field" :id="id" :class="{ 'is-error': !!error }" :placeholder="placeholder"
         :value="modelValue" :rows="rows" :disabled="disabled" @input="onInput">
   </textarea>
      <p class="textarea__hint" v-if="hint">{{ hint }}</p>
      <p class="textarea__error" v-if="error">{{ error }}</p>
   </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

const id = useId()
/*=== INTERFACE PROPS ===*/
interface Props {
   modelValue: string | undefined
   label?: string
   placeholder?: string
   error?: string
   hint?: string
   disabled?: boolean
   rows?: number
}

/*=== PROPS ===*/
const props = withDefaults(defineProps<Props>(), {
   modelValue: "",
   rows: 6,
   disabled: false,
})

/*=== EMITS===*/
const emit = defineEmits<{
   (e: "update:modelValue", value: string): void
}>()

function onInput(e: Event) {
   const target = e.target as HTMLTextAreaElement
   emit("update:modelValue", target.value)
}
</script>
