<template>
   <form class="profile-form" @submit.prevent="emitSubmit">
      <div class="profile-form__section">
         <h2 class="subheading">Main info</h2>
         <div class="profile-form__section--items">
            <ui-input v-model="localForm.name" label="Name" type="text" placeholder="name" />
            <ui-input v-model="localForm.email" label="Email" type="email" placeholder="email" />
            <ui-select v-model="localForm.position" :options="positionOptions" label="Position" />
         </div>
      </div>
      <div class=" profile-form__section">
         <p class="subheading">Contacts & Bio</p>
         <div class="profile-form__section--items">
            <ui-input v-model="localForm.phone" label="Phone" type="tel" placeholder="phone number" />
            <ui-checkbox :model-value="localForm.visibility.phone === 'private'"
               @update:model-value="v => localForm.visibility.phone = v ? Visibility.PRIVATE : Visibility.PUBLIC"
               label="Hide phone " class="profile-form__checkbox" />
            <ui-textarea v-model="localForm.bio" label="Bio" placeholder="Short bio about the user" />
         </div>
      </div>
      <div class="profile-form__section">
         <p class="subheading">Personal Details</p>
         <div class="profile-form__section--items">
            <ui-select v-model="localForm.gender" :options="genderOptions" label="Gender" />
            <ui-input v-model="localForm.birthDate" label="Birth Date" type="date" placeholder="Birdtj date" />
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
import type { ProfileUpdateForm, ProfileUpdatePayload } from '../types/index';
import { Gender, Position } from "@/shared/enums/user.enum"
import { Visibility } from '@/shared/enums/visibility.enum';


/* PROPS */
const props = defineProps<{
   modelValue: ProfileUpdateForm
}>()

/* EMIT */
const emit = defineEmits<{
   (e: "update:modelValue", value: ProfileUpdateForm): void
   (e: "submit", payload: ProfileUpdatePayload): void
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
      birthDate: val.birthDate
         ? new Date(val.birthDate).toISOString().split('T')[0]
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
