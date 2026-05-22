<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <h1 class="heading">Admin Users Page</h1>
            </div>
            <div class="page__content">
               <div class="filter-wrapper"></div>
               <Transition name="fade" mode="out-in">
                  <div class="user-table__wrapper" v-if="isLoading" key="loading">
                     <table-skeleton :rows="9" :buttons="2" :columns="5" />
                  </div>
                  <div class="page__info" v-else-if="error" key="error">
                     <error-state title="Oops! Something went wrong..."
                        description="Failed to load users. It might be a temporary connection issue. Please check your internet or try refreshing the page."
                        buttonText="Try Again" @retry="handleRetry" />
                  </div>
                  <div class="user-table__wrapper" v-else-if="hasUsers" key="users">
                     <user-table :items="users" @delete="handleDeleteUser" @edit="handleEdit" />
                  </div>
                  <div class="empty-state__wrapper" v-else-if="!isLoading && hasUsers" key="empty">
                     <empty-state variant="search" title="No results found"
                        description="Try adjusting your filters or search terms to find what youre looking for" />
                  </div>
               </Transition>
            </div>
            <div class="page__footer"></div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* VUE & ROUTER */
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

/* STORE & COMPOSABLES */
import { useAdminUsersStore } from '@/modules/users/store/admin.users.store';
import { useToast } from '@/shared/composables/useToast';

/* COMPONENTS */
import UserTable from '@/modules/users/components/UserTable.vue';
import TableSkeleton from '@/shared/ui/TableSkeleton.vue';
import EmptyState from '@/shared/feedback/EmptyState.vue';
import ErrorState from '@/shared/feedback/ErrorState.vue'

/* === ROUTER & STORES === */
const userStore = useAdminUsersStore();
const toast = useToast()
const router = useRouter();

/* === STATE COMPUTED === */
/* UI render flow*/
const isLoading = computed(() => userStore.isLoading)
const hasUsers = computed(() => userStore.list.length > 0)
const error = computed(() => userStore.error)
const users = computed(() => userStore.list)
/* === WATCHERS === */
onMounted(() => {
   userStore.fetchUsers()
})

/*=== EVENT HANDLERS === */
/* retry action  */
function handleRetry() {
   userStore.fetchUsers()
}
/* edit user */
const handleEdit = (id: string) => {
   if (!id) return
   router.push(`/admin/users/edit/${id}`)
}
/* delete user */
const handleDeleteUser = async (id: string) => {
   const confirmed = confirm('Delete this user')
   if (!confirmed) return

   const success = await userStore.remove(id)

   if (success) {
      toast.info("User has been deleted")
   }

};

</script>