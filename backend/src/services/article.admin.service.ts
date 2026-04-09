//article admin service

import z from "zod";
/* MODELS */
import { ArticleModel } from "../models/article.model.js";
/* DTO's */
import { ArticleAdminFilterDto } from "../dtos/article-admin-filter.dto.js";
/* ENUMS */
import { Role } from '../common/enums/role.enum.js'
import { buidArticleQuery } from "../common/utils/buildArticleQuery.js";

type ArticleFilter = z.infer<typeof ArticleAdminFilterDto>

class ArticleAdminService {
   /* FIND BY ID*/
   async findById(id: string) {
      return ArticleModel.findById(id)
   }
   /* FIND ALL (admin)*/
   async findAll() {
      return ArticleModel.find()
   }
   /* FIND MY(viewer) */
   async findMyArticles(userId: string) {
      return ArticleModel.find({ author: userId }).sort({ createdAt: -1 })
   }
   /* SEARCH & FILTER (admin/viewer) */
   async searchAdminArticles(
      filters: ArticleFilter,
      user: { id: string, role?: Role },
      pagination: { page: number; limit: number }
   ) {
      const query = buidArticleQuery(filters)

      if (user?.role === Role.EDITOR) {
         query.author = user.id
      }

      const { page, limit } = pagination
      const skip = (page - 1) * limit

      const [articles, total] = await Promise.all([
         ArticleModel.find(query).skip(skip).limit(limit).sort({ createAt: -1 }),

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
}

export const articleAdminService = new ArticleAdminService()
