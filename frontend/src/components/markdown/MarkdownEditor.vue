<template>
   <div class="md-editor">
      <div class="md-editor__tabs">
         <ui-button variant="primary" @click="activeTab = 'edit'" type="button">
            edit
         </ui-button>
         <ui-button variant="secondary" @click="activeTab = 'preview'" type="button">
            preview
         </ui-button>
      </div>
      <div class="md-editor__edit" v-if="activeTab === 'edit'">
         <ui-textarea :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" :rows=30 />
      </div>
      <div class="md-editor__preview" v-else @click="onPreviewClick">
         <div class="md-editor__preview-content" v-html="rendered">
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* Components */
import UiButton from '../ui/UiButton.vue';
import UiTextarea from '../ui/form/UiTextarea.vue';

/* vue  & markdown */
import { ref, computed } from 'vue';
import { md } from '@/shared/lib/markdown';

/* markdown  logic */
const activeTab = ref<"edit" | "preview">("edit")

const props = defineProps<{
   modelValue: string
}>()

const emit = defineEmits<{
   (e: "update:modelValue", value: string): void
}>();

const rendered = computed(() => {
   return md.render(props.modelValue || "")
})

/* copy button logic */
async function onPreviewClick(e: MouseEvent) {
   const target = e.target as HTMLElement;

   if (!target.classList.contains("code-block__copy")) return;

   const wrapper = target.closest(".code-block");
   if (!wrapper) return;

   const codeEl = wrapper.querySelector("code")
   const code = codeEl?.textContent || '';

   if (!code) return;

   await navigator.clipboard.writeText(code);

   const old = target.textContent;
   target.textContent = "copied";

   setTimeout(() => {
      target.textContent = old || "copy";
   }, 800);
}

</script>
