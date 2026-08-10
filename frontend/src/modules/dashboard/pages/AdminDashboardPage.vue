<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__title">
               <muk-text type="muk-heading" as="h1">Admin Dashboard</muk-text>
            </div>
            <div class="page__content" v-if="hasAnyCharts">
               <div class="summary-cards">
                  <summary-card v-for="card in cards" :key="card.label" :data="card" />
               </div>
               <div class="chart-wrapper">
                  <div class="chart-wrapper__item">
                     <base-chart v-if="typeChartData" title="Type" type="bar" :data="typeChartData" />
                  </div>
                  <div class="chart-wrapper__item--two">
                     <base-chart v-if="statusChartData" title="Status" :showLegend="true" type="doughnut"
                        :data="statusChartData" />
                     <base-chart v-if="difficultyChartData" title="Difficulty" :showLegend="true" type="pie"
                        :data="difficultyChartData" />
                  </div>
                  <div class="chart-wrapper__item">
                     <base-chart v-if="authorsChartData" title="Authors" type="line" :data="authorsChartData" />
                  </div>
                  <div class="chart-wrapper__item">
                     <base-chart v-if="categoryChartData" title="Category" type="bar" :data="categoryChartData" />
                  </div>
               </div>
            </div>
            <div class="page__info" v-else>
               <muk-empty-state :variant="'accent'" :title="'Welcome to Admin Dashboard'"
                  :description="'Here you can find insights about your articles'">
                  <template #action>
                     <muk-text as="router-link" :to="'/admin/articles/create'">
                        Create article
                     </muk-text>
                  </template>
               </muk-empty-state>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import { MukText, MukEmptyState } from 'modular-ui-kit-vue'
import BaseChart from '../components/BaseChart.vue';
import SummaryCard from '../components/SummaryCard.vue';

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

/* has any charts */
const chartData = [
   difficultyChartData,
   categoryChartData,
   statusChartData,
   typeChartData,
   authorsChartData
]
const hasAnyCharts = computed(() => {
   return chartData.some(chart => chart.value)
})

onMounted(() => {
   statsStore.fetchOverview()
   statsStore.fetchSummary()
})

</script>
