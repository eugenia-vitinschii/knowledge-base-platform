//article routes

import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { articleController } from "../controllers/article.controller";
import { requiredRole } from "../middleware/role.middleware";
import { Role } from "../common/enums/role.enum";
import { CreateArticleDto } from "../dtos/create-article.dto";
import { validateResource } from "../middleware/validateResource";
import { UpdateArticleDto } from "../dtos/update-article.dto";
import { UpdateArticleStatusDto } from "../dtos/update-article-status.dto";

const router = Router()

router.post(
   '/',
   authMiddleware,
   requiredRole(Role.ADMIN, Role.EDITOR),
   validateResource(CreateArticleDto),
   articleController.create
)
router.get(
   '/:id',
   authMiddleware,
   requiredRole(Role.ADMIN, Role.EDITOR),
   articleController.getById
)

router.get("/admin/my",
   authMiddleware,
   requiredRole(Role.ADMIN, Role.EDITOR),
   articleController.getMyArticles
)
router.get("/admin/all",
   authMiddleware,
   requiredRole(Role.ADMIN),
   articleController.getAll
)

router.put(
   '/:id',
   authMiddleware,
   requiredRole(Role.ADMIN, Role.EDITOR),
   validateResource(UpdateArticleDto),
   articleController.updateContent
)

router.patch(
   '/:id/status',
   authMiddleware,
   requiredRole(Role.ADMIN),
   validateResource(UpdateArticleStatusDto),
   articleController.updateStatus
)

router.delete(
   '/:id',
   authMiddleware,
   requiredRole(Role.ADMIN),
   articleController.delete
)

router.get('/', articleController.getPublished)
router.get('/:slug', articleController.getBySlug)

export default router

