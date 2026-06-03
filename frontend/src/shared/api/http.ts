//axios interceptor

import axios from "axios";
import router from "@/router/index"

export const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
});


/* request interceptor */
api.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");

   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }

   return config;
})

/* response interceptor */
api.interceptors.response.use((response) => response, (error) => {
   const status = error?.response?.status
   const currentPatch = router.currentRoute.value.path

   if (status === 401 && currentPatch !== '/401') {
      localStorage.removeItem("token")
      router.push('/401')
   }
   if (status === 403 && currentPatch !== '/403') {
      router.push('/403')
   }
   if (status >= 500 && currentPatch !== '/500') {
      router.push('/500')
   }
   return Promise.reject(error)

})