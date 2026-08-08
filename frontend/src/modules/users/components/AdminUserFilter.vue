<template>
   <div class="admin-user-filter">
      <div class="admin-user-filter__active">
         <div class="filter-chip" v-for="[key, value] in activeFilters" :key="key">
            <muk-text as="span">{{ key }} : {{ value }}</muk-text>
            <muk-icon-button @click="removeFilter(key)"><svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960">
                  <path
                     d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
               </svg>
            </muk-icon-button>
         </div>
      </div>
      <div class="admin-user-filter__info" v-if="activeFilters.length">
         <muk-text>Result(s): {{ count }}</muk-text>
         <muk-button @click="onReset" variant="danger" v-if="activeFilters.length">Reset</muk-button>
      </div>
      <div class="admin-user-filter__filter">
         <muk-input v-model="localSearch.search" type="search" placeholder="🔍 search user"
            @update:modelValue="updateFilter('search', $event)" />
         <muk-select v-model="localSearch.role" :options="roleOptions"
            @update:modelValue="updateFilter('role', $event as Role | '')" />
         <muk-select v-model="localSearch.position" :options="positionOptions"
            @update:modelValue="updateFilter('position', $event as Position | '')" />
         <muk-select v-model="localSearch.location" :options="locationOptions"
            @update:modelValue="updateFilter('location', $event as Location | '')" />
      </div>
   </div>
</template>

<script setup lang="ts">
/* === VUE === */
import { reactive, watch, computed } from 'vue';

/* === COMPONENTS === */
import { MukButton, MukText, MukInput, MukSelect, MukIconButton } from 'modular-ui-kit-vue'

/* === TYPES === */
import type { AdminUserFilters } from '../types/index';
import { Role } from '@/shared/enums/role.enum';
import { Location, Position } from '@/shared/enums/user.enum';

/* === PROPS & EMITS === */
const props = defineProps<{
   filter: AdminUserFilters,
   count: number
}>()

const emit = defineEmits<{
   (e: "update:filter", value: AdminUserFilters): void
}>()

/* === COMPUTED  STATE ===*/

const localSearch = reactive({ ...props.filter })

const activeFilters = computed(() => {
   return Object.entries(props.filter).filter(([_, value]) => value !== '' && value !== undefined)
})

/* === EVENT HANDLERS === */
function updateFilter<K extends keyof AdminUserFilters>(key: K, value: AdminUserFilters[K]) {
   localSearch[key] = value
   emit('update:filter', { ...localSearch })
}

function removeFilter(key: string) {
   updateFilter(key as keyof AdminUserFilters, '')
}

/* REMOVE ALL FILTERS */
function onReset() {
   const emptyFilters: AdminUserFilters = {
      search: '',
      role: '',
      position: '',
      location: ''
   }
   Object.assign(localSearch, emptyFilters)
   emit('update:filter', emptyFilters)
}

watch(
   () => props.filter,
   (newVal) => {
      Object.assign(localSearch, newVal)
   },
   { immediate: true, deep: true }
)
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
