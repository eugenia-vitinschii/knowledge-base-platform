
import type { Gender, Position } from "@/shared/enums/user.enum"

export interface ProfileDetails {
   name: string
   email: string

   position: Position
   location: Location
   phone: string

   gender: Gender
   bio: string

   birthdate: Date
   hiredDate: Date
}