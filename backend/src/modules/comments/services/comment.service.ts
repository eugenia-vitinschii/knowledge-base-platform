/*  COMMENT SERVICE */

import z from "zod";
import { Types } from "mongoose";

import { CreateCommentDto } from "../dtos/create-comment.dto.js"

import { CommentModel } from "../models/comment.model.js"

type CreateCommentInput = z.infer<typeof CreateCommentDto>

class CommentService {
   /* CREATE COMMENT */
   async create(data: CreateCommentInput, article: string, author: string) {

      const comment = await CommentModel.create({
         ...data,
         article: new Types.ObjectId(article),
         author: new Types.ObjectId(author),
      })

      return comment
   }

   /* FETCH COMMENTS */
   async getComments(articleId: string) {
      return CommentModel.find({
         article: new Types.ObjectId(articleId)
      })
         .populate('author', 'name')
         .sort({ createdAt: -1 })
   }

   /* */

}

export const commentService = new CommentService()