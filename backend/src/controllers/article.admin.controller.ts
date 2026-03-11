//article admin controller

import { NextFunction, Request, Response } from "express"
import { articleAdminService } from "../services/article.admin.service";
import { NotFoundError } from "../common/errors"

class ArticleAdminController {
   /* GET BY ID*/
   getById = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const id = req.params.id as string;

         const article = await articleAdminService.findById(id)

         if (!article) throw new NotFoundError("Article not found")
         res.json(article)

      } catch (error) {
         next(error)
      }
   }
   /* GET ALL ARTICLES */
   getAll = async (_req: Request, res: Response, next: NextFunction) => {
      try {
         const articles = await articleAdminService.findAll()
         res.json(articles)

      } catch (error) {
         next(error)
      }
   }
   /* GET MY ARTICLES (EDITOR) */
   getMyArticles = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const user = req.user!;
         const articles = await articleAdminService.findMyArticles(user.id);
         res.json(articles)
      } catch (error) {
         next(error)
      }
   }
   /* SEARCH & FILTER ARTICLES  */
   searchAdminArticles = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const filters = req.query
         const user = req.user!
         const articles = await articleAdminService.searchAdminArticles(filters, user)
         res.json(articles)
      } catch (error) {
         console.log("error", error)
         next(error)

      }
   }
}

export const articleAdminController = new ArticleAdminController()