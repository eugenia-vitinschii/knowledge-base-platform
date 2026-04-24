
import { defineStore } from "pinia";
import { profileApi } from "../api/profile.api";
import { ref } from "vue";

/* TYPES */
import type { Profile, ProfileUpdatePayload } from "../types/index";

/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";



export const useProfileStore = defineStore("profile", () => {

   const profile = ref<Profile | null>(null)

   const { request } = useApiRequest()

   /* FETCH MY PROfILE */
   async function fetchProfile() {
      const data = await request(() =>
         profileApi.fetchProfile().then(r => r.data),
         "Failed to fetch profile"
      )

      if (data) {
         profile.value = data
      }
      return data
   }
   /* UPDATE MY PROFILE */
   async function updateProfile(payload: ProfileUpdatePayload) {
      const data = await request(() =>
         profileApi.updateProfile(payload).then(r => r.data),
         "Failed to fetch profile"
      )

      if (data) {
         profile.value = data
      }
      return data
   }

   return {
      profile,
      fetchProfile,
      updateProfile,
   }
})