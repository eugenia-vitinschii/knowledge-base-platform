//all routes

import { Router } from "express";

/*AUTH*/
import authRoutes from '@/modules/auth/routes/auth.routes.js'

import profileUserRoutes from "@/modules/users/routes/profile-user.routes.js";
/* ADMIN ROUTES */
import adminUserRoutes from "@/modules/users/routes/admin-user.routes.js"

import articleCrudRoutes from '@/modules/articles/routes/article.crud.routes.js'
import articleAdminRoutes from '../modules/articles/routes/article.admin.routes.js'
import articlePublicRoutes from '../modules/articles/routes/article.public.routes.js'
import articleAdminStats from '../modules/articles/routes/article.stats.routes.js'

import { authMiddleware } from "@/middleware/auth.middleware.js";

const router = Router()


/* auth routes */
router.use('/auth', authRoutes)

/* used for all routes */
router.use(authMiddleware)

/* articles management */
router.use('/articles', articleCrudRoutes)
router.use('/articles/admin', articleAdminRoutes)
router.use('/articles/stats', articleAdminStats)
router.use('/articles/public', articlePublicRoutes)


/* admin user management */
router.use('/admin/users', adminUserRoutes)

/* profile routes */
router.use('/', profileUserRoutes)


export default router;