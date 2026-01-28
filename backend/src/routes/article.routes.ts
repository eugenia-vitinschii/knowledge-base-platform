//article routes

import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { articleController } from "../controllers/article.controller";

const router = Router()

router.post('/', authMiddleware, articleController.create)
router.get('/', articleController.getPublished)
router.get('/:slug', articleController.getBySlug)

export default router