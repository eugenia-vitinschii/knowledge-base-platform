//Profile service
import z from "zod";

import { UserModel } from "../models/user.model.js"

import { NotFoundError } from '@/common/errors/not-found.error.js';

import { UpdateProfileDto } from "../dtos/update-profile.dto.js";


type UpdateProfileInput = z.infer<typeof UpdateProfileDto>
class UserService {
   /* GET USER */
   async getMe(userId: string) {
      const user = await UserModel.findById(userId).select("-password")

      if (!user) {
         throw new NotFoundError("User not found")
      }
      return user
   }
   /* UPDATE USER */
   async updateProfile(userId: string, data: UpdateProfileInput) {
      const user = await UserModel.findByIdAndUpdate(
         userId,
         data,
         { new: true }
      ).select("-password")

      if (!user) {
         throw new NotFoundError("User not found")
      }
      return user
   }
}

export const userService = new UserService()