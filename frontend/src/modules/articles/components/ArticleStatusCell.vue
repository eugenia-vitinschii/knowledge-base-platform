<template>
   <div class="article-status-cell">
      <template v-if="canEdit">
         <muk-select v-model="selectedStatus" :options="statusOptions" :disabled="isLoading" />
         <div class="muk-section__actions">
            <muk-button v-if="isDirty" type="button" variant="primary" :is-loading="isLoading" @click="handleSave">
               save
            </muk-button>
         </div>
      </template>
      <template v-else>
         <muk-badge variant="muted" size="sm">
            <template #icon><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  fill="#e3e3e3">
                  <path
                     d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
               </svg></template>
            <template #text><muk-text variant="muted">{{ status }}</muk-text></template>
         </muk-badge>
      </template>
   </div>
</template>

<script setup lang="ts">
/* VUE */
import { ref, computed, watch } from 'vue'

/* COMPONENTS */
import { MukButton, MukSelect, MukBadge } from 'modular-ui-kit-vue';

import { ArticleStatus } from '@/shared/enums/article.enum';

/* PROPS * EMITS */
const props = defineProps<{
   articleId: string;
   status: ArticleStatus;
   canEdit?: boolean;
   isLoading?: boolean;
}>()

const emit = defineEmits<{
   (e: 'save-status', payload: { id: string; status: ArticleStatus }): void;
}>();

/* status options */
const statusOptions = [
   { label: 'Draft', value: ArticleStatus.DRAFT },
   { label: 'Published', value: ArticleStatus.PUBLISHED },
   { label: 'Review', value: ArticleStatus.REVIEW },
]

const selectedStatus = ref<ArticleStatus>(props.status)

//sync status
watch(() => props.status, (newStatus) => {
   selectedStatus.value = newStatus
})

const isDirty = computed(() => props.canEdit && selectedStatus.value !== props.status)

const handleSave = () => {
   emit('save-status', { id: props.articleId, status: selectedStatus.value })
}
</script>
