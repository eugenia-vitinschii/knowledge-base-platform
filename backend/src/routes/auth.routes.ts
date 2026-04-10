//auth routes

import { Router } from "express";
import { authController } from "../modules/auth/controllers/auth.controller.js";

const router = Router()

router.post('/login', authController.login)

export default router