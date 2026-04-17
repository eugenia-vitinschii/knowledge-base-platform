//user type

import type { Role } from "@/shared/enums/role.enum"
import type { Gender, Position, Location } from "@/shared/enums/user.enum"

export interface User {
   id: string
   name: string
   email: string
   password: string

   role: Role
   position: Position
   location: Location
   phone: string

   gender: Gender
   bio: string

   hiredDate: string
}