//article routes

import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { articleController } from "../controllers/article.controller";
import { requiredRole } from "../middleware/role.middleware";
import { Role } from "../common/enums/role.enum";

const router = Router()

router.post('/', authMiddleware, requiredRole(Role.ADMIN, Role.EDITOR), articleController.create)
router.patch('/:id', authMiddleware, requiredRole(Role.ADMIN, Role.EDITOR), articleController.updateContent)
router.patch('/:id/status', authMiddleware, requiredRole(Role.ADMIN), articleController.updateStatus)
router.delete('/:id', authMiddleware, requiredRole(Role.ADMIN), articleController.delete)

router.get('/', articleController.getPublished)
router.get('/:slug', articleController.getBySlug)

export default router