
import type { AdminUserFormModel, AdminCreateUserPayload } from "@/modules/users/types/index"

export function mapFormToCreatePayload(form: AdminUserFormModel): AdminCreateUserPayload {
   return {
      name: form.name,
      email: form.email,
      password: form.password,

      position: form.position,
      location: form.location,
      phone: form.phone,
      role: form.role,

      bio: form.bio,
      gender: form.gender,

      hiredDate: form.hiredDate.trim() ? form.hiredDate : undefined

   }
}