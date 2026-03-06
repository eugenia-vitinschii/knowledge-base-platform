//all routes

import { Router } from "express";

import authRoutes from './auth.routes'
import userRoutes from "./user.routes"
import articleRoutes from './article.routes'
import articleAdminRoutes from './article.admin.routes'
import articlePublicRoutes from './article.public.routes'

const router = Router()

/* AUTH ROUTES*/
router.use('/auth', authRoutes)

/* USERS ROUTES */
router.use('/users', userRoutes)

/* CRUD ROUTES*/
router.use('/articles', articleRoutes)

/* ADMIN ROUTES */
router.use('/articles/admin', articleAdminRoutes)

/* PUBLIC ROUTES*/
router.use('/articles/public', articlePublicRoutes)

export default router;