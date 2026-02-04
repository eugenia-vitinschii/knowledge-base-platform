// public routes: home, article

import type { RouteRecordRaw } from "vue-router";

export const publicRoutes: RouteRecordRaw[] = [
   {
      path: "/",
      name: "home",
      component: () => import('@/pages/public/HomePage.vue')
   },
   {
      path: "/article/:slug",
      name: "article",
      props: true,
      component: () => import('@/pages/public/ArticlePage.vue')
   }
]