//user controller

import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";

class UserController {
   create = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const user = await userService.create(req.body)
         res.status(201).json(user)
      } catch (error) {
         next(error)
      }
   }
}

export const userController = new UserController();