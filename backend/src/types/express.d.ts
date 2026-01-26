//user type

import { Role } from '../common/enums/role.enum'

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