//profile co§ntroller

import { NextFunction, Request, Response } from "express"

import { userService } from "../services/user.service.js"

class UserController {
   /* GET ME */
   getMe = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const id = req.user!.id as string

         const user = await userService.getMe(id)
         res.json(user)
      } catch (error) {
         next(error)
      }
   }
}

export const userController = new UserController()