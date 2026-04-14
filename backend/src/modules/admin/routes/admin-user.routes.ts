// admin user management

import { Router } from "express";

import { authMiddleware } from "@/middleware/auth.middleware.js";
import {requiredRole} from "@/middleware/role.middleware.js"
import { validateResource } from "@/middleware/validateResource.js";

import { Role } from "@/common/enums/role.enum.js";
import { CreateUserDto } from "../dtos/create-user.dto.js";

import { adminUserController } from "../controllers/admin-user.controller.js";
import { UpdateUserRoleDto } from "../dtos/update-user-role.dto.js";

const router = Router()

/* used for all routes */
router.use(authMiddleware, requiredRole(Role.ADMIN))

/* Create user */
router.post("/users", validateResource(CreateUserDto), adminUserController.createUser)

/* Get all users  */
router.get("/users", adminUserController.getUsers)

/* Update user role */
router.patch("/users/:id/role", validateResource(UpdateUserRoleDto), adminUserController.updateRole)

/* Delete user */
router.delete("/users/:id", adminUserController.deleteUser)

export default router