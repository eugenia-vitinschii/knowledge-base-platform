<template>
   <table class="user-table">
      <thead>
         <tr>
            <th>name</th>
            <th>role</th>
            <th>position</th>
            <th>location</th>
            <th>actions</th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="i in items">
            <td>{{ i.name }}</td>
            <td>{{ i.role }}</td>
            <td>{{ i.position }}</td>
            <td>{{ i.location }}</td>
            <td class="user-table__actions">
               <ui-button type="button" @click="$emit('edit', i.id)">Edit</ui-button>
               <ui-button type="button" variant="danger" @click="$emit('delete', i.id)">Delete</ui-button>
            </td>
         </tr>
      </tbody>
   </table>
</template>

<script setup lang="ts">
/* COMPONENTS */
import UiButton from '@/components/ui/UiButton.vue';

/* TYPES */
import type { UserTableRow } from '@/modules/users/types';

/* PROPS */
const props = defineProps<{
   items: UserTableRow[];
}>();

/* EMITS */
const emit = defineEmits<{
   (e: 'delete', id: string): void;
   (e: 'edit', id: string): void;
}>();


</script>
