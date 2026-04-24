

import type { Profile, ProfileUpdatePayload } from "../types/index";
import { Gender, Position } from '../../../shared/enums/user.enum';
import { Visibility } from "@/shared/enums/visibility.enum";

export function mapProfileToForm(user: Profile): ProfileUpdatePayload {
   return {
      name: user.name ?? '',
      email: user.email ?? '',

      position: user.position ?? Position.OTHER,
      phone: user.phone ?? '',

      gender: user.gender ?? Gender.OTHER,
      birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0]
         : '',

      bio: user.bio ?? '',

      visibility: {
         phone: user.visibility.phone ?? Visibility,
         birthDate: user.visibility.birthDate ?? Visibility
      }
   }
}
