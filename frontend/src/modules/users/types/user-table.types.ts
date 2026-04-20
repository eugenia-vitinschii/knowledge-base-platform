//user type

import type { Role } from "@/shared/enums/role.enum"
import type { Position, Location } from "@/shared/enums/user.enum"

export interface UserTableRow {
   id: string
   name: string
   role: Role
   position: Position,
   location: Location
}