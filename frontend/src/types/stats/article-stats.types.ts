//stats types

export interface StatItem {
   _id: string
   count: number
}

export interface AuthorStat {
   articles: number
   author: {
      _id: string
      name: string
   }
}

export interface ArticleStatsOverview {
   status: StatItem[]
   difficulty: StatItem[]
   category: StatItem[]
   type: StatItem[]
   author: AuthorStat[]
}