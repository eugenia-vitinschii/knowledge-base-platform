//article public controller

import { NextFunction, Request, Response } from "express"

import { articlePublicService } from "../services/article.public.service.js"

class ArticlePublicController {
   /* GET ARTICLE BY SLUG */
   getBySlug = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const slug = req.params.slug as string

         const article = await articlePublicService.findBySlug(slug)
         res.json(article)
      } catch (error) {
         next(error)
      }

   }

   /* SEARCH & FILTER ARTICLES (PUBLISHED) */
   getPublicArticles = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const filters = req.query

         const articles = await articlePublicService.findPublicArticles(filters)
         res.json(articles)
      } catch (error) {
         console.log("error", error)
         next(error)

      }
   }
   /* VIEWS*/
   incrementViews = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const slug = req.params.slug as string
         const article = await articlePublicService.incrementViews(slug)

         res.json(article)
      } catch (error) {
         console.log("error", error)
         next(error)

      }
   }
}

export const articlePublicController = new ArticlePublicController()