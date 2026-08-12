<template>
   <div class="muk-page">
      <div class="muk-container">
         <div class="muk-page__wrapper">
            <div class="muk-page__header">
               <muk-text :type="'heading'" as="h1">Profile Page</muk-text>
            </div>
            <div class="muk-page__content" v-if="profileStore.profile">
               <Transition name="fade" mode="out-in">
                  <div class="muk-section" v-if="isLoading" key="loading">
                     <profile-skeleton />
                  </div>
                  <div class="muk-page__info" v-else-if="error" key="profile-error">
                     <muk-error-state title="Oops! Something went wrong..."
                        description="Failed to load profile. It might be a temporary connection issue. Please check your internet or try refreshing the page.">
                        <template #action>
                           <muk-button @click="handleRetry" variant="ghost">Try again</muk-button>
                        </template>
                     </muk-error-state>
                  </div>
                  <div class="muk-section" v-else-if="profile" key="my-profile">
                     <profile-details :profile="profile" @edit="handleEdit" @logout="handleLogout" :public="isPublic" />
                  </div>
               </Transition>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/*  Vue & ROUTER */
import { computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

/*  STORE */
import { useAuthStore } from '@/stores/auth/auth.store';
import { useProfileStore } from "../store/profile.store";

/* COMPONENTS */
import { MukText, MukErrorState, MukButton } from 'modular-ui-kit-vue'
import ProfileDetails from "../components/ProfileDetails.vue"

import ProfileSkeleton from "@/shared/ui/skeletons/ProfileSkeleton.vue";

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

const handleLogout = () => {
   auth.logout()
   router.push({ name: 'login' })
}
</script>
