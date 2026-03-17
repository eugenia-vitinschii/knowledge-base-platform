//article stats overview (general)

import type { StatItem } from "./article-stats.types";
import type { AuthorStat } from "./author-stat.types";

export interface ArticleStatsOverview {
   status: StatItem[]
   difficulty: StatItem[]
   category: StatItem[]
   type: StatItem[]
   author: AuthorStat[]
}