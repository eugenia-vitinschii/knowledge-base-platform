<template>
   <div class="wrapper">
      <app-header />
      <div class="content">
         <router-view />
      </div>
      <app-footer />
   </div>

</template>

<script setup lang="ts">
/* COMPONENTS */
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';

</script>