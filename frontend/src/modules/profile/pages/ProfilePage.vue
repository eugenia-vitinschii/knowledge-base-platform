<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <h1 class="subheading">Profile Page</h1>
            <div class="page__content" v-if="profileStore.profile">
               <profile-details :profile="profileStore.profile" @edit="handleEdit" :public="isPublic" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ProfileDetails from "../components/ProfileDetails.vue"

import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

/*  PINIA  */
import { useAuthStore } from '@/stores/auth/auth.store';
import { useProfileStore } from "../store/profile.store";

/* PINIA  variables */
const auth = useAuthStore();
const profileStore = useProfileStore()

const router = useRouter();
const route = useRoute()

const isPublic = computed(() => !!route.params.id)

const profileId = computed(() => {
   return isPublic.value
      ? String(route.params.id)
      : auth.user?.id
})

onMounted(async () => {
   if (!profileId.value) return

   if (isPublic.value) {
      await profileStore.fetchProfile(profileId.value)
   } else {
      await profileStore.fetchMyProfile()
   }
})

const handleEdit = () => {
   router.push('/profile/edit')
}

</script>
