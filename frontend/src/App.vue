<template>
   <Transition name="fade" mode="out-in">
      <div class="wrapper" v-if="route.meta.layout === 'error'">
         <div class="content">
            <router-view />
         </div>
      </div>
      <div class="wrapper" v-else>
         <app-header />
         <div class="content">
            <router-view />
            <ui-toast-container />
         </div>
         <app-footer />
      </div>
   </Transition>
</template>

<script setup lang="ts">
/* ROUTER */
import { useRoute } from 'vue-router';


/* COMPONENTS */
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import UiToastContainer from './components/ui/toast/UiToastContainer.vue';

const route = useRoute()

</script>