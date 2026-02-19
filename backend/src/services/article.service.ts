//article service

import { ArticleStatus } from "../common/enums/article.enums";
import { CreateArticleDto } from "../dtos/create-article.dto";
import { UpdateArticleDto } from "../dtos/update-article.dto";
import { ArticleModel } from "../models/article.model";
import { Role } from '../common/enums/role.enum'
import { Types } from "mongoose";
import z from "zod";
import { ForbiddenError, NotFoundError } from "../common/errors";
import { IArticle } from "../models/article.model";

type CreateArticleInput = z.infer<typeof CreateArticleDto>
type UpdateArticleInput = z.infer<typeof UpdateArticleDto>

class ArticleService {
   /* CREATE */
   async create(data: CreateArticleInput, authorId: string) {
      const slug = this.generateSlug(data.title)

      const article = await ArticleModel.create({
         ...data,
         slug,
         author: new Types.ObjectId(authorId),
         status: ArticleStatus.DRAFT
      })

      if (!article) throw new NotFoundError("Article not found")

   }
   /* FIND */
   async findAllPublished() {
      return ArticleModel.find({ status: ArticleStatus.PUBLISHED })
   }
   async findBySlug(slug: string) {
      return ArticleModel.findOne({ slug, status: ArticleStatus.PUBLISHED })
   }

   async findById(id: string) {
      return await ArticleModel.findById(id)
   }
   async findMyArticles(userId: string) {
      return ArticleModel.find({ author: userId }).sort({ createdAt: -1 })
   }
   /* UPDATE*/
   async updateContent(articleId: string, userId: string, data: UpdateArticleInput, role: Role) {
      const article = await ArticleModel.findById(articleId)

      if (!article) throw new NotFoundError('Article nor exist!')

      this.checkArticleOwnership(article, userId, role)

      if (data.title && data.title !== article.title) {
         article.slug = this.generateSlug(data.title)
      }

      Object.assign(article, data)

      return article.save()
   }

   async updateStatus(articleId: string, status: ArticleStatus) {
      const article = await ArticleModel.findById(articleId)

      if (!article) {
         throw new NotFoundError("Article not found")
      }
      article.status = status
      return await article.save()
   }
   /* DELETE*/
   async delete(id: string) {
      const article = await ArticleModel.findByIdAndDelete(id)

      if (!article) {
         throw new NotFoundError('Article not found')
      }
      // return article
   }
   /* generate SLUG */
   private generateSlug(title: string): string {
      return title.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
   }
   /* check article ownership */
   private checkArticleOwnership(article: IArticle, userId: string, role: Role) {
      const isAuthor = article.author.toString() === userId

      if (isAuthor) return
      if (role === Role.ADMIN || role === Role.EDITOR) return

      throw new ForbiddenError("Forbidden")
   }
}

export const articleService = new ArticleService()