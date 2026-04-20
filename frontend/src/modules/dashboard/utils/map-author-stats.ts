//stats utility
import type { AuthorStat } from "@/modules/dashboard/types";

export function mapAuthorStats(data: AuthorStat[]) {
   return {
      labels: data.map(i => i.author.name),
      datasets: [
         {
            data: data.map(i => i.articles)
         }
      ]

   }
}
