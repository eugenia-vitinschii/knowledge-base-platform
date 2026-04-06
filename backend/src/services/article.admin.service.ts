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
   /* SEARCH & FILTER (admin/viewwr) */
   async searchAdminArticles(filters: ArticleFilter, user: { id: string, role?: Role }) {
      const query = buidArticleQuery(filters)

      if (user?.role === Role.EDITOR) {
         query.author = user.id
      }
      return ArticleModel.find(query)
   }
}

export const articleAdminService = new ArticleAdminService()
