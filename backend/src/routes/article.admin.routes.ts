// Article /admin Routes

import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { requiredRole } from "../middleware/role.middleware.js";

import { Role } from "../common/enums/role.enum.js";

import { articleAdminController } from "../modules/articles/controllers/article.admin.controller.js";
const router = Router()

/* used for all routes */
router.use(authMiddleware)

/* GET ALL (ADMIN ROLE)*/
router.get("/all", requiredRole(Role.ADMIN), articleAdminController.getAll)

/* GET MY ARTICLES*/
router.get("/my", requiredRole(Role.ADMIN, Role.EDITOR), articleAdminController.getMyArticles)

/* FILTER ARTICLES */
router.get("/filter", requiredRole(Role.ADMIN, Role.EDITOR), articleAdminController.searchAdminArticles)

/* GET ARTICLE BY ID */
router.get('/:id', requiredRole(Role.ADMIN, Role.EDITOR), articleAdminController.getById)

export default router