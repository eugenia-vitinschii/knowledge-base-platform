//article controller

import { Request, Response } from "express"
import { articleService } from "../services/article.service"

class ArticleController {
   /*CREATE*/
   create = async (req: Request, res: Response) => {
      const user = (req as any).user

      const article = await articleService.create(req.body, user.id)

      res.status(201).json(article)
   }
   /* GET */
   getPublished = async (_req: Request, res: Response) => {
      const articles = await articleService.findAllPublished()
      res.json(articles)
   }

   getBySlug = async (req: Request, res: Response) => {
      const { slug } = req.params

      if (Array.isArray(slug)) {
         return res.status(400).json({ message: "Invalid Slug" })
      }
      const article = await articleService.findBySlug(slug)
      res.json(article)
   }
   /* UPDATE */
   updateContent = async (req: Request, res: Response) => {
      const user = (req as any).user
      const { id } = req.params

      if (Array.isArray(id)) {
         return res.status(400).json({ message: 'Invalid article id' })
      }

      const article = await articleService.updateContent(
         id,
         user.id,
         req.body,
         user.role
      )

      res.json(article)
   }

   updateStatus = async (req: Request, res: Response) => {
      const { id } = req.params
      const { status } = req.body
      if (Array.isArray(id)) {
         return res.status(400).json({ message: 'Invalid article id' })
      }
      const article = await articleService.updateStatus(id, status)
      res.json(article)
   }
   /* DELETE */
   delete = async (req: Request, res: Response) => {
      const { id } = req.params

      if (Array.isArray(id)) {
         return res.status(400).json({ message: 'Invalid article id' })
      }
      await articleService.delete(id)

      res.status(204).send()
   }
}


export const articleController = new ArticleController()