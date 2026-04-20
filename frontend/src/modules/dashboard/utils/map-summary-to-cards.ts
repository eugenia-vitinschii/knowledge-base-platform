// mapper for stats (summary)

import type { ArticleStatsSummary, StatsCardItem } from "@/modules/dashboard/types";

export function mapSummaryToCards(summary: ArticleStatsSummary): StatsCardItem[] {
   return [
      {
         label: "Total articles",
         value: String(summary.totalArticles)
      },
      {
         label: "Top author",
         value: summary.topAuthor ? `${summary.topAuthor?.name} (${summary.topAuthor?.articles})` : "-"
      },
      {
         label: "Top category",
         value: summary.topCategory ? `${summary.topCategory?.name} (${summary.topCategory?.count})` : "-"
      },
      {
         label: "Most viewed",
         value: summary.mostViewed ? `${summary.mostViewed?.views} views` : "-",
         route: summary.mostViewed ? `/article/${summary.mostViewed?.slug}` : undefined
      }
   ]
}