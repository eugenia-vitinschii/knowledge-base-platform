<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <h1 class="subheading">Profile Page</h1>
            <div class="page__content" v-if="profileStore.profile">
               <profile-details :profile="profileStore.profile" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ProfileDetails from "../components/ProfileDetails.vue"

import { onMounted } from "vue";
import { useProfileStore } from "../store/profile.store";

const profileStore = useProfileStore()

onMounted(() => {
   profileStore.fetchProfile()
})


</script>
