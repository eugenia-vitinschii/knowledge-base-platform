/* COMMETS ROUTES */

import { Router } from "express";

import { validateResource } from "@/middleware/validateResource.js";

import { commentController } from "@/modules/comments/controllers/comment.controller.js";

import { CreateCommentDto } from "@/modules/comments/dtos/create-comment.dto.js";


const router = Router()

/* CREATE COMMENT */
router.post('/:id/comments', validateResource(CreateCommentDto), commentController.create)

/* FETCH COMMENTS */
router.get('/:id/comments', commentController.fetchComments)

export default router