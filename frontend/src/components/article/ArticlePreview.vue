<template>
   <div class="article-preview">
      <div class="article-preview__heading">
         <h2 class="heading">{{ article.title }} <span class="heading" v-if="article.subcategory">[{{
            article.subcategory }}] </span> </h2>
         <div class="article-preview__heading--date">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
               <path
                  d="M291.5-411.5Q280-423 280-440t11.5-28.5Q303-480 320-480t28.5 11.5Q360-457 360-440t-11.5 28.5Q337-400 320-400t-28.5-11.5Zm160 0Q440-423 440-440t11.5-28.5Q463-480 480-480t28.5 11.5Q520-457 520-440t-11.5 28.5Q497-400 480-400t-28.5-11.5Zm160 0Q600-423 600-440t11.5-28.5Q623-480 640-480t28.5 11.5Q680-457 680-440t-11.5 28.5Q657-400 640-400t-28.5-11.5ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
            </svg>
            <p class="body-text">{{ formatDate(article.updatedAt) }}</p>
         </div>
      </div>
      <div class="article-preview__badges">
         <article-badge :variant="'category'" :color="categoryColors[article.category]">{{ article.category
         }}</article-badge>
         <article-badge :variant="'type'" :color="typeColors[article.type]">{{ article.type }}</article-badge>
         <article-badge :variant="'difficulty'" :color="difficultyColors[article.difficulty]">{{
            article.difficulty
            }}</article-badge>
      </div>
      <div class="article-preview__content" ref="articleRef" v-html="rendered">
      </div>
      <p class="subheading">Tags</p>
      <div class="article-preview__tags">
         <div class="article-preview__tags--item" v-for="(tag, index) in article.tags" :key="index">
            <p>#{{ tag }}</p>
         </div>

      </div>
      <div class="article-preview__admin" v-if="isAdmin && showAdminControls">
         <p class="subheading">Fast actions</p>
         <div class="article-preview__admin--actions">
            <ui-button @click="$emit('edit', article.id)">edit</ui-button>
            <ui-button @click="$emit('delete', article.id)" variant="danger">delete</ui-button>
         </div>

      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ArticleBadge from './ArticleBadge.vue';
import UiButton from '../ui/UiButton.vue';

/* MARKED*/
import { md } from '@/shared/lib/markdown';
/* VUE  & PINIA*/
import { useAuthStore } from '@/stores/auth/auth.store';
import { computed, ref } from 'vue';
/* TYPES */
import type { ArticlePreview } from '@/types/article-preview.type';
import { categoryColors, difficultyColors, typeColors } from '@/shared/enums/colors';
import { useCodeCopy } from '@/shared/composables/useCodeCopy';

/* PROPS */
const props = defineProps<{
   article: ArticlePreview
   showAdminControls: boolean
}>()

/* EMITS */
const emit = defineEmits<{
   (e: 'edit', id: string): void;
   (e: 'delete', id: string): void;
}>()

/* Render content */
const rendered = computed(() => {
   return md.render(props.article.content || "")
})

const articleRef = ref<HTMLElement | null>(null)
useCodeCopy(articleRef)

/* Admin only */
const auth = useAuthStore();
const isAdmin = computed(() => auth.user?.role === 'admin')

/* formated date*/
function formatDate(dateString: string) {
   const date = new Date(dateString)

   return new Intl.DateTimeFormat('en-En', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
   }).format(date)
}

</script>
