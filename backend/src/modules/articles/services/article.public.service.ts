// article public service

import z from "zod";
/* MODELS */
import { ArticleModel } from "@/models/article.model.js";
/* ENUMS */
import { ArticleStatus } from "@/common/enums/article.enums.js";
/* DTO's*/
import { ArticlePublicFilterDto } from "../dtos/article-public-filter.dto.js";
/* */
import { buidArticleQuery } from "@/common/utils/buildArticleQuery.js";

type ArticleFilter = z.infer<typeof ArticlePublicFilterDto>

class ArticlePublicService {

   /* GET ARTICLE BY SLUG (PUBLISHED) */
   async findBySlug(slug: string) {
      return ArticleModel.findOne({ slug, status: ArticleStatus.PUBLISHED })
   }

   /* SEARCH & FILTER PUBLIC ARTICLES */
   async findPublicArticles(
      filters: ArticleFilter,
      pagination: { page: number; limit: number }
   ) {
      const query = buidArticleQuery(filters)

      query.status = ArticleStatus.PUBLISHED

      const { page, limit } = pagination
      const skip = (page - 1) * limit

      const [articles, total] = await Promise.all([
         ArticleModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),

         ArticleModel.countDocuments(query)
      ])
      return {
         data: articles,
         meta: {
            total,
            page,
            pages: Math.ceil(total / limit)
         }
      }
   }

   /* INCREMENT VIEWS */
   async incrementViews(slug: string) {
      return ArticleModel.findOneAndUpdate(
         { slug },
         { $inc: { views: 1 } },
         { new: true, timestamps: false }
      )
   }

}

export const articlePublicService = new ArticlePublicService()