<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <muk-text :type="'heading'" as="h1">Edit profile</muk-text>
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
import { MukText } from 'modular-ui-kit-vue'

/* VUE & ROUTER*/
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

/*Pinia */
import { useProfileStore } from '../store/profile.store';
import { useMukToast } from 'modular-ui-kit-vue'

/* TYPES & ENUMS */
import type { ProfileFormData } from '../validation/profile.schema';
import { Gender, Position } from "@/shared/enums/user.enum"

import { mapProfileToUpdatePayload } from '../utils/map-profile-to-update';
import { mapProfileToForm } from '../utils/map-profile-to-form';
import { Visibility } from '@/shared/enums/visibility.enum';

/* Router Variables */

const router = useRouter()

const profileStore = useProfileStore()
const { addToast } = useMukToast()

const form = reactive<ProfileFormData>({
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

   const user = await profileStore.fetchMyProfile()

   if (!user) return

   Object.assign(form, mapProfileToForm(user));
})

/* submit */
async function onSubmit() {

   const updated = await profileStore.updateProfile(mapProfileToUpdatePayload(form))

   if (!updated) return addToast("Failed to update the user", 'danger')

   addToast("User has been updated", 'success')

   router.push('/profile')
}
</script>
