import type { RouteRecordRaw } from "vue-router";

export const adminUsersRoutes: RouteRecordRaw[] = [
   {
      path: "/admin/users",
      children: [
         {
            path: '',
            name: "admin.users",
            component: () => import('../pages/AdminUsersPage.vue')
         }, {
            path: 'edit/:id',
            name: "admin.users.edit",
            component: () => import('../pages/AdminUserEditPage.vue')
         }, {
            path: 'create',
            name: "admin.users.create",
            component: () => import('../pages/AdminUserCreatePage.vue')
         }
      ]
   }
]