//manage users

import { defineStore } from "pinia";
import { ref } from "vue";

import { usersApi } from "@/modules/users/api/users.api";

/* TYPES */
import type { AdminUpdateUserPayload, AdminCreateUserPayload, UpdateUserRolePayload, User, UserQueryParams, AdminUserFilters } from "@/modules/users/types";
import type { PagintionMeta } from "@/shared/types/index"

/* COMPOSABLE & LIBS */
import { useApiRequest } from "@/shared/composables/useApiRequest";
import { delay } from "@/shared/lib/delay"

export const useAdminUsersStore = defineStore("adminUsers", () => {
   const { request } = useApiRequest()
   /* === STATE === */
   const selectedUser = ref<User | null>(null);
   const list = ref<User[]>([])
   const meta = ref<PagintionMeta | null>(null)
   const filters = ref<AdminUserFilters>({
      search: '',
      role: '',
      position: '',
      location: '',
   })
   /* === UI FLOW STATE === */
   const isLoading = ref(false)
   const error = ref<string | null>(null)

   /* === PORTFOLIO FEATURE === */
   const DEBUG_API_FAIL = ref(false)

   /* === ACTIONS === */
   /*  Search users  */
   async function searchUsers(payload?: UserQueryParams) {
      isLoading.value = true
      error.value = null
      try {
         if (import.meta.env.DEV) {
            await delay(800)
         }
         if (import.meta.env.DEV && DEBUG_API_FAIL.value) {
            throw new Error('Mock error')
         }
         const params: UserQueryParams = payload ?? {
            ...filters.value,
            page: meta.value?.page ?? 1,
            limit: 10
         }
         const data = await request(() =>
            usersApi.admin.searchUsers(params).then(r => r.data),
            "Failed to load filtered  users"
         )

         if (data) {
            list.value = data.data
            meta.value = data.meta
         }

         return data
      } catch (err) {
         error.value = "Failed to fetch users"
      } finally {
         isLoading.value = false
      }

   }
   /* Fetch user by id*/
   async function fetchUserById(id: string) {
      isLoading.value = true
      error.value = null

      try {
         const data = await request(() =>
            usersApi.admin.getById(id).then(r => r.data),
            "Failed to load user"
         )

         if (data) {
            selectedUser.value = data
         }

         return data
      } catch (err) {
         error.value = "Failed to fetch user"
      } finally {
         isLoading.value = false
      }

   }
   /* Create user */
   async function create(payload: AdminCreateUserPayload) {
      isLoading.value = true
      try {
         const data = await request(() =>
            usersApi.admin.create(payload).then(r => r.data),
            "Failed to create new user"
         )
         if (data) {
            await searchUsers()
         }
         return data
      } catch (err) {
         return null
      } finally {
         isLoading.value = false
      }

   }
   /* === Update role  === */
   async function updateRole(id: string, payload: UpdateUserRolePayload) {
      isLoading.value = true
      try {
         const data = await request(() =>
            usersApi.admin.updateRole(id, payload).then(r => r.data),
            "Failed to update user role"
         )

         if (data) {
            selectedUser.value = data
         }
         return data
      } catch (err) {
         return null
      } finally {
         isLoading.value = false
      }
   }
   /* === Update user === */
   async function update(id: string, payload: AdminUpdateUserPayload) {
      isLoading.value = true
      try {
         const data = await request(() =>
            usersApi.admin.update(id, payload).then(r => r.data),
            "Failed to update user"
         )

         if (data) {
            selectedUser.value = data
         }
         return data
      } catch (err) {
         return null
      } finally {
         isLoading.value = false
      }

   }
   /* === Delete user=== */
   async function remove(id: string) {
      isLoading.value = true
      try {
         const data = await request(() =>
            usersApi.admin.delete(id),
            "Failed to delete user"
         )

         if (!data) return false
         list.value = list.value.filter((a) => a.id !== id)

         return true
      } catch (err) {
         return false
      } finally {
         isLoading.value = false
      }
   }
   return {
      //state
      selectedUser,
      list,
      filters,
      meta,
      isLoading,
      error,
      DEBUG_API_FAIL,
      //Actions 
      create,
      updateRole,
      remove,
      searchUsers,
      update,
      fetchUserById,
   }
})