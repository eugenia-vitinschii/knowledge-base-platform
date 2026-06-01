//error routes

import type { RouteRecordRaw } from "vue-router";

export const errorRoutes: RouteRecordRaw[] = [
   {
      path: '/401',
      name: 'Unauthorized',
      meta: { layout: 'error' },
      component: () => import('../pages/UnauthorizedPage.vue')
   },
   {
      path: '/403',
      name: 'Forbidden',
      meta: { layout: 'error' },
      component: () => import('../pages/ForbiddenPage.vue')
   },
   {
      path: '/500',
      name: 'ServerError',
      meta: { layout: 'error' },
      component: () => import('../pages/ServerErrorPage.vue')
   },
   {
      path: '/404',
      name: 'NotFound',
      meta: { layout: 'error' },
      component: () => import('../pages/NotFoundPage.vue')
   },
   {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
   }
]