//create user payload

import type { Role } from "@/shared/enums/role.enum"

export interface CreateUserPayload {
   name: string
   email: string
   password: string
   role: Role
}