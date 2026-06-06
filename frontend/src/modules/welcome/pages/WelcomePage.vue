<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <h1 class="heading">Welcome back, {{ name }}</h1>
            </div>
            <div class="page__content">
               <p class="body-text">
                  This is the official corporate knowledge base for our company employees.
                  Here you can find all internal documentation, guides, and technical articles.
                  Use the navigation or click below to explore the database.
               </p>
               <p class="body-text" v-if="auth.user?.role === 'admin' || auth.user?.role === 'editor'">
                  <strong>Content Management Enabled:</strong> As an authorized author/administrator,
                  you have access to the dashboard. You can create, edit, and manage corporate articles directly from
                  the system menu.
               </p>
               <ui-button @click="router.push('/articles')">explore articles</ui-button>
               <ui-button @click="handleLogout" variant="secondary">log out</ui-button>
            </div>
            <div class="page__footer">

            </div>
         </div>
      </div>
   </div>

</template>

<script setup lang="ts">
/* VUE */
import { computed } from 'vue';

/*  PINIA  */
import { useAuthStore } from '@/stores/auth/auth.store';

/* COMPONENTS */
import UiButton from '@/shared/ui/buttons/UiButton.vue';
import router from '@/router';

/*PINIA  variables */
const auth = useAuthStore();

/* user name */
const name = computed(() => auth.user?.name)

const handleLogout = () => {
   auth.logout()
   router.push({ name: 'login' })
}
</script>