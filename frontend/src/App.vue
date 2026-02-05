<template>
   <div class="wrapper">
      <div class="header">header</div>
      <div class="content">
         <router-view />
      </div>
      <div class="footer">
         <theme-toggle />
         <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione porro ab error repellendus, libero
            perspiciatis labore velit aliquid accusantium, aperiam quae? Molestias, culpa animi alias sunt eius eum cum.
            Asperiores corrupti illo, accusantium nulla impedit, repellendus dolore nam temporibus quidem blanditiis in
            fuga!</p>
      </div>
   </div>

</template>

<script setup lang="ts">
import ThemeToggle from './components/ui/ThemeToggle.vue';

</script>