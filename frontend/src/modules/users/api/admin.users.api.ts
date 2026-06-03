//admin users management

import type { AdminCreateUserPayload, UpdateUserRolePayload, User, AdminUpdateUserPayload, UserQueryParams } from "../types/index"
import type { PaginatedResponse } from "@/shared/types/pagination.types"

import { api } from "@/shared/api/http"


export const adminUsersApi = {
   /* SEARCH USERS*/
   searchUsers(params: UserQueryParams) {
      return api.get<PaginatedResponse<User>>("/admin/users/search", {
         params
      })
   },
   /* create user */
   create(data: AdminCreateUserPayload) {
      return api.post<User>("/admin/users", data)
   },
   /* get user by id */
   getById(userId: string) {
      return api.get<User>(`/admin/users/${userId}`)
   },
   /* update role */
   updateRole(userId: string, payload: UpdateUserRolePayload) {
      return api.patch<User>(`/admin/users/${userId}/role`, payload)
   },
   /* update user */
   update(userId: string, data: AdminUpdateUserPayload) {
      return api.patch<User>(`/admin/users/${userId}`, data)
   },
   /* delete user */
   delete(userId: string) {
      return api.delete<User>(`/admin/users/${userId}`)
   }
}