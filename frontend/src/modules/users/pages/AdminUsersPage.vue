<template>
   <div>
      <page-header title="Admin Users Page" />
      <filter-bar :show-reset="isFilterActive" @reset="onReset">
         <template #chips v-if="activeFilters.length">
            <TransitionGroup name="fade">
               <div class="filter-chip" v-for="[key, value] in activeFilters" :key="key">
                  <muk-text as="span">{{ key }} : {{ value }}</muk-text>
                  <muk-icon-button @click="removeFilter(key)" size="sm" variant="danger">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path
                           d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
                     </svg>
                  </muk-icon-button>
               </div>
            </TransitionGroup>
         </template>
         <template #search>
            <muk-input v-model="localSearch.search" type="search" placeholder="🔍 search article" />
         </template>
         <template #filters>
            <muk-select v-model="localSearch.role" :options="roleOptions" />
            <muk-select v-model="localSearch.position" :options="positionOptions" />
            <muk-select v-model="localSearch.location" :options="locationOptions" />
         </template>
      </filter-bar>
      <data-wrapper :loading="isLoading" :error="!!error" :items="users">
         <template #skeleton>
            <data-table-skeleton :rows="9" :buttons="3" :columns="5" />
         </template>
         <template #error>
            <muk-error-state title="Oops! Something went wrong..."
               description="Failed to load users. It might be a temporary connection issue. Please check your internet or try refreshing the page.">
               <template>
                  <muk-button @click="handleRetry">Try Again</muk-button>
               </template>
            </muk-error-state>
         </template>
         <template #empty>
            <muk-empty-state variant="search" title="No results found"
               description="Try adjusting your filters or search terms to find what youre looking for" />
         </template>
         <data-table :items="users" :columns="columns">
            <template #cell-actions="{ item }">
               <div class="muk-table__actions">
                  <muk-icon-button variant="primary" @click="handleEdit(item.id)"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path
                           d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                     </svg></muk-icon-button>
                  <muk-icon-button variant="secondary" @click="handlePreview(item.id)"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path
                           d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-480H200v480Zm133.5-124.5Q269-369 240-440q29-71 93.5-115.5T480-600q82 0 146.5 44.5T720-440q-29 71-93.5 115.5T480-280q-82 0-146.5-44.5Zm248.5-42q46-26.5 72-73.5-26-47-72-73.5T480-540q-56 0-102 26.5T306-440q26 47 72 73.5T480-340q56 0 102-26.5ZM480-440Zm42.5 42.5Q540-415 540-440t-17.5-42.5Q505-500 480-500t-42.5 17.5Q420-465 420-440t17.5 42.5Q455-380 480-380t42.5-17.5Z" />
                     </svg></muk-icon-button>
                  <muk-icon-button variant="danger" @click="handleDeleteUser(item.id)"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path
                           d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
                     </svg></muk-icon-button>
               </div>
            </template>
            <template v-if="hasUsers && !isLoading" #pagination>
               <muk-pagination :page="currentPage" :total-pages="totalPages" @change="onPageChange" />
            </template>
         </data-table>
      </data-wrapper>
   </div>
</template>

<script setup lang="ts">
/* VUE & ROUTER */
import { computed, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

/* STORE & COMPOSABLES */
import { useAdminUsersStore } from '@/modules/users/store/admin.users.store';
import { useMukToast } from 'modular-ui-kit-vue'
import { useUserAdminFilter } from "@/modules/users/composables/UseUsersAdminFilters"

/* TYPES & ENUMS */
import type { UserQueryParams, AdminUserFilters } from '../types/index.ts';
import { Role } from '@/shared/enums/role.enum';
import { Location, Position } from '@/shared/enums/user.enum';

/* COMPONENTS */
import { MukText, MukPagination, MukEmptyState, MukErrorState, MukButton, MukSelect, MukInput, MukIconButton } from 'modular-ui-kit-vue';
import { PageHeader, DataWrapper, DataTableSkeleton, DataTable, FilterBar } from 'vue-saas-kit';

/* === ROUTER & STORES === */
const userStore = useAdminUsersStore();
const { addToast } = useMukToast()
const router = useRouter();
const route = useRoute()
const { mapQueryToParams } = useUserAdminFilter()


/* === STATE COMPUTED === */
/* UI render flow*/
const isLoading = computed(() => userStore.isLoading)
const hasUsers = computed(() => userStore.list.length > 0)
const error = computed(() => userStore.error)
const users = computed(() => userStore.list)

/* ==============================  FILTER BAR  ===========================*/
//init local state
const localSearch = reactive<AdminUserFilters>({
   search: userStore.filters.search ?? '',
   role: userStore.filters.role ?? '',
   position: userStore.filters.position ?? '',
   location: userStore.filters.location ?? '',
})

const isFilterActive = computed(() => {
   return Object.values(localSearch).some(Boolean)
})
const activeFilters = computed(() => {
   return (Object.entries(localSearch) as [keyof AdminUserFilters, any][]).filter(([_, val]) => Boolean(val))
})
//form watcher
watch(
   localSearch,
   (newFilters) => {
      const cleaned = cleanQuery(newFilters) as AdminUserFilters
      userStore.searchUsers(cleaned)
   },
   { deep: true }
)
const removeFilter = (key: keyof AdminUserFilters) => {
   localSearch[key] = ''
}

const onReset = () => {
   (Object.keys(localSearch) as (keyof AdminUserFilters)[]).forEach((key) => {
      localSearch[key] = ''
   })
}
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
      addToast("User has been deleted", 'success')
      await loadUsers()
   }

};
const handlePreview = (id: string) => {
   router.push(`/articles/users/${id}`)
}


const columns = [
   { key: 'name', label: 'Name' },
   { key: 'role', label: 'Role' },
   { key: 'position', label: 'Position' },
   { key: 'location', label: 'Location' },
   { key: 'actions', label: 'Actions' }
]
/* === OPTIONS  === */
const roleOptions = [
   { label: "All roles", value: '' },
   { label: "Admin", value: Role.ADMIN },
   { label: "Editor", value: Role.EDITOR },
   { label: "Viewer", value: Role.VIEWER },
]

const positionOptions = [
   { label: "All positions", value: '' },
   { label: 'Frontend Developer', value: Position.FRONTEND },
   { label: 'Backend Developer', value: Position.BACKEND },
   { label: 'Fullstack Developer', value: Position.FULLSTACK },
   { label: 'DevOps Engineer', value: Position.DEVOPS },
   { label: 'QA Engineer', value: Position.QA },
   { label: 'UI/UX Designer', value: Position.UI_UX },
   { label: 'Data Scientist', value: Position.DATA_SCIENTIST },
   { label: 'Product Manager', value: Position.PRODUCT_MANAGER },
   { label: 'Other', value: Position.OTHER }
]

const locationOptions = [
   { label: "All locations", value: '' },
   { label: 'Remote', value: Location.REMOTE },
   { label: 'Onsite', value: Location.ONSITE },
   { label: 'Hybrid', value: Location.HYBRID },
]
</script>