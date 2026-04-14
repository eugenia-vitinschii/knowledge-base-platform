//user type

import type { Role } from "@/shared/enums/role.enum"

export interface User {
   id: string
   name: string
   email: string
   role: Role
}