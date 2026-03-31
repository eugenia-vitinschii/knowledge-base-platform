//stats utility

import type { StatItem } from "@/types/stats";

export function mapStatsToChart(data: StatItem[]) {
   return {
      labels: data.map(i => i._id),
      datasets: [
         {
            data: data.map(i => i.count)
         }
      ]

   }
}
