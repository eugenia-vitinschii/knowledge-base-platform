//profile type

import type { Gender, Position } from "@/shared/enums/user.enum"

export interface Profile {
   name: string
   email: string
   password: string

   position: Position
   location: Location
   phone: string

   gender: Gender
   bio: string

   birthdate: Date
   hiredDate: Date
}