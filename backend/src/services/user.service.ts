//user service

import { User } from "../models/user.model";
import { CreateUserDto } from "../dtos/create-user.dto";

class UserService {
   async create(dto: CreateUserDto): Promise<User> {
      throw new Error("Not implemented")
   }

   async findById(id: string): Promise<User | null> {
      throw new Error("Not implemented")
   }
}

export const userService = new UserService()