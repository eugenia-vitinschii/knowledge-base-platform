<template>
   <div class="muk-page">
      <div class="muk-container">
         <div class="muk-page__wrapper">
            <div class="muk-page__header">
               <muk-text as="h1" type="muk-heading">Update User {{ form.name }}</muk-text>
            </div>
            <div class="muk-page__content">
               <admin-user-form v-model="form" :isEdit="true" @save-role="saveRole" @submit="onSubmit" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* Components */
import AdminUserForm from '../components/AdminUserForm.vue';
import { MukText } from 'modular-ui-kit-vue'

/* VUE & ROUTER*/
import { onMounted, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/* PINIA */
import { useMukToast } from 'modular-ui-kit-vue'
import { useAdminUsersStore } from '@/modules/users/store/admin.users.store';
import { Role } from '@/shared/enums/role.enum';

/* Types & ENUKS*/
import type { AdminUserFormModel } from '@/modules/users/types/index';
import { Gender, Position, Location } from "@/shared/enums/user.enum"
import { mapUserToForm } from '@/modules/users/utils/map-user-to-form';
import { mapFormToUpdatePayload } from '@/modules/users/utils/map-form-to-update';

/* Router Variables */
const route = useRoute()
const router = useRouter()

/* stores Variables */
const { addToast } = useMukToast()
const adminUsers = useAdminUsersStore()

const userId = computed(() => String(route.params.id || ''))

const form = reactive<AdminUserFormModel>({
   name: '',
   email: '',
   password: '',
   role: Role.VIEWER,

   position: Position.FRONTEND,
   location: Location.REMOTE,
   phone: '',

   gender: Gender.OTHER,
   hiredDate: '',
   bio: ''

})


/* load user data */
onMounted(async () => {
   if (!userId.value) {
      addToast("User ID is missing", 'danger')
      router.push("/admin/users")
      return
   }

   const user = await adminUsers.fetchUserById(userId.value)

   if (!user) return

   Object.assign(form, mapUserToForm(user));
})


/* save role */
async function saveRole() {

   const updated = await adminUsers.updateRole(userId.value, {
      role: form.role
   })

   if (!updated) return
   if (updated) {
      form.role = updated.role
   }

   addToast("User role has been updated", 'success')
}


/* submit */
async function onSubmit() {

   const updated = await adminUsers.update(userId.value, mapFormToUpdatePayload(form))

   if (!updated) return addToast("Failed to update the user", 'danger')

   addToast("User has been updated", 'success')

   router.push(`/admin/users`)
}


</script>