// Article routes /public

import { Router } from "express";

/* MIDDLEWARES */
import { authMiddleware } from "../middleware/auth.middleware";
import { requiredRole } from "../middleware/role.middleware";

/* CONTROLLERS*/
import { articleStatsController } from "../controllers/article.stats.controller";

/* ENUMS */
import { Role } from "../common/enums/role.enum";

const router = Router()

/* used for all routes */
router.use(authMiddleware)

/* Charts */
router.get("/overview", requiredRole(Role.ADMIN, Role.EDITOR), articleStatsController.getOverviewStats)

/* STATS */
router.get("/summary", requiredRole(Role.ADMIN, Role.EDITOR), articleStatsController.getStatsSummary)

export default router

