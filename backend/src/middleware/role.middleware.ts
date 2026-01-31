//role middleware

import { Request, Response, NextFunction } from 'express'
import { Role } from '../common/enums/role.enum'

export const requiredRole = (...roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {

   if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" })
   }

   if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denided!" })
   }
   next()
}
