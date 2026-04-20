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
         {
            path: 'articles/:id/preview',
            name: "admin.articles.preview",
            component: () => import('@/pages/admin/AdminArticlePreviewPage.vue')
         }, {
            path: 'articles/stats',
            name: "admin.articles.stats",
            component: () => import('@/pages/admin/AdminDashboardPage.vue')
         }, {
            path: 'users',
            name: "admin.users",
            component: () => import('@/pages/admin/AdminUsersPage.vue')
         }, {
            path: 'users/edit/:id',
            name: "admin.users.edit",
            component: () => import('@/pages/admin/AdminUserEditPage.vue')
         }, {
            path: 'users/create',
            name: "admin.users.create",
            component: () => import('@/pages/admin/AdminUserCreatePage.vue')
         }
      ]
   }
]