/* MY PROFILE  */

import type { RouteRecordRaw } from "vue-router";

export const profileRoutes: RouteRecordRaw[] = [
   {
      path: "/profile",
      meta: { title: "My Profile" },
      children: [
         {
            path: '',
            name: "my-profile",
            component: () => import('../pages/ProfilePage.vue')
         },
         {
            path: "edit",
            name: "profile-edit",
            meta: { title: "Edit Profile" },
            component: () => import('../pages/EditProfilePage.vue')
         }
      ]
   }
]
