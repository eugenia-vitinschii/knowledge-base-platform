// Article routes /public

import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";

import { articlePublicController } from "../controllers/article.public.controller";

const router = Router()

/* used for all routes */
router.use(authMiddleware)

/* GET PUBLIC ARTICLES (STATUS PUBLISHED) */
router.get('/filter', articlePublicController.getPublicArticles)

/* GET ARTICLE BY SLUG */
router.get('/:slug', articlePublicController.getBySlug)

export default router
