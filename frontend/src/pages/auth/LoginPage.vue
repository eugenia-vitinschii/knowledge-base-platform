<template>
   <div class="auth">
      <div class="container">
         <div class="auth__wrapper">
            <div class="auth__container">
               <form class="auth__form" @submit.prevent="submit">
                  <ui-input v-model="email" label="Email" type="email" />
                  <ui-input v-model="password" label="Password" type="password" />
                  <ui-button type="submit">login</ui-button>
               </form>
            </div>
         </div>
      </div>
   </div>

</template>

<script setup lang="ts">
/*COMPONENTS */
import UiInput from '@/components/ui/form/UiInput.vue';
import UiButton from '@/components/ui/UiButton.vue';
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
