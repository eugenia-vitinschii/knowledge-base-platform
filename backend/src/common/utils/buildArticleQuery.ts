//article query
import { ArticleFilterDto } from "../../dtos/article-filter.dto";
import z from "zod";

type ArticleFilter = z.infer<typeof ArticleFilterDto>

export function buidArticleQuery(filters: ArticleFilter) {
   const query: any = {}

   Object.entries(filters).forEach(([key, value]) => {

      if (!value) return

      if (key === "search") {
         query.title = { $regex: value, $option: "i" }
         return
      }
      query[key] = value
   })
   return query
}