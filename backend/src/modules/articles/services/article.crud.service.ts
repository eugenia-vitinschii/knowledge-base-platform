// article CRUD service


import z from "zod";
import { Types } from "mongoose";
/* MODEL */
import { ArticleModel, IArticle } from "@/models/article.model.js"
/* DTO */
import { CreateArticleDto } from "../dtos/create-article.dto.js";
import { UpdateArticleDto } from "../dtos/update-article.dto.js";
/* ERRORS */
import { NotFoundError, ForbiddenError } from "@/common/errors/index.js"
/* ENUMS */
import { ArticleStatus } from "@/common/enums/article.enums.js";
import { Role } from '@/common/enums/role.enum.js'
/* types*/
type CreateArticleInput = z.infer<typeof CreateArticleDto>
type UpdateArticleInput = z.infer<typeof UpdateArticleDto>

class ArticleCrudService {
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

      return article
   }

   /* UPDATE CONTENT */
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

   /* UPDATE STATUS */
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

export const articleCrudService = new ArticleCrudService()