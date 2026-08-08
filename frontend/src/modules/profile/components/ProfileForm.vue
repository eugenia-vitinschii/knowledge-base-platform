<template>
   <form class="profile-form" @submit.prevent="emitSubmit">
      <div class="profile-form__section">
         <base-text :type="'muk-subheading'">Main info</base-text>
         <div class="profile-form__section--items">
            <base-input v-model="localForm.name" label="Name" type="text" placeholder="name" :error="errors.name"
               @update:model-value="validateField('name')" />
            <base-input v-model="localForm.email" label="Email" type="email" placeholder="email" :error="errors.email"
               @update:model-value="validateField('email')" />
            <base-select v-model="localForm.position" :options="positionOptions" label="Position" />
         </div>
      </div>
      <div class=" profile-form__section">
         <base-text :type="'muk-subheading'">Contacts & Bio</base-text>
         <div class="profile-form__section--items">
            <base-input v-model="localForm.phone" label="Phone" type="tel" placeholder="phone number"
               :error="errors.phone" @update:model-value="validateField('phone')" />
            <base-checkbox :model-value="localForm.visibility.phone === 'private'"
               @update:model-value="v => localForm.visibility.phone = v ? Visibility.PRIVATE : Visibility.PUBLIC"
               label="Hide phone " class="profile-form__checkbox" />
            <markdown-editor :model-value="localForm.bio ?? ''" :error="errors.bio"
               @update:model-value="localForm.bio = $event; validateField('bio')" />
         </div>
      </div>
      <div class="profile-form__section">
         <muk-text :type="'muk-subheading'">Personal Details</muk-text>
         <div class="profile-form__section--items">
            <muk-select v-model="localForm.gender" :options="genderOptions" label="Gender" />
            <muk-input v-model="localForm.birthDate" label="Birth Date" type="date" placeholder="Birthday date"
               :error="errors.birthDate" @update:model-value="validateField('birthDate')" />
            <muk-checkbox :model-value="localForm.visibility.birthDate === 'private'"
               @update:model-value="v => localForm.visibility.birthDate = v ? Visibility.PRIVATE : Visibility.PUBLIC"
               label="Hide Birthday" class="profile-form__checkbox" />
         </div>
      </div>
      <base-text :type="'muk-subheading'">Update information</base-text>
      <div class="profile-form__actions">
         <muk-button @click="$router.push('/')" :variant="'secondary'">
            Back
         </muk-button>
         <muk-button :type="'submit'">
            Save
         </muk-button>
      </div>
   </form>
</template>

<script setup lang="ts">
/* COMPONENTS */
import { MukText, MukButton, MukInput, MukSelect, MukCheckbox } from 'modular-ui-kit-vue'


import MarkdownEditor from '@/shared/ui/form/MarkdownEditor.vue';

/*VUE */
import { watch, reactive } from 'vue';

/* Types & ENUMS */
import type { ProfileUpdatePayload } from '../types/index';
import { Gender, Position } from "@/shared/enums/user.enum"
import { Visibility } from '@/shared/enums/visibility.enum';

/* VALIDATION */
import type { ProfileFormData } from '../validation/profile.schema';
import { profileSchema } from '../validation/profile.schema';

import { useMukToast } from 'modular-ui-kit-vue'

const { addToast } = useMukToast()

/* PROPS */
const props = defineProps<{
   modelValue: ProfileFormData
}>()

/* EMIT */
const emit = defineEmits<{
   (e: "update:modelValue", value: ProfileFormData): void
   (e: "submit", payload: ProfileUpdatePayload): void
}>()


/* reactive errors */
const errors = reactive<Partial<Record<keyof ProfileFormData, string>>>({})

/*local form copy*/
const localForm = reactive<ProfileFormData>({ ...props.modelValue })

/* sync */
watch(
   () => props.modelValue,
   (val) =>
      Object.assign(localForm, {
         ...val,
         phone: val.phone || '',
         bio: val.bio || '',
         birthDate: val.birthDate
            ? new Date(val.birthDate).toISOString().split('T')[0]
            : ''
      }),
   { deep: true, immediate: true }
)

watch(
   localForm,
   (val) => emit("update:modelValue", { ...val }),
   { deep: true }
)

/* validate fiels */
function validateField(field: keyof ProfileFormData) {
   const result = profileSchema.safeParse(localForm)

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
   const result = profileSchema.safeParse(localForm)

   if (!result.success) {
      result.error.issues.forEach(issue => {
         const key = issue.path[0] as keyof ProfileFormData
         errors[key] = issue.message
      })

      addToast("Please fix form errors", 'warning')
      return
   }

   const payload = { ...localForm }

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


const genderOptions = [
   { label: "Male", value: Gender.MALE },
   { label: "Female", value: Gender.FEMALE },
   { label: "Other", value: Gender.OTHER }

]
</script>
