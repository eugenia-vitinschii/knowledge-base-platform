//stats summary (stats )

export interface TopAuthor {
   articles: number
   name: string
}
export interface TopCategory {
   count: number
   name: string
}

export interface MostViewed {
   _id: string
   title: string
   slug: string
   views: number
}

export interface ArticleStatsSummary {
   totalArticles: number
   topAuthor: TopAuthor | null
   topCategory: TopCategory | null
   mostViewed: MostViewed | null
}
