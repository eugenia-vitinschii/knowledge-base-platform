//all routes

import { Router } from "express";

import authRoutes from './auth.routes.js'
import userRoutes from "./user.routes.js"
import articleCrudRoutes from './article.crud.routes.js'
import articleAdminRoutes from './article.admin.routes.js'
import articlePublicRoutes from './article.public.routes.js'
import articleAdminStats from './article.stats.routes.js'

const router = Router()

/* AUTH ROUTES*/
router.use('/auth', authRoutes)

/* USERS ROUTES */
router.use('/users', userRoutes)

/* CRUD ROUTES*/
router.use('/articles', articleCrudRoutes)

/* ADMIN ROUTES */
router.use('/articles/admin', articleAdminRoutes)

/* STATS ROUTES */
router.use('/articles/stats', articleAdminStats)

/* PUBLIC ROUTES*/
router.use('/articles/public', articlePublicRoutes)

export default router;