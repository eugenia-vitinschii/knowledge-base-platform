<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <h1 class="heading">Users Table </h1>
               <div class="users-wrapper">
                  <user-table :items="userStore.list" @delete="handleDeleteUser" />
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import UserTable from '@/components/user/UserTable.vue';

/* PINIA */
import { useAdminUsersStore } from '@/stores/users/admin.users.store';

import { onMounted } from 'vue';

import { useToast } from '@/shared/composables/useToast';

const userStore = useAdminUsersStore();
const toast = useToast()

/* ACTIONS */
const handleDeleteUser = async (id: string) => {
   const confirmed = confirm('Delete this user')
   if (!confirmed) return

   const success = await userStore.remove(id)

   if (success) {
      toast.info("User has been deleted")
   }

};
onMounted(() => {
   userStore.fetchUsers()
})
</script>