
import type { AdminUpdateUserPayload } from "@/modules/users/types/payloads/admin-update-user.payload"
import type { AdminUserFormModel } from "@/modules/users/types/admin-user-form.types"

export function mapFormToUpdatePayload(form: AdminUserFormModel): AdminUpdateUserPayload {
   return {
      name: form.name,
      email: form.email,

      position: form.position,
      location: form.location,
      phone: form.phone,

      bio: form.bio,
      gender: form.gender,

      hiredDate: form.hiredDate || undefined,

   }
}