<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__title">
               <p class="body-text">
                  Admin Dashboard
               </p>
            </div>
            <div class="page__content">
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

               <br> <br> <br> <br> <br>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* Components */
import BaseChart from '@/components/ui/stats/BaseChart.vue';
import SummaryCard from '@/components/ui/stats/SummaryCard.vue';

/* Mappers */
import { mapAuthorStats } from '@/shared/utils/map-author-stats';
import { mapStatsToChart } from "@/shared/utils/map-stats-to-chart"
import { mapSummaryToCards } from '@/shared/utils/map-summary-to-cards';

/* store & vue */
import { useArticlesStatsStore } from '@/stores/articles/article.stats.store';
import type { StatsCardItem } from '@/types/stats';
import { onMounted, computed } from 'vue';

const statsStore = useArticlesStatsStore()

/* STATS DATA */
const cards = computed<StatsCardItem[]>(() => {
   if (!statsStore.summary) return []
   return mapSummaryToCards(statsStore.summary)
})

/* CHART DATA */
const authorsChartData = computed(() => {
   if (!statsStore.overview?.author) return null
   return mapAuthorStats(statsStore.overview.author)
}
)

const difficultyChartData = computed(() => {
   if (!statsStore.overview?.difficulty) return null
   return mapStatsToChart(statsStore.overview.difficulty)
})

const categoryChartData = computed(() => {
   if (!statsStore.overview?.difficulty) return null
   return mapStatsToChart(statsStore.overview.category)
})
const statusChartData = computed(() => {
   if (!statsStore.overview?.difficulty) return null
   return mapStatsToChart(statsStore.overview.status)
})

const typeChartData = computed(() => {
   if (!statsStore.overview?.difficulty) return null
   return mapStatsToChart(statsStore.overview.type)
})

onMounted(() => {
   statsStore.fetchOverview()
   statsStore.fetchSummary()
})

</script>
