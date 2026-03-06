//article routes (CRUD)

import { Router } from "express";

//middlewares
import { authMiddleware } from "../middleware/auth.middleware";
import { requiredRole } from "../middleware/role.middleware";
import { validateResource } from "../middleware/validateResource";

//DTO's
import { UpdateArticleDto } from "../dtos/update-article.dto";
import { UpdateArticleStatusDto } from "../dtos/update-article-status.dto";
import { CreateArticleDto } from "../dtos/create-article.dto";

//controllers
import { articleController } from "../controllers/article.controller";

//enums
import { Role } from "../common/enums/role.enum";


const router = Router()

/* used for all routes */
router.use(authMiddleware)

router.get('/', articleController.getPublished)

/* CREATE ARTICLE */
router.post('/', requiredRole(Role.ADMIN, Role.EDITOR), validateResource(CreateArticleDto), articleController.create)

/* GET ARTICLE BY ID */
router.get('/:id', requiredRole(Role.ADMIN, Role.EDITOR), articleController.getById)

/* UPDATE ARTICLE  */
router.put('/:id', requiredRole(Role.ADMIN, Role.EDITOR), validateResource(UpdateArticleDto), articleController.updateContent)

/* UPDATE STATUS (ADMIN ROLE) */
router.patch('/:id/status', requiredRole(Role.ADMIN), validateResource(UpdateArticleStatusDto), articleController.updateStatus)

/* DELETE ARTICLE */
router.delete('/:id', requiredRole(Role.ADMIN), articleController.delete)

export default router

