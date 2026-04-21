
import { defineStore } from "pinia";
import { profileApi } from "../api/profile.api";
import { ref } from "vue";

/* TYPES */
import type { Profile } from "../types/profile.type";

/* COMPOSABLE */
import { useApiRequest } from "@/shared/composables/useApiRequest";


export const useProfileStore = defineStore("profile", () => {

   const profile = ref<Profile | null>(null)

   const { request } = useApiRequest()

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

   return {
      profile,
      fetchProfile
   }
})