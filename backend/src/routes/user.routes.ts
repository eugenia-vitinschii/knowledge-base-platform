//user routes

import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { validateResource } from "../middleware/validateResource.js";
import { CreateUserDto } from "../dtos/create-user.dto.js";

const router = Router()

router.post('/', validateResource(CreateUserDto), userController.create)

export default router 