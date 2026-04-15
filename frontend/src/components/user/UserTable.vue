<template>
   <table class="user-table">
      <thead>
         <tr>
            <th>name</th>
            <th>role</th>
            <th>[job title]</th>
            <th>[departament]</th>
            <th>actions</th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="i in items">
            <td>{{ i.name }}</td>
            <td>{{ i.role }}</td>
            <td>job title</td>
            <td>departament</td>
            <td class="user-table__actions">
               <ui-button>Edit</ui-button>
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
import type { UserTableRow } from '@/types/user';

/* PROPS */
const props = defineProps<{
   items: UserTableRow[];
}>();

/* EMITS */
const emit = defineEmits<{
   (e: 'delete', id: string): void;
}>();


</script>
