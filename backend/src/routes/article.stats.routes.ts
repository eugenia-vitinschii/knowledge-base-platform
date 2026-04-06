// Article routes /public

import { Router } from "express";

/* MIDDLEWARES */
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requiredRole } from "../middleware/role.middleware.js";

/* CONTROLLERS*/
import { articleStatsController } from "../controllers/article.stats.controller.js";

/* ENUMS */
import { Role } from "../common/enums/role.enum.js";

const router = Router()

/* used for all routes */
router.use(authMiddleware)

/* Charts */
router.get("/overview", requiredRole(Role.ADMIN, Role.EDITOR), articleStatsController.getOverviewStats)

/* STATS */
router.get("/summary", requiredRole(Role.ADMIN, Role.EDITOR), articleStatsController.getStatsSummary)

export default router

