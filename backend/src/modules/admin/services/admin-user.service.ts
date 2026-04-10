//manage users (ADMIN ROLE)

import bcrypt from 'bcrypt'
import { z } from 'zod'

import { Role } from '@/common/enums/role.enum.js'

import { UserModel } from "@/models/user.model.js";

import { CreateUserDto } from "../dtos/create-user.dto.js";

import { ConflictError } from '@/common/errors/conflict.error.js';
import { NotFoundError } from '@/common/errors/not-found.error.js';

const SALT_ROUNDS = 10

type CreateUserInput = z.infer<typeof CreateUserDto>

class AdminUserService{
   /* CREATE USER */
   async createUser(data: CreateUserInput){

      const existingUser = await UserModel.findOne({ email: data.email})

      if(existingUser) {
         throw new ConflictError("User with this email already exists!")
      }

      const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)

      const user = await UserModel.create({
         name: data.name,
         email: data.email,
         password: hashedPassword,
         role: data.role
      })

      return {
         id: user._id,
         name: user.name,
         email: user.email,
         role: user.role,
      }

   }

   /* GET ALL USERS */
   async getAllUsers(){
      return UserModel.find().select("-password")
   }
   /* UPDATE USER ROLE */
   async updateUserRole(userId: string, role: Role){
      const user = await UserModel.findByIdAndUpdate(
         userId,
         {role},
         {new: true}
      )

      if(!user){
         throw new NotFoundError("User nor found")
      }
      return user

   }
   /* DELETE USER  */
   async deleteUser(userId: string){
      return UserModel.findByIdAndDelete(userId)
   }
}


export const adminUserService = new AdminUserService()
