import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from "vue-router";

/* AUTH ROUTES */
import { welcomeRoutes } from '@/modules/welcome/routes/welcome.routes';

/* ADMIN ROUTES */
import { dashboardRoutes } from '@/modules/dashboard/routes/dashboard.routes';

/* PUBLIC ROUTES */
import { publicArticlesRoutes } from '@/modules/articles/routes/public.articles.routes';
import { profileRoutes } from '@/modules/profile/routes/profile.routes';

/* ERROR ROUTES */
import { errorRoutes } from '@/modules/errors/routes/error.routes';

const routes: RouteRecordRaw[] = [
  ...welcomeRoutes,
  ...publicArticlesRoutes,
  ...profileRoutes,
  ...dashboardRoutes,
  ...errorRoutes,
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
