//article crud controller
import { NextFunction, Request, Response } from "express"

import { articleCrudService } from "../services/article.crud.service.js"

class ArticleCrudController {
   /*CREATE*/
   create = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const user = (req as any).user

         const article = await articleCrudService.create(req.body, user.id)

         res.status(201).json(article)
      } catch (error) {
         next(error)
      }
   }
   /* UPDATE */
   updateContent = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const user = req.user!
         const id = req.params.id as string

         const article = await articleCrudService.updateContent(
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
   /* UPDATE STATUS  */
   updateStatus = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const id = req.params.id as string

         const { status } = req.body
         const article = await articleCrudService.updateStatus(id, status)
         res.json(article)

      } catch (error) {
         next(error)
      }

   }
   /* DELETE */
   delete = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const id = req.params.id as string

         await articleCrudService.delete(id)

         res.status(204).send()
      } catch (error) {
         next(error)
      }

   }
}

export const articleCrudController = new ArticleCrudController()