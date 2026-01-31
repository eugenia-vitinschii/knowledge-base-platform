//article service

import { ArticleStatus } from "../common/enums/article.enums";
import { CreateArticleDto } from "../dtos/create-article.dto";
import { UpdateArticleDto } from "../dtos/update-article.dto";
import { ArticleModel } from "../models/article.model";
import { Role } from '../common/enums/role.enum'
import { Types } from "mongoose";


class ArticleService {
   /* CREATE */
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
   /* UPDATE*/
   async updateContent(articleId: string, userId: string, dto: UpdateArticleDto, role: Role) {
      const article = await ArticleModel.findById(articleId)

      if (!article) throw new Error('Article nor exist!')

      this.checkArticleOwnership(article, userId, role)

      if (dto.title && dto.title !== article.title) {
         article.slug = this.generateSlug(dto.title)
      }

      Object.assign(article, dto)

      return article.save()
   }

   async updateStatus(articleId: string, status: ArticleStatus) {
      return ArticleModel.findByIdAndUpdate(articleId, { status }, { new: true })
   }
   /* DELETE*/
   async delete(id: string) {
      return await ArticleModel.findByIdAndDelete(id)
   }
   /* generate SLUG */
   private generateSlug(title: string): string {
      return title.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
   }
   /* check article ownership */
   private checkArticleOwnership(article: any, userId: string, role: Role) {
      const isAuthor = article.author.toString() === userId

      if (isAuthor) return
      if (role === Role.ADMIN || role === Role.EDITOR) return

      throw new Error("Forbidden")
   }
}

export const articleService = new ArticleService()