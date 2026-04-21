
import { api } from "@/api/http"

import type { Profile } from "../types/profile.type"

export const profileApi = {
   fetchProfile() {
      return api.get<Profile>(`/me`)
   },
}