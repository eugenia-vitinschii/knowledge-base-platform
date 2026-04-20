

import type { RouteRecordRaw } from "vue-router";

export const adminArticlesRoutes: RouteRecordRaw[] = [
   {
      path: "/admin/articles",
      children: [
         {
            path: '',
            name: 'admin.articles',
            component: () => import('../pages/AdminArticlesPage.vue')
         },
         {
            path: 'create',
            name: "admin.articles.create",
            component: () => import('../pages/AdminArticleCreatePage.vue')
         },
         {
            path: ':id/edit',
            name: "admin.articles.edit",
            component: () => import('../pages/AdminArticleEditPage.vue')
         },
         {
            path: ':id/preview',
            name: "admin.articles.preview",
            component: () => import('../pages/AdminArticlePreviewPage.vue')
         }
      ]
   }
]