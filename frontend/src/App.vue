<template>
   <Transition name="fade" mode="out-in">
      <div class="wrapper" v-if="route.meta.layout === 'error' || route.meta.layout === 'login'">
         <div class=" content">
            <router-view />
         </div>
      </div>
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
/* ROUTER */
import { useRoute } from 'vue-router';


/* COMPONENTS */
import { MukBreadcrumbs, MukToastContainer } from 'modular-ui-kit-vue'

import AppHeader from './widgets/AppHeader.vue';
import AppFooter from './widgets/AppFooter.vue';

const route = useRoute()

</script>