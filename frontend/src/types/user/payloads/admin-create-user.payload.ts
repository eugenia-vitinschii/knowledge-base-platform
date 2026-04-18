//create user payload
import type { Gender, Position, Location } from "@/shared/enums/user.enum"

export interface AdminCreateUserPayload {
   name: string
   email: string

   position: Position
   location: Location
   phone: string

   gender: Gender
   bio: string

   hiredDate: string
}