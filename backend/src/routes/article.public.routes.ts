// Article routes /public

import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { articleController } from "../controllers/article.controller";

const router = Router()

/* used for all routes */
router.use(authMiddleware)

/* GET PUBLIC ARTICLES (STATUS PUBLISHED) */
router.get('/filter', articleController.getPublicArticles)

/* GET ARTICLE BY SLUG */
router.get('/:slug', articleController.getBySlug)


export default router