
import type { AdminUpdateUserPayload } from "@/types/user/payloads/admin-update-user.payload"
import type { AdminUserFormModel } from "@/types/user/types/admin-user-form.types"

export function mapFormToUpdatePayload(form: AdminUserFormModel): AdminUpdateUserPayload {
   return {
      name: form.name,
      email: form.email,

      position: form.position,
      location: form.location,
      phone: form.phone,

      bio: form.bio,
      gender: form.gender,

      hiredDate: form.hiredDate

   }
}