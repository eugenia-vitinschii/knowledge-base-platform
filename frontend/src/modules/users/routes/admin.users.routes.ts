import type { RouteRecordRaw } from "vue-router";

export const adminUsersRoutes: RouteRecordRaw[] = [
   {
      path: "users",
      meta: { title: "Users" },
      children: [
         {
            path: '',
            name: "admin-users",
            component: () => import('../pages/AdminUsersPage.vue'),
         }, {
            path: ':id/edit',
            name: "admin-users-edit",
            component: () => import('../pages/AdminUserEditPage.vue'),
            meta: { title: "Edit" },
         }, {
            path: 'create',
            name: "admin-users-create",
            component: () => import('../pages/AdminUserCreatePage.vue'),
            meta: { title: "Create" },
         }
      ]
   }
]