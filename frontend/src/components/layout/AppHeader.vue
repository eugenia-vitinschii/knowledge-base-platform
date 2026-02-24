<template>
   <header class="header">
      <div class="container">
         <div class="header__wrapper">
            <router-link to="/" class="body-text">home</router-link>
            <router-link to="/admin/articles/create" class="body-text">create article</router-link>
            <router-link to="/admin/articles" class="body-text">all articles</router-link>
            <router-link to="/login" class="body-text">login</router-link>
            <router-link to="/article/what-is-vue-js" class="body-text">Public article</router-link>
         </div>
      </div>
   </header>
</template>

<script setup lang="ts">
</script>
