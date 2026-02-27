//toast store

import { defineStore } from "pinia"
import { ref } from "vue"

export type ToastType = 'success' | "error" | "info" | "warning"

export interface Toast {
   id: number
   message: string
   type: ToastType
   duration: number
   createdAt: number
}

export const useToastStore = defineStore('toast', () => {
   const toasts = ref<Toast[]>([])

   function show(message: string, type: ToastType = 'info', duration = 4000) {
      const id = Date.now()

      toasts.value.push({
         id,
         message,
         type,
         duration,
         createdAt: Date.now()
      })
   }

   function remove(id: number) {
      toasts.value = toasts.value.filter(t => t.id !== id)
   }

   return { toasts, show, remove }
})