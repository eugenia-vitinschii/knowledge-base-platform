<template>
   <form class="admin-user-form" @submit.prevent="emitSubmit">
      <div class="admin-user-form__section">
         <p class="subheading">Main info</p>
         <div class="admin-user-form__section--items">
            <ui-input v-model="localForm.name" label="Name" type="text" placeholder="name" />
            <ui-input v-model="localForm.email" label="Email" type="email" placeholder="email" />
            <ui-input v-model="localForm.password" label="Password" type="password" placeholder="password"
               :disabled="isEdit" />
            <ui-select v-model="localForm.position" :options="positionOptions" label="Position" />
         </div>
      </div>
      <div class="admin-user-form__section" v-if="isEdit">
         <p class="subheading">User Role</p>
         <div class="admin-user-form__section--items">
            <ui-select v-model="localForm.role" :options="roleOptions" label="Role" />
            <ui-button type="button" variant="danger" @click="emit('save-role')">save
               role</ui-button>
         </div>
      </div>
      <div class=" admin-user-form__section">
         <p class="subheading">Contacts & Location</p>
         <div class="admin-user-form__section--items">
            <ui-input v-model="localForm.phone" label="Phone" type="tel" placeholder="phone number" />
            <ui-select v-model="localForm.location" :options="locationOptions" label="Location" />
            <ui-textarea v-model="localForm.bio" label="Bio" placeholder="Short bio about the user" />
         </div>
      </div>
      <div class="admin-user-form__section">
         <p class="subheading">Personal Details</p>
         <div class="admin-user-form__section--items">
            <ui-select v-model="localForm.gender" :options="genderOptions" label="Gender" />
            <ui-input v-model="localForm.hiredDate" label="Hired Date" type="date" placeholder="Hired date" />
         </div>
      </div>
      <p class="subheading">{{ isEdit ? "Update" : "Create" }} user</p>
      <div class="admin-user-form__actions">
         <router-link to="/" class="btn btn--secondary btn--lg"> back </router-link>
         <ui-button type="submit" variant="primary" :size="'md'">
            {{ isEdit ? "update" : "create" }}
         </ui-button>
      </div>
   </form>
</template>

<script setup lang="ts">
/* VUE */
import { reactive, watch } from 'vue';

/* COMPONENTS */
import UiInput from '@/components/ui/form/UiInput.vue';
import UiSelect from '@/components/ui/form/UiSelect.vue';
import UiTextarea from '@/components/ui/form/UiTextarea.vue';
import UiButton from '@/components/ui/UiButton.vue';

/* TYPES & ENUMS*/
import type { AdminUserFormModel, AdminUpdateUserPayload, AdminCreateUserPayload } from '@/modules/users/types/index';
import { Gender, Position, Location } from "@/shared/enums/user.enum"
import { Role } from "@/shared/enums/role.enum"

/* PROPS */
const props = defineProps<{
   modelValue: AdminUserFormModel
   isEdit?: boolean

}>();

/* EMIT */
const emit = defineEmits<{
   (e: "update:modelValue", value: AdminUserFormModel): void
   (e: "submit", payload: AdminUpdateUserPayload | AdminCreateUserPayload): void
   (e: "save-role"): void
}>()

/*local form copy*/
const localForm = reactive({ ...props.modelValue })

/* sync */
watch(
   () => props.modelValue,
   (val) => Object.assign(localForm, {
      ...val,
      phone: val.phone || '',
      bio: val.bio || '',
      hiredDate: val.hiredDate
         ? new Date(val.hiredDate).toISOString().split('T')[0]
         : ''
   }),
   { deep: true }
)

watch(
   localForm,
   (val) => emit("update:modelValue", { ...val }),
   { deep: true }
)

/* submit */
function emitSubmit() {
   const payload: any = { ...localForm }

   if (props.isEdit) {
      delete payload.password
   }

   emit("submit", payload);
}

/* OPTIONS */
const positionOptions = [
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
   { label: 'Remote', value: Location.REMOTE },
   { label: 'Onsite', value: Location.ONSITE },
   { label: 'Hybrid', value: Location.HYBRID },
]

const genderOptions = [
   { label: "Male", value: Gender.MALE },
   { label: "Female", value: Gender.FEMALE },
   { label: "Other", value: Gender.OTHER }

]

const roleOptions = [
   { label: "Admin", value: Role.ADMIN },
   { label: "Editor", value: Role.EDITOR },
   { label: "Viewer", value: Role.VIEWER }
]

</script>
