//user type

import { Role } from '../common/enums/role.enum.js'

declare global {
   namespace Express {
      interface Request {
         user?: {
            id: string
            role: Role
         }
      }
   }
}

export { }