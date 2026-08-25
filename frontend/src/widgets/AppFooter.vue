<template>
   <footer class="footer">
      <div class="muk-container">
         <div class="footer__wrapper">
            <div class="footer__actions">
               <theme-toggle />
            </div>
            <div class="footer__text">
               <muk-text>KBP 2026 [refactored]</muk-text>
               <muk-text :type="'muk-caption'" :variant="'primary'" :align="'center'">[MODULAR UI KIT]</muk-text>
               <muk-text as="a" :href="'https://github.com/eugenia-vitinschii/modular-ui-kit'" :variant="'muted'"
                  :align="'center'">[repo]</muk-text>
            </div>
         </div>
      </div>
   </footer>
</template>

<script setup lang="ts">
/* COMPONENTS */
import { MukText } from 'modular-ui-kit-vue';
import ThemeToggle from '@/shared/ui/buttons/ThemeToggle.vue';
</script>
