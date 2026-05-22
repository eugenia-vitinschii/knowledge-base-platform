// user profile 

import { defineStore } from "pinia";
import { ref } from "vue";

import { profileApi } from "../api/profile.api";

/* TYPES */
import type { Profile, ProfileUpdatePayload } from "../types/index";

/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";

export const useProfileStore = defineStore("profile", () => {
   const { request } = useApiRequest()

   /* === STATE === */
   const profile = ref<Profile | null>(null)

   /* === UI FLOW STATE === */
   const isLoading = ref(false)
   const error = ref<string | null>(null)

   /* === PORTFOLIO FEATURE === */
   const DEBUG_API_FAIL = ref(false)

   /* === ACTIONS === */
   /* Fecth my profile */
   async function fetchMyProfile() {
      isLoading.value = true
      error.value = null
      try {
         const data = await request(() =>
            profileApi.fetchMyProfile().then(r => r.data),
            "Failed to fetch my profile"
         )
         if (import.meta.env.DEV && DEBUG_API_FAIL.value) {
            throw new Error('Mock error')
         }
         if (data) {
            profile.value = data
         }
         return data
      } catch (err) {
         error.value = 'Failed to load your profile'
      } finally {
         isLoading.value = false
      }

   }
   /* Fetch user profile (by id) */
   async function fetchProfile(id: string) {
      isLoading.value = true
      error.value = null
      try {
         const data = await request(() =>
            profileApi.fetchProfile(id).then(r => r.data),
            "Failed to fetch profile"
         )
         if (import.meta.env.DEV && DEBUG_API_FAIL.value) {
            throw new Error('Mock error')
         }

         if (data) {
            profile.value = data
         }
         return data
      } catch (err) {
         error.value = "Failed to fetch profile"
      } finally {
         isLoading.value = false
      }
   }
   /* Update my profile */
   async function updateProfile(payload: ProfileUpdatePayload) {
      isLoading.value = true
      try {
         const data = await request(() =>
            profileApi.updateProfile(payload).then(r => r.data),
            "Failed to update profile"
         )

         if (data) {
            profile.value = data
         }
         return data
      } catch (err) {
         return null
      } finally {
         isLoading.value = false
      }
   }

   return {
      //state
      profile,
      isLoading,
      error,
      DEBUG_API_FAIL,
      //actions
      fetchMyProfile,
      updateProfile,
      fetchProfile,

   }
})