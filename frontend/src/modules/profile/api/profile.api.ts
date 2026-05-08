
import { api } from "@/api/http"

import type { Profile, ProfileUpdatePayload } from "../types/index"


export const profileApi = {
   fetchMyProfile() {
      return api.get<Profile>(`/me`)
   },
   fetchProfile(id: string) {
      return api.get<Profile>(`users/${id}`)
   },
   updateProfile(payload: ProfileUpdatePayload) {
      return api.patch<Profile>(`/me`, payload)
   }
}