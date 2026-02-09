<template>
   <div class="checkbox">
      <label class="checkbox__wrapper" :class="{ 'disabled': disabled }">
         <div class="checkbox__data">
            <input type="checkbox" class="checkbox__field" :checked="modelValue" :disabled="disabled"
               @change="onChange">
            <span class="checkbox__box" :class="{ 'error': !!error }">
               <span class="checkbox__check">✓</span>
            </span>
            <span class="checkbox__label" v-if="label">
               {{ label }}
            </span>
         </div>
         <div class="ckeckbox__info">
            <span class="checkbox__hint" v-if="hint">
               {{ hint }}
            </span>
            <span class="checkbox__error" v-if="error">
               {{ error }}
            </span>
         </div>

      </label>
   </div>
</template>

<script setup lang="ts">
/*=== PROPS  Interface ===*/
interface Props {
   modelValue: boolean
   label?: string
   hint?: string
   error?: string
   disabled?: boolean
}

/*=== PROPS ===*/
const props = withDefaults(defineProps<Props>(), {
   modelValue: false,
   disabled: false,
})

/*=== EMIT ===*/
const emit = defineEmits<{
   (e: "update:modelValue", value: boolean): void
}>()

function onChange(e: Event) {
   const target = e.target as HTMLInputElement
   emit("update:modelValue", target.checked)
}
</script>
