// Article routes /public

import { Router } from "express";

import { articlePublicController } from "../controllers/article.public.controller.js";

const router = Router()

/* GET PUBLIC ARTICLES (STATUS PUBLISHED) */
router.get('/search', articlePublicController.getPublicArticles)

/* VIEWS */
router.patch('/:slug/views', articlePublicController.incrementViews)

/* GET ARTICLES BY AUTHOR */
router.get('/user/:id', articlePublicController.searchByAuthor)

/* GET ARTICLE BY SLUG */
router.get('/:slug', articlePublicController.getBySlug)


export default router
