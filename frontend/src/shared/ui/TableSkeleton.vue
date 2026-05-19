<template>
   <table class="table-skeleton">
      <thead>
         <tr>
            <th v-for="n in columns" :key="n">
               <div class="table-skeleton__th shimmer"></div>
            </th>
         </tr>
      </thead>
      <tbody>
         <tr v-for="n in rows" :key="n">
            <td v-for="n in (columns - 1)" :key="n">
               <div class="table-skeleton__td shimmer"></div>
            </td>
            <td class="table-skeleton__actions">
               <div class="table-skeleton__button shimmer" v-for="n in buttons" :key="n"></div>
            </td>
         </tr>
      </tbody>
   </table>
</template>

<script setup lang="ts">

const props = defineProps<{
   rows: number
   buttons: number
   columns: number
}>()
</script>
