//article stats (admin)

/* ARTICLE MODEL */
import { ArticleModel } from "@/models/article.model.js"
/* USER TYPE */
import type { AuthUser } from "@/types/auth-user.types.js"
/* ROLE HELPER */
import { buildAuthorFilter } from "@/common/utils/buildAuthorFilter.js"

class ArticleStatsService {
   async getOverviewStats(user: AuthUser) {
      const match = buildAuthorFilter(user)

      const result = await ArticleModel.aggregate([
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
      return result[0]
   }
   async getSummaryService() {
      const result = await ArticleModel.aggregate([
         { $match: { status: "published" } },
         {
            $facet: {
               totalArticles: [
                  { $count: "count" }
               ],
               topAuthor: [
                  {
                     $group: {
                        _id: "$author",
                        articles: { $sum: 1 }
                     }
                  },
                  { $sort: { articles: -1 } },
                  { $limit: 1 },
                  {
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
                        _id: 0,
                        name: "$author.name",
                        articles: 1
                     }
                  }

               ],
               topCategory: [
                  {
                     $group: {
                        _id: "$category",
                        count: { $sum: 1 }
                     }
                  },
                  { $sort: { count: -1 } },
                  { $limit: 1 },
                  {
                     $project: {
                        _id: 0,
                        name: "$_id",
                        count: 1
                     }
                  }
               ],
               mostViewed: [
                  { $sort: { views: -1 } },
                  { $limit: 1 },
                  {
                     $project: {
                        _id: 1,
                        title: 1,
                        views: 1,
                        slug: 1
                     }
                  }
               ],
            }

         }
      ])
      const data = result[0]
      return {
         totalArticles: data.totalArticles[0]?.count || 0,
         topAuthor: data.topAuthor[0] || null,
         topCategory: data.topCategory[0] || null,
         mostViewed: data.mostViewed[0] || null,
      }
   }

}

export const articleStatsService = new ArticleStatsService()