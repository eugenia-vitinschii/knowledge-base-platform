//profile routes
import { Router } from "express";

/* controllers */
import { userController } from "../controllers/user.controller.js";

import { validateResource } from "@/middleware/validateResource.js";

import { UpdateProfileDto } from "../dtos/update-profile.dto.js";

const router = Router()

/*GET ME */
router.get("/me", userController.getMe)

router.patch("/me", validateResource(UpdateProfileDto), userController.updateMe)

export default router