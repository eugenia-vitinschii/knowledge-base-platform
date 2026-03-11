// article public service

import z from "zod";
/* MODELS */
import { ArticleModel } from "../models/article.model";
/* ENUMS */
import { ArticleStatus } from "../common/enums/article.enums";
/* DTO's*/
import { ArticleFilterDto } from "../dtos/article-public-filter.dto";
/* */
import { buidArticleQuery } from "../common/utils/buildArticleQuery";

type ArticleFilter = z.infer<typeof ArticleFilterDto>

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
}

export const articlePublicService = new ArticlePublicService()