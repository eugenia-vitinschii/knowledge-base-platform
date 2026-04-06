//filter author

import { Role } from "../enums/role.enum.js"
import { AuthUser } from "../../types/auth-user.types.js"

import { Types } from "mongoose"

export function buildAuthorFilter(user: AuthUser) {
   if (user.role === Role.ADMIN) {
      return {}
   }

   return { author: new Types.ObjectId(user.id) }
}
