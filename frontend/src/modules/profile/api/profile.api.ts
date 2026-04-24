
import { api } from "@/api/http"

import type { Profile, ProfileUpdatePayload } from "../types/index"


export const profileApi = {
   fetchProfile() {
      return api.get<Profile>(`/me`)
   },
   updateProfile(payload: ProfileUpdatePayload) {
      return api.patch<Profile>(`/me`, payload)
   }
}