//admin users filter

import { Role } from "@/common/enums/role.enum.js"
import { Position, Location } from "@/common/enums/user.enums.js"
import { z } from "zod"

export const UserAdminFilterDTO = z.object({
   search: z.string().optional(),
   role: z.nativeEnum(Role).optional(),
   position: z.nativeEnum(Position).optional(),
   location: z.nativeEnum(Location).optional(),
})