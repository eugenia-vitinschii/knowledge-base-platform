<template>
   <Transition name="fade" mode="out-in">
      <!-- error -->
      <div class="wrapper" v-if="route.meta.layout === 'error' || route.meta.layout === 'login'">
         <div class=" content">
            <router-view />
         </div>
      </div>
      <!-- admin -->
      <admin-layout v-else-if="route.meta.layout === 'admin'" :menu="adminMenuItems" :user="currentUser">
         <router-view />
      </admin-layout>
      <!-- public -->
      <div class="wrapper" v-else>
         <app-header />
         <div class="content">
            <muk-breadcrumbs />
            <router-view />
            <muk-toast-container />
         </div>
         <app-footer />
      </div>
   </Transition>
</template>

<script setup lang="ts">
/*  VUE & ROUTER */
import { computed } from 'vue';
import { useRoute } from 'vue-router';

/* COMPONENTS */
import { MukBreadcrumbs, MukToastContainer } from 'modular-ui-kit-vue'
import { AdminLayout } from 'vue-saas-kit'

/*  PINIA  */
import { useAuthStore } from '@/stores/auth/auth.store';

/*PINIA  variables */
const auth = useAuthStore();

/* check role & fetch data */
const isAdmin = computed(() => auth.user?.role === 'admin')
const isEditor = computed(() => auth.user?.role === 'editor')

const currentUser = {
   name: auth.user?.name || 'User',
   role: isAdmin.value ? 'Admin' : (isEditor.value ? 'Editor' : 'User')
}
const adminMenuItems = computed(() => {
   const items = []

   if (isAdmin.value || isEditor.value) {
      items.push(
         { id: 'admin-home', label: 'Dashboard', to: '/admin' },
         { id: 'article-create', label: 'Create Article', to: '/admin/articles/create' },
         { id: 'articles-list', label: 'Articles list', to: '/admin/articles' }
      )
   }

   if (isAdmin.value) {
      items.push(
         { id: 'users-list', label: 'Users list', to: '/admin/users' },
         { id: 'user-create', label: 'Create user', to: '/admin/users/create' }
      )
   }

   return items
})

import AppHeader from './widgets/AppHeader.vue';
import AppFooter from './widgets/AppFooter.vue';

const route = useRoute()

</script>