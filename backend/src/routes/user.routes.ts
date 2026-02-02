//user routes

import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { validateResource } from "../middleware/validateResource";
import { CreateUserDto } from "../dtos/create-user.dto";

const router = Router()

router.post('/', validateResource(CreateUserDto), userController.create)

export default router 