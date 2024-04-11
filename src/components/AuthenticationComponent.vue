<script setup lang="ts">
//import vue stuff
import { provide } from 'vue'
//import stores
import { useAuthStore } from '../stores/auth'
import { useErrorsStore } from '@/stores/errors'
//import Components
import LoginSignupForm from './LoginSignupForm.vue'
import ButtonComponent from './ButtonComponent.vue'

//login/signup state
const auth = useAuthStore()
const errors = useErrorsStore()

//provide auth type to form
provide('btnType', 'formToggle')

//functions
function toggleLoginSignup() {
  auth.isLoginForm = !auth.isLoginForm

  //reset error
  errors.errorStatus = false
  errors.errorMessage = ''
}
</script>

<template>
  <!--Non-authenticated Component-->
  <div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-10/12 rounded bg-slate-800 grid grid-rows-12 grid-cols-12"
    v-if="!auth.isNavForm"
  >
    <!--Form Container-->
    <div class="col-start-3 col-span-6 row-start-2 row-span-9">
      <LoginSignupForm />
    </div>
    <!--Button Container-->
    <div class="col-start-10 col-span-2 row-start-2 row-span-1 rounded bg-slate-600">
      <ButtonComponent @click="toggleLoginSignup">{{
        auth.isLoginForm ? 'Switch to Signup' : 'Switch to Login'
      }}</ButtonComponent>
    </div>
  </div>
</template>
