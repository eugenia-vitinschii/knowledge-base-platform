<template>
   <div class="muk-page">
      <div class="muk-container">
         <div class="muk-page__wrapper">
            <div class="muk-page__header">
               <muk-text :align="'center'" type="muk-heading">Welcome back, {{ name }}</muk-text>
            </div>
            <div class="muk-page__content">
               <div class="muk-section">
                  <muk-text>
                     This is the official corporate knowledge base for our company employees.
                     Here you can find all internal documentation, guides, and technical articles.
                     Use the navigation or click below to explore the database.
                  </muk-text>
                  <muk-text v-if="auth.user?.role === 'admin' || auth.user?.role === 'editor'">
                     <strong>Content Management Enabled:</strong> As an authorized author/administrator,
                     you have access to the dashboard. You can create, edit, and manage corporate articles directly from
                     the system menu.
                  </muk-text>
                  <div class="muk-section__actions">
                     <muk-button @click="handleLogout" variant="secondary">Logout</muk-button>
                     <muk-button @click="router.push('/articles')">Explore articles</muk-button>
                  </div>
               </div>
            </div>
            <div class="muk-page__footer">
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
import { MukButton, MukText } from 'modular-ui-kit-vue';
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