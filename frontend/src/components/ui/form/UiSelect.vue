<template>
   <div class="select">
      <label class="select__label" v-if="label">
         {{ label }}
      </label>
      <div class="select__wrapper">
         <select class="select__field" :class="{ 'is-error': !!error }" :value="modelValue" :disabled="disabled"
            @change="onChange">
            <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
            <option v-for="option in options" :key="option.value" :value="option.value">
               {{ option.label }}
            </option>
         </select>
         <span class="select__icon">↓</span>
      </div>
      <p class="select__hint" v-if="hint">{{ hint }}</p>
      <p class="select__error" v-if="error">{{ error }}</p>
   </div>
</template>

<script setup lang="ts">
/*=== OPTION TYPE ===*/
type Option = {
   label: string
   value: string
}
/*=== INTERFACE ===*/
interface Props {
   modelValue: string
   label?: string
   placeholder?: string
   options: Option[]
   error?: string
   hint?: string
   disabled?: boolean
}

/*=== PROPS ===*/
const props = withDefaults(defineProps<Props>(), {
   modelValue: "",
   disabled: false,
})

/*=== EMITS ===*/
const emit = defineEmits<{
   (e: "update:modelValue", value: string): void
}>()

function onChange(e: Event) {
   const target = e.target as HTMLSelectElement
   emit("update:modelValue", target.value)
}

</script>
