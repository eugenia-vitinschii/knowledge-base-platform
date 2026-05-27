//user query

import z from "zod";

/* FILTERS */
import { UserAdminFilterDTO } from "@/modules/users/dtos/user-admin-filter.dto.js";

type UserFilter = z.infer<typeof UserAdminFilterDTO>

export function buildUserQuery(filters: UserFilter) {
   const query: any = {}

   Object.entries(filters).forEach(([key, value]) => {
      if (!value) return

      if (key === "search") {
         const search = String(value).trim()

         if (!search) return

         query.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
         ]
         return
      }
      query[key] = value
   })
   return query
}