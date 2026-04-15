//user type

import type { Role } from "@/shared/enums/role.enum"

export interface UserTableRow {
   id: string
   name: string
   role: Role
}