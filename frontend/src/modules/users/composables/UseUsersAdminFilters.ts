// query mapper
import type { UserQueryParams } from "../types";
import type { LocationQuery } from "vue-router";

export function useUserAdminFilter() {
   function mapQueryToParams(query: LocationQuery): UserQueryParams {
      return {
         search: getString(query.search),
         location: getString(query.location) as any,
         role: getString(query.role) as any,
         position: getString(query.position) as any,

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