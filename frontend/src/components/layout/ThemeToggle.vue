<template>
   <button class="btn btn--primary" @click="theme.toogleTheme">{{ theme.theme }}</button>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme/theme.store';

const theme = useThemeStore()
</script>
