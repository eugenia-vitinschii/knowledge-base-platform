//article query
import { ArticlePublicFilterDto } from "../../dtos/article-public-filter.dto";
import z from "zod";

type ArticlePublicFilter = z.infer<typeof ArticlePublicFilterDto>

export function buidArticleQuery(filters: ArticlePublicFilter) {
   const query: any = {}

   Object.entries(filters).forEach(([key, value]) => {

      if (!value) return

      if (key === "search") {
         const search = String(value).trim()

         if (!search) return

         query.title = { $regex: value, $options: "i" }
         return
      }
      query[key] = value
   })
   return query
}