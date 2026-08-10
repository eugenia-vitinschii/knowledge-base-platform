<template>
   <muk-button @click="theme.toogleTheme">{{ theme.theme }}</muk-button>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme/theme.store';
import { MukButton } from 'modular-ui-kit-vue';
const theme = useThemeStore()
</script>
