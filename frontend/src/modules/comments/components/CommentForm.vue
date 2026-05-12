<template>
   <form class="comment-form" @submit.prevent="emitSubmit">
      <div class="comment-form__avatar">
         <img src="@/assets/img/test-avatar.jpg" alt="Profile Image">
      </div>
      <div class="comment-form__wrapper">
         <div class="comment-form__data">
            <ui-textarea v-model="content" />
         </div>
         <div class="comment-form__actions">
            <ui-icon-button type="submit">
               <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  fill="#e3e3e3">
                  <path
                     d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
               </svg>
            </ui-icon-button>
         </div>
      </div>
   </form>
</template>

<script setup lang="ts">
/* VUE */
import { ref } from 'vue';

/* COMPONETS */
import UiTextarea from '@/components/ui/form/UiTextarea.vue';
import UiIconButton from '@/components/ui/UiIconButton.vue';

/* TYPES */
import type { CreateCommentPayload } from '../types/index';

/* LOCAL STATE */
const content = ref('')

/* EMIT */
const emit = defineEmits<{
   (e: "submit", payload: CreateCommentPayload): void
}>()

/* submit */
function emitSubmit() {
   if (!content.value.trim()) return

   emit("submit", { content: content.value });

   content.value = ''
}

</script>
