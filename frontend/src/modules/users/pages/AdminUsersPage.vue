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
                  <muk-button variant="primary" @click="handleEdit(item.id)">Edit</muk-button>
                  <muk-button variant="secondary" @click="handlePreview(item.id)">Preview</muk-button>
                  <muk-button variant="danger" @click="handleDeleteUser(item.id)">Delete</muk-button>
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