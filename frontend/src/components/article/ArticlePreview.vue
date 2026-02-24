<template>
   <div class="article-preview">
      <h2 class="subheading">{{ article.title }}</h2>
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
      <div class="article-preview__info">
         <p class="body-text">updated: {{ article.updatedAt }}</p>
      </div>
      <div class="article-preview__tags" v-for="(tag, index) in article.tags" :key="index">
         <p> #{{ tag }}</p>
      </div>
      <div class="article-preview__admin" v-if="isAdmin && showAdminControls">
         <ui-button @click="$emit('edit', article.id)">edit</ui-button>
         <ui-button @click="$emit('delete', article.id)" variant="danger">delete</ui-button>
         <ui-select v-model="localStatus" :options="statusOptions" @change="saveStatus"></ui-select>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import ArticleBadge from './ArticleBadge.vue';
import UiButton from '../ui/UiButton.vue';
import UiSelect from '../ui/form/UiSelect.vue';

/* MARKED*/
import { md } from '@/shared/lib/markdown';
/* VUE  & PINIA*/
import { useAuthStore } from '@/stores/auth/auth.store';
import { computed, ref } from 'vue';
/* TYPES */
import type { ArticlePreview } from '@/types/article-preview.type';
import { categoryColors, difficultyColors, typeColors } from '@/shared/enums/colors';
import { ArticleStatus } from '@/shared/enums/article.enum';
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
   (e: 'save-status', payload: { id: string; status: ArticleStatus }): void
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

/* Save status */
const localStatus = ref<ArticleStatus>(props.article.status)

const statusOptions = [
   { label: 'Draft', value: ArticleStatus.DRAFT },
   { label: 'Published', value: ArticleStatus.PUBLISHED },
   { label: 'Review', value: ArticleStatus.REVIEW },
]

function saveStatus() {
   emit('save-status', { id: props.article.id, status: localStatus.value })
}


</script>
