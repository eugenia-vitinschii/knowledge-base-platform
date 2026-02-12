<template>
   <form class="article-form">
      <div class="article-form__section">
         <p class="subheading">Meta</p>
         <div class="article-form__section--items">
            <ui-input v-model="test" type="text" placeholder="title" label="Article title" />
            <ui-select v-model="options" :options="testOptions" label="Article types" />
            <ui-select v-model="options" :options="testOptions" label="Article difficulty" />
            <ui-select v-model="options" :options="testOptions" label="Article category" />
            <ui-input v-model="test" type="text" placeholder="subcategory" label="Article subcategory" />
            <ui-input v-model="test" type="text" placeholder="tags" label="Article tags" />
         </div>
      </div>
      <div class="article-form__section">
         <p class="subheading">Content</p>
         <div class="article-form__section--items">
            <markdown-editor v-model="markdown" />
         </div>
      </div>
      <div class="article-form__section">
         <p class="subheading">Admin Controls</p>
         <div class="article-form__section--items">
            <ui-select v-model="options" :options="testOptions" label="Article status" />
         </div>
      </div>
      <div class="article-form__actions">
         <ui-button type="submit" variant="primary">save</ui-button>
      </div>
      <br>
   </form>
</template>

<script setup lang="ts">
/* COMPONENTS */
import UiInput from './UiInput.vue';
import UiSelect from './UiSelect.vue';
import MarkdownEditor from '../markdown/MarkdownEditor.vue';
import UiButton from './UiButton.vue';
/* VUE */
import { ref } from 'vue';

/* 4444 */
const test = ref('')
const markdown = ref('')
const options = ref('')
const testOptions = [
   { label: "Beginner", value: "beginner" },
   { label: "Intermediate", value: "intermediate" },
   { label: "Advanced", value: "advanced" },
]
/* 4444 */
</script>
