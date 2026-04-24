import type { ProfileUpdateForm, ProfileUpdatePayload } from "../types";


export function mapProfileToUpdatePayload(form: ProfileUpdateForm): ProfileUpdatePayload {
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