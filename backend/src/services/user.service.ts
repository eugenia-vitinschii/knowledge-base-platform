//user service

import bcrypt from 'bcrypt'
import { UserModel } from "../models/user.model";
import { CreateUserDto } from "../dtos/create-user.dto";
import { z } from 'zod'
import { ConflictError } from '../common/errors/conflict.error';
import { NotFoundError } from '../common/errors';

const SALT_ROUNDS = 10

type CreateUserInput = z.infer<typeof CreateUserDto>

class UserService {
   async create(data: CreateUserInput) {
      const existingUser = await UserModel.findOne({ email: data.email })

      if (existingUser) {
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

   async findById(id: string) {
      throw new NotFoundError("User not exists")
   }
}

export const userService = new UserService()