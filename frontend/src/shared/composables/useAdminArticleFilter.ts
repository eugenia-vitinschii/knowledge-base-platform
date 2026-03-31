// query mapper

import type { ArticleAdminFilters } from "@/types/article";
import type { LocationQuery } from "vue-router";


export function useArticleAdminFilter() {

   function mapQueryToFilters(query: LocationQuery): ArticleAdminFilters {
      return {
         search: getString(query.search),
         category: getString(query.category) as any,
         difficulty: getString(query.difficulty) as any,
         type: getString(query.type) as any,
         status: getString(query.status) as any
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