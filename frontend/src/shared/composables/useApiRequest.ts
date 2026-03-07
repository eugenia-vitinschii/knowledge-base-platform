//api request

import { ref } from "vue";

export function useApiRequest() {
   const isLoading = ref(false)
   const error = ref<string | null>(null)

   async function request<T>(fn: () => Promise<T>, fallbackMessage?: string): Promise<T | null> {
      try {
         isLoading.value = true
         error.value = null

         return await fn()
      } catch (e: any) {
         error.value = e?.response?.data?.message || fallbackMessage || "Unexpected error"

         return null
      } finally {
         isLoading.value = false
      }
   }
   return { error, request, isLoading }
}