//profile type

import type { Gender, Position } from "@/shared/enums/user.enum"
import { Visibility } from "@/shared/enums/visibility.enum"

export interface Profile {
   id: string
   name: string
   email: string

   position: Position
   location: Location
   phone: string

   gender: Gender
   bio: string

   birthDate?: string | undefined
   hiredDate?: string
   visibility: {
      phone: Visibility
      birthDate: Visibility
   }
}