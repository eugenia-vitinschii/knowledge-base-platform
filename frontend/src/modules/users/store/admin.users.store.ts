//manage users

import { defineStore } from "pinia";
import { ref } from "vue";

import { usersApi } from "@/modules/users/api/users.api";

/*TYPES */
import type { AdminUpdateUserPayload, AdminCreateUserPayload, UpdateUserRolePayload, User } from "@/modules/users/types";

/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";

export const useAdminUsersStore = defineStore("adminUsers", () => {

   const selectedUser = ref<User | null>(null);
   const list = ref<User[]>([])

   const { request } = useApiRequest()

   /* === FETCH USERS === */
   async function fetchUsers() {

      const data = await request(() =>
         usersApi.admin.getAll().then(r => r.data),
         "Failed to load users"
      )

      if (data) {
         list.value = data
      }

      return data
   }
   /* === Fetch user by id === */
   async function fetchUserById(id: string) {
      const data = await request(() =>
         usersApi.admin.getById(id).then(r => r.data),
         "Failed to load user"
      )

      if (data) {
         selectedUser.value = data
      }

      return data
   }
   /* === CREATE USER === */
   async function create(payload: AdminCreateUserPayload) {

      const data = await request(() =>
         usersApi.admin.create(payload).then(r => r.data),
         "Failed to create new user"
      )

      if (data) {
         await fetchUsers()
      }
      return data
   }
   /* === UPDATE ROLE === */
   async function updateRole(id: string, payload: UpdateUserRolePayload) {

      const data = await request(() =>
         usersApi.admin.updateRole(id, payload).then(r => r.data),
         "Failed to update user role"
      )

      if (data) {
         selectedUser.value = data
      }
      return data
   }
   /* === UPDATE USER  === */
   async function update(id: string, payload: AdminUpdateUserPayload) {
      const data = await request(() =>
         usersApi.admin.update(id, payload).then(r => r.data),
         "Failed to update user"
      )

      if (data) {
         selectedUser.value = data
      }
      return data
   }
   /* === DETELE USER === */
   async function remove(id: string) {
      const data = await request(() =>
         usersApi.admin.delete(id),
         "Failed to delete user"
      )

      if (!data) return false
      list.value = list.value.filter((a) => a.id !== id)

      return true
   }
   return {
      selectedUser,
      list,
      create,
      updateRole,
      remove,
      fetchUsers,
      update,
      fetchUserById
   }
})