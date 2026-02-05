<template>
   <div class="auth">
      <div class="container">
         <div class="auth__wrapper">
            <div class="auth__container">
               <form class="auth__form" @submit.prevent="auth.login({ email, password })">
                  <input type="text" placeholder="email" v-model="email">
                  <br>
                  <input type="password" placeholder="password" v-model="password">
                  <br>
                  <button @click="auth.login({ email, password })">
                     login
                  </button>
               </form>
            </div>
         </div>
      </div>
   </div>

</template>

<script setup lang="ts">
//vue
import { ref } from 'vue';
//pinia
import { useAuthStore } from '@/stores/auth/auth.store';

//login
const auth = useAuthStore()

const email = ref('email');
const password = ref('password')
</script>
