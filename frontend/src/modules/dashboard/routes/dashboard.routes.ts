//dashboard routes
import type { RouteRecordRaw } from "vue-router";

import { adminArticlesRoutes } from "@/modules/articles/routes/admin.articles.routes.ts";
import { adminUsersRoutes } from "@/modules/users/routes/admin.users.routes.ts";


export const dashboardRoutes: RouteRecordRaw[] = [
   {
      path: '/admin',
      meta: { title: "Dashboard" },
      children: [
         {
            path: '',
            name: "dashboard-stats",
            component: () => import('../pages/AdminDashboardPage.vue')
         },
         ...adminArticlesRoutes,
         ...adminUsersRoutes,
      ],
   }
]