<script setup lang="ts">
//stores
import { useWriteReadStore } from './stores/writeRead'
import { useAuthStore } from './stores/auth'
//import compoenents
import NavComponent from './components/NavComponent.vue'
import WriteStoryComponent from './components/WriteStoryComponent.vue'
import AuthenticationComponent from './components/AuthenticationComponent.vue'
import AccountMemberComponent from './components/AccountMemberComponent.vue'

const auth = useAuthStore()

//display/hide write mode
const writeRead = useWriteReadStore()
</script>

<template>
  <NavComponent />
  <!--container for the rest of the application-->
  <div class="h-dvh flex justify-center bg-slate-700">
    <AuthenticationComponent v-if="!auth.authenticated" />
    <AccountMemberComponent v-if="auth.authenticated && writeRead.isReadMode" />
    <WriteStoryComponent v-if="auth.authenticated && !writeRead.isReadMode" />
  </div>
</template>

<style scoped>
*,
*::after,
*::before {
  margin: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
