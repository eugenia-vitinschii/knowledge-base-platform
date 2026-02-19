//article controller

import { NextFunction, Request, Response } from "express"
import { articleService } from "../services/article.service"
import { NotFoundError } from "../common/errors"

class ArticleController {
   /*CREATE*/
   create = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const user = (req as any).user

         const article = await articleService.create(req.body, user.id)

         res.status(201).json(article)
      } catch (error) {
         next(error)
      }
   }
   /* GET */
   getPublished = async (_req: Request, res: Response, next: NextFunction) => {
      try {
         const articles = await articleService.findAllPublished()
         res.json(articles)
      } catch (error) {
         next(error)
      }
   }

   getBySlug = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const slug = req.params.slug as string

         const article = await articleService.findBySlug(slug)
         res.json(article)
      } catch (error) {
         next(error)
      }

   }
   getMyArticles = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const user = req.user!;
         const articles = await articleService.findMyArticles(user.id);
         res.json(articles)
      } catch (error) {
         next(error)
      }
   }
   getll = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const articles = await articleService.findAll()
         res.json(articles)

      } catch (error) {
         next(error)
      }
   }

   getById = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const id = req.params.id as string;

         const article = await articleService.findById(id)

         if (!article) throw new NotFoundError("Article not found")
         res.json(article)

      } catch (error) {
         next(error)
      }
   }
   /* UPDATE */
   updateContent = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const user = req.user!
         const id = req.params.id as string

         const article = await articleService.updateContent(
            id,
            user.id,
            req.body,
            user.role
         )

         res.json(article)
      } catch (error) {
         next(error)
      }

   }

   updateStatus = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const id = req.params.id as string

         const { status } = req.body
         const article = await articleService.updateStatus(id, status)
         res.json(article)

      } catch (error) {
         next(error)
      }

   }
   /* DELETE */
   delete = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const id = req.params.id as string

         await articleService.delete(id)

         res.status(204).send()
      } catch (error) {
         next(error)
      }

   }
}


export const articleController = new ArticleController()