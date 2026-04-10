//user routes

import { Router } from "express";
import { userController } from "../modules/users/controller/user.controller.js";
import { validateResource } from "../middleware/validateResource.js";
import { CreateUserDto } from "../modules/users/dtos/create-user.dto.js";

const router = Router()

router.post('/', validateResource(CreateUserDto), userController.create)

export default router 