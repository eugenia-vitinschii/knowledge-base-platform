<template>
   <div class="profile-details">
      <div class="profile-details__main">
         <div class="profile-details__user">
            <div class="profile-details__user-avatar">
               <img src="@/assets/img/test-avatar.jpg" alt="Profile Image">
            </div>
            <div class="profile-details__user-data">
               <p class="subheading">{{ profile.name }}</p>
               <p class="body-text">{{ profile.gender }}</p>
               <p class="body-text">{{ profile.position }}</p>
            </div>
         </div>
         <div class="profile-details__side">
            <div class="profile-details__actions">
               <ui-button>Edit Profile</ui-button>
            </div>
            <div class="profile__details__list">
               <div class="profile-details__list-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                     <path
                        d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                  </svg>
                  <p>{{ profile.email }}</p>
               </div>
               <div class="profile-details__list-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                     <path
                        d="M440-42v-80q-125-14-214.5-103.5T122-440H42v-80h80q14-125 103.5-214.5T440-838v-80h80v80q125 14 214.5 103.5T838-520h80v80h-80q-14 125-103.5 214.5T520-122v80h-80Zm238-240q82-82 82-198t-82-198q-82-82-198-82t-198 82q-82 82-82 198t82 198q82 82 198 82t198-82Zm-311-85q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm169.5-56.5Q560-447 560-480t-23.5-56.5Q513-560 480-560t-56.5 23.5Q400-513 400-480t23.5 56.5Q447-400 480-400t56.5-23.5ZM480-480Z" />
                  </svg>
                  <p>{{ profile.location }}</p>
               </div>
               <div class="profile-details__list-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                     <path
                        d="M240-160v-640 640ZM637-40q-26 0-49-10.5T548-80L346-322l45-46q18-18 44-22.5t49 7.5l116 58v-355h80q66 0 113 47t47 113v320q0 66-47 113T680-40h-43ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h360q33 0 56.5 23.5T680-800v120h-80v-120H240v640h241l67 80H240Zm208.5-611.5Q460-703 460-720t-11.5-28.5Q437-760 420-760t-28.5 11.5Q380-737 380-720t11.5 28.5Q403-680 420-680t28.5-11.5ZM637-120h43q33 0 56.5-23t23.5-57v-320q0-33-23.5-56.5T680-600v405L468-302l138 168q6 7 14 10.5t17 3.5Z" />
                  </svg>
                  <p>{{ profile.phone }}</p>
               </div>
               <div class="profile-details__list-item" v-if="profile.birthdate">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                     <path
                        d="M160-80q-17 0-28.5-11.5T120-120v-200q0-33 23.5-56.5T200-400v-160q0-33 23.5-56.5T280-640h160v-58q-18-12-29-29t-11-41q0-15 6-29.5t18-26.5l56-56 56 56q12 12 18 26.5t6 29.5q0 24-11 41t-29 29v58h160q33 0 56.5 23.5T760-560v160q33 0 56.5 23.5T840-320v200q0 17-11.5 28.5T800-80H160Zm120-320h400v-160H280v160Zm-80 240h560v-160H200v160Zm80-240h400-400Zm-80 240h560-560Zm560-240H200h560Z" />
                  </svg>
                  <p>{{ profile.birthdate }}</p>
               </div>
               <div class="profile-details__list-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                     <path
                        d="M480-390Zm-132-53 55 37 77-39 77 39 53-35-40-79H386l-38 77ZM209-160h541L646-369l-83 55-83-41-83 41-85-56-103 210ZM80-80l234-475q10-20 29.5-32.5T386-600h54v-280h280l-40 80 40 80H520v120h50q23 0 42 12t30 32L880-80H80Z" />
                  </svg>
                  <p> joined {{ formatJoinedDate(profile.hiredDate) }}</p>
               </div>
            </div>
         </div>
      </div>
      <div class="profile-details__about">
         <h2 class="subheading">BIO</h2>
         <p class="body-text">{{ profile.bio }}</p>
      </div>
   </div>
</template>

<script setup lang="ts">
/* COMPONENTS */
import UiButton from "@/components/ui/UiButton.vue"

import { formatJoinedDate } from "@/shared/lib/formatDate";
import type { ProfileDetails } from "../types/profile-details";


defineProps<{
   profile: ProfileDetails
}>()

</script>
