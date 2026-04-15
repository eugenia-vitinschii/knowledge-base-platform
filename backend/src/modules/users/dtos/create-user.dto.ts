//create user dto (admin only)

import { Role } from '@/common/enums/role.enum.js'
import { Position, Location, Gender } from '@/common/enums/user.enums.js'

import { z } from "zod"

export const CreateUserDto = z.object({
   name: z.string().min(5),
   email: z.string().email(),
   password: z.string().min(4),
   role: z.nativeEnum(Role).default(Role.VIEWER),

   position: z.nativeEnum(Position).default(Position.OTHER),
   location: z.nativeEnum(Location).default(Location.REMOTE),
   phone: z.string().optional(),

   gender: z.nativeEnum(Gender).default(Gender.OTHER),
   bio: z.string().max(500).optional(),

   birthdate: z.date().optional(),
   hiredDate: z.date().optional(),
})