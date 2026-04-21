//update profile dto (user only)

import { Position, Gender } from '@/common/enums/user.enums.js'

import { z } from "zod"

export const UpdateProfileDto = z.object({
   name: z.string().min(5),
   email: z.string().email(),

   position: z.nativeEnum(Position).default(Position.OTHER),
   phone: z.string().optional(),

   gender: z.nativeEnum(Gender).default(Gender.OTHER),
   bio: z.string().max(500).optional(),

   birthdate: z.date().optional(),
})