<template>
   <div>
      <page-header title="Dashboard" description="Overview of your store performance, sales metrics, and key activity.">
      </page-header>
      <template v-if="hasAnyCharts">
         <stats-grid v-if="cards.length" :items="cards" />
         <charts-grid :items="chartsData" />
      </template>
      <muk-empty-state v-else :variant="'accent'" :title="'Welcome to Admin Dashboard'"
         :description="'Here you can find insights about your articles'">
         <template #action>
            <muk-text as="router-link" :to="'/admin/articles/create'">
               Create article
            </muk-text>
         </template>
      </muk-empty-state>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import { MukText, MukEmptyState } from 'modular-ui-kit-vue'
import { PageHeader, StatsGrid, ChartsGrid } from 'vue-saas-kit';

/* Mappers */
import { mapAuthorStats } from '@/modules/dashboard/utils/map-author-stats';
import { mapStatsToChart } from "@/modules/dashboard/utils/map-stats-to-chart"
import { mapSummaryToCards } from '@/modules/dashboard/utils/map-summary-to-cards';

/* store & vue */
import { useArticlesStatsStore } from '@/modules/dashboard/store/article.stats.store';
import type { AuthorStat, StatItem, StatsCardItem } from '@/modules/dashboard/types/index';
import { onMounted, computed } from 'vue';

const statsStore = useArticlesStatsStore()

/* STATS DATA */
const cards = computed<StatsCardItem[]>(() => {
   if (!statsStore.summary) return []
   return mapSummaryToCards(statsStore.summary)
})

/* chart data helper */
function hasChartItems<T>(data?: T[]): data is T[] {
   return !!data?.length
}

/* helper for charts ( *author )*/
function createStatsChartData(data?: StatItem[]) {
   if (!hasChartItems(data)) return null

   return mapStatsToChart(data)
}

/* helper for author*/
function createAuthorChartData(data?: AuthorStat[]) {
   if (!hasChartItems(data)) return null

   return mapAuthorStats(data)
}

/* Chart data */
const authorsChartData = computed(() => {
   return createAuthorChartData(statsStore.overview?.author)
})

const difficultyChartData = computed(() => {
   return createStatsChartData(statsStore.overview?.difficulty)
})

const categoryChartData = computed(() => {
   return createStatsChartData(statsStore.overview?.category)
})
const statusChartData = computed(() => {
   return createStatsChartData(statsStore.overview?.status)
})

const typeChartData = computed(() => {
   return createStatsChartData(statsStore.overview?.type)
})
const chartsData = computed(() => {
   const items = []

   if (typeChartData.value) {
      items.push({ id: 'type', title: 'Type', type: 'bar', data: typeChartData.value })
   }
   if (statusChartData.value) {
      items.push({ id: 'status', title: 'Status', type: 'doughnut', showLegend: true, data: statusChartData.value })
   }
   if (difficultyChartData.value) {
      items.push({ id: 'difficulty', title: 'Difficulty', type: 'pie', showLegend: true, data: difficultyChartData.value })
   }
   if (authorsChartData.value) {
      items.push({ id: 'authors', title: 'Authors', type: 'line', data: authorsChartData.value })
   }
   if (categoryChartData.value) {
      items.push({ id: 'category', title: 'Category', type: 'bar', data: categoryChartData.value })
   }

   return items
})

/* Check if any chart has data */
const hasAnyCharts = computed(() => chartsData.value.length > 0)

onMounted(() => {
   statsStore.fetchOverview()
   statsStore.fetchSummary()
})

</script>
