<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <p class="heading">Update User {{ form.name }}</p>
            </div>
            <div class="page__content">
               <admin-user-form v-model="form" :isEdit="true" @save-role="saveRole" @submit="onSubmit" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* Components */
import AdminUserForm from '../components/AdminUserForm.vue';

/* VUE & ROUTER*/
import { onMounted, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/* PINIA */
import { useToast } from '@/shared/composables/useToast';
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
const toast = useToast()
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
      toast.error("User ID is missing")
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

   toast.success("User role has been updated")
}


/* submit */
async function onSubmit() {

   const updated = await adminUsers.update(userId.value, mapFormToUpdatePayload(form))

   if (!updated) return toast.error("Failed to update the user")

   toast.success("User has been updated")

   router.push(`/admin/users`)
}


</script>