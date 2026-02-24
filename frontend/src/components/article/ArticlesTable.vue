<template>
   <table class="articles-table">
      <thead>
         <tr>
            <th>titile</th>
            <th>status</th>
            <th>type</th>
            <th>category</th>
            <th>actions</th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="a in items">
            <td>{{ a.title }}</td>
            <td>
               <ui-select v-model="localStatus[a.id]!" :options="statusOptions" :disabled="!canEditStatus" />
               <ui-button v-if="isStatusDirty(a.id)" type="button" variant="primary"
                  @click="$emit('save-status', { id: a.id, status: localStatus[a.id]! })">
                  save
               </ui-button>
            </td>
            <td>{{ a.type }}</td>
            <td>{{ a.category }}</td>
            <td class="articles-table__actions">
               <ui-button type="button" variant="primary" @click="$emit('edit', a.id)">edit</ui-button>
               <ui-button type="button" variant="secondary" @click="$emit('preview', a.id)">preview</ui-button>
               <ui-button type="button" variant="danger" :disabled="!canEditStatus"
                  @click="$emit('delete', a.id)">delete</ui-button>
            </td>
         </tr>
      </tbody>
   </table>
</template>

<script setup lang="ts">
/* COMPONENTS */
import UiSelect from '@/components/ui/form/UiSelect.vue';
import UiButton from '@/components/ui/UiButton.vue';

/* VUE */
import { reactive, watch } from 'vue';

/* TYPES */
import type { ArticleTableRow } from '@/types/article-table.types';
import { ArticleStatus } from '@/shared/enums/article.enum';


/* PROPS */
const props = defineProps<{
   items: ArticleTableRow[];
   canEditStatus?: boolean;
   isLoading?: boolean;
}>()

/* LOCAL OBJECT */
const localStatus = reactive<Record<string, ArticleStatus>>({} as Record<string, ArticleStatus>);
const originalStatus = reactive<Record<string, ArticleStatus>>({} as Record<string, ArticleStatus>);

/* computed status  */
const isStatusDirty = (id: string) => {
   if (!props.canEditStatus) return false
   return localStatus[id] !== originalStatus[id]
}

/* init  */
watch(
   () => props.items,
   (items) => {
      items.forEach((a) => {
         localStatus[a.id] = a.status
         originalStatus[a.id] = a.status
      })
   }, { immediate: true }
)

/* EMITS */
const emit = defineEmits<{
   (e: 'delete', id: string): void;
   (e: 'edit', id: string): void;
   (e: 'preview', id: string): void;
   (e: 'save-status', payload: { id: string; status: ArticleStatus }): void;
}>();

/* status options */
const statusOptions = [
   { label: 'Draft', value: ArticleStatus.DRAFT },
   { label: 'Published', value: ArticleStatus.PUBLISHED },
   { label: 'Review', value: ArticleStatus.REVIEW },
]
</script>
