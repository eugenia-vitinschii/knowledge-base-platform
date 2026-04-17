//Update user dto (admin only)


import { Position, Location, Gender } from '@/common/enums/user.enums.js'

import { z } from "zod"

export const UpdateUserDto = z.object({
   name: z.string().min(5).optional(),
   email: z.string().email().optional(),

   position: z.nativeEnum(Position).default(Position.OTHER).optional(),
   location: z.nativeEnum(Location).default(Location.REMOTE).optional(),
   phone: z.string().optional().optional(),

   gender: z.nativeEnum(Gender).default(Gender.OTHER).optional(),
   bio: z.string().max(500).optional(),

   hiredDate: z.string().optional(),
})