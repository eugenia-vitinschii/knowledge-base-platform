<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper  error-page-wrapper">
            <error-page-state code="404" title="Page Not Found" button-text="back to safety" @action="goBack"
               description="Oops! The page you are looking for doesn't exist or has been moved. Double-check the URL or head back to the dashboard" />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ErrorPageState from '../components/ErrorPageState.vue';

function goBack() {
   window.history.back()
}
</script>