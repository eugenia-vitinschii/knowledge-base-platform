//profile routes
import { Router } from "express";

/* controllers */
import { userController } from "../controllers/user.controller.js";

const router = Router()

/*GET ME */
router.get("/me", userController.getMe)

export default router