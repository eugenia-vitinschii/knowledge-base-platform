//jwt

import jwt from "jsonwebtoken"
import { Role } from "../enums/role.enum"

const JWT_SECRET = process.env.JWT_SECRET!
export interface JwtUserPayload {
   id: string
   role: Role
}

export const signToken = (payload: object) => {
   return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export const verifyToken = (token: string): JwtUserPayload => {
   return jwt.verify(token, JWT_SECRET) as JwtUserPayload
}
