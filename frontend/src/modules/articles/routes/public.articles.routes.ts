/* PUBLIC ARTICLES ROUTES */

import type { RouteRecordRaw } from "vue-router";

export const publicArticlesRoutes: RouteRecordRaw[] = [
   {
      path: "/articles",
      meta: { title: "Articles" },
      children: [
         {
            path: "",
            name: "articles",
            component: () => import('../pages/HomePage.vue')
         }, {
            path: "users/:id",
            meta: { title: "Author" },
            children: [
               {
                  path: '',
                  name: 'public-profile',
                  component: () => import('@/modules/profile/pages/ProfilePage.vue'),
                  props: true
               }, {
                  path: 'list',
                  meta: { title: "Author articles" },
                  children: [
                     {
                        path: '',
                        name: 'author-articles',
                        component: () => import('../pages/AuthorArticlesPage.vue'),
                        props: true,
                     }, {
                        path: ':slug',
                        name: 'article-from-author',
                        props: true,
                        component: () => import('../pages/ArticlePage.vue'),
                        meta: { title: (route: any) => formatSlug(route.params.slug) }
                     }
                  ]

               }
            ]
         }
      ]
   }
]
function formatSlug(slug: any) {
   return String(slug).split('-')
      .map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1)).join(' ')
}

