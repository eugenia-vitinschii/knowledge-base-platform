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
import { articleCrudController } from "../controllers/article.crud.controller";

//enums
import { Role } from "../common/enums/role.enum";

const router = Router()
/* used for all routes */
router.use(authMiddleware)

/* CREATE ARTICLE */
router.post('/', requiredRole(Role.ADMIN, Role.EDITOR), validateResource(CreateArticleDto), articleCrudController.create)

/* UPDATE ARTICLE  */
router.put('/:id', requiredRole(Role.ADMIN, Role.EDITOR), validateResource(UpdateArticleDto), articleCrudController.updateContent)

/* UPDATE STATUS (ADMIN ROLE) */
router.patch('/:id/status', requiredRole(Role.ADMIN), validateResource(UpdateArticleStatusDto), articleCrudController.updateStatus)

/* DELETE ARTICLE */
router.delete('/:id', requiredRole(Role.ADMIN), articleCrudController.delete)

export default router

