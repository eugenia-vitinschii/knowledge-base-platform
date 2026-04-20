//stats utility

import type { StatItem } from "@/modules/dashboard/types";

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
