<template>
   <div class="article-status-cell">
      <template v-if="canEdit">
         <muk-select v-model="selectedStatus" :options="statusOptions" :disabled="isLoading" />
         <div class="article-status-cell__actions">
            <Transition name="fade" mode="out-in">
               <muk-icon-button v-if="isDirty" type="button" variant="primary" :is-loading="isLoading"
                  @click="handleSave">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                     <path
                        d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM565-275q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
                  </svg>
               </muk-icon-button>
            </Transition>
         </div>
      </template>
      <template v-else>
         <muk-badge variant="muted" size="sm">
            <template #icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
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
import { MukIconButton, MukSelect, MukBadge, MukText } from 'modular-ui-kit-vue';

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
