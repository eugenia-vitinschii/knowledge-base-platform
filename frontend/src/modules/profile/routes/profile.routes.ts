
import type { RouteRecordRaw } from "vue-router";

export const profileRoutes: RouteRecordRaw[] = [
   {
      path: "/profile",
      name: "profile",
      component: () => import('../pages/ProfilePage.vue')
   },
   {
      path: "/profile/edit",
      name: "profile.edit",
      component: () => import('../pages/EditProfilePage.vue')
   }

]