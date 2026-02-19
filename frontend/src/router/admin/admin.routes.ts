//auth routes

import type { RouteRecordRaw } from "vue-router";

export const adminRoutes: RouteRecordRaw[] = [
   {
      path: "/admin",
      children: [
         {
            path: '',
            name: "admin.dashboard",
            component: () => import('@/pages/admin/AdminDashboardPage.vue')
         },
         {
            path: 'articles',
            name: 'admin.articles',
            component: () => import('@/pages/admin/AdminArticlesPage.vue')
         },
         {
            path: 'articles/create',
            name: "admin.articles.create",
            component: () => import('@/pages/admin/AdminArticleCreatePage.vue')
         },
         {
            path: 'articles/:id/edit',
            name: "admin.articles.edit",
            component: () => import('@/pages/admin/AdminArticleEditPage.vue')
         },
      ]
   }
]