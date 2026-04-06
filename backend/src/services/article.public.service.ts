// article public service

import z from "zod";
/* MODELS */
import { ArticleModel } from "../models/article.model.js";
/* ENUMS */
import { ArticleStatus } from "../common/enums/article.enums.js";
/* DTO's*/
import { ArticlePublicFilterDto } from "../dtos/article-public-filter.dto.js";
/* */
import { buidArticleQuery } from "../common/utils/buildArticleQuery.js";

type ArticleFilter = z.infer<typeof ArticlePublicFilterDto>

class ArticlePublicService {

   /* GET ARTICLE BY SLUG (PUBLISHED) */
   async findBySlug(slug: string) {
      return ArticleModel.findOne({ slug, status: ArticleStatus.PUBLISHED })
   }

   /* SEARCH & FILTER PUBLIC ARTICLES */
   async findPublicArticles(filters: ArticleFilter) {
      const query = buidArticleQuery(filters)

      query.status = ArticleStatus.PUBLISHED

      return ArticleModel.find(query)
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