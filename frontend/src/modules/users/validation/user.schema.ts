//user schema (create/update)

import { z } from "zod"

/* ENUMS */
import { Position, Gender, Location } from "@/shared/enums/user.enum"
import { Role } from "@/shared/enums/role.enum"

/* FIELDS */
import { nameField, emailField, phoneField, bioField, passwordField } from "@/shared/validation/users.fields"

export const userSchema = z.object({
   name: nameField,
   email: emailField,

   position: z.nativeEnum(Position),
   location: z.nativeEnum(Location),
   phone: phoneField,

   gender: z.nativeEnum(Gender),
   bio: bioField,

   hiredDate: z.string().max(10).optional(),

})

export const createUserSchema = userSchema.extend({
   password: passwordField,
})

export const updateUserSchema = userSchema.extend({
   role: z.nativeEnum(Role),
})


