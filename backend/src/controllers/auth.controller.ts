//auth controller 

import { Request, Response } from "express";
import { authService } from "../services/login.service";

class AuthController {
   login = async (req: Request, res: Response) => {
      try {
         const { email, password } = req.body

         const data = await authService.login(email, password)
         res.json(data)
      } catch (error) {
         res.status(401).json({ message: "Invalid credentials" })
      }
   }
}

export const authController = new AuthController()