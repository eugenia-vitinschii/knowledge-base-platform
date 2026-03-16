//article stats (admin)

/* ARTICLE MODEL */
import { ArticleModel } from "../models/article.model"
/* USER TYPE */
import type { AuthUser } from "../types/auth-user.types"
/* ROLE HELPER */
import { buildAuthorFilter } from "../common/utils/buildAuthorFilter"

class ArticleStatsService {
   async getOverviewStats(user: AuthUser) {
      const match = buildAuthorFilter(user)

      return ArticleModel.aggregate([
         { $match: match },
         {
            $facet: {
               status: [{
                  $group: {
                     _id: "$status",
                     count: { $sum: 1 }
                  }
               }],
               difficulty: [{
                  $group: {
                     _id: "$difficulty",
                     count: { $sum: 1 }
                  }
               }],
               category: [{
                  $group: {
                     _id: "$category",
                     count: { $sum: 1 }
                  }
               }],
               type: [{
                  $group: {
                     _id: "$type",
                     count: { $sum: 1 }
                  }
               }],
               author: [{
                  $group: {
                     _id: "$author",
                     articles: { $sum: 1 }
                  }
               }, {
                  $lookup: {
                     from: "users",
                     localField: "_id",
                     foreignField: "_id",
                     as: "author"
                  }
               },
               { $unwind: "$author" },
               {
                  $project: {
                     articles: 1,
                     "author._id": 1,
                     "author.name": 1
                  }
               }]
            }
         }
      ])
   }
}

export const articleStatsService = new ArticleStatsService()