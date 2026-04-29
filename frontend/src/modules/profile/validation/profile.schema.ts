// profile (update schema, public)

import { z } from "zod"

/* ENUMS */
import { Position, Gender } from "@/shared/enums/user.enum"
import { Visibility } from "@/shared/enums/visibility.enum"

/* FIELDS */
import { nameField, emailField, phoneField, bioField } from "@/shared/validation/users.fields"


export const profileSchema = z.object({
   name: nameField,
   email: emailField,

   position: z.nativeEnum(Position),
   phone: phoneField,

   gender: z.nativeEnum(Gender),
   bio: bioField,

   birthDate: z.string().max(10).optional(),

   visibility: z.object({
      phone: z.nativeEnum(Visibility),
      birthDate: z.nativeEnum(Visibility)
   })
})


export type ProfileFormData = z.infer<typeof profileSchema>