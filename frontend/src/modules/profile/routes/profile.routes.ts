
import type { RouteRecordRaw } from "vue-router";

export const profileRoutes: RouteRecordRaw[] = [
   {
      path: "/profile",
      children: [
         {
            path: "",
            name: "profile",
            component: () => import('../pages/ProfilePage.vue')
         }
      ]
   }
]