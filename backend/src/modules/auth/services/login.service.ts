//login service

import bcrypt from 'bcrypt'
import { UserModel } from "@/modules/users/models/user.model.js"
import { signToken } from "@/common/utils/jwt.js"
import { UnauthorizedError } from '@/common/errors/index.js'

class AuthService {
   async login(email: string, password: string) {
      const user = await UserModel.findOne({ email })
      if (!user) {
         throw new UnauthorizedError("Invalid credentials")
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
         throw new UnauthorizedError("Invalid credentials")
      }

      const token = signToken({
         id: user._id,
         role: user.role,
      })

      return {
         token,
         user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role

         }
      }
   }
}

export const authService = new AuthService()
