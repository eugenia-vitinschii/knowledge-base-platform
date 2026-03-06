// Article /admin Routes

import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { requiredRole } from "../middleware/role.middleware";
import { Role } from "../common/enums/role.enum";
import { articleController } from "../controllers/article.controller";

const router = Router()

/* used for all routes */
router.use(authMiddleware)

/* GET ALL (ADMIN ROLE)*/
router.get("/all", requiredRole(Role.ADMIN), articleController.getAll)

/* GET MY ARTICLES*/
router.get("/my", requiredRole(Role.ADMIN, Role.EDITOR), articleController.getMyArticles)

/* FILTER ARTICLES */
router.get("/filter", requiredRole(Role.ADMIN, Role.EDITOR), articleController.getAdminArticles)


export default router