//article routes (CRUD)

import { Router } from "express";

//middlewares
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requiredRole } from "../middleware/role.middleware.js";
import { validateResource } from "../middleware/validateResource.js";

//DTO's
import { UpdateArticleDto } from "../modules/articles/dtos/update-article.dto.js";
import { UpdateArticleStatusDto } from "../modules/articles/dtos/update-article-status.dto.js";
import { CreateArticleDto } from "../modules/articles/dtos/create-article.dto.js";

//controllers
import { articleCrudController } from "../modules/articles/controllers/article.crud.controller.js";

//enums
import { Role } from "../common/enums/role.enum.js";

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

