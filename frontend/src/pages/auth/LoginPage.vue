<template>
   <div class="auth">
      <div class="container">
         <div class="auth__wrapper">
            <div class="auth__container">
               <form class="auth__form" @submit.prevent="submit">
                  <ui-input v-model="email" label="Email" type="email" />
                  <ui-input v-model="password" label="Password" type="password" />
                  <button type="submit">
                     login
                  </button>
               </form>
            </div>
         </div>
      </div>
   </div>

</template>

<script setup lang="ts">
/*COMPONENTS */
import UiInput from '@/components/ui/UiInput.vue';

/* VUE */
import { ref } from 'vue';
/* PINIA */
import { useAuthStore } from '@/stores/auth/auth.store';

/* LOGIN */
const auth = useAuthStore()

const email = ref('');
const password = ref('');

async function submit() {
   await auth.login({ email: email.value, password: password.value })
}
</script>
