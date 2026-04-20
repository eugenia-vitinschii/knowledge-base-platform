// public routes: home, article

import type { RouteRecordRaw } from "vue-router";

export const publicArticlesRoutes: RouteRecordRaw[] = [
   {
      path: "/articles",
      children: [
         {
            path: "",
            name: "articles",
            component: () => import('../pages/HomePage.vue')
         }, {
            path: ":slug",
            name: "article",
            props: true,
            component: () => import('../pages/ArticlePage.vue')
         }
      ]

   }

]