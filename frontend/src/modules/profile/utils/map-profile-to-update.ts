
import type { ProfileUpdatePayload } from "../types";

import type { ProfileFormData } from '../validation/profile.schema';

export function mapProfileToUpdatePayload(form: ProfileFormData): ProfileUpdatePayload {
   return {
      name: form.name,
      email: form.email,

      position: form.position,
      phone: form.phone,

      bio: form.bio,
      gender: form.gender,

      birthDate: form.birthDate || undefined,

      visibility: {
         phone: form.visibility.phone,
         birthDate: form.visibility.birthDate
      }
   }
}