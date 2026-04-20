//dashboard routes

import type { RouteRecordRaw } from "vue-router";

export const dashboardRoutes: RouteRecordRaw[] = [
   {
      path: '/admin/stats',
      name: "dashboard.stats",
      component: () => import('../pages/AdminDashboardPage.vue')
   }
]