<template>
   <header class="header">
      <div class="muk-container">
         <div class="header__wrapper">
            <div class="header__wrapper-public">
               <muk-text as="router-link" to="/articles">Articles</muk-text>
               <muk-text as="router-link" to="/profile">My Profile</muk-text>
            </div>
            <div class="header__wrapper-admin" v-if="isAdmin || isEditor">
               <muk-text as="router-link" to="/admin">Admin Tools</muk-text>
            </div>
            <div class="header__info">
               <muk-text variant="primary">Hi, {{ auth.user?.name }}! [role: {{ auth.user?.role }}] </muk-text>
            </div>
         </div>
      </div>
   </header>
</template>

<script setup lang="ts">
/* COMPONENTS */
import { MukText } from 'modular-ui-kit-vue';
/* VUE */
import { computed } from 'vue';

/*  PINIA  */
import { useAuthStore } from '@/stores/auth/auth.store';

/*PINIA  variables */
const auth = useAuthStore();

/* check role & fetch data */
const isAdmin = computed(() => auth.user?.role === 'admin')
const isEditor = computed(() => auth.user?.role === 'editor')
</script>
