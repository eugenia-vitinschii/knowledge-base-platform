//auth controller 

import { Request, Response, NextFunction } from "express";
import { authService } from "../services/login.service";

class AuthController {
   login = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { email, password } = req.body

         const data = await authService.login(email, password)
         res.json(data)
      } catch (error) {
         next(error)
      }
   }
}

export const authController = new AuthController()