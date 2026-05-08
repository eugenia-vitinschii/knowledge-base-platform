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
   /* FETCH ARTICLES BY AUTHOR */
   fetchByAuthor = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const id = req.params.id as string
         const article = await articlePublicService.fetchByAuthor(id)

         res.json(article)
      } catch (error) {
         console.log("error", error)
         next(error)
      }
   }
   /* SEARCH & FILTER ARTICLES (PUBLISHED) */
   getPublicArticles = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { page = "1", limit = "10", ...filters } = req.query

         const articles = await articlePublicService.findPublicArticles(
            filters,
            { page: Number(page), limit: Number(limit) }
         )
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