<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <h1 class="heading">Admin Users Page</h1>
            </div>
            <div class="page__content">
               <div class="filter-wrapper">
                  <admin-user-filter :filter="filters" :count="totalItems" @update:filter="onFilterChange" />
               </div>
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
                  <div class="empty-state__wrapper" v-else-if="!isLoading && !hasUsers && !error" key="empty">
                     <empty-state variant="search" title="No results found"
                        description="Try adjusting your filters or search terms to find what youre looking for" />
                  </div>
               </Transition>
            </div>
            <div class="page__footer" v-if="hasUsers && !isLoading">
               <base-pagination :page="currentPage" :total-pages="totalPages" @change="onPageChange" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* VUE & ROUTER */
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

/* STORE & COMPOSABLES */
import { useAdminUsersStore } from '@/modules/users/store/admin.users.store';
import { useToast } from '@/shared/composables/useToast';
import { useUserAdminFilter } from "@/modules/users/composables/UseUsersAdminFilters"

/* TYPES */
import type { UserQueryParams, AdminUserFilters } from '../types/index.ts';

/* COMPONENTS */
import AdminUserFilter from '../components/AdminUserFilter.vue';
import UserTable from '@/modules/users/components/UserTable.vue';
import TableSkeleton from '@/shared/ui/skeletons/TableSkeleton.vue';
import EmptyState from '@/shared/ui/feedback/EmptyState.vue';
import ErrorState from '@/shared/ui/feedback/ErrorState.vue'
import BasePagination from '@/shared/ui/navigation/BasePagination.vue';

/* === ROUTER & STORES === */
const userStore = useAdminUsersStore();
const toast = useToast()
const router = useRouter();
const route = useRoute()
const { mapQueryToParams } = useUserAdminFilter()


/* === STATE COMPUTED === */
/* UI render flow*/
const isLoading = computed(() => userStore.isLoading)
const hasUsers = computed(() => userStore.list.length > 0)
const error = computed(() => userStore.error)
const users = computed(() => userStore.list)

/* filter */
const filters = computed(() => userStore.filters)

/* pagination  metadata */
const currentPage = computed(() => userStore.meta?.page ?? 1)
const totalPages = computed(() => userStore.meta?.pages ?? 1)
const totalItems = computed(() => userStore.meta?.total ?? 1)

/* === HELPERS === */
function extractFilters(params: UserQueryParams): AdminUserFilters {
   const { page, limit, ...filters } = params
   return filters
}

/* remove empty values from URL */
function cleanQuery(params: UserQueryParams) {
   const query: any = {}

   Object.entries(params).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) {
         query[key] = value
      }
   })
   return query
}
/* === DATA LOADERS == */
async function loadUsers() {
   const params = mapQueryToParams(route.query)

   userStore.filters = extractFilters(params)
   await userStore.searchUsers(params)

}

/* === WATCHERS === */
watch(
   () => route.query,
   async () => {
      await loadUsers()
   },
   { immediate: true }
)
/* === URL SYNC HANDLERS === */
/*update URL query when filters change */
function onFilterChange(newFilters: AdminUserFilters) {
   const params = mapQueryToParams(route.query)

   router.push({
      path: '/admin/users',
      query: cleanQuery({
         ...params,
         ...newFilters,
         page: 1,
         limit: 10
      })
   })
}
/* pagination  click*/
function onPageChange(page: number) {
   const params = mapQueryToParams(route.query)

   router.push({
      path: '/admin/users',
      query: cleanQuery({
         ...params,
         page
      })
   })
}
/*=== CRUD EVENT HANDLERS === */
/* retry action  */
async function handleRetry() {
   await loadUsers()
}

/* edit user */
const handleEdit = (id: string) => {
   if (!id) return
   router.push(`/admin/users/${id}/edit`)
}
/* delete user */
const handleDeleteUser = async (id: string) => {
   const confirmed = confirm('Delete this user')
   if (!confirmed) return

   const success = await userStore.remove(id)

   if (success) {
      toast.info("User has been deleted")
      await loadUsers()
   }

};

</script>