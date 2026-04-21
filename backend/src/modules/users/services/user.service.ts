//Profile service


import { UserModel } from "../models/user.model.js"

import { NotFoundError } from '@/common/errors/not-found.error.js';


class UserService {
   /* GET USER */
   async getMe(userId: string) {
      const user = await UserModel.findById(userId).select("-password")

      if (!user) {
         throw new NotFoundError("User not found")
      }
      return user
   }
}

export const userService = new UserService()