// Article routes /public

import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { articlePublicController } from "../modules/articles/controllers/article.public.controller.js";

const router = Router()

/* used for all routes */
router.use(authMiddleware)

/* GET PUBLIC ARTICLES (STATUS PUBLISHED) */
router.get('/filter', articlePublicController.getPublicArticles)

/* VIEWS */
router.patch('/:slug/views', articlePublicController.incrementViews)

/* GET ARTICLE BY SLUG */
router.get('/:slug', articlePublicController.getBySlug)


export default router
