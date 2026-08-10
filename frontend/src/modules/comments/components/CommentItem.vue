<template>
   <div class="comment-item">
      <div class="comment-item__avatar">
         <img src="@/assets/img/test-avatar.jpg" alt="Profile Image">
      </div>
      <div class="comment-item__wrapper">
         <div class="comment-item__info">
            <muk-text as="router-link" :to="`/articles/users/${comment.author?.id}`">{{ comment.author?.name
               }}</muk-text>
            <muk-text>{{ formatCreatedDate(comment.createdAt) }}</muk-text>
         </div>
         <div class="comment-item__content">
            <muk-text>{{ comment.content }}</muk-text>
         </div>
         <div class="comment-item__actions">
            <muk-icon-button disabled variant="ghost">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path
                     d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
               </svg>
            </muk-icon-button>
            <muk-icon-button disabled variant="ghost">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path
                     d="M800-240v-560H274l-80-80h606q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240Zm20 212L606-240H240L80-80v-688l-52-52 56-56L876-84l-56 56ZM344-504Zm170-56ZM160-688v448l80-80h288L160-688Z" />
               </svg>
            </muk-icon-button>
         </div>
      </div>
   </div>
   <p></p>
</template>

<script setup lang="ts">
/* COMPONENTS */
import { MukText, MukIconButton } from 'modular-ui-kit-vue'


import type { Comment } from '../types/index';

import { formatCreatedDate } from '@/shared/lib/formatDate';

defineProps<{
   comment: Comment
}>()

</script>
