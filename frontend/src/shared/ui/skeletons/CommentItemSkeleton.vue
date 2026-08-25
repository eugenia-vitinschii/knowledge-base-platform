<template>
   <div class="comment-item-skeleton muk-section__item">
      <div class="comment-item-skeleton__avatar">
         <muk-skeleton type="circle" width="60px" />
      </div>
      <div class="comment-item-skeleton__wrapper">
         <div class="comment-item-skeleton__name">
            <muk-skeleton width="170px" height="30px" />
         </div>
         <div class="comment-item-skeleton__comment">
            <muk-skeleton width="100%" height="50px" />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { MukSkeleton } from 'modular-ui-kit-vue';
</script>