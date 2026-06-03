<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <h1 class="subheading">Profile Page</h1>
            </div>
            <div class="page__content" v-if="profileStore.profile">
               <Transition name="fade" mode="out-in">
                  <div class="profile-details__wrapper" v-if="isLoading" key="loading">
                     <p class="body-text">skeleton</p>
                  </div>
                  <div class="page__info" v-else-if="error" key="profile-error">
                     <error-state title="Oops! Something went wrong..."
                        description="Failed to load profile. It might be a temporary connection issue. Please check your internet or try refreshing the page."
                        buttonText="Try Again" @retry="handleRetry" />
                  </div>
                  <div class="profile-details__wrapper" v-else-if="profile" key="my-profile">
                     <profile-details :profile="profile" @edit="handleEdit" :public="isPublic" />
                  </div>
               </Transition>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/*  Vue & ROUTER */
import { computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

/*  STORE */
import { useAuthStore } from '@/stores/auth/auth.store';
import { useProfileStore } from "../store/profile.store";

/* COMPONENTS */
import ProfileDetails from "../components/ProfileDetails.vue"
import ErrorState from "@/shared/ui/feedback/ErrorState.vue";
/* === ROUTER, STORES === */
const router = useRouter();
const route = useRoute()
const auth = useAuthStore();
const profileStore = useProfileStore()

/* === STATE COMPUTED === */
/* UI render flow */
const isLoading = computed(() => profileStore.isLoading)
const profile = computed(() => profileStore.profile)
const error = computed(() => profileStore.error)
const isPublic = computed(() => !!route.params.id)

const profileId = computed(() => {
   return isPublic.value
      ? String(route.params.id)
      : auth.user?.id
})

/* === HELPERS === */
async function loadData() {
   if (!profileId.value) return

   if (isPublic.value) {
      await profileStore.fetchProfile(profileId.value)
   } else {
      await profileStore.fetchMyProfile()
   }
}
/* === WATCHERS === */
watch(() => profileId.value,
   async () => {
      await loadData()
   }, { immediate: true }

)

/* === EVENT HANDLERS === */
/* retry action */
async function handleRetry() {
   await loadData()
}
const handleEdit = () => {
   router.push('/profile/edit')
}

</script>
