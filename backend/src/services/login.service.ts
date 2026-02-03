//login service

import bcrypt from 'bcrypt'
import { UserModel } from "../models/user.model"
import { signToken } from "../common/utils/jwt"
import { UnauthorizedError } from '../common/errors'

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

      return { token }
   }
}

export const authService = new AuthService()
