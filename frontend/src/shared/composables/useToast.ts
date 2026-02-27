//toast

import { useToastStore } from "@/stores/ui/toast.store";

export function useToast() {
   const store = useToastStore()

   return {
      success: (msg: string) => store.show(msg, 'success'),
      error: (msg: string) => store.show(msg, 'error'),
      info: (msg: string) => store.show(msg, 'info'),
      warning: (msg: string) => store.show(msg, 'warning'),
   }

}