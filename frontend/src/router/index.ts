import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from "vue-router";

/* PUBLIC ROUTES */
import { publicRoutes } from './public/public.routes';

/* AUTH ROUTES */
import { authRoutes } from './auth/auth.routes';

/* ADMIN ROUTES */
import { adminRoutes } from './admin/admin.routes'

const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  ...authRoutes,
  ...adminRoutes,
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
