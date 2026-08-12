<template>
   <div class="article-preview-skeleton muk-section__item">
      <div class="article-preview-skeleton__header">
         <muk-skeleton width="300px" height="30px" />
         <muk-skeleton width="90px" height="20px" />
      </div>
      <div class="article-preview-skeleton__badges">
         <muk-skeleton width="170px" height="20px" />
         <muk-skeleton width="70px" height="20px" />
         <muk-skeleton width="150px" height="20px" />
      </div>
      <muk-skeleton width="100" height="820px" />
   </div>
</template>

<script setup lang="ts">
import { MukSkeleton } from 'modular-ui-kit-vue';
</script>
