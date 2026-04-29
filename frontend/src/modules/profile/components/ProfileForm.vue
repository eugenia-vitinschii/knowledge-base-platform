<template>
   <form class="profile-form" @submit.prevent="emitSubmit">
      <div class="profile-form__section">
         <h2 class="subheading">Main info</h2>
         <div class="profile-form__section--items">
            <ui-input v-model="localForm.name" label="Name" type="text" placeholder="name" :error="errors.name"
               @update:model-value="validateField('name')" />
            <ui-input v-model="localForm.email" label="Email" type="email" placeholder="email" :error="errors.email"
               @update:model-value="validateField('email')" />
            <ui-select v-model="localForm.position" :options="positionOptions" label="Position" />
         </div>
      </div>
      <div class=" profile-form__section">
         <p class="subheading">Contacts & Bio</p>
         <div class="profile-form__section--items">
            <ui-input v-model="localForm.phone" label="Phone" type="tel" placeholder="phone number"
               :error="errors.phone" @update:model-value="validateField('phone')" />
            <ui-checkbox :model-value="localForm.visibility.phone === 'private'"
               @update:model-value="v => localForm.visibility.phone = v ? Visibility.PRIVATE : Visibility.PUBLIC"
               label="Hide phone " class="profile-form__checkbox" />
            <ui-textarea v-model="localForm.bio" label="Bio" placeholder="Short bio about the user" :error="errors.bio"
               @update:model-value="validateField('bio')" />
         </div>
      </div>
      <div class="profile-form__section">
         <p class="subheading">Personal Details</p>
         <div class="profile-form__section--items">
            <ui-select v-model="localForm.gender" :options="genderOptions" label="Gender" />
            <ui-input v-model="localForm.birthDate" label="Birth Date" type="date" placeholder="Birthday date"
               :error="errors.birthDate" @update:model-value="validateField('birthDate')" />
            <ui-checkbox :model-value="localForm.visibility.birthDate === 'private'"
               @update:model-value="v => localForm.visibility.birthDate = v ? Visibility.PRIVATE : Visibility.PUBLIC"
               label="Hide Birthday" class="profile-form__checkbox" />
         </div>
      </div>
      <p class="subheading">Save</p>
      <div class="profile-form__actions">
         <router-link to="/" class="btn btn--secondary btn--lg"> back </router-link>
         <ui-button type="submit" variant="primary" :size="'md'">
            save
         </ui-button>
      </div>
   </form>
</template>

<script setup lang="ts">
/* COMPONENTS */
import UiInput from '@/components/ui/form/UiInput.vue';
import UiSelect from '@/components/ui/form/UiSelect.vue';
import UiTextarea from '@/components/ui/form/UiTextarea.vue';
import UiButton from '@/components/ui/UiButton.vue';
import UiCheckbox from '@/components/ui/form/UiCheckbox.vue';

/*VUE */
import { watch, reactive } from 'vue';

/* Types & ENUMS */
import type { ProfileUpdatePayload } from '../types/index';
import { Gender, Position } from "@/shared/enums/user.enum"
import { Visibility } from '@/shared/enums/visibility.enum';

/* VALIDATION */
import type { ProfileFormData } from '../validation/profile.schema';
import { profileSchema } from '../validation/profile.schema';

import { useToast } from '@/shared/composables/useToast';

const toast = useToast()

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

      toast.error("Please fix form errors")
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
