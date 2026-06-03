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
import AppHeader from './widgets/AppHeader.vue';
import AppFooter from './widgets/AppFooter.vue';
import UiToastContainer from './shared/ui/feedback/UiToastContainer.vue';

const route = useRoute()

</script>