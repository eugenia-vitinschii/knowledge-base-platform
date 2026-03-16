//all routes

import { Router } from "express";

import authRoutes from './auth.routes'
import userRoutes from "./user.routes"
import articleCrudRoutes from './article.crud.routes'
import articleAdminRoutes from './article.admin.routes'
import articlePublicRoutes from './article.public.routes'
import articleAdminStats from './article.stats.routes'

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