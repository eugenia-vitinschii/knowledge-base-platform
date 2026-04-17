// admin user management

import { Router } from "express";

import { requiredRole } from "@/middleware/role.middleware.js"
import { validateResource } from "@/middleware/validateResource.js";

import { Role } from "@/common/enums/role.enum.js";
import { CreateUserDto } from "../dtos/create-user.dto.js";

import { adminUserController } from "../controllers/admin-user.controller.js";
import { UpdateUserRoleDto } from "../dtos/update-user-role.dto.js";
import { UpdateUserDto } from "../dtos/update-user.dto.js";

const router = Router()

/* used for all routes */
router.use(requiredRole(Role.ADMIN))

/* Create user */
router.post("/", validateResource(CreateUserDto), adminUserController.createUser)

/* Get all users  */
router.get("/", adminUserController.getUsers)

router.get("/:id", adminUserController.getUserById)
/* Update user role */
router.patch("/:id/role", validateResource(UpdateUserRoleDto), adminUserController.updateRole)

/* Update User */
router.patch("/:id", validateResource(UpdateUserDto), adminUserController.updateUser)

/* Delete user */
router.delete("/:id", adminUserController.deleteUser)

export default router