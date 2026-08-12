<template>
   <div class="muk-page">
      <div class="muk-container">
         <div class="muk-page__wrapper">
            <div class="muk-page__header">
               <muk-text as="h1" type="muk-heading">Create User {{ form.name }}</muk-text>
            </div>
            <div class="muk-page__content">
               <div class="muk-section">
                  <admin-user-form v-model="form" :isEdit="false" @submit="onSubmit" />
               </div>
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
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

/* PINIA */
import { useMukToast } from 'modular-ui-kit-vue'
import { useAdminUsersStore } from '@/modules/users/store/admin.users.store';
import { Role } from '@/shared/enums/role.enum';

/* Types & ENUMS */
import type { AdminUserFormModel } from '@/modules/users/types/index';
import { Gender, Position, Location } from "@/shared/enums/user.enum"
import { mapFormToCreatePayload } from '@/modules/users/utils/map-form-to-create';

/* Router Variables */
const router = useRouter()

/* stores Variables */
const { addToast } = useMukToast()
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

   if (!updated) return addToast("Failed to create the user", 'danger')

   addToast("User has been created", 'success')

   router.push(`/admin/users`)
}


</script>