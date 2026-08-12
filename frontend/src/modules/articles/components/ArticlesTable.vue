<template>
   <table class="articles-table">
      <thead>
         <tr>
            <muk-text as="th">title</muk-text>
            <th>title</th>
            <th>status</th>
            <th>type</th>
            <th>category</th>
            <th>actions</th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="a in items" :key="a.id">
            <td>{{ a.title }}</td>
            <td>
               <muk-select v-model="localStatus[a.id]!" :options="statusOptions" :disabled="!canEditStatus" />
               <muk-button v-if="isStatusDirty(a.id)" type="button" variant="primary"
                  :is-loading="props.statusLoadingId === a.id"
                  @click="$emit('save-status', { id: a.id, status: localStatus[a.id]! })">
                  save
               </muk-button>
            </td>
            <td>{{ a.type }}</td>
            <td>{{ a.category }}</td>
            <td class="articles-table__actions">
               <muk-button type="button" variant="primary" @click="$emit('edit', a.id)">edit</muk-button>
               <muk-button type="button" variant="secondary" @click="$emit('preview', a.id)">preview</muk-button>
               <muk-button type="button" variant="danger" :disabled="!canEditStatus"
                  @click="$emit('delete', a.id)">delete</muk-button>
            </td>
         </tr>
      </tbody>
   </table>
</template>

<script setup lang="ts">
/* VUE */
import { reactive, watch } from 'vue';

/* COMPONENTS */
import { MukButton, MukSelect, MukText } from 'modular-ui-kit-vue';

/* TYPES */
import type { ArticleTableRow } from "../types/index";
import { ArticleStatus } from '@/shared/enums/article.enum';

/* PROPS & EMITS */
const props = defineProps<{
   items: ArticleTableRow[];
   canEditStatus?: boolean;
   isLoading?: boolean;
   statusLoadingId?: string | null
}>()

const emit = defineEmits<{
   (e: 'delete', id: string): void;
   (e: 'edit', id: string): void;
   (e: 'preview', id: string): void;
   (e: 'save-status', payload: { id: string; status: ArticleStatus }): void;
}>();

/* === COMPONENT STATE === */
const localStatus = reactive<Record<string, ArticleStatus>>({});
const originalStatus = reactive<Record<string, ArticleStatus>>({});

/* computed status  */
const isStatusDirty = (id: string) => {
   if (!props.canEditStatus || !localStatus[id] || !originalStatus[id]) return false
   return localStatus[id] !== originalStatus[id]
}

/* === WATCHERS === */
watch(() => props.items,
   (newItems) => {
      Object.keys(localStatus).forEach(key => delete localStatus[key])
      Object.keys(originalStatus).forEach(key => delete originalStatus[key])

      newItems.forEach((a) => {
         localStatus[a.id] = a.status
         originalStatus[a.id] = a.status
      })
   },
   { immediate: true, deep: true }
)
/* status options */
const statusOptions = [
   { label: 'Draft', value: ArticleStatus.DRAFT },
   { label: 'Published', value: ArticleStatus.PUBLISHED },
   { label: 'Review', value: ArticleStatus.REVIEW },
]
</script>
