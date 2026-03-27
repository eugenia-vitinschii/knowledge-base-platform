// query mapper

import type { ArticlePublicFilters } from "@/types/article";
import type { LocationQuery } from "vue-router";


export function useArticleFilter() {

   function mapQueryToFilters(query: LocationQuery): ArticlePublicFilters {
      return {
         search: getString(query.search),
         category: getString(query.category) as any,
         difficulty: getString(query.difficulty) as any,
         type: getString(query.type) as any,
         tag: getString(query.tag)
      }
   }

   function getString(value: unknown): string {
      if (Array.isArray(value)) return value[0] || ""
      if (typeof value === "string") return value
      return ""
   }

   return {
      mapQueryToFilters
   }
}