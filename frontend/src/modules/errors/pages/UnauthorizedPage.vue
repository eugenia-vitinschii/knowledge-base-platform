<template>
   <div class="muk-page">
      <div class="muk-container">
         <div class="muk-page__wrapper error-page-wrapper">
            <error-page-state @action="goHome" code="401" title="Session Expired"
               description="Your session has expired for security reasons. Please log in again to continue working."
               buttonText="log in" />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* ROUTER */
import { useRouter } from 'vue-router';

/* COMPONENTS */
import ErrorPageState from '../components/ErrorPageState.vue';

const router = useRouter()

function goHome() {
   router.push('/login')
}
</script>