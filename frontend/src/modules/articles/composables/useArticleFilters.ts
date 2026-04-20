// query mapper

import type { ArticleQueryParams } from "@/modules/articles/types";
import type { LocationQuery } from "vue-router";


export function useArticleFilter() {

   function mapQueryToParams(query: LocationQuery): ArticleQueryParams {
      return {
         search: getString(query.search),
         category: getString(query.category) as any,
         difficulty: getString(query.difficulty) as any,
         type: getString(query.type) as any,
         tag: getString(query.tag),

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