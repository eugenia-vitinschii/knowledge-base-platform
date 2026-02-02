//create user dto

import { Role } from '../common/enums/role.enum'
import { z } from "zod"

export const CreateUserDto = z.object({
   name: z.string().min(5),
   email: z.string().email(),
   password: z.string().min(6),
   role: z.nativeEnum(Role)
})