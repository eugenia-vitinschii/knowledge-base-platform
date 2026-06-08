

import type { RouteRecordRaw } from "vue-router";

export const adminArticlesRoutes: RouteRecordRaw[] = [
   {
      path: "articles",
      meta: { title: "Articles" },
      children: [
         {
            path: '',
            name: 'admin-articles',
            component: () => import('../pages/AdminArticlesPage.vue')
         },
         {
            path: 'create',
            name: "admin-articles-create",
            component: () => import('../pages/AdminArticleCreatePage.vue'),
            meta: { title: "Create" },
         },
         {
            path: ':id/edit',
            name: "admin-articles-edit",
            component: () => import('../pages/AdminArticleEditPage.vue'),
            meta: { title: "Edit" },
         },
         {
            path: ':id/preview',
            name: "admin-articles-preview",
            component: () => import('../pages/AdminArticlePreviewPage.vue'),
            meta: { title: "Preview" },
         }
      ]
   }
]