<template>
   <div class="profile-skeleton">
      <div class="profile-skeleton__main  muk-section__item">
         <div class="profile-skeleton__main-top">
            <div class="profile-skeleton__main-top--c">
               <muk-skeleton type="circle" width="200px" class="profile-skeleton__avatar" />
            </div>
            <div class="profile-skeleton__main-top--b">
               <muk-skeleton width="170px" height="30px" />
               <muk-skeleton width="50px" height="25px" />
               <muk-skeleton width="160px" height="25px" />
            </div>
         </div>
         <div class="profile-skeleton__main-bottom">
            <muk-skeleton width="100" height="30px" />
            <muk-skeleton width="100" height="30px" />

            <muk-skeleton width="128px" height="25px" />
            <muk-skeleton width="125px" height="25px" />
            <muk-skeleton width="130px" height="25px" />
         </div>

      </div>
      <div class="profile-skeleton__about  muk-section__item">
         <muk-skeleton width="170px" height="30px" />
         <muk-skeleton width="50px" height="25px" />
         <div class="profile-skeleton__about-content">
            <muk-skeleton width="100" height="400px" />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { MukSkeleton } from 'modular-ui-kit-vue';
</script>
