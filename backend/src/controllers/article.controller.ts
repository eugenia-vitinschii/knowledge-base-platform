//article controller

import { Request, Response } from "express"
import { articleService } from "../services/article.service"

class ArticleController {
   create = async (req: Request, res: Response) => {
      const user = (req as any).user

      const article = await articleService.create(req.body, user.id)

      res.status(201).json(article)
   }

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
}


export const articleController = new ArticleController()