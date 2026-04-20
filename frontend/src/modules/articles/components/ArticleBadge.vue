<template>
   <div class="badge">
      <div class="badge__icon" v-if="variant === 'category'">
         <svg :style="{ fill: color }" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
            width="24px" fill="#e3e3e3">
            <path
               d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z" />
         </svg>
      </div>
      <div class="badge__icon" v-else-if="variant === 'type'">
         <svg :style="{ fill: color }" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
            width="24px" fill="#e3e3e3">
            <path
               d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z" />
         </svg>
      </div>
      <div class="badge__icon" v-else="variant === 'difficulty'">
         <svg :style="{ fill: color }" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
            width="24px" fill="#e3e3e3">
            <path
               d="M240-640h360v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85h-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640Zm0 480h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM240-160v-400 400Z" />
         </svg>
      </div>
      <div class="badge__span">
         <span :style="{ color: color }">
            <slot></slot>
         </span>
      </div>
   </div>

</template>

<script setup lang="ts">
/* PROPS */
const props = defineProps<{
   color: string
   variant?: 'category' | 'type' | 'difficulty'
}>()

</script>
