//user controller

import { Request, Response } from "express";
import { userService } from "../services/user.service";

class UserController {
   create = async (req: Request, res: Response) => {
      try {
         const user = await userService.create(req.body)
         res.status(201).json(user)
      } catch (error) {
         res.status(500).json({ message: "Internal server error" })
      }
   }
}

export const userController = new UserController();