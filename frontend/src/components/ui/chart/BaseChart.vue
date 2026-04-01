<template>
   <div class="admin-chart">
      <div v-if="loading">
         <p class="body-text">loading...</p>
      </div>
      <div v-else-if="isEmpty">
         <p class="body-text">{{ emptyText || "No data available" }}</p>
      </div>
      <div v-else>
         <p class="body-text">{{ title }}</p>
         <div class="admin-chart__wrapper">
            <canvas ref="canvas" class="admin-chart__canvas"></canvas>
         </div>

      </div>
   </div>
</template>

<script setup lang="ts">
/* VUE */
import { onMounted, ref, watch, computed, onUnmounted } from 'vue'

/*CHART*/
import { Chart, registerables } from 'chart.js'

/*TYPES */
import type { ChartData } from "@/types/stats"

Chart.register(...registerables)

type ChartType = 'bar' | 'doughnut' | 'line' | 'pie'

const props = defineProps<{
   title: string
   type: ChartType
   data: ChartData | null

   loading?: boolean
   showLegend?: boolean
   emptyText?: string
}>()

//variables
const canvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

/* generate colors */
function generateColors(count: number) {
   return Array.from({ length: count }, (_, i) => {
      const hue = (i * 360) / count
      return `hsl(${hue}, 70%, 60%)`
   })
}

/* computed */
const isEmpty = computed(() => {
   return !props.data || props.data.labels.length === 0
})

/* CREATE CHART  */
function createChart() {
   if (!canvas.value || !props.data) return

   const dataset = props.data.datasets[0]

   if (!dataset) return
   chartInstance = new Chart(canvas.value, {
      type: props.type,
      data: {
         labels: props.data.labels,
         datasets: [
            {
               ...dataset,
               backgroundColor: dataset.backgroundColor || generateColors(dataset.data.length),
               borderColor: '#fff',
               borderWidth: 1
            }
         ]
      },
      options: {
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
            legend: {
               display: props.showLegend ?? false
            }
         }
      }
   })
}

/*lifecycle */
onMounted(() => {
   createChart()
})

watch(
   () => props.data,
   (newData) => {
      if (!newData) return

      if (!chartInstance) {
         createChart()
         return
      }

      chartInstance.data.labels = newData.labels

      if (chartInstance.data.datasets[0]) {
         chartInstance.data.datasets[0].data = newData.datasets[0]?.data || []
      }
      chartInstance.update()
   },
   { deep: true }
)

/* cleanup */
onUnmounted(() => {
   chartInstance?.destroy()
})

</script>