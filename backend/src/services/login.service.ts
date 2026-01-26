//login service

import bcrypt from 'bcrypt'
import { UserModel } from "../models/user.model"
import { signToken } from "../common/utils/jwt"

class AuthService {
   async login(email: string, password: string) {
      const user = await UserModel.findOne({ email })
      if (!user) {
         throw new Error("Invalid credentials")
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
         throw new Error("Invalid credentials")
      }

      const token = signToken({
         id: user._id,
         role: user.role,
      })

      return { token }
   }
}

export const authService = new AuthService()
