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
import BaseChart from '@/components/ui/chart/BaseChart.vue';

import { mapAuthorStats } from '@/shared/utils/map-author-stats';
import { mapStatsToChart } from "@/shared/utils/map-stats-to-chart"

import { useArticlesStatsStore } from '@/stores/articles/article.stats.store';

import { onMounted, computed } from 'vue';

const statsStore = useArticlesStatsStore()

/* STATS DATA */

/* CHART DATA */
const authorsChartData = computed(() => {
   if (!statsStore.stats?.author) return null
   return mapAuthorStats(statsStore.stats.author)
}
)

const difficultyChartData = computed(() => {
   if (!statsStore.stats?.difficulty) return null
   return mapStatsToChart(statsStore.stats.difficulty)
})

const categoryChartData = computed(() => {
   if (!statsStore.stats?.difficulty) return null
   return mapStatsToChart(statsStore.stats.category)
})
const statusChartData = computed(() => {
   if (!statsStore.stats?.difficulty) return null
   return mapStatsToChart(statsStore.stats.status)
})

const typeChartData = computed(() => {
   if (!statsStore.stats?.difficulty) return null
   return mapStatsToChart(statsStore.stats.type)
})

onMounted(() => {
   statsStore.fetchOverview()
})

</script>
