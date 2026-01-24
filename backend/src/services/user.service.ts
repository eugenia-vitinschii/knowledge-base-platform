//user service

import bcrypt from 'bcrypt'
import { UserModel } from "../models/user.model";
import { CreateUserDto } from "../dtos/create-user.dto";

const SALT_ROUNDS = 10

class UserService {
   async create(dto: CreateUserDto) {
      const existingUser = await UserModel.findOne({ email: dto.email })

      if (existingUser) {
         throw new Error("User with this email already exists!")
      }

      const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS)

      const user = await UserModel.create({
         name: dto.name,
         email: dto.email,
         password: hashedPassword,
         role: dto.role
      })

      return {
         id: user._id,
         name: user.name,
         email: user.email,
         role: user.role,
      }
   }

   async findById(id: string) {
      throw new Error("Not implemented")
   }
}

export const userService = new UserService()