//article service

import { ArticleStatus } from "../common/enums/article.enums";
import { CreateArticleDto } from "../dtos/create-article.dto";
import { ArticleModel } from "../models/article.model";
import { Types } from "mongoose";

class ArticleService {
   async create(dto: CreateArticleDto, authorId: string) {
      const slug = this.generateSlug(dto.title)

      const article = await ArticleModel.create({
         ...dto,
         slug,
         author: new Types.ObjectId(authorId),
         status: ArticleStatus.DRAFT
      })
      return article
   }

   async findAllPublished() {
      return ArticleModel.find({ status: ArticleStatus.PUBLISHED })
   }
   async findBySlug(slug: string) {
      return ArticleModel.findOne({ slug, status: ArticleStatus.PUBLISHED })
   }

   private generateSlug(title: string): string {
      return title.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
   }
}

export const articleService = new ArticleService()