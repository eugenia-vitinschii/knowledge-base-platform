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
                  <div class="user-table__wrapper" v-else-if="hasUsers" key="users">
                     <user-table :items="userStore.list" @delete="handleDeleteUser" @edit="handleEdit" />
                  </div>
                  <div class="empty-state__wrapper" v-else-if="!isLoading && hasUsers" key="empty">
                     <empty-state :variant="'search'" :title="'No results found'"
                        :description="'Try adjusting your filters or search terms to find what youre looking for'" />
                  </div>
               </Transition>
            </div>
            <div class="page__footer"></div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import UserTable from '@/modules/users/components/UserTable.vue';
import TableSkeleton from '@/shared/ui/TableSkeleton.vue';
import EmptyState from '@/shared/feedback/EmptyState.vue';

/* PINIA */
import { useAdminUsersStore } from '@/modules/users/store/admin.users.store';
import { useToast } from '@/shared/composables/useToast';

/* VUE & ROUTER */
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';


const userStore = useAdminUsersStore();
const toast = useToast()
const router = useRouter();

/* UI render flow*/
const isLoading = computed(() => userStore.isLoading)
const hasUsers = computed(() => userStore.list.length > 0)

/* ACTIONS */
const handleDeleteUser = async (id: string) => {
   const confirmed = confirm('Delete this user')
   if (!confirmed) return

   const success = await userStore.remove(id)

   if (success) {
      toast.info("User has been deleted")
   }

};

const handleEdit = (id: string) => {
   if (!id) return
   router.push(`/admin/users/edit/${id}`)
}


onMounted(() => {
   userStore.fetchUsers()
})
</script>