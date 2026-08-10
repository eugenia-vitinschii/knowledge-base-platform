<template>
   <div class="summary-card" @click="onClick">
      <muk-text>{{ data?.label }}</muk-text>
      <muk-text type="muk-subheading" align="center">{{ data?.value }}</muk-text>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import { MukText } from 'modular-ui-kit-vue'

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