import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from "vue-router";

/* AUTH ROUTES */
import { authRoutes } from './auth/auth.routes';

/* ADMIN ROUTES */

import { adminUsersRoutes } from '@/modules/users/routes/admin.users.routes';
import { adminArticlesRoutes } from '@/modules/articles/routes/admin.articles.routes';
import { dashboardRoutes } from '@/modules/dashboard/routes/dashboard.routes';

/* PUBLIC ROUTES */
import { publicArticlesRoutes } from '@/modules/articles/routes/public.articles.routes';

const routes: RouteRecordRaw[] = [
  ...publicArticlesRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...adminUsersRoutes,
  ...adminArticlesRoutes,
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
