// query search mapper


import type { ArticleSearchParams } from "@/modules/articles/types/index"
import type { LocationQuery } from "vue-router";

export function useArticleSearch() {

   function mapQueryToParams(query: LocationQuery): ArticleSearchParams {
      return {
         search: getString(query.search),

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