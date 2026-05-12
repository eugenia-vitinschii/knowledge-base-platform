<template>
   <div class="comment-list">
      <comment-item v-for="comment in comments" :key="comment.id" :comment="comment" />
   </div>
</template>

<script setup lang="ts">
/* COMPPONENTS */
import CommentItem from './CommentItem.vue'

/* TYPES */
import type { Comment } from '../types/index';

/* PROPS */
const props = defineProps<{
   comments: Comment[]
}>()
</script>
