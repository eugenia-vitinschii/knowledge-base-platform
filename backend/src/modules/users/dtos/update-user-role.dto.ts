//update user role (admin only)

import { Role } from '@/common/enums/role.enum.js'
import { z } from "zod"

export const UpdateUserRoleDto = z.object({
   role: z.nativeEnum(Role)
})