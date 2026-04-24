<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <h1 class="subheading">Profile Page</h1>
            <div class="page__content" v-if="profileStore.profile">
               <profile-details :profile="profileStore.profile" @edit="handleEdit" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ProfileDetails from "../components/ProfileDetails.vue"

import { onMounted } from "vue";
import { useRouter } from "vue-router";


import { useProfileStore } from "../store/profile.store";

const profileStore = useProfileStore()
const router = useRouter();

onMounted(() => {
   profileStore.fetchProfile()
})

const handleEdit = () => {
   router.push('/profile/edit')
}


</script>
