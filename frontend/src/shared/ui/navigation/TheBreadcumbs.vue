<template>
   <nav class="bread-crumbs" v-if="route.path !== '/'">
      <ul class="bread-crumbs__list">
         <ui-icon-button @click="router.back()">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
               <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
            </svg>
         </ui-icon-button>
         <li class="bread-crumbs__item" v-for="(crumb, index) in breadcrumbs" :key="index">
            <span v-if="index === breadcrumbs.length - 1" class="body-text">{{ crumb.label }}</span>
            <template v-else>
               <router-link :to="crumb.to" class="body-text"> {{ crumb.label }}</router-link>
               <span class="body-text bread-crumbs__item-separator">/</span>
            </template>
         </li>
      </ul>
   </nav>
</template>

<script setup lang="ts">

/* VUE & ROUTER */
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"

/* COMPONENTS */
import UiIconButton from "../buttons/UiIconButton.vue"

const route = useRoute()
const router = useRouter()


const breadcrumbs = computed(() => {
   const matched = route.matched.filter(r => r.meta && r.meta.title)

   let crumbs = matched.map(r => {
      const label = typeof r.meta.title === 'function' ? r.meta.title(route) : r.meta.title

      let cleanPatch = r.path

      Object.keys(route.params).forEach(key => {
         cleanPatch = cleanPatch.replace(`:${key}`, route.params[key] as string)
      })

      return { label: label as string, to: cleanPatch }
   })
   if (route.path !== '/') {
      crumbs.unshift({ label: 'Home', to: '/' })
   }

   return crumbs

})

</script>
