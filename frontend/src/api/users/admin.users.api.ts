//admin users management

import type { CreateUserPayload, UpdateUserRolePayload, User } from "@/types/user"

import { api } from "../http"

export const adminUsersApi = {
   /* get all users */
   getAll(){
      return api.get<User[]>("/admin/users")
   },
   /* create user */
   create(data: CreateUserPayload){
      return api.post<User>("/admin/users", data)
   },
   /* update role */
   updateRole(userId: string,payload: UpdateUserRolePayload){
      return api.patch<User>(`/admin/users/${userId}/role`, payload)
   },
   /* delete user */
   delete(userId: string){
      return api.delete<User>(`/admin/users/${userId}`)
   }
}