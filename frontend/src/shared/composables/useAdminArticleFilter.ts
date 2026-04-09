// query mapper

import type { ArticleAdminQueryParams } from "@/types/article";
import type { LocationQuery } from "vue-router";


export function useArticleAdminFilter() {

   function mapQueryToParams(query: LocationQuery): ArticleAdminQueryParams {
      return {
         search: getString(query.search),
         category: getString(query.category) as any,
         difficulty: getString(query.difficulty) as any,
         type: getString(query.type) as any,
         status: getString(query.status) as any,

         page: getNumber(query.page) || 1,
         limit: getNumber(query.limit) || 10,
      }
   }

   function getString(value: unknown): string {
      if (Array.isArray(value)) return value[0] || ""
      if (typeof value === "string") return value
      return ""
   }


   function getNumber(value: unknown): number | undefined {
      if (Array.isArray(value)) return Number(value[0])
      if (typeof value === "string") return Number(value)
      return undefined
   }

   return {
      mapQueryToParams
   }
}