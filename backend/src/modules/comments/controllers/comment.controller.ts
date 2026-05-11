/* COMMENT CONTROLLER */

import { NextFunction, Request, Response } from "express"

import { commentService } from "../services/comment.service.js"

class CommentController {
   /* CREATE COMMENT */
   create = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const articleId = req.params.id as string
         const authorId = (req as any).user.id

         const comment = await commentService.create(req.body, articleId, authorId)

         res.status(201).json(comment)
      } catch (error) {
         next(error)
      }
   }
   /* FETCH COMMENTS */
   fetchComments = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const id = req.params.id as string

         const comments = await commentService.getComments(id)

         res.json(comments)
      } catch (error) {
         next(error)
      }
   }
}

export const commentController = new CommentController()