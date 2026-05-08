
import type { RouteRecordRaw } from "vue-router";

export const profileRoutes: RouteRecordRaw[] = [
   {
      path: "/profile",
      name: "my-profile",
      component: () => import('../pages/ProfilePage.vue')
   }, {
      path: "/users/:id",
      name: "public.profile",
      component: () => import('../pages/ProfilePage.vue'),
      props: true
   },
   {
      path: "/profile/edit",
      name: "profile.edit",
      component: () => import('../pages/EditProfilePage.vue')
   }
]