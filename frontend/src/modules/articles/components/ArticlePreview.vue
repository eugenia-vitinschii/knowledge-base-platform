<template>
   <div class="article-preview">
      <div class="article-preview__heading">
         <muk-text as="h2" type="muk-heading">{{ article.title }} <muk-text as="span" type="muk-heading"
               v-if="article.subcategory">[{{ article.subcategory }}] </muk-text> </muk-text>
         <div class="article-preview__heading--date">
            <muk-badge variant="muted" size="lg">
               <template #icon><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                     width="24px" fill="#e3e3e3">
                     <path
                        d="M291.5-411.5Q280-423 280-440t11.5-28.5Q303-480 320-480t28.5 11.5Q360-457 360-440t-11.5 28.5Q337-400 320-400t-28.5-11.5Zm160 0Q440-423 440-440t11.5-28.5Q463-480 480-480t28.5 11.5Q520-457 520-440t-11.5 28.5Q497-400 480-400t-28.5-11.5Zm160 0Q600-423 600-440t11.5-28.5Q623-480 640-480t28.5 11.5Q680-457 680-440t-11.5 28.5Q657-400 640-400t-28.5-11.5ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                  </svg></template>
               <template #text><muk-text variant="muted">{{ formatArticleDate(article.updatedAt)
               }}</muk-text></template>
            </muk-badge>
         </div>
      </div>
      <div class="article-preview__badges">
         <muk-badge variant="muted" size="sm">
            <template #icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path
                     d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z" />
               </svg></template>
            <template #text><muk-text variant="muted">{{ article.category }}</muk-text></template>
         </muk-badge>
         <muk-badge variant="muted" size="sm">
            <template #icon> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24px">
                  <path
                     d="M280-160v-441q0-33 24-56t57-23h439q33 0 56.5 23.5T880-600v320L680-80H360q-33 0-56.5-23.5T280-160ZM81-710q-6-33 13-59.5t52-32.5l434-77q33-6 59.5 13t32.5 52l10 54h-82l-7-40-433 77 40 226v279q-16-9-27.5-24T158-276L81-710Zm279 110v440h280v-160h160v-280H360Zm220 220Z" />
               </svg></template>
            <template #text><muk-text variant="muted">{{ article.type }}</muk-text></template>
         </muk-badge>
         <muk-badge variant="muted" size="sm">
            <template #icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path d="M80-200v-80h240v-240h240v-240h320v80H640v240H400v240H80Z" />
               </svg></template>
            <template #text><muk-text variant="muted">{{ article.difficulty }}</muk-text></template>
         </muk-badge>
      </div>
      <div class="article-preview__content" ref="articleRef" v-html="rendered">
      </div>
      <muk-text type="muk-subheading" v-if="article.tags?.length">Tags</muk-text>
      <div class="article-preview__tags" v-if="article.tags?.length">
         <muk-text as="router-link" class="article-preview__tags--item" v-for="(tag, index) in article.tags"
            :key="index" :to="{ path: '/articles', query: { tag: tag } }">
            #{{ tag }}
         </muk-text>
      </div>
      <div class="article-preview__views">

         <muk-text as="router-link" :to="`/articles/users/${article.author.id}`">
            {{ article.author?.name }}
         </muk-text>
         <muk-badge variant="muted" size="sm">
            <template #icon> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                  fill="#e3e3e3">
                  <path
                     d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z" />
               </svg></template>
            <template #text><muk-text variant="muted">{{ article.views }}</muk-text></template>
         </muk-badge>

      </div>
      <div class="muk-section__item" v-if="isAdmin && showAdminControls">
         <muk-text type="muk-subheading">Fast actions</muk-text>
         <div class="muk-section__actions">
            <muk-button @click="$emit('edit', article.id)">edit</muk-button>
            <muk-button @click="$emit('delete', article.id)" variant="danger">delete</muk-button>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
/* VUE */
import { computed, onMounted, ref } from 'vue';

/* STORES */
import { useAuthStore } from '@/stores/auth/auth.store';

/* UTILS  & COMPOSABLES*/
import { md } from '@/shared/lib/markdown';
import { useCodeCopy } from '@/shared/composables/useCodeCopy';
import { formatArticleDate } from "@/shared/lib/formatDate";

/* COMPONENTS */
import { MukText, MukButton, MukBadge } from 'modular-ui-kit-vue';

/* TYPES & ENUMS*/
import type { ArticlePreview } from "../types/index";

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

/* === STORES ===  */
const auth = useAuthStore();

/* === DOM REFERENCES ===  */
const articleRef = ref<HTMLElement | null>(null)

/* === STATE COMPUTED === */
/* Render content */
const rendered = computed(() => md.render(props.article.content || ""))
const isAdmin = computed(() => auth.user?.role === 'admin')

/* === LIFECYCLE HOOKS ===  */
onMounted(() => {
   if (articleRef.value) {
      useCodeCopy(articleRef)
   }
})

</script>
