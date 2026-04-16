//article routes (CRUD)

import { Router } from "express";

//middlewares
import { requiredRole } from "@/middleware/role.middleware.js";
import { validateResource } from "@/middleware/validateResource.js";

//DTO's
import { UpdateArticleDto } from "../dtos/update-article.dto.js";
import { UpdateArticleStatusDto } from "../dtos/update-article-status.dto.js";
import { CreateArticleDto } from "../dtos/create-article.dto.js";

//controllers
import { articleCrudController } from "../controllers/article.crud.controller.js";

//enums
import { Role } from "@/common/enums/role.enum.js";

const router = Router()
router.use(requiredRole(Role.ADMIN, Role.EDITOR))

/* CREATE ARTICLE */
router.post('/', validateResource(CreateArticleDto), articleCrudController.create)

/* UPDATE ARTICLE  */
router.put('/:id', validateResource(UpdateArticleDto), articleCrudController.updateContent)

/* UPDATE STATUS (ADMIN ROLE) */
router.patch('/:id/status', requiredRole(Role.ADMIN), validateResource(UpdateArticleStatusDto), articleCrudController.updateStatus)

/* DELETE ARTICLE */
router.delete('/:id', requiredRole(Role.ADMIN), articleCrudController.delete)

export default router

