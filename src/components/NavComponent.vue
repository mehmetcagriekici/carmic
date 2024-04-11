<script setup lang="ts">
//import vue stuff
import { provide } from 'vue'
//import store
import { useStoriesStore } from '../stores/stories'
import { useUsersStore } from '../stores/users'
import { useWriteReadStore } from '../stores/writeRead'
import { useAuthStore } from '../stores/auth'

//import components
import ButtonComponent from './ButtonComponent.vue'
import UserInformation from './UserInformation.vue'
import ModalComponent from './ModalComponent.vue'

//import services
import { userLogout } from '@/services/apiAccount'
import { resetApp } from '@/services/resetApp'

//data needed
/**
 * selected user username, profile photo
 * global stories (list) (to display)
 * current stroy (can navigate between chapters)
 * user stories (list) (to mutate and to display)
 */

//stores
//login/signup state for auth
const auth = useAuthStore()
//users state
const users = useUsersStore()
//stories state
const stories = useStoriesStore()
//write mode / read mode
const writeRead = useWriteReadStore()

//provide props
provide('btnType', 'navPopper')
provide('listType', 'navPopper')
provide('formType', 'navPopper')

function handleExit() {
  //logout user from the server
  userLogout()

  //clear app data (direct to login form)
  resetApp()
}
</script>

<template>
  <nav
    class="fixed inline-grid grid-cols-4 w-full h-12 font-mono font-bold tracking-wide border-slate-700 border-b-2 bg-slate-900 text-slate-200 xl:text-base sm:text-xs"
  >
    <!--if authenticated display user information else display login/signup button -->
    <div class="h-12 items-center justify-evenly gap-5 sm:hidden md:flex pr-3">
      <UserInformation v-if="auth.authenticated" />

      <ModalComponent
        v-if="!auth.authenticated"
        role="formModal"
        :btn-text="auth.isLoginForm ? 'Signup' : 'Login'"
      />
    </div>

    <div
      class="flex justify-end items-end py-2 px-4 xl:gap-10 sm:gap-4 sm:col-span-4 md:col-span-3"
      v-if="auth.authenticated"
    >
      <!--LIST NAVIGATE BETWEEN CHAPTERS-->
      <ModalComponent
        v-if="users.selectedUser"
        role="listModal"
        :items="stories.currentStory ? stories.currentStory.chapters : []"
        btnText="select chapter"
      />
      <!--LIST CHOOSE A STORY AMONGS EXISTING ONES-->
      <ModalComponent
        v-if="users.users.length > 0"
        role="listModal"
        :items="stories.stories"
        btnText="choose a story from the account"
      />
      <!--LIST FOR SELECTED USER STORIES-->
      <ModalComponent
        v-if="users.selectedUser"
        role="listModal"
        :items="users.selectedUser?.stories"
        btnText="choose between one of your stories"
      />
      <!--SELECT FORM CHOOSE EITHER WRITE MODE OR READ MODE-->
      <ModalComponent
        v-if="users.selectedUser"
        role="toggleModal"
        :btnText="writeRead.isReadMode ? 'write' : 'read'"
        :toggle-state="writeRead.toggleWriteRead"
      />
      <!--LIST CHOOSE BETWEEN EXISTING USERS IN THE SAME ACCOUNT-->
      <ModalComponent
        v-if="users.users.length > 0"
        role="listModal"
        :items="users.users"
        btnText="select user"
      />
      <ButtonComponent @click="handleExit">Exit</ButtonComponent>
    </div>
  </nav>
</template>
