// Article /admin Routes

import { Router } from "express";

import { requiredRole } from "@/middleware/role.middleware.js";

import { Role } from "@/common/enums/role.enum.js";

import { articleAdminController } from "../controllers/article.admin.controller.js";

const router = Router()

/* GET ALL (ADMIN ROLE)*/
router.get("/", requiredRole(Role.ADMIN), articleAdminController.getAll)

/* GET MY ARTICLES*/
router.get("/my", requiredRole(Role.ADMIN, Role.EDITOR), articleAdminController.getMyArticles)

/* FILTER ARTICLES */
router.get("/search", requiredRole(Role.ADMIN, Role.EDITOR), articleAdminController.searchAdminArticles)

/* GET ARTICLE BY ID */
router.get('/:id', requiredRole(Role.ADMIN, Role.EDITOR), articleAdminController.getById)

export default router