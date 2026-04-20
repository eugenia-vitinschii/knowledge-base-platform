<template>
   <div class="page">
      <div class="container">
         <div class="page__wrapper">
            <div class="page__header">
               <p class="heading">Create User {{ form.name }}</p>
            </div>
            <div class="page__content">
               <admin-user-form v-model="form" :isEdit="false" @submit="onSubmit" />
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* Components */
import AdminUserForm from '../components/AdminUserForm.vue';

/* VUE & ROUTER*/
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

/* PINIA */
import { useToast } from '@/shared/composables/useToast';
import { useAdminUsersStore } from '@/modules/users/store/admin.users.store';
import { Role } from '@/shared/enums/role.enum';

/* Types & ENUMS */
import type { AdminUserFormModel } from '@/modules/users/types/index';
import { Gender, Position, Location } from "@/shared/enums/user.enum"
import { mapFormToCreatePayload } from '@/modules/users/utils/map-form-to-create';

/* Router Variables */
const router = useRouter()

/* stores Variables */
const toast = useToast()
const adminUsers = useAdminUsersStore()

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

/* submit */
async function onSubmit() {

   const updated = await adminUsers.create(mapFormToCreatePayload(form))

   if (!updated) return toast.error("Failed to create the user")

   toast.success("User has been created")

   router.push(`/admin/users`)
}


</script>