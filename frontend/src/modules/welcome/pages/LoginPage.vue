<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper auth">
            <div class="page__header">
               <h1 class="heading">Corporate Knowledge Base</h1>
               <p class="subheading">
                  Sign in with your company account to access internal documentation
               </p>
            </div>
            <div class="page__content">
               <div class="auth-form-wrapper">
                  <form class="auth-form" @submit.prevent="submit">
                     <ui-input v-model="email" label="Email" type="email" />
                     <ui-input v-model="password" label="Password" type="password" />
                     <div class="auth-form__actions">
                        <ui-button type="submit">login</ui-button>
                     </div>
                  </form>
               </div>
            </div>
            <div class="page__footer">
               <p class="body-text">This is a private, restricted corporate knowledge base. If you are not an authorized
                  employee, please return to your previous location. Unauthorized access or use of this platform is
                  strictly prohibited and subject to company policies</p>
            </div>
         </div>
      </div>
   </div>

</template>

<script setup lang="ts">
/* VUE & ROUTER */
import { ref } from 'vue';
import { useRouter } from 'vue-router';

/* PINIA */
import { useAuthStore } from '@/stores/auth/auth.store';

/*COMPONENTS */
import UiInput from '@/shared/ui/form/UiInput.vue';
import UiButton from '@/shared/ui/buttons/UiButton.vue';

/* PINIA & ROUTER */
const auth = useAuthStore()
const router = useRouter()

const email = ref('');
const password = ref('');

const submit = async () => {
   try {
      await auth.login({ email: email.value, password: password.value })

      const isAuthenticated = !!localStorage.getItem('token') || auth.token
      if (isAuthenticated) {
         router.push({ name: 'welcome' })
      } else {
         console.warn("no token!!")
      }
   } catch (err) {
      console.error("Error", err)
   }
}

</script>
