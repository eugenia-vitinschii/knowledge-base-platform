
import type { RouteRecordRaw } from "vue-router";

export const welcomeRoutes: RouteRecordRaw[] = [
   {
      path: '/login',
      name: 'login',
      meta: { layout: 'login' },
      component: () => import('../pages/LoginPage.vue')
   }, {
      path: '/',
      name: 'welcome',
      meta: { layout: 'home' },
      component: () => import('../pages/WelcomePage.vue')
   },
]

