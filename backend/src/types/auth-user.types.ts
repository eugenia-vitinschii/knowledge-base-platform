//auth-user type

import { Role } from "../common/enums/role.enum";

export interface AuthUser {
   id: string,
   role: Role,
   name?: string
}