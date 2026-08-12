<template>
   <form class="admin-user-form" @submit.prevent="emitSubmit">
      <div class="admin-user-form__section">
         <muk-text type="muk-subheading">Main info</muk-text>
         <div class="muk-section__item">
            <muk-input v-model="localForm.name" label="* Name" placeholder="name" :error="errors.name"
               @update:model-value="validateField('name')" />
            <muk-input v-model="localForm.email" label="* Email" type="email" placeholder="email" :error="errors.email"
               @update:model-value="validateField('email')" />
            <muk-input v-model="localForm.password" label="* Password" type="password" placeholder="password"
               :disabled="isEdit" :error="errors.password" @update:model-value="validateField('password')" />
            <muk-select v-model="localForm.position" :options="positionOptions" label="Position" />
         </div>
      </div>
      <div class="admin-user-form__section" v-if="isEdit">
         <muk-text type="muk-subheading">User Role</muk-text>
         <div class="muk-section__item">
            <muk-select v-model="localForm.role" :options="roleOptions" label="Role" />
            <muk-button type="button" :variant="'warning'" @click="emit('save-role')">Update role</muk-button>
         </div>
      </div>
      <div class=" admin-user-form__section">
         <muk-text type="muk-subheading">Contacts & Location</muk-text>
         <div class="muk-section__item">
            <muk-input v-model="localForm.phone" label="Phone" type="tel" placeholder="phone number"
               :error="errors.phone" @update:model-value="validateField('phone')" />
            <muk-select v-model="localForm.location" :options="locationOptions" label="Location" />
            <markdown-editor v-model="localForm.bio" :error="errors.bio" @update:model-value="validateField('bio')" />
         </div>
      </div>
      <div class="admin-user-form__section">
         <muk-text type="muk-subheading">Personal Details</muk-text>
         <div class="muk-section__item">
            <muk-select v-model="localForm.gender" :options="genderOptions" label="Gender" />
            <muk-input v-model="localForm.hiredDate" label="Hired Date" type="date" placeholder="Hired date" />
         </div>
      </div>
      <muk-text type="muk-subheading">{{ isEdit ? "Update" : "Create" }} user</muk-text>
      <div class="muk-section__item muk-section__actions">
         <muk-button variant="ghost" @click="router.push('/')">Back</muk-button>
         <muk-button type="submit" variant="primary" :size="'md'">
            {{ isEdit ? "update" : "create" }}
         </muk-button>
      </div>
   </form>
</template>

<script setup lang="ts">
/* VUE */
import { reactive, watch } from 'vue';
import router from '@/router';
/* COMPONENTS */
import { MukButton, MukText, MukInput, MukSelect } from 'modular-ui-kit-vue'
import MarkdownEditor from '@/shared/ui/form/MarkdownEditor.vue';

/* TYPES & ENUMS*/
import type { AdminUserFormModel, AdminUpdateUserPayload, AdminCreateUserPayload } from '@/modules/users/types/index';
import { Gender, Position, Location } from "@/shared/enums/user.enum"
import { Role } from "@/shared/enums/role.enum"

/* Validation */
import { createUserSchema, updateUserSchema } from '../validation/user.schema';

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

/* errors */
const errors = reactive<Partial<Record<keyof AdminUserFormModel, string>>>({})

/*local form copy*/
const localForm = reactive<AdminUserFormModel>({ ...props.modelValue })

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

/* validate fiels */
function validateField(field: keyof AdminUserFormModel) {
   const schema = props.isEdit ? updateUserSchema : createUserSchema

   const result = schema.safeParse(localForm)

   if (result.success) {
      delete errors[field]
      return
   }

   const issue = result.error.issues.find(i => i.path[0] === field)

   if (issue) {
      errors[field] = issue.message
   } else {
      delete errors[field]
   }


}

/* submit */
function emitSubmit() {
   const schema = props.isEdit ? updateUserSchema : createUserSchema

   const result = schema.safeParse(localForm)

   console.log(result)
   if (!result.success) {
      result.error.issues.forEach(issue => {
         const key = issue.path[0] as keyof AdminUserFormModel
         errors[key] = issue.message
      })
      return
   }


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
