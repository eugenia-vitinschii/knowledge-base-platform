//article query

import z from "zod";

/* FILTERS */
import { ArticlePublicFilterDto } from "../../dtos/article-public-filter.dto.js";
import { ArticleAdminFilterDto } from "../../dtos/article-admin-filter.dto.js";

type ArticleFilter = z.infer<typeof ArticlePublicFilterDto> | z.infer<typeof ArticleAdminFilterDto>

export function buidArticleQuery(filters: ArticleFilter) {
   const query: any = {}

   Object.entries(filters).forEach(([key, value]) => {

      if (!value) return

      if (key === "search") {
         const search = String(value).trim()

         if (!search) return

         query.title = { $regex: value, $options: "i" }
         return
      }
      if (key === "tag") {
         const tags = Array.isArray(value) ? value : [value]
         query.tags = { $in: tags }
         return
      }
      query[key] = value
   })
   return query
}