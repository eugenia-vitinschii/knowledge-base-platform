<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <h1 class="heading">EDIT PROFILE</h1>
            <div class="page__container">
               <profile-form v-model="form" @submit="onSubmit" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ProfileForm from '../components/ProfileForm.vue';

/* VUE & ROUTER*/
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

/*Pinia */
import { useProfileStore } from '../store/profile.store';
import { useToast } from '@/shared/composables/useToast';

/* TYPES & ENUMS */
import type { ProfileUpdateForm } from "../types/index"
import { Gender, Position } from "@/shared/enums/user.enum"

import { mapProfileToUpdatePayload } from '../utils/map-profile-to-update';
import { mapProfileToForm } from '../utils/map-profile-to-form';
import { Visibility } from '@/shared/enums/visibility.enum';

/* Router Variables */

const router = useRouter()

const profileStore = useProfileStore()
const toast = useToast()

const form = reactive<ProfileUpdateForm>({
   name: '',
   email: '',
   position: Position.FRONTEND,
   phone: '',
   gender: Gender.OTHER,
   bio: '',
   birthDate: '',
   visibility: {
      phone: Visibility.PRIVATE,
      birthDate: Visibility.PRIVATE
   }

})

/* load user data */
onMounted(async () => {

   const user = await profileStore.fetchProfile()

   if (!user) return

   Object.assign(form, mapProfileToForm(user));
})

/* submit */
async function onSubmit() {

   const updated = await profileStore.updateProfile(mapProfileToUpdatePayload(form))

   if (!updated) return toast.error("Failed to update the user")

   toast.success("User has been updated")

   router.push('/profile')
}
</script>
