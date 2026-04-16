// Article routes /public

import { Router } from "express";

/* MIDDLEWARES */
import { requiredRole } from "@/middleware/role.middleware.js";

/* CONTROLLERS*/
import { articleStatsController } from "../controllers/article.stats.controller.js";

/* ENUMS */
import { Role } from "@/common/enums/role.enum.js";

const router = Router()
router.use(requiredRole(Role.ADMIN, Role.EDITOR))

/* Charts */
router.get("/overview", articleStatsController.getOverviewStats)

/* STATS */
router.get("/summary", articleStatsController.getStatsSummary)

export default router

