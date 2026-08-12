<template>
   <div class="muk-page">
      <div class="muk-container">
         <div class="muk-page__wrapper auth">
            <div class="muk-page__header">
               <muk-text as="h1" :align="'center'" variant="primary" type="muk-heading">Corporate Knowledge
                  Base</muk-text>
               <muk-text as="h2" :align="'center'" variant="warning" type="muk-subheading">
                  Sign in with your company account to access internal documentation
               </muk-text>
            </div>
            <div class="muk-page__content">
               <div class="form-wrapper muk-section">
                  <form class="muk-form" @submit.prevent="submit">
                     <muk-input v-model="email" label="Email" type="email" />
                     <muk-input v-model="password" label="Password" type="password" />
                     <div class="muk-section__actions">
                        <muk-button type="submit">login</muk-button>
                     </div>
                  </form>
               </div>
            </div>
            <div class="muk-page__footer muk-section">
               <muk-text>This is a private, restricted corporate knowledge base. If you are not an authorized
                  employee, please return to your previous location. Unauthorized access or use of this platform is
                  strictly prohibited and subject to company policies</muk-text>
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
import { MukInput, MukButton, MukText } from 'modular-ui-kit-vue';

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
