//manage users (ADMIN ROLE)

import bcrypt from 'bcrypt'
import { z } from 'zod'

import { Role } from '@/common/enums/role.enum.js'

import { UserModel } from "@/modules/users/models/user.model.js";
/* DTOs */
import { CreateUserDto } from "../dtos/create-user.dto.js";
import { UpdateUserDto } from "../dtos/update-user.dto.js";

/* Errors */
import { ConflictError } from '@/common/errors/conflict.error.js';
import { NotFoundError } from '@/common/errors/not-found.error.js';
import { UserAdminFilterDTO } from '../dtos/user-admin-filter.dto.js';
import { buildUserQuery } from '@/common/utils/buildUserQuery.js';

const SALT_ROUNDS = 10

type CreateUserInput = z.infer<typeof CreateUserDto>
type UpdateUserInput = Partial<typeof UpdateUserDto>
type UserFilter = z.infer<typeof UserAdminFilterDTO>

class AdminUserService {
   /* CREATE USER */
   async createUser(data: CreateUserInput) {

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

   /* SEARCH & FILTER USERS */
   async searchUsers(filters: UserFilter, pagination: { page: number; limit: number }) {
      const query = buildUserQuery(filters)

      const { page, limit } = pagination
      const skip = (page - 1) * limit

      const [users, total] = await Promise.all([
         UserModel.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }),

         UserModel.countDocuments(query)
      ])
      return {
         data: users,
         meta: {
            total,
            page,
            pages: Math.ceil(total / limit)
         }
      }

   }

   /* GET USER BY ID */
   async getUserById(userId: string) {
      const user = await UserModel.findById(userId).select("-password")

      if (!user) {
         throw new NotFoundError("User nor found")
      }
      return user
   }

   /* UPDATE USER ROLE */
   async updateUserRole(userId: string, role: Role) {
      const user = await UserModel.findByIdAndUpdate(
         userId,
         { role },
         { new: true }
      )

      if (!user) {
         throw new NotFoundError("User nor found")
      }
      return user

   }

   /*UPDATE USER */
   async updateUser(userId: string, data: UpdateUserInput) {
      const user = await UserModel.findByIdAndUpdate(
         userId,
         data,
         { new: true }
      ).select("-password")

      if (!user) {
         throw new NotFoundError("User nor found")
      }
      return user
   }

   /* DELETE USER  */
   async deleteUser(userId: string) {
      return UserModel.findByIdAndDelete(userId)
   }
}


export const adminUserService = new AdminUserService()
