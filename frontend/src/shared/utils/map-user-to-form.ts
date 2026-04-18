

/* Types & ENUKS*/
import type { AdminUserFormModel } from '@/types/user/index';

import type { User } from "@/types/user/index"

import { Role } from '../enums/role.enum';

import { Gender, Location, Position } from '../enums/user.enum';


export function mapUserToForm(user: User): AdminUserFormModel {
   return {

      name: user.name ?? '',
      email: user.email ?? '',
      role: user.role ?? Role.VIEWER,

      position: user.position ?? Position.OTHER,
      location: user.location ?? Location.REMOTE,
      phone: user.phone ?? '',

      gender: user.gender ?? Gender.OTHER,
      hiredDate: user.hiredDate
         ? new Date(user.hiredDate).toISOString().split('T')[0]
         : '',

      bio: user.bio ?? '',
   }

}