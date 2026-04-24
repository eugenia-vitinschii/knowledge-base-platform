

import type { Gender, Position } from "@/shared/enums/user.enum"
import type { Visibility } from "@/shared/enums/visibility.enum"

export interface ProfileUpdatePayload {
   name?: string
   email?: string

   position?: Position
   phone?: string

   gender?: Gender
   bio?: string

   birthDate?: string
   visibility?: {
      phone: Visibility
      birthDate: Visibility
   }
}
