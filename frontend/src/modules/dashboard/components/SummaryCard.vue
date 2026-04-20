<template>
   <div class="summary-card" @click="onClick">
      <p class="body-text">{{ data?.label }}</p>
      <p class="subheading">{{ data?.value }}</p>
   </div>
</template>

<script setup lang="ts">
import type { StatsCardItem } from "@/modules/dashboard/types/index"

import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps<{
   data: StatsCardItem

}>()

function onClick() {
   if (props.data.route) {
      router.push(props.data.route)
   }
}

</script>